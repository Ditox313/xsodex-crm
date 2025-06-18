import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { settingsGlobalGetCurrent, settingsGlobalGetCurrentReset, updateSettingsGlobalAction } from 'src/app/settings/store/actions/settings.action';
import { getCurrentSettingGlobalSelector, isLoadingSelector } from 'src/app/settings/store/selectors';
import { SettingGlobal } from 'src/app/settings/types/settings.interfaces';

@Component({
  selector: 'app-show-setting-global',
  templateUrl: './show-setting-global.component.html',
  styleUrls: ['./show-setting-global.component.css']
})
export class ShowSettingGlobalComponent {
  form!: FormGroup;
  isLoadingSelector$!: Observable<boolean | null>
  currentSettingsGlobalSelector!: Observable<SettingGlobal | null | undefined>
  currentSettingsGlobalSub$!: Subscription
  currentSettingsGlobal!: SettingGlobal | null | undefined
  title: string = ''
  edit: boolean = false
  getParamsSub$!: Subscription
  settingsGlobalId!: string
  firma_list = ['ООО «ВВС-ВЕБ»', 'ООО «ЕВС»']



  constructor(public datePipe: DatePipe, private store: Store, private rote: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getParams()
    this.initForm()
    this.initValues()
  }


  ngOnDestroy(): void {
    if (this.getParamsSub$) {
      this.getParamsSub$.unsubscribe()
    }
    if (this.currentSettingsGlobalSub$) {
      this.currentSettingsGlobalSub$.unsubscribe()
    }

    //Отчищаем состояние 
    this.store.dispatch(settingsGlobalGetCurrentReset());

  }


  getParams() {
    this.getParamsSub$ = this.rote.params.subscribe((params: any) => {
      this.settingsGlobalId = params['id'];
    });
  }

  initForm() {
    this.form = new FormGroup({
      firma: new FormControl('', []),
      rekviziti_firma_1: new FormControl('', []), 
      rekviziti_firma_2: new FormControl('', []), 
    });

    this.form.disable();
  }


  initValues() {
    //Отчищаем состояние 
    this.store.dispatch(settingsGlobalGetCurrentReset());

    
    this.store.dispatch(settingsGlobalGetCurrent({ id: this.settingsGlobalId }));

    this.currentSettingsGlobalSelector = this.store.pipe(select(getCurrentSettingGlobalSelector))
    this.currentSettingsGlobalSub$ = this.currentSettingsGlobalSelector.subscribe({
      next: (currentSettingsGlobal) => {
        this.currentSettingsGlobal = currentSettingsGlobal

        if (currentSettingsGlobal) {
          this.title = `${currentSettingsGlobal.title}`
          this.pathValueSettingsGlobal(currentSettingsGlobal)
        }

      }
    })

    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))
  }



  pathValueSettingsGlobal(settings: any) {
    
    this.form.patchValue({
      firma: settings.firma,
      rekviziti_firma_1: settings.rekviziti_firma_1,
      rekviziti_firma_2: settings.rekviziti_firma_2,
    });

  }


  // Переключаем состояние edit 
  initEdit() {
    this.edit = !this.edit

    if (this.edit === true) {
      this.form.enable()
    }
    else {
      this.form.disable()
    }
  }



  onSubmit() {

    const settings_global = {
      _id: this.settingsGlobalId,
      firma: this.form.value.firma,
      rekviziti_firma_1: this.form.value.rekviziti_firma_1,
      rekviziti_firma_2: this.form.value.rekviziti_firma_2,
    };




    this.store.dispatch(updateSettingsGlobalAction({ settingGlobal: settings_global}))
  }
}
