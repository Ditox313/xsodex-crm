import {Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, switchMap, tap, concatMap} from 'rxjs/operators'
import {HttpErrorResponse} from '@angular/common/http'
import { MessageService } from 'primeng/api'
import {of} from 'rxjs'
import {Router} from '@angular/router'
import { addPartnerAction, addPartnerFailureAction, addPartnerSuccessAction, noMorePartnersListAction, partnerDeleteAction, partnerDeleteFailureAction, partnerDeleteSuccessAction, partnersListAction, partnersListFailureAction, partnersListSuccessAction, updateStatePartnersAction, updateStatePartnersFailureAction, updateStatePartnersSuccessAction } from '../actions/partners.action'
import { PartnersService } from '../../services/partners.service'




@Injectable()
export class PartnersEffect {

  
  constructor(
    private actions$: Actions,
    private router: Router,
    private messageService: MessageService, 
    private partners: PartnersService,
  ) {}


  // Создание партнера
  addPartner$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addPartnerAction), 
      switchMap(({ partner, file_1, file_2 }) => {
        return this.partners.create(partner, file_1, file_2).pipe(
          map((partner) => {
            this.messageService.add({ severity: 'success', summary: `Партнер создан`, detail: 'Успешно!' });
            this.router.navigate(['/list-partners']);
            return addPartnerSuccessAction({ partner: partner }); 
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              addPartnerFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );





  // Получение всех партнеров
  partnersList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(partnersListAction),
      concatMap((params) => {
        return this.partners.getAllPartners({ params }).pipe(
          concatMap((carsList) => {
            if (carsList.length === 0) {
              return of(noMorePartnersListAction({ data: true }));
            }
            return of(partnersListSuccessAction({ data: carsList }));
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              partnersListFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );





  // Удаление партнера
  carDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(partnerDeleteAction),
      switchMap((id) => {
        return this.partners.delete(id.id).pipe(
          map((id) => {
            this.messageService.add({ severity: 'success', summary: `Партнер удален`, detail: 'Успешно!' });
            return partnerDeleteSuccessAction({ data: id });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: `Ошибка удаления партнера`, detail: 'Попробуйте позже!' });
            return of(
              partnerDeleteFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );





  // Обновление состояния
  updateStatePartners$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateStatePartnersAction),
        map(() => {
          const savedState: any = localStorage.getItem('appState');
          return updateStatePartnersSuccessAction({ data: JSON.parse(savedState) })
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(
            updateStatePartnersFailureAction({ errors: 'Ошибка обновления состояния' })
          );
        })
      ),
  );







  // Получение текущего автомобиля
  // getCurrentCar$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(carGetCurrent),
  //     switchMap((id) => {
  //       return this.cars.getById(id.id).pipe(
  //         map((car) => {
  //           return carGetCurrentSuccessAction({ data: car });
  //         }),
  //         catchError((errorResponse: HttpErrorResponse) => {
  //           return of(
  //             carGetCurrentFailureAction({ errors: errorResponse.error.errors })
  //           );
  //         })
  //       );
  //     })
  //   )
  // );






  // Обновление автомобиля
  // UpdateCar$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(updateCarAction),
  //     switchMap(({ car, avatar }) => {
  //       return this.cars.update(car, avatar).pipe(
  //         map((data) => {
  //           this.messageService.add({ severity: 'success', summary: `Автомобиль обновлен`, detail: 'Успешно!' });
  //           return updateCarSuccessAction({ data: data });
  //         }),
  //         catchError((errorResponse: HttpErrorResponse) => {
  //           this.messageService.add({ severity: 'error', summary: `Ошибка обновления`, detail: 'Попробуйте еще раз' });
  //           return of(
  //             updateCarFailureAction({ errors: errorResponse.error.errors })
  //           );
  //         })
  //       );
  //     })
  //   )
  // );




}
