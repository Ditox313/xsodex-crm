import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { isLoadingSelector } from 'src/app/clients/store/selectors/selectorsClientsFiz';
import { ClientFiz } from 'src/app/clients/types/clientsFiz/clientsFiz.interfaces';

@Component({
  selector: 'app-list-clients-fiz',
  templateUrl: './list-clients-fiz.component.html',
  styleUrls: ['./list-clients-fiz.component.css']
})
export class ListClientsFizComponent {
  STEP = 2;
  offset: number = 0;
  limit: number = this.STEP;
  title: string = 'Клиенты - физические лица'
  isLoadingSelector!: Observable<boolean | null>
  noMoreClientsFizList!: Observable<boolean | null>
  clientsFizListSelector!: Observable<ClientFiz[] | null | undefined>
  clientsFizListSub$!: Subscription
  clientsFizList: ClientFiz[] | null | undefined = [];


  constructor(private store: Store) { }
  ngOnInit(): void {
    this.initValues();
    this.getPartnersList();
  }

  ngOnDestroy(): void {
    if (this.clientsFizListSub$) {
      this.clientsFizListSub$.unsubscribe();
    }

    // Отчищаем состояние partnersList если не хотим сохранять список авто  в состояние
    // this.store.dispatch(partnersListResetAction());
  }

  initValues() {
    // Отчищаем состояние перед запросом на получение списка авто
    // this.store.dispatch(partnersListResetAction());


    // Получаем селектор loader
    this.isLoadingSelector = this.store.pipe(select(isLoadingSelector))


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

    // Отправляем запрос на получения списка смен
    // this.store.dispatch(partnersListAction({ params: params }));
  }


  // Подгружаем партнеров
  loadmore() {
    this.offset += this.STEP;
    this.getPartnersList();
  }


  // Удаление партнера
  onDeleteClientFiz(event: Event, partner: ClientFiz) {
    event.stopPropagation();
    const dicision = window.confirm(`Удалить клиента?`);

    if (dicision) {
      // this.store.dispatch(partnerDeleteAction({ id: partner._id }))
    }
  }
}
