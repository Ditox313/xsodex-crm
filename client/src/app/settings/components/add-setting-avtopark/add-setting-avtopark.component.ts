import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { isLoadingSelector } from '../../store/selectors';
import { DatePipe } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { addSettingAvtoparkAction } from '../../store/actions/settings.action';

@Component({
  selector: 'app-add-setting-avtopark',
  templateUrl: './add-setting-avtopark.component.html',
  styleUrls: ['./add-setting-avtopark.component.css']
})
export class AddSettingAvtoparkComponent {
  title: string = 'Добавить настройку автопарка'
  form!: FormGroup;
  isLoadingSelector$!: Observable<boolean | null>


  constructor(public datePipe: DatePipe, private store: Store,) { }


  ngOnInit(): void {
    this.initForm()
    this.initValues()
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
  }


  initValues() {
    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))
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
      }
    };


    this.store.dispatch(addSettingAvtoparkAction({ setting: settings_avtopark }))
  }
}
