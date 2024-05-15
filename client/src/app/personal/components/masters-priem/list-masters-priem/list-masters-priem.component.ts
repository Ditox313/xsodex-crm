import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';


@Component({
  selector: 'app-list-masters-priem',
  templateUrl: './list-masters-priem.component.html',
  styleUrls: ['./list-masters-priem.component.css']
})
export class ListMastersPriemComponent {
  STEP = 2;
  offset: number = 0;
  limit: number = this.STEP;
  title: string = 'Мастера-приемщики'
  isLoadingSelector!: Observable<boolean | null>
  noMorePartnersList!: Observable<boolean | null>
  // partnersListSelector!: Observable<Partner[] | null | undefined>
  // partnersListSub$!: Subscription
  // partnersList: Partner[] | null | undefined = [];


  constructor(private store: Store) { }
  ngOnInit(): void {
    this.initValues();
    this.getPartnersList();
  }

  ngOnDestroy(): void {
    // if (this.partnersListSub$) {
    //   this.partnersListSub$.unsubscribe();
    // }

    // Отчищаем состояние partnersList если не хотим сохранять список авто  в состояние
    // this.store.dispatch(partnersListResetAction());
  }

  initValues() {
    // Отчищаем состояние перед запросом на получение списка авто
    // this.store.dispatch(partnersListResetAction());


    // Получаем селектор loader
    // this.isLoadingSelector = this.store.pipe(select(isLoadingSelector))


    // Получаем селектор noMorePartnersList
    // this.noMorePartnersList = this.store.pipe(select(noMorePartnersList))




    // Получаем селектор на получение списка партнеров и подписываемся на него. То есть мы наблюдаем за состоянием и отрисовываем список смен.
    // как только мы подгрузим еще, состояние изменится и соответственно изменится наш список смен
    // this.partnersListSelector = this.store.pipe(select(partnersListSelector))
    // this.partnersListSub$ = this.partnersListSelector.subscribe({
    //   next: (partnersList) => {
    //     if (partnersList) {
    //       this.partnersList = partnersList;


    //       if (this.partnersList.length >= this.STEP) {
    //         // Изменяем значение noMorePartnersList в состоянии на false что бы открыть кнопку загрузить ещё
    //         this.store.dispatch(noMorePartnersListFalseAction());
    //       }
    //       else {
    //         // Изменяем значение noMorePartnersList в состоянии на true что бы скрыть кнопку загрузить ещё
    //         this.store.dispatch(noMorePartnersListTrueAction());
    //       }
    //     }
    //   }
    // });
  }


  getPartnersList() {
    // const params: PartnersParamsFetch = {
    //   offset: this.offset,
    //   limit: this.limit,
    // };

    // Отправляем запрос на получения списка партнеров
    // this.store.dispatch(partnersListAction({ params: params }));
  }


  // Подгружаем партнеров
  loadmore() {
    this.offset += this.STEP;
    this.getPartnersList();
  }


  // Удаление партнера
  // onDeletePartner(event: Event, partner: Partner) {
  //   event.stopPropagation();
  //   const dicision = window.confirm(`Удалить Партнера?`);

  //   if (dicision) {
  //     this.store.dispatch(partnerDeleteAction({ id: partner._id }))
  //   }
  // }
}
