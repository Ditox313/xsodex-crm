import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SettingAvtopark, SettingGlobal, SettingSklad, SettingsParamsFetch } from '../../types/settings.interfaces';
import { Store, select } from '@ngrx/store';
import { isLoadingSelector, noMoreSettingsAvtoparkList, noMoreSettingsGlobalList, noMoreSettingsSkladList, settingsAvtoparkListSelector, settingsGlobalListSelector, settingsSkladListSelector } from '../../store/selectors';
import { noMoreSettingsAvtoparkListFalseAction, noMoreSettingsAvtoparkListTrueAction, noMoreSettingsGlobalListFalseAction, noMoreSettingsGlobalListTrueAction, noMoreSettingsSkladListFalseAction, noMoreSettingsSkladListTrueAction, settingAvtoparkDeleteAction, settingGlobalDeleteAction, settingsAvtoparkListAction, settingsAvtoparkListResetAction, settingsGlobalListAction, settingsGlobalListResetAction, settingSkladDeleteAction, settingsSkladListAction, settingsSkladListResetAction } from '../../store/actions/settings.action';

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



  noMoreSettingsGlobalList!: Observable<boolean | null>
  settingsGlobalListSelector!: Observable<SettingGlobal[] | null | undefined>
  settingsGlobalListSub$!: Subscription
  settingsGlobalList: SettingGlobal[] | null | undefined = [];


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

    if (this.settingsGlobalListSub$) {
      this.settingsGlobalListSub$.unsubscribe();
    }


    // Отчищаем состояние settingsAvtoparkList если не хотим сохранять список авто  в состояние
    this.store.dispatch(settingsAvtoparkListResetAction());

    // Отчищаем состояние settingsSkladList если не хотим сохранять список авто  в состояние
    this.store.dispatch(settingsSkladListResetAction());

    // Отчищаем состояние settingsGlobalList если не хотим сохранять список авто  в состояние
    this.store.dispatch(settingsGlobalListResetAction());
  }

  initValues() {
    // Отчищаем состояние settingsAvtoparkList если не хотим сохранять список авто  в состояние
    this.store.dispatch(settingsAvtoparkListResetAction());

     // Отчищаем состояние settingsSkladList если не хотим сохранять список авто  в состояние
     this.store.dispatch(settingsSkladListResetAction());

    // Отчищаем состояние settingsGlobalList если не хотим сохранять список авто  в состояние
    this.store.dispatch(settingsGlobalListResetAction());


    // Получаем селектор loader
    this.isLoadingSelector = this.store.pipe(select(isLoadingSelector))


    // Получаем селектор noMoresettingsAvtoparkList
    this.noMoreSettingsAvtoparkList = this.store.pipe(select(noMoreSettingsAvtoparkList))


    // Получаем селектор noMoresettingsSkladList
    this.noMoreSettingsSkladList = this.store.pipe(select(noMoreSettingsSkladList))


    // Получаем селектор noMoresettingsGlobalList
    this.noMoreSettingsGlobalList = this.store.pipe(select(noMoreSettingsGlobalList))




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



    // Получаем селектор на получение списка settingsGlobalList и подписываемся на него.
    this.settingsGlobalListSelector = this.store.pipe(select(settingsGlobalListSelector))
    this.settingsGlobalListSub$ = this.settingsGlobalListSelector.subscribe({
      next: (settingsGlobalList) => {
        if (settingsGlobalList) {
          this.settingsGlobalList = settingsGlobalList;



          if (this.settingsGlobalList.length >= this.STEP) {
            // Изменяем значение settingsAvtoparkList в состоянии на false что бы открыть кнопку загрузить ещё
            this.store.dispatch(noMoreSettingsGlobalListFalseAction());
          }
          else {
            // Изменяем значение settingsAvtoparkList в состоянии на true что бы скрыть кнопку загрузить ещё
            this.store.dispatch(noMoreSettingsGlobalListTrueAction());
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

    // Отправляем запрос на получения списка настроек глобальных
    this.store.dispatch(settingsGlobalListAction({ params: params }));
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


   // Удаление настроек общих
   onDeleteSettingsGlobal(event: Event, setting: any) {
    event.stopPropagation();
    const dicision = window.confirm(`Удалить Настройки общие?`);

    if (dicision) {
      this.store.dispatch(settingGlobalDeleteAction({ id: setting._id }))
    }
  }
}
