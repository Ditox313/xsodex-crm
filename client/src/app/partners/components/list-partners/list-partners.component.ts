import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Partner } from '../../types/partners.interfaces';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-list-partners',
  templateUrl: './list-partners.component.html',
  styleUrls: ['./list-partners.component.css']
})
export class ListPartnersComponent implements OnInit, OnDestroy {
  STEP = 2;
  offset: number = 0;
  limit: number = this.STEP;
  title: string = 'Партнеры'
  isLoadingSelector!: Observable<boolean | null>
  noMorePartnersList!: Observable<boolean | null>
  // carsListSelector!: Observable<Car[] | null | undefined>
  partnersListSub$!: Subscription
  partnersList: Partner[] | null | undefined = [];


  constructor(private store: Store) { }
  ngOnInit(): void {
    // this.initValues();
    // this.getSmenaList();
  }

  ngOnDestroy(): void {
    // if (this.carsListSub$) {
    //   this.carsListSub$.unsubscribe();
    // }

    // Отчищаем состояние carsList если не хотим сохранять список авто  в состояние
    // this.store.dispatch(carsListResetAction());
  }

  initValues() {
    // Отчищаем состояние перед запросом на получение списка авто
    // this.store.dispatch(carsListResetAction());


    // Получаем селектор loader
    // this.isLoadingSelector = this.store.pipe(select(isLoadingSelector))


    // Получаем селектор noMoreSmenaList
    // this.noMoreCarsList = this.store.pipe(select(noMoreCarsList))




    // Получаем селектор на получение списка смен и подписываемся на него. То есть мы наблюдаем за состоянием и отрисовываем список смен.
    // как только мы подгрузим еще, состояние изменится и соответственно изменится наш список смен
    // this.carsListSelector = this.store.pipe(select(carsListSelector))
    // this.carsListSub$ = this.carsListSelector.subscribe({
    //   next: (carsList) => {
    //     if (carsList) {
    //       this.carsList = carsList;


    //       if (this.carsList.length >= this.STEP) {
    //         // Изменяем значение noMoreCarsList в состоянии на false что бы открыть кнопку загрузить ещё
    //         this.store.dispatch(noMoreCarsListFalseAction());
    //       }
    //       else {
    //         // Изменяем значение noMoreCarsList в состоянии на true что бы скрыть кнопку загрузить ещё
    //         this.store.dispatch(noMoreCarsListTrueAction());
    //       }
    //     }
    //   }
    // });
  }


  getSmenaList() {
    // const params: CarsParamsFetch = {
    //   offset: this.offset,
    //   limit: this.limit,
    // };

    // Отправляем запрос на получения списка смен
    // this.store.dispatch(carsListAction({ params: params }));
  }


  // Подгружаем партнеров
  loadmore() {
    this.offset += this.STEP;
    this.getSmenaList();
  }


  // Удаление партнера
  onDeletePartnrer(event: Event, partner: Partner) {
    event.stopPropagation();
    const dicision = window.confirm(`Удалить Партнера?`);

    if (dicision) {
      // this.store.dispatch(carDeleteAction({ id: car._id }))
    }
  }
}
