import {  Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { isOpenedSmenaAction, noMoreSmenaListFalseAction, noMoreSmenaListTrueAction, smenaDeleteAction,  smenaListAction, smenaListResetAction } from '../../store/actions/smena.action';
import { Smena, SmenaParamsFetch } from '../../types/smena.interfaces';
import { Observable, Subscription, of } from 'rxjs';
import { isLoadingSelector, isOpenedSmenaSelector, noMoreSmenaList, smenaListSelector } from 'src/app/smena/store/selectors';

@Component({
  selector: 'app-list-smena',
  templateUrl: './list-smena.component.html',
  styleUrls: ['./list-smena.component.css']
})
export class ListSmenaComponent implements OnInit {
  STEP = 25;
  offset: number = 0;
  limit: number = this.STEP;
  title: string = 'Смены'
  isOpenedSmenaSelector!: Observable<Smena | null | undefined>
  isOpenedSmenaSub$!: Subscription
  isOpenedSmena!: Smena | null | undefined
  isLoadingSelector!: Observable<boolean | null>
  noMoreSmenaList!: Observable<boolean | null>
  smenaListSelector!: Observable<Smena[] | null | undefined >
  smenaListSub$!: Subscription
  smenaList: Smena[] | null | undefined = [];
  


  constructor(private store: Store) { }
  ngOnInit(): void {
    this.initValues();
    this.getSmenaList();
  }



  ngOnDestroy(): void {
    if (this.smenaListSub$) {
      this.smenaListSub$.unsubscribe();
    }
    if (this.isOpenedSmenaSub$) {
      this.isOpenedSmenaSub$.unsubscribe();
    }

    // Отчищаем состояние carsList если не хотим сохранять список смен  в состояние
    this.store.dispatch(smenaListResetAction());

  }


  initValues() {
    // Отчищаем состояние перед запросом на получение списка смен
    this.store.dispatch(smenaListResetAction())


    // Отправляем запрос на получение открытой смены
    this.store.dispatch(isOpenedSmenaAction())


    // Получаем селектор loader
    this.isLoadingSelector = this.store.pipe(select(isLoadingSelector))


    // Получаем селектор noMoreSmenaList
    this.noMoreSmenaList = this.store.pipe(select(noMoreSmenaList))


    // Получаем селектор  открытой смены
    this.isOpenedSmenaSelector = this.store.pipe(select(isOpenedSmenaSelector))
    this.isOpenedSmenaSub$ = this.isOpenedSmenaSelector.subscribe({
      next: (isOpenedSmena) => {
        this.isOpenedSmena = isOpenedSmena
      }
    })
    

    // Получаем селектор на получение списка смен и подписываемся на него. То есть мы наблюдаем за состоянием и отрисовываем список смен.
    // как только мы подгрузим еще, состояние изменится и соответственно изменится наш список смен
    this.smenaListSelector = this.store.pipe(select(smenaListSelector))
    this.smenaListSub$ = this.smenaListSelector.subscribe({
      next: (smenaList) => {
        if (smenaList) {
          this.smenaList = smenaList;
          if (this.smenaList.length >= this.STEP)
          {
            // Изменяем значение noMoreSmenaList в состоянии на false что бы открыть кнопку загрузить ещё
            this.store.dispatch(noMoreSmenaListFalseAction());
          }
          else{
            // Изменяем значение noMoreSmenaList в состоянии на true что бы скрыть кнопку загрузить ещё
            this.store.dispatch(noMoreSmenaListTrueAction());
          }
        }
      }
    });
  }



  getSmenaList() {
    const params: SmenaParamsFetch = {
      offset: this.offset,
      limit: this.limit,
    };

    // Отправляем запрос на получения списка смен
    this.store.dispatch(smenaListAction({ params: params }));
  }



  // Подгружаем смены
  loadmore() {
    this.offset += this.STEP;
    this.getSmenaList();
  }



  // Удаление смены
  onDeleteSmena(event: Event, smena: Smena) {
    event.stopPropagation();
    const dicision = window.confirm(`Удалить Смену?`);

    if (dicision) {
      this.store.dispatch(smenaDeleteAction({ id: smena._id }))
    }
  }
}
