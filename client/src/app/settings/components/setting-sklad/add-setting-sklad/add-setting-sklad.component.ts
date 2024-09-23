import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { isLoadingSelector } from '../../../store/selectors';
import { DatePipe } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { addSettingSkladkAction } from 'src/app/settings/store/actions/settings.action';

@Component({
  selector: 'app-add-setting-sklad',
  templateUrl: './add-setting-sklad.component.html',
  styleUrls: ['./add-setting-sklad.component.css']
})
export class AddSettingSkladComponent {
  title: string = 'Добавить настройку склада'
  form!: FormGroup;
  isLoadingSelector$!: Observable<boolean | null>

  constructor(public datePipe: DatePipe, private store: Store,) { }


  ngOnInit(): void {
    this.initForm()
    this.initValues()
  }


  initForm() {
    this.form = new FormGroup({
      sklad_name_1: new FormControl(null, []),
      sklad_name_2: new FormControl(null, []),
      sklad_name_3: new FormControl(null, []),
      sklad_name_4: new FormControl(null, []),
      sklad_name_5: new FormControl(null, []),
      sklad_name_6: new FormControl(null, []),
      sklad_name_7: new FormControl(null, []),
      sklad_name_8: new FormControl(null, []),
      sklad_name_9: new FormControl(null, []),
      sklad_name_10: new FormControl(null, []),
      sklad_name_11: new FormControl(null, []),
      sklad_name_12: new FormControl(null, []),
      sklad_name_13: new FormControl(null, []),
      sklad_name_14: new FormControl(null, []),
      sklad_name_15: new FormControl(null, []),
    });
  }

  initValues() {
    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))
  }


  
  onSubmit() {

    const settings_sklad = {
      sklad_name_1: this.form.value.sklad_name_1,
      sklad_name_2: this.form.value.sklad_name_2,
      sklad_name_3: this.form.value.sklad_name_3,
      sklad_name_4: this.form.value.sklad_name_4,
      sklad_name_5: this.form.value.sklad_name_5,
      sklad_name_6: this.form.value.sklad_name_6,
      sklad_name_7: this.form.value.sklad_name_7,
      sklad_name_8: this.form.value.sklad_name_8,
      sklad_name_9: this.form.value.sklad_name_9,
      sklad_name_10: this.form.value.sklad_name_10,
      sklad_name_11: this.form.value.sklad_name_11,
      sklad_name_12: this.form.value.sklad_name_12,
      sklad_name_13: this.form.value.sklad_name_13,
      sklad_name_14: this.form.value.sklad_name_14,
      sklad_name_15: this.form.value.sklad_name_15,
    };



    

    this.store.dispatch(addSettingSkladkAction({ setting: settings_sklad }))
  }

}
