import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Car, CarsParamsFetch } from '../../types/cars.interfaces';
import { carsListSelector, isLoadingSelector } from '../../store/selectors';
import { carsListAction, carsListResetAction } from '../../store/actions/cars.action';

@Component({
  selector: 'app-list-cars',
  templateUrl: './list-cars.component.html',
  styleUrls: ['./list-cars.component.css']
})
export class ListCarsComponent implements OnInit {
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
    this.getSmenaList();
  }



  ngOnDestroy(): void {
    if (this.carsListSub$) {
      this.carsListSub$.unsubscribe();
    }

    // Отчищаем состояние smenaList перед началом работы компонента
    this.store.dispatch(carsListResetAction());

  }


  initValues() {
    // Получаем селектор loader
    this.isLoadingSelector = this.store.pipe(select(isLoadingSelector))


    // Получаем селектор noMoreSmenaList
    // this.noMoreSmenaList = this.store.pipe(select(noMoreSmenaList))


    // Получаем селектор на получение списка смен и подписываемся на него. То есть мы наблюдаем за состоянием и отрисовываем список смен.
    // как только мы подгрузим еще, состояние изменится и соответственно изменится наш список смен
    this.carsListSelector = this.store.pipe(select(carsListSelector))
    this.carsListSub$ = this.carsListSelector.subscribe({
      next: (smenaList) => {
        if (smenaList) {
          this.carsList = smenaList;
          console.log(this.carsList);
          

          if (this.carsList.length >= this.STEP) {
            // Изменяем значение noMoreSmenaList в состоянии на false что бы открыть кнопку загрузить ещё
            // this.store.dispatch(noMoreSmenaListFalseAction());
          }
          else {
            // Изменяем значение noMoreSmenaList в состоянии на true что бы скрыть кнопку загрузить ещё
            // this.store.dispatch(noMoreSmenaListTrueAction());
          }
        }
      }
    });
  }



  getSmenaList() {
    const params: CarsParamsFetch = {
      offset: this.offset,
      limit: this.limit,
    };

    // Отправляем запрос на получения списка смен
    this.store.dispatch(carsListAction({ params: params }));
  }



  // Подгружаем смены
  loadmore() {
    this.offset += this.STEP;
    this.getSmenaList();
  }



  // Удаление смены
  onDeleteSmena(event: Event, smena: Car) {
    event.stopPropagation();
    const dicision = window.confirm(`Удалить Смену?`);

    // if (dicision) {
    //   this.store.dispatch(smenaDeleteAction({ id: smena._id }))
    // }
  }
}
