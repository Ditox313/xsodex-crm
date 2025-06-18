import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isLoadingSelector } from 'src/app/account/store/selectors';
import { addSettingGlobalAction } from 'src/app/settings/store/actions/settings.action';

@Component({
  selector: 'app-add-setting-global',
  templateUrl: './add-setting-global.component.html',
  styleUrls: ['./add-setting-global.component.css']
})
export class AddSettingGlobalComponent {
  title: string = 'Добавить общие настройки'
  form!: FormGroup;
  isLoadingSelector$!: Observable<boolean | null>
  firma_list = ['ООО «ВВС-ВЕБ»', 'ООО «ЕВС»']


  constructor(public datePipe: DatePipe, private store: Store,) { }


  ngOnInit(): void {
    this.initForm()
    this.initValues()
  }

  initForm() {
    this.form = new FormGroup({
      firma: new FormControl('', []), 
      rekviziti_firma_1: new FormControl('', []), 
      rekviziti_firma_2: new FormControl('', []), 
    });
  }


  initValues() {
    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))
  }



  onSubmit() {

    const settings_global = {
      firma: this.form.value.firma,
      rekviziti_firma_1: this.form.value.rekviziti_firma_1,
      rekviziti_firma_2: this.form.value.rekviziti_firma_2,

    };




    this.store.dispatch(addSettingGlobalAction({ setting: settings_global }))
  }
}
