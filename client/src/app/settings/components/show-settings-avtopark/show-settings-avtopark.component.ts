import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { SettingAvtopark } from '../../types/settings.interfaces';
import { getCurrentSettingAvtoparkSelector, isLoadingSelector } from '../../store/selectors';
import { Store, select } from '@ngrx/store';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { settingsAvtoparkGetCurrent, updateSettingsAvtoparkAction } from '../../store/actions/settings.action';

@Component({
  selector: 'app-show-settings-avtopark',
  templateUrl: './show-settings-avtopark.component.html',
  styleUrls: ['./show-settings-avtopark.component.css']
})
export class ShowSettingsAvtoparkComponent {
  form!: FormGroup;
  isLoadingSelector$!: Observable<boolean | null>
  currentSettingsAvtoparkSelector!: Observable<SettingAvtopark | null | undefined>
  currentSettingsAvtoparkSub$!: Subscription
  currentSettingsAvtopark!: SettingAvtopark | null | undefined
  title: string = ''
  edit: boolean = false
  getParamsSub$!: Subscription
  settingsAvtoprokatId!: string



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
    if (this.currentSettingsAvtoparkSub$) {
      this.currentSettingsAvtoparkSub$.unsubscribe()
    }

    //Отчищаем состояние currentCar
    // this.store.dispatch(partnerGetCurrentReset());

  }


  getParams() {
    this.getParamsSub$ = this.rote.params.subscribe((params: any) => {
      this.settingsAvtoprokatId = params['id'];
    });
  }

  initForm() {
    this.form = new FormGroup({
      airport_price: new FormControl(null, []),
      railway_price: new FormControl(null, []),
      kristal_tc_price: new FormControl(null, []),
      sitymol_tc_price: new FormControl(null, []),
      airport_price_input: new FormControl(null, []),
      railway_price_input: new FormControl(null, []),
      kristal_tc_price_input: new FormControl(null, []),
      sitymol_tc_price_input: new FormControl(null, []),
      moyka_komfort: new FormControl(null, []),
      moyka_business: new FormControl(null, []),
      moyka_premium: new FormControl(null, []),
      additionally_det_kreslo: new FormControl(null, []),
      additionally_buster: new FormControl(null, []),
      additionally_videoregister: new FormControl(null, []),
      additionally_battery_charger: new FormControl(null, []),
      additionally_antiradar: new FormControl(null, []),
    });

    this.form.disable();
  }


  initValues() {
    //Отчищаем состояние currentCar
    // this.store.dispatch(partnerGetCurrentReset());

    //Отправляем запрос на получение текущего партнера
    this.store.dispatch(settingsAvtoparkGetCurrent({ id: this.settingsAvtoprokatId }));

    this.currentSettingsAvtoparkSelector = this.store.pipe(select(getCurrentSettingAvtoparkSelector))
    this.currentSettingsAvtoparkSub$ = this.currentSettingsAvtoparkSelector.subscribe({
      next: (currentSettingsAvtopark) => {
        this.currentSettingsAvtopark = currentSettingsAvtopark

        if (currentSettingsAvtopark) {
          this.title = `Просмотр настроек - ${currentSettingsAvtopark.title}`
          this.pathValueSettingsAvtopark(currentSettingsAvtopark)
        }

      }
    })

    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))
  }



  pathValueSettingsAvtopark(settings: any) {
    
    this.form.patchValue({
      airport_price: settings.share_avto.airport_price,
      railway_price: settings.share_avto.railway_price,
      kristal_tc_price: settings.share_avto.kristal_tc_price,
      sitymol_tc_price: settings.share_avto.sitymol_tc_price,
      airport_price_input: settings.input_avto.airport_price_input,
      railway_price_input: settings.input_avto.railway_price_input,
      kristal_tc_price_input: settings.input_avto.kristal_tc_price_input,
      sitymol_tc_price_input: settings.input_avto.sitymol_tc_price_input,

      moyka_komfort: settings.washing_avto.komfort,
      moyka_business: settings.washing_avto.business,
      moyka_premium: settings.washing_avto.premium,

      additionally_det_kreslo: settings.additionally_avto.det_kreslo,
      additionally_buster: settings.additionally_avto.buster,
      additionally_videoregister: settings.additionally_avto.videoregister,
      additionally_battery_charger: settings.additionally_avto.battery_charger,
      additionally_antiradar: settings.additionally_avto.antiradar,
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

    const settings_avtopark = {
      share_avto: {
        airport_price: this.form.value.airport_price,
        railway_price: this.form.value.railway_price,
        kristal_tc_price: this.form.value.kristal_tc_price,
        sitymol_tc_price: this.form.value.sitymol_tc_price,
      },
      input_avto: {
        airport_price_input: this.form.value.airport_price_input,
        railway_price_input: this.form.value.railway_price_input,
        kristal_tc_price_input: this.form.value.kristal_tc_price_input,
        sitymol_tc_price_input: this.form.value.sitymol_tc_price_input,
      },
      washing_avto: {
        komfort: this.form.value.moyka_komfort,
        business: this.form.value.moyka_business,
        premium: this.form.value.moyka_premium,
      },
      additionally_avto: {
        det_kreslo: this.form.value.additionally_det_kreslo,
        buster: this.form.value.additionally_buster,
        videoregister: this.form.value.additionally_videoregister,
        battery_charger: this.form.value.additionally_battery_charger,
        antiradar: this.form.value.additionally_antiradar,
      },
      _id: this.settingsAvtoprokatId
    };




    this.store.dispatch(updateSettingsAvtoparkAction({ settingAvtopark: settings_avtopark}))
  }
}
