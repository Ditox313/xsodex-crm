import {Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, switchMap, tap, concatMap} from 'rxjs/operators'
import {HttpErrorResponse} from '@angular/common/http'
import { MessageService } from 'primeng/api'
import {of} from 'rxjs'
import {Router} from '@angular/router'
import { CarsService } from '../../services/cars.service'
import { addCarAction, addCarFailureAction, addCarSuccessAction, carDeleteAction, carDeleteFailureAction, carDeleteSuccessAction, carsListAction, carsListFailureAction, carsListSuccessAction, noMoreCarsListAction } from '../actions/cars.action'




@Injectable()
export class CarsEffect {

  
  constructor(
    private actions$: Actions,
    private router: Router,
    private messageService: MessageService, 
    private cars: CarsService,
  ) {}


  // Создание авто
  addCar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCarAction), 
      switchMap(({ car, avatar }) => {
        return this.cars.create(car, avatar).pipe(
          map((car) => {
            this.messageService.add({ severity: 'success', summary: `Автомобиль создан`, detail: 'Успешно!' });
            this.router.navigate(['/list-cars']);
            return addCarSuccessAction({ car: car }); 
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              addCarFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );





  // Получение всех авто
  carsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(carsListAction),
      concatMap((params) => {
        return this.cars.getAllCars({ params }).pipe(
          concatMap((carsList) => {
            if (carsList.length === 0) {
              return of(noMoreCarsListAction({ data: true }));
            }
            return of(carsListSuccessAction({ data: carsList }));
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              carsListFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );





  // Удаление автомобиля
  carDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(carDeleteAction),
      switchMap((id) => {
        return this.cars.delete(id.id).pipe(
          map((id) => {
            this.messageService.add({ severity: 'success', summary: `Автомобиль удален`, detail: 'Успешно!' });
            return carDeleteSuccessAction({ data: id });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: `Ошибка удаления смены`, detail: 'Попробуйте позже!' });
            return of(
              carDeleteFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );




}
