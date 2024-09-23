import {Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, switchMap, tap, concatMap} from 'rxjs/operators'
import {HttpErrorResponse} from '@angular/common/http'
import { MessageService } from 'primeng/api'
import {of} from 'rxjs'
import {Router} from '@angular/router'
import { SettingsService } from '../../services/settings.service'
import {addSettingAvtoparkAction, addSettingAvtoparkFailureAction, addSettingAvtoparkSuccessAction, addSettingSkladFailureAction, addSettingSkladkAction, addSettingSkladSuccessAction, noMoreSettingsAvtoparkListAction, noMoreSettingsSkladListAction, settingAvtoparkDeleteAction, settingAvtoparkDeleteFailureAction, settingAvtoparkDeleteSuccessAction, settingsAvtoparkGetCurrent, settingsAvtoparkGetCurrentFailureAction, settingsAvtoparkGetCurrentSuccessAction, settingsAvtoparkListAction, settingsAvtoparkListFailureAction, settingsAvtoparkListSuccessAction, settingsSkladGetCurrent, settingsSkladGetCurrentFailureAction, settingsSkladGetCurrentSuccessAction, settingsSkladListAction, settingsSkladListFailureAction, settingsSkladListSuccessAction, updateSettingsAvtoparkAction, updateSettingsAvtoparkFailureAction, updateSettingsAvtoparkSuccessAction, updateSettingsSkladAction, updateSettingsSkladFailureAction, updateSettingsSkladSuccessAction, updateStateSettingsAction, updateStateSettingsFailureAction, updateStateSettingsSuccessAction } from '../actions/settings.action'




@Injectable()
export class SettingsEffect {

  
  constructor(
    private actions$: Actions,
    private router: Router,
    private messageService: MessageService, 
    private settings: SettingsService,
  ) {}


  // Создание настройки автопарка
  addSetting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addSettingAvtoparkAction), 
      switchMap(({ setting }) => {
        return this.settings.create_setting_avtopark(setting).pipe(
          map((setting) => {
            this.messageService.add({ severity: 'success', summary: `Настройки для автопарка создана`, detail: 'Успешно!' });
            this.router.navigate(['/list-settings']);
            return addSettingAvtoparkSuccessAction(); 
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              addSettingAvtoparkFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );



  
  // Создание настройки склада
  addSettingSklad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addSettingSkladkAction), 
      switchMap(({ setting }) => {
        return this.settings.create_setting_sklad(setting).pipe(
          map((setting) => {
            this.messageService.add({ severity: 'success', summary: `Настройки для склада создана`, detail: 'Успешно!' });
            this.router.navigate(['/list-settings']);
            return addSettingSkladSuccessAction(); 
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              addSettingSkladFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );





  // Получение списка настрокт автопарка
  settingsAvtoparkList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(settingsAvtoparkListAction),
      concatMap((params) => {
        return this.settings.getAllSettingsAvtopark({ params }).pipe(
          concatMap((settingsAvtoparkList) => {
            if (settingsAvtoparkList.length === 0) {
              return of(noMoreSettingsAvtoparkListAction({ data: true }));
            }
            return of(settingsAvtoparkListSuccessAction({ data: settingsAvtoparkList }));
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              settingsAvtoparkListFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );








  // Получение списка настрокт склада
  settingsSkladList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(settingsSkladListAction),
      concatMap((params) => {
        return this.settings.getAllSettingsSklad({ params }).pipe(
          concatMap((settingsSkladList) => {
            if (settingsSkladList.length === 0) {
              return of(noMoreSettingsSkladListAction({ data: true }));
            }
            return of(settingsSkladListSuccessAction({ data: settingsSkladList }));
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              settingsSkladListFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );





  // Удаление настроек автопарка
  settingsAvtoparkDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(settingAvtoparkDeleteAction),
      switchMap((id) => {
        return this.settings.deleteSettingAvtopark(id.id).pipe(
          map((id) => {
            this.messageService.add({ severity: 'success', summary: `Настройки автопарка удален`, detail: 'Успешно!' });
            return settingAvtoparkDeleteSuccessAction({ data: id });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: `Ошибка удаления настроект автопарка`, detail: 'Попробуйте позже!' });
            return of(
              settingAvtoparkDeleteFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );





  // Обновление настроек автопарка
  updateStateSettingsAvtopark$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateStateSettingsAction),
        map(() => {
          const savedState: any = localStorage.getItem('appState');
          return updateStateSettingsSuccessAction({ data: JSON.parse(savedState) })
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(
            updateStateSettingsFailureAction({ errors: 'Ошибка обновления состояния' })
          );
        })
      ),
  );







  // Получение настроек автопарка
  getSettingsAvtopark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(settingsAvtoparkGetCurrent),
      switchMap((id) => {
        return this.settings.getByIdSettingsAvtopark(id.id).pipe(
          map((car) => {
            return settingsAvtoparkGetCurrentSuccessAction({ data: car });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              settingsAvtoparkGetCurrentFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );






  // Получение настроек склада
  getSettingsSklad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(settingsSkladGetCurrent),
      switchMap((id) => {
        return this.settings.getByIdSettingsSklad(id.id).pipe(
          map((setting) => {
            return settingsSkladGetCurrentSuccessAction({ data: setting });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              settingsSkladGetCurrentFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );






  // Обновление настроек автопарка
  UpdateSettingsAvtopark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateSettingsAvtoparkAction),
      switchMap(({ settingAvtopark }) => {
        return this.settings.updateSettingsAvtopark(settingAvtopark).pipe(
          map((data) => {
            this.messageService.add({ severity: 'success', summary: `Настройки обновлены`, detail: 'Успешно!' });
            return updateSettingsAvtoparkSuccessAction({ data: data });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: `Ошибка обновления`, detail: 'Попробуйте еще раз' });
            return of(
              updateSettingsAvtoparkFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );






  
  // Обновление настроек склада
  UpdateSettingsSklad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateSettingsSkladAction),
      switchMap(({ settingSklad }) => {
        return this.settings.updateSettingsSklad(settingSklad).pipe(
          map((data) => {
            this.messageService.add({ severity: 'success', summary: `Настройки обновлены`, detail: 'Успешно!' });
            return updateSettingsSkladSuccessAction({ data: data });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: `Ошибка обновления`, detail: 'Попробуйте еще раз' });
            return of(
              updateSettingsSkladFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );



}
