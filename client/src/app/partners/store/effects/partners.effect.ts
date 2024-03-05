import {Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, switchMap, tap, concatMap} from 'rxjs/operators'
import {HttpErrorResponse} from '@angular/common/http'
import { MessageService } from 'primeng/api'
import {of} from 'rxjs'
import {Router} from '@angular/router'
import { addPartnerAction, addPartnerFailureAction, addPartnerSuccessAction, noMorePartnersListAction, partnerDeleteAction, partnerDeleteFailureAction, partnerDeleteSuccessAction, partnerGetCurrent, partnerGetCurrentFailureAction, partnerGetCurrentSuccessAction, partnersListAction, partnersListFailureAction, partnersListNoParamsAction, partnersListNoParamsFailureAction, partnersListNoParamsSuccessAction, partnersListSuccessAction, updatePartnerAction, updatePartnerFailureAction, updatePartnerSuccessAction, updateStatePartnersAction, updateStatePartnersFailureAction, updateStatePartnersSuccessAction } from '../actions/partners.action'
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
  // addPartner$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(addPartnerAction), 
  //     switchMap(({ partner, file_1, file_2 }) => {
  //       return this.partners.create(partner, file_1, file_2).pipe(
  //         map((partner) => {
  //           this.messageService.add({ severity: 'success', summary: `Партнер создан`, detail: 'Успешно!' });
  //           this.router.navigate(['/list-partners']);
  //           return addPartnerSuccessAction({ partner: partner }); 
  //         }),
  //         catchError((errorResponse: HttpErrorResponse) => {
  //           return of(
  //             addPartnerFailureAction({ errors: errorResponse.error.errors })
  //           );
  //         })
  //       );
  //     })
  //   )
  // );






  addPartner$ = createEffect(() =>
  this.actions$.pipe(
    ofType(addPartnerAction), 
    switchMap(({ partner, files }) => {
      return this.partners.create(partner, files).pipe(
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
          concatMap((partnersList) => {
            if (partnersList.length === 0) {
              return of(noMorePartnersListAction({ data: true }));
            }
            return of(partnersListSuccessAction({ data: partnersList }));
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







  // Получение текущего партнера
  getPartnerCar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(partnerGetCurrent),
      switchMap((id) => {
        return this.partners.getById(id.id).pipe(
          map((car) => {
            return partnerGetCurrentSuccessAction({ data: car });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              partnerGetCurrentFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );






  // Обновление партнера
  UpdatePartner$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePartnerAction),
      switchMap(({ partner, file_1, file_2 }) => {
        return this.partners.update(partner, file_1, file_2).pipe(
          map((data) => {
            this.messageService.add({ severity: 'success', summary: `Партнер обновлен`, detail: 'Успешно!' });
            return updatePartnerSuccessAction({ data: data });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: `Ошибка обновления`, detail: 'Попробуйте еще раз' });
            return of(
              updatePartnerFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );





  // Получение всех партнеров без параметров
  partnersNoParamsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(partnersListNoParamsAction),
      concatMap((params) => {
        return this.partners.getAllPartnersNoParams().pipe(
          concatMap((partnersList) => {
            return of(partnersListNoParamsSuccessAction({ data: partnersList }));
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              partnersListNoParamsFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );




}
