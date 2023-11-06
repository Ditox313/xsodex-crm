import {Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, switchMap, tap, concatMap} from 'rxjs/operators'
import {HttpErrorResponse} from '@angular/common/http'
import { MessageService } from 'primeng/api'
import {of} from 'rxjs'
import {Router} from '@angular/router'
import { CarsService } from '../../services/cars.service'
import { addCarAction, addCarFailureAction, addCarSuccessAction, carDeleteAction, carDeleteFailureAction, carDeleteSuccessAction, carGetCurrent, carGetCurrentFailureAction, carGetCurrentSuccessAction, carsListAction, carsListFailureAction, carsListSuccessAction, noMoreCarsListAction, updateCarAction, updateCarFailureAction, updateCarSuccessAction, updateStateCarsAction, updateStateCarsFailureAction, updateStateCarsSuccessAction } from '../actions/cars.action'




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





  // Обновление состояния
  updateStateCars$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateStateCarsAction),
        map(() => {
          const savedState: any = localStorage.getItem('appState');
          return updateStateCarsSuccessAction({ data: JSON.parse(savedState) })
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(
            updateStateCarsFailureAction({ errors: 'Ошибка обновления состояния' })
          );
        })
      ),
  );







  // Получение текущего автомобиля
  getCurrentCar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(carGetCurrent),
      switchMap((id) => {
        return this.cars.getById(id.id).pipe(
          map((car) => {
            return carGetCurrentSuccessAction({ data: car });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              carGetCurrentFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );






  // Обновление автомобиля
  UpdateCar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCarAction),
      switchMap(({ car, avatar }) => {
        return this.cars.update(car, avatar).pipe(
          map((data) => {
            this.messageService.add({ severity: 'success', summary: `Автомобиль обновлен`, detail: 'Успешно!' });
            return updateCarSuccessAction({ data: data });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: `Ошибка обновления`, detail: 'Попробуйте еще раз' });
            return of(
              updateCarFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );




}
