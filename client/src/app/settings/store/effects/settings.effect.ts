import {Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, switchMap, tap, concatMap} from 'rxjs/operators'
import {HttpErrorResponse} from '@angular/common/http'
import { MessageService } from 'primeng/api'
import {of} from 'rxjs'
import {Router} from '@angular/router'
import { SettingsService } from '../../services/settings.service'
import {addSettingAvtoparkAction, addSettingAvtoparkFailureAction, addSettingAvtoparkSuccessAction, addSettingGlobalAction, addSettingSkladFailureAction, addSettingSkladkAction, addSettingSkladSuccessAction, noMoreSettingsAvtoparkListAction, noMoreSettingsGlobalListAction, noMoreSettingsSkladListAction, settingAvtoparkDeleteAction, settingAvtoparkDeleteFailureAction, settingAvtoparkDeleteSuccessAction, settingGlobalDeleteAction, settingGlobalDeleteFailureAction, settingsAvtoparkGetCurrent, settingsAvtoparkGetCurrentFailureAction, settingsAvtoparkGetCurrentSuccessAction, settingsAvtoparkListAction, settingsAvtoparkListFailureAction, settingsAvtoparkListSuccessAction, settingsGlobalGetCurrent, settingsGlobalGetCurrentFailureAction, settingsGlobalGetCurrentSuccessAction, settingsGlobalListAction, settingsGlobalListFailureAction, settingsGlobalListSuccessAction, settingSkladDeleteAction, settingSkladDeleteFailureAction, settingSkladDeleteSuccessAction, settingsSkladGetCurrent, settingsSkladGetCurrentFailureAction, settingsSkladGetCurrentSuccessAction, settingsSkladListAction, settingsSkladListFailureAction, settingsSkladListSuccessAction, updateSettingsAvtoparkAction, updateSettingsAvtoparkFailureAction, updateSettingsAvtoparkSuccessAction, updateSettingsGlobalAction, updateSettingsGlobalFailureAction, updateSettingsGlobalSuccessAction, updateSettingsSkladAction, updateSettingsSkladFailureAction, updateSettingsSkladSuccessAction, updateStateSettingsAction, updateStateSettingsFailureAction, updateStateSettingsSuccessAction } from '../actions/settings.action'




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




  // Создание настройки глобальной
  addSettingGlobal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addSettingGlobalAction), 
      switchMap(({ setting }) => {
        return this.settings.create_setting_global(setting).pipe(
          map((setting) => {
            this.messageService.add({ severity: 'success', summary: `Глобальные настройки созданы`, detail: 'Успешно!' });
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






    // Получение списка настроек общих
    settingsGlobalList$ = createEffect(() =>
      this.actions$.pipe(
        ofType(settingsGlobalListAction),
        concatMap((params) => {
          return this.settings.getAllSettingsGlobal({ params }).pipe(
            concatMap((settingsGlobalList) => {
              if (settingsGlobalList.length === 0) {
                return of(noMoreSettingsGlobalListAction({ data: true }));
              }
              return of(settingsGlobalListSuccessAction({ data: settingsGlobalList }));
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              return of(
                settingsGlobalListFailureAction({ errors: errorResponse.error.errors })
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
            this.messageService.add({ severity: 'success', summary: `Настройки автопарка удалены`, detail: 'Успешно!' });
            return settingAvtoparkDeleteSuccessAction({ data: id });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: `Ошибка удаления настроек автопарка`, detail: 'Попробуйте позже!' });
            return of(
              settingAvtoparkDeleteFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );






  // Удаление настроек склада
  settingsScladDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(settingSkladDeleteAction),
      switchMap((id) => {
        return this.settings.deleteSettingSklad(id.id).pipe(
          map((id) => {
            this.messageService.add({ severity: 'success', summary: `Настройки склада удалены`, detail: 'Успешно!' });
            return settingSkladDeleteSuccessAction({ data: id });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: `Ошибка удаления настроек склада`, detail: 'Попробуйте позже!' });
            return of(
              settingSkladDeleteFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );





    // Удаление настроек общих
    settingsGlobalDelete$ = createEffect(() =>
      this.actions$.pipe(
        ofType(settingGlobalDeleteAction),
        switchMap((id) => {
          return this.settings.deleteSettingGlobal(id.id).pipe(
            map((id) => {
              this.messageService.add({ severity: 'success', summary: `Общие настройки удалены`, detail: 'Успешно!' });
              return settingSkladDeleteSuccessAction({ data: id });
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              this.messageService.add({ severity: 'error', summary: `Ошибка удаления настроек склада`, detail: 'Попробуйте позже!' });
              return of(
                settingGlobalDeleteFailureAction({ errors: errorResponse.error.errors })
              );
            })
          );
        })
      )
    );
  






  // Обновление настроек автопарка состояния
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



  
  // Получение настроек общих
  getSettingsGlobal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(settingsGlobalGetCurrent),
      switchMap((id) => {
        return this.settings.getByIdSettingsGlobal(id.id).pipe(
          map((setting) => {
            return settingsGlobalGetCurrentSuccessAction({ data: setting });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              settingsGlobalGetCurrentFailureAction({ errors: errorResponse.error.errors })
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




    
  // Обновление настроек общих
  UpdateSettingsGlobal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateSettingsGlobalAction),
      switchMap(({ settingGlobal }) => {
        return this.settings.updateSettingsGlobal(settingGlobal).pipe(
          map((data) => {
            this.messageService.add({ severity: 'success', summary: `Настройки обновлены`, detail: 'Успешно!' });
            return updateSettingsGlobalSuccessAction({ data: data });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: `Ошибка обновления`, detail: 'Попробуйте еще раз' });
            return of(
              updateSettingsGlobalFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );


}
