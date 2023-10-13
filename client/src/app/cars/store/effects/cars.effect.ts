import {Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, switchMap, tap, concatMap} from 'rxjs/operators'
import {HttpErrorResponse} from '@angular/common/http'
import { MessageService } from 'primeng/api'
import {of} from 'rxjs'
import {Router} from '@angular/router'
import { CarsService } from '../../services/cars.service'
import { addCarAction, addCarFailureAction, addCarSuccessAction, carsListAction, carsListFailureAction, carsListSuccessAction } from '../actions/cars.action'




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
        return this.cars.getAllSmena({ params }).pipe(
          concatMap((carsList) => {
            // if (smenaList.length === 0) {
            //   return of(noMoreSmenaListAction({ data: true }));
            // }
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




}
