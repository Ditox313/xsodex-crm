import {Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, switchMap, tap, concatMap} from 'rxjs/operators'
import {HttpErrorResponse} from '@angular/common/http'
import { MessageService } from 'primeng/api'
import {of} from 'rxjs'
import {Router} from '@angular/router'
import { ClientsFizService } from 'src/app/clients/services/clientsFiz/clientsFiz.service'
import { addClientFizAction, addClientFizFailureAction, addClientFizSuccessAction } from '../../actions/actionsClientsFiz/clientsFiz.action'





@Injectable()
export class ClientsFizEffect {

  
  constructor(
    private actions$: Actions,
    private router: Router,
    private messageService: MessageService, 
    private clientsFiz: ClientsFizService,
  ) {}


  // Создание физического лица
  addClientFiz$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addClientFizAction), 
      switchMap(({ clientFiz, file_1, file_2, file_3, file_4 }) => {
        return this.clientsFiz.create(clientFiz, file_1, file_2, file_3, file_4).pipe(
          map((clientFiz) => {
            this.messageService.add({ severity: 'success', summary: `Клиент создан`, detail: 'Успешно!' });
            this.router.navigate(['/list-clients-fiz']);
            return addClientFizSuccessAction({ clientFiz: clientFiz }); 
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              addClientFizFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );





  // Получение всех партнеров
  // partnersList$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(partnersListAction),
  //     concatMap((params) => {
  //       return this.partners.getAllPartners({ params }).pipe(
  //         concatMap((carsList) => {
  //           if (carsList.length === 0) {
  //             return of(noMorePartnersListAction({ data: true }));
  //           }
  //           return of(partnersListSuccessAction({ data: carsList }));
  //         }),
  //         catchError((errorResponse: HttpErrorResponse) => {
  //           return of(
  //             partnersListFailureAction({ errors: errorResponse.error.errors })
  //           );
  //         })
  //       );
  //     })
  //   )
  // );





  // Удаление партнера
  // carDelete$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(partnerDeleteAction),
  //     switchMap((id) => {
  //       return this.partners.delete(id.id).pipe(
  //         map((id) => {
  //           this.messageService.add({ severity: 'success', summary: `Партнер удален`, detail: 'Успешно!' });
  //           return partnerDeleteSuccessAction({ data: id });
  //         }),
  //         catchError((errorResponse: HttpErrorResponse) => {
  //           this.messageService.add({ severity: 'error', summary: `Ошибка удаления партнера`, detail: 'Попробуйте позже!' });
  //           return of(
  //             partnerDeleteFailureAction({ errors: errorResponse.error.errors })
  //           );
  //         })
  //       );
  //     })
  //   )
  // );





  // Обновление состояния
  // updateStatePartners$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(updateStatePartnersAction),
  //       map(() => {
  //         const savedState: any = localStorage.getItem('appState');
  //         return updateStatePartnersSuccessAction({ data: JSON.parse(savedState) })
  //       }),
  //       catchError((errorResponse: HttpErrorResponse) => {
  //         return of(
  //           updateStatePartnersFailureAction({ errors: 'Ошибка обновления состояния' })
  //         );
  //       })
  //     ),
  // );







  // Получение текущего партнера
  // getPartnerCar$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(partnerGetCurrent),
  //     switchMap((id) => {
  //       return this.partners.getById(id.id).pipe(
  //         map((car) => {
  //           return partnerGetCurrentSuccessAction({ data: car });
  //         }),
  //         catchError((errorResponse: HttpErrorResponse) => {
  //           return of(
  //             partnerGetCurrentFailureAction({ errors: errorResponse.error.errors })
  //           );
  //         })
  //       );
  //     })
  //   )
  // );






  // Обновление партнера
  // UpdatePartner$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(updatePartnerAction),
  //     switchMap(({ partner, file_1, file_2 }) => {
  //       return this.partners.update(partner, file_1, file_2).pipe(
  //         map((data) => {
  //           this.messageService.add({ severity: 'success', summary: `Партнер обновлен`, detail: 'Успешно!' });
  //           return updatePartnerSuccessAction({ data: data });
  //         }),
  //         catchError((errorResponse: HttpErrorResponse) => {
  //           this.messageService.add({ severity: 'error', summary: `Ошибка обновления`, detail: 'Попробуйте еще раз' });
  //           return of(
  //             updateStatePartnersFailureAction({ errors: errorResponse.error.errors })
  //           );
  //         })
  //       );
  //     })
  //   )
  // );




}
