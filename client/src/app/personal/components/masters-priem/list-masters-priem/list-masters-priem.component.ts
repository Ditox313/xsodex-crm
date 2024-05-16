import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { MasterPriem, MastersPriemParamsFetch } from 'src/app/personal/types/masters-priem.interfaces';
import { isLoadingSelector, mastersPriemListSelector, noMoreMastersPriemList } from 'src/app/personal/store/selectors';
import { masterPriemDeleteAction, mastersPriemListAction, mastersPriemListResetAction, noMoreMastersPriemListFalseAction, noMoreMastersPriemListTrueAction } from 'src/app/personal/store/actions/masters-priem.action';


@Component({
  selector: 'app-list-masters-priem',
  templateUrl: './list-masters-priem.component.html',
  styleUrls: ['./list-masters-priem.component.css']
})
export class ListMastersPriemComponent {
  STEP = 30;
  offset: number = 0;
  limit: number = this.STEP;
  title: string = 'Мастера-приемщики'
  isLoadingSelector!: Observable<boolean | null>
  noMoreMastersPriemList!: Observable<boolean | null>
  mastersPriemSelector!: Observable<MasterPriem[] | null | undefined>
  mastersPriemListSub$!: Subscription
  mastersPriemList: MasterPriem[] | null | undefined = [];


  constructor(private store: Store) { }
  ngOnInit(): void {
    this.initValues();
    this.getMastersPriemList();
  }

  ngOnDestroy(): void {
    if (this.mastersPriemListSub$) {
      this.mastersPriemListSub$.unsubscribe();
    }

    // Отчищаем состояние  если не хотим сохранять список авто  в состояние
    this.store.dispatch(mastersPriemListResetAction());
  }

  initValues() {
    // Отчищаем состояние перед запросом на получение списка авто
    this.store.dispatch(mastersPriemListResetAction());


    // Получаем селектор loader
    this.isLoadingSelector = this.store.pipe(select(isLoadingSelector))


    // Получаем селектор noMorePartnersList
    this.noMoreMastersPriemList = this.store.pipe(select(noMoreMastersPriemList))



   
    // Получаем селектор на получение списка мастеров приемщиков и подписываемся на него. То есть мы наблюдаем за состоянием и отрисовываем список смен.
    // как только мы подгрузим еще, состояние изменится и соответственно изменится наш список смен
    this.mastersPriemSelector = this.store.pipe(select(mastersPriemListSelector))
    this.mastersPriemListSub$ = this.mastersPriemSelector.subscribe({
      next: (mastersPriemList) => {
        
        if (mastersPriemList) {
          this.mastersPriemList = mastersPriemList;
          


          if (this.mastersPriemList.length >= this.STEP) {
            // Изменяем значение noMorePartnersList в состоянии на false что бы открыть кнопку загрузить ещё
            this.store.dispatch(noMoreMastersPriemListFalseAction());
          }
          else {
            // Изменяем значение noMorePartnersList в состоянии на true что бы скрыть кнопку загрузить ещё
            this.store.dispatch(noMoreMastersPriemListTrueAction());
          }
        }
      }
    });
  }


  getMastersPriemList() {
    const params: MastersPriemParamsFetch = {
      offset: this.offset,
      limit: this.limit,
    };

    // Отправляем запрос на получения списка мастеров приемщиков
    this.store.dispatch(mastersPriemListAction({ params: params }));
  }


  // Подгружаем мастеров приемщиков
  loadmore() {
    this.offset += this.STEP;
    this.getMastersPriemList();
  }


  // Удаление мастера приемщика
  onDeleteMasterPriem(event: Event, masterPriem: MasterPriem) {
    event.stopPropagation();
    const dicision = window.confirm(`Удалить Мастера приемщика?`);

    if (dicision) {
      this.store.dispatch(masterPriemDeleteAction({ id: masterPriem._id }))
    }
  }
}
