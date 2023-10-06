import {  Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { isOpenedSmenaAction, smenaDeleteAction, smenaListAction, smenaListResetAction } from '../../store/actions/smena.action';
import { Smena, SmenaParamsFetch } from '../../types/smena.interfaces';
import { BehaviorSubject, Observable, Subscription, of } from 'rxjs';
import { isLoadingSelector, isOpenedSmenaSelector, smenaListSelector } from 'src/app/smena/store/selectors';

@Component({
  selector: 'app-list-smena',
  templateUrl: './list-smena.component.html',
  styleUrls: ['./list-smena.component.css']
})
export class ListSmenaComponent implements OnInit {
  STEP = 5;
  title: string = 'Смены'
  isOpenedSmenaSelector!: Observable<Smena | null | undefined>
  isOpenedSmenaSub$!: Subscription
  isOpenedSmena!: Smena | null | undefined
  isLoadingSelector!: Observable<boolean | null>
  smenaListSelector!: Observable<Smena[] | null | undefined >
  smenaListSub$!: Subscription
  smenaList: Smena[] | null | undefined = [];
  offset: number = 0;
  limit: number = this.STEP;
  noMoreSmenaList: Boolean = false;



  


  constructor(private store: Store) { }
  ngOnInit(): void {
    this.initValues();
    this.getSmenaList();
  }



  ngOnDestroy(): void {
    if (this.smenaListSub$) {
      this.smenaListSub$.unsubscribe();
    }

    // Отчищаем состояние smenaList перед началом работы компонента
    this.store.dispatch(smenaListResetAction());
  }


  initValues() {
    // Отправляем запрос на получение открытой смены
    this.store.dispatch(isOpenedSmenaAction())


    // Получаем селектор loader
    this.isLoadingSelector = this.store.pipe(select(isLoadingSelector))


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
          this.smenaList = this.smenaList?.concat(smenaList);
          if(smenaList.length < this.STEP)
          {
            this.noMoreSmenaList = true
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

      if (this.smenaList)
      {
        const idxPos = this.smenaList.findIndex((p) => p._id === smena._id);
        this.smenaList.splice(idxPos, 1);
      }
    }
  }

}
