import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isLoadingSelector } from 'src/app/account/store/selectors';

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
      firma: new FormControl('', []), // пустая строка — по умолчанию ничего не выбрано
    });
  }


  initValues() {
    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))
  }



  onSubmit() {

    const settings_global = {
      firma: this.form.value.firma
    };
    
    


    // this.store.dispatch(addSettingAvtoparkAction({ setting: settings_avtopark }))
  }
}
