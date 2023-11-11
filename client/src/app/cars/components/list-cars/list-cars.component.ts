import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Car, CarsParamsFetch } from '../../types/cars.interfaces';
import { carsListSelector, isLoadingSelector, noMoreCarsList } from '../../store/selectors';
import { carDeleteAction, carsListAction, carsListResetAction, noMoreCarsListFalseAction, noMoreCarsListTrueAction } from '../../store/actions/cars.action';

@Component({
  selector: 'app-list-cars',
  templateUrl: './list-cars.component.html',
  styleUrls: ['./list-cars.component.css']
})
export class ListCarsComponent implements OnInit, OnDestroy {
  STEP = 2;
  offset: number = 0;
  limit: number = this.STEP;
  title: string = 'Автопарк'
  isLoadingSelector!: Observable<boolean | null>
  noMoreCarsList!: Observable<boolean | null>
  carsListSelector!: Observable<Car[] | null | undefined>
  carsListSub$!: Subscription
  carsList: Car[] | null | undefined = [];



  constructor(private store: Store) { }
  ngOnInit(): void {
    this.initValues();
    this.getCarsList();
  }



  ngOnDestroy(): void {
    if (this.carsListSub$) {
      this.carsListSub$.unsubscribe();
    }

    // Отчищаем состояние carsList если не хотим сохранять список авто  в состояние
    this.store.dispatch(carsListResetAction());

  }


  initValues() {
    // Отчищаем состояние перед запросом на получение списка авто
    this.store.dispatch(carsListResetAction());


    // Получаем селектор loader
    this.isLoadingSelector = this.store.pipe(select(isLoadingSelector))


    // Получаем селектор noMoreSmenaList
    this.noMoreCarsList = this.store.pipe(select(noMoreCarsList))

    


    // Получаем селектор на получение списка смен и подписываемся на него. То есть мы наблюдаем за состоянием и отрисовываем список смен.
    // как только мы подгрузим еще, состояние изменится и соответственно изменится наш список смен
    this.carsListSelector = this.store.pipe(select(carsListSelector))
    this.carsListSub$ = this.carsListSelector.subscribe({
      next: (carsList) => {
        if (carsList) {
          this.carsList = carsList;
          

          if (this.carsList.length >= this.STEP) {
            // Изменяем значение noMoreCarsList в состоянии на false что бы открыть кнопку загрузить ещё
            this.store.dispatch(noMoreCarsListFalseAction());
          }
          else {
            // Изменяем значение noMoreCarsList в состоянии на true что бы скрыть кнопку загрузить ещё
            this.store.dispatch(noMoreCarsListTrueAction());
          }
        }
      }
    });
  }



  getCarsList() {
    const params: CarsParamsFetch = {
      offset: this.offset,
      limit: this.limit,
    };

    // Отправляем запрос на получения списка смен
    this.store.dispatch(carsListAction({ params: params }));
  }



  // Подгружаем автомобили
  loadmore() {
    this.offset += this.STEP;
    this.getCarsList();
  }



  // Удаление автомобиля
  onDeleteCar(event: Event, car: Car) {
    event.stopPropagation();
    const dicision = window.confirm(`Удалить Автомобиль?`);

    if (dicision) {
      this.store.dispatch(carDeleteAction({ id: car._id }))
    }
  }
}
