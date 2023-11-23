import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SettingAvtopark, SettingsParamsFetch } from '../../types/settings.interfaces';
import { Store, select } from '@ngrx/store';
import { isLoadingSelector, noMoreSettingsAvtoparkList, settingsAvtoparkListSelector } from '../../store/selectors';
import { noMoreSettingsAvtoparkListFalseAction, noMoreSettingsAvtoparkListTrueAction, settingAvtoparkDeleteAction, settingsAvtoparkListAction, settingsAvtoparkListResetAction } from '../../store/actions/settings.action';

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


  constructor(private store: Store) { }
  ngOnInit(): void {
    this.initValues();
    this.getSettingsAvtoparkList();
  }

  ngOnDestroy(): void {
    if (this.settingsAvtoparkListSub$) {
      this.settingsAvtoparkListSub$.unsubscribe();
    }

    // Отчищаем состояние settingsAvtoparkList если не хотим сохранять список авто  в состояние
    this.store.dispatch(settingsAvtoparkListResetAction());
  }

  initValues() {
    // Отчищаем состояние settingsAvtoparkList если не хотим сохранять список авто  в состояние
    this.store.dispatch(settingsAvtoparkListResetAction());


    // Получаем селектор loader
    this.isLoadingSelector = this.store.pipe(select(isLoadingSelector))


    // Получаем селектор noMoresettingsAvtoparkList
    this.noMoreSettingsAvtoparkList = this.store.pipe(select(noMoreSettingsAvtoparkList))




    // Получаем селектор на получение списка settingsAvtoparkList и подписываемся на него. То есть мы наблюдаем за состоянием и отрисовываем список смен.
    // как только мы подгрузим еще, состояние изменится и соответственно изменится наш список смен
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
  }


  getSettingsAvtoparkList() {
    const params: SettingsParamsFetch = {
      offset: this.offset,
      limit: this.limit,
    };

    // Отправляем запрос на получения списка партнеров
    this.store.dispatch(settingsAvtoparkListAction({ params: params }));
  }


  // Подгружаем партнеров
  loadmore() {
    this.offset += this.STEP;
    this.getSettingsAvtoparkList();
  }


  // Удаление партнера
  onDeleteSettingsAvtopark(event: Event, setting: any) {
    event.stopPropagation();
    const dicision = window.confirm(`Удалить Настройки автопарка?`);

    if (dicision) {
      this.store.dispatch(settingAvtoparkDeleteAction({ id: setting._id }))
    }
  }
}
