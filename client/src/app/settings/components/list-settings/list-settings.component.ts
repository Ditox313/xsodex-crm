import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SettingAvtopark, SettingSklad, SettingsParamsFetch } from '../../types/settings.interfaces';
import { Store, select } from '@ngrx/store';
import { isLoadingSelector, noMoreSettingsAvtoparkList, noMoreSettingsSkladList, settingsAvtoparkListSelector, settingsSkladListSelector } from '../../store/selectors';
import { noMoreSettingsAvtoparkListFalseAction, noMoreSettingsAvtoparkListTrueAction, noMoreSettingsSkladListFalseAction, noMoreSettingsSkladListTrueAction, settingAvtoparkDeleteAction, settingsAvtoparkListAction, settingsAvtoparkListResetAction, settingSkladDeleteAction, settingsSkladListAction, settingsSkladListResetAction } from '../../store/actions/settings.action';

@Component({
  selector: 'app-list-settings',
  templateUrl: './list-settings.component.html',
  styleUrls: ['./list-settings.component.css']
})
export class ListSettingsComponent {
  STEP = 2;
  offset: number = 0;
  limit: number = this.STEP;
  title: string = 'Настройки'
  isLoadingSelector!: Observable<boolean | null>
  noMoreSettingsAvtoparkList!: Observable<boolean | null>
  settingsAvtoparkListSelector!: Observable<SettingAvtopark[] | null | undefined>
  settingsAvtoparkListSub$!: Subscription
  settingsAvtoparkList: SettingAvtopark[] | null | undefined = [];

  noMoreSettingsSkladList!: Observable<boolean | null>
  settingsSkladListSelector!: Observable<SettingSklad[] | null | undefined>
  settingsSkladListSub$!: Subscription
  settingsSkladList: SettingSklad[] | null | undefined = [];


  constructor(private store: Store) { }
  ngOnInit(): void {
    this.initValues();
    this.getSettingsAvtoparkList();
  }

  ngOnDestroy(): void {
    if (this.settingsAvtoparkListSub$) {
      this.settingsAvtoparkListSub$.unsubscribe();
    }

    if (this.settingsSkladListSub$) {
      this.settingsSkladListSub$.unsubscribe();
    }

    // Отчищаем состояние settingsAvtoparkList если не хотим сохранять список авто  в состояние
    this.store.dispatch(settingsAvtoparkListResetAction());

    // Отчищаем состояние settingsSkladList если не хотим сохранять список авто  в состояние
    this.store.dispatch(settingsSkladListResetAction());
  }

  initValues() {
    // Отчищаем состояние settingsAvtoparkList если не хотим сохранять список авто  в состояние
    this.store.dispatch(settingsAvtoparkListResetAction());

     // Отчищаем состояние settingsSkladList если не хотим сохранять список авто  в состояние
     this.store.dispatch(settingsSkladListResetAction());


    // Получаем селектор loader
    this.isLoadingSelector = this.store.pipe(select(isLoadingSelector))


    // Получаем селектор noMoresettingsAvtoparkList
    this.noMoreSettingsAvtoparkList = this.store.pipe(select(noMoreSettingsAvtoparkList))


    // Получаем селектор noMoresettingsSkladList
    this.noMoreSettingsSkladList = this.store.pipe(select(noMoreSettingsSkladList))




    // Получаем селектор на получение списка settingsAvtoparkList и подписываемся на него.
    this.settingsAvtoparkListSelector = this.store.pipe(select(settingsAvtoparkListSelector))
    this.settingsAvtoparkListSub$ = this.settingsAvtoparkListSelector.subscribe({
      next: (settingsAvtoparkList) => {
        if (settingsAvtoparkList) {
          this.settingsAvtoparkList = settingsAvtoparkList;


          if (this.settingsAvtoparkList.length >= this.STEP) {
            // Изменяем значение settingsAvtoparkList в состоянии на false что бы открыть кнопку загрузить ещё
            this.store.dispatch(noMoreSettingsAvtoparkListFalseAction());
          }
          else {
            // Изменяем значение settingsAvtoparkList в состоянии на true что бы скрыть кнопку загрузить ещё
            this.store.dispatch(noMoreSettingsAvtoparkListTrueAction());
          }
        }
      }
    });




    // Получаем селектор на получение списка settingsSkladList и подписываемся на него.
    this.settingsSkladListSelector = this.store.pipe(select(settingsSkladListSelector))
    this.settingsSkladListSub$ = this.settingsSkladListSelector.subscribe({
      next: (settingsSkladList) => {
        if (settingsSkladList) {
          this.settingsSkladList = settingsSkladList;



          if (this.settingsSkladList.length >= this.STEP) {
            // Изменяем значение settingsAvtoparkList в состоянии на false что бы открыть кнопку загрузить ещё
            this.store.dispatch(noMoreSettingsSkladListFalseAction());
          }
          else {
            // Изменяем значение settingsAvtoparkList в состоянии на true что бы скрыть кнопку загрузить ещё
            this.store.dispatch(noMoreSettingsSkladListTrueAction());
          }
        }
      }
    });
  }


  getSettingsAvtoparkList() {
    const params: SettingsParamsFetch = {
      offset: this.offset,
      limit: this.limit,
    };

    // Отправляем запрос на получения списка настроек автопарка
    this.store.dispatch(settingsAvtoparkListAction({ params: params }));

     // Отправляем запрос на получения списка настроек склада
     this.store.dispatch(settingsSkladListAction({ params: params }));
  }


  // Подгружаем настрройку
  loadmore() {
    this.offset += this.STEP;
    this.getSettingsAvtoparkList();
  }


  // Удаление настройку автопарка
  onDeleteSettingsAvtopark(event: Event, setting: any) {
    event.stopPropagation();
    const dicision = window.confirm(`Удалить Настройки автопарка?`);

    if (dicision) {
      this.store.dispatch(settingAvtoparkDeleteAction({ id: setting._id }))
    }
  }


  // Удаление настройку склада
  onDeleteSettingsSklad(event: Event, setting: any) {
    event.stopPropagation();
    const dicision = window.confirm(`Удалить Настройки склада?`);

    if (dicision) {
      this.store.dispatch(settingSkladDeleteAction({ id: setting._id }))
    }
  }
}
