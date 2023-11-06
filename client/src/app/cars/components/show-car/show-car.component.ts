import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Car } from '../../types/cars.interfaces';

@Component({
  selector: 'app-show-car',
  templateUrl: './show-car.component.html',
  styleUrls: ['./show-car.component.css']
})
export class ShowCarComponent implements OnInit, OnDestroy {
  title: string = 'Просмотр автомобиля'
  getParamsSub$!: Subscription
  isLoadingSelector!: Observable<boolean | null>
  currentCarSelector!: Observable<Car | null | undefined>
  currentCarSub$!: Subscription
  currentCar!: Car | null | undefined
  carId!: string



  constructor(
    private store: Store,
    private rote: ActivatedRoute,
    private datePipe: DatePipe,
  ) { }


  ngOnInit(): void {
    // this.getParams()
    // this.initValues()
  }

  ngOnDestroy(): void {
    // if (this.getParamsSub$) {
    //   this.getParamsSub$.unsubscribe()
    // }
    // if (this.currentSmemaSub$) {
    //   this.currentSmemaSub$.unsubscribe()
    // }

    // // Отчищаем состояние currentSmena
    // this.store.dispatch(smenaGetCurrentReset());

  }
}
