import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { SettingAvtopark } from '../../../types/settings.interfaces';
import { getCurrentSettingAvtoparkSelector, getCurrentSettingSkladSelector, isLoadingSelector } from '../../../store/selectors';
import { Store, select } from '@ngrx/store';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { settingsSkladGetCurrent, settingsSkladGetCurrentReset, updateSettingsSkladAction } from 'src/app/settings/store/actions/settings.action';

@Component({
  selector: 'app-show-setting-sklad',
  templateUrl: './show-setting-sklad.component.html',
  styleUrls: ['./show-setting-sklad.component.css']
})
export class ShowSettingSkladComponent {
  form!: FormGroup;
  isLoadingSelector$!: Observable<boolean | null>
  currentSettingsSkladSelector!: Observable<SettingAvtopark | null | undefined>
  currentSettingsSkladSub$!: Subscription
  currentSettingsSklad!: SettingAvtopark | null | undefined
  title: string = ''
  edit: boolean = false
  getParamsSub$!: Subscription
  settingsSkladId!: string


  constructor(public datePipe: DatePipe, private store: Store, private rote: ActivatedRoute,) { }


  ngOnInit(): void {
    this.getParams()
    this.initForm()
    this.initValues()
  }


  getParams() {
    this.getParamsSub$ = this.rote.params.subscribe((params: any) => {
      this.settingsSkladId = params['id'];
    });
  }



  ngOnDestroy(): void {
    if (this.getParamsSub$) {
      this.getParamsSub$.unsubscribe()
    }
    if (this.currentSettingsSkladSub$) {
      this.currentSettingsSkladSub$.unsubscribe()
    }

    //Отчищаем состояние 
    this.store.dispatch(settingsSkladGetCurrentReset());
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

    this.form.disable();
  }



  initValues() {
    //Отчищаем состояние 
    this.store.dispatch(settingsSkladGetCurrentReset());

    
    this.store.dispatch(settingsSkladGetCurrent({ id: this.settingsSkladId }));

    this.currentSettingsSkladSelector = this.store.pipe(select(getCurrentSettingSkladSelector))
    this.currentSettingsSkladSub$ = this.currentSettingsSkladSelector.subscribe({
      next: (currentSettingsSklad) => {
        this.currentSettingsSklad = currentSettingsSklad

        if (currentSettingsSklad) {
          this.title = `${currentSettingsSklad.title}`
          this.pathValueSettingsSklad(currentSettingsSklad)
        }

      }
    })

    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))
  }






  pathValueSettingsSklad(settings: any) {
    
    this.form.patchValue({
      sklad_name_1: settings.sklad_name_1,
      sklad_name_2: settings.sklad_name_2,
      sklad_name_3: settings.sklad_name_3,
      sklad_name_4: settings.sklad_name_4,
      sklad_name_5: settings.sklad_name_5,
      sklad_name_6: settings.sklad_name_6,
      sklad_name_7: settings.sklad_name_7,
      sklad_name_8: settings.sklad_name_8,
      sklad_name_9: settings.sklad_name_9,
      sklad_name_10: settings.sklad_name_10,
      sklad_name_11: settings.sklad_name_11,
      sklad_name_12: settings.sklad_name_12,
      sklad_name_13: settings.sklad_name_13,
      sklad_name_14: settings.sklad_name_14,
      sklad_name_15: settings.sklad_name_15,
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
    const settings_sklad = {
      sklad_name_1: this.form.value.sklad_name_1 || '',
      sklad_name_2: this.form.value.sklad_name_2 || '',
      sklad_name_3: this.form.value.sklad_name_3 || '',
      sklad_name_4: this.form.value.sklad_name_4 || '',
      sklad_name_5: this.form.value.sklad_name_5 || '',
      sklad_name_6: this.form.value.sklad_name_6 || '',
      sklad_name_7: this.form.value.sklad_name_7 || '',
      sklad_name_8: this.form.value.sklad_name_8 || '',
      sklad_name_9: this.form.value.sklad_name_9 || '',
      sklad_name_10: this.form.value.sklad_name_10 || '',
      sklad_name_11: this.form.value.sklad_name_11 || '',
      sklad_name_12: this.form.value.sklad_name_12 || '',
      sklad_name_13: this.form.value.sklad_name_13 || '',
      sklad_name_14: this.form.value.sklad_name_14 || '',
      sklad_name_15: this.form.value.sklad_name_15 || '',
      _id: this.settingsSkladId
    };




    this.store.dispatch(updateSettingsSkladAction({ settingSklad: settings_sklad}))
  }



}
