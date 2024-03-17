import { Component, ElementRef, ViewChild } from '@angular/core';
import { Partner } from '../../types/partners.interfaces';
import { Observable, Subscription, tap } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { getCurrentPartnerSelector, isLoadingSelector } from '../../store/selectors';
import { ActivatedRoute } from '@angular/router';
import { partnerGetCurrent, partnerGetCurrentReset, updatePartnerAction, updatePartnerSuccessAction, ActionTypes, } from '../../store/actions/partners.action';
import { Action } from '@ngrx/store';

@Component({
  selector: 'app-show-partner',
  templateUrl: './show-partner.component.html',
  styleUrls: ['./show-partner.component.css']
})
export class ShowPartnerComponent {
  form!: FormGroup;
  value!: string;
  isLoadingSelector$!: Observable<boolean | null>
  currentPartnerSelector!: Observable<Partner | null | undefined>
  currentPartnerSub$!: Subscription
  currentPartner!: Partner | null | undefined
  title: string = ''
  edit: boolean = false
  getParamsSub$!: Subscription
  partnerId!: string


  isActive!: boolean;
  uploadFiles: any = []
  filesSrc: any = []




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
    if (this.currentPartnerSub$) {
      this.currentPartnerSub$.unsubscribe()
    }

    //Отчищаем состояние currentCar
    this.store.dispatch(partnerGetCurrentReset());

  }


  // Принимает загруженные файлы из модуля
  uploadFilesData(data: { isActive: boolean, uploadFiles: any[], filesSrc: any[] }) {
    this.isActive = data.isActive;
    this.uploadFiles = data.uploadFiles;
    this.filesSrc = data.filesSrc;
  }


  getParams() {
    this.getParamsSub$ = this.rote.params.subscribe((params: any) => {
      this.partnerId = params['id'];
    });
  }

  initForm() {
    this.form = new FormGroup({
      fio: new FormControl('', [Validators.required]),
      passport_seria_number: new FormControl('', [Validators.required]),
      passport_date: new FormControl(''),
      passport_who_take: new FormControl('', [Validators.required]),
      code_podrazdeleniya: new FormControl('', [Validators.required]),
      passport_register: new FormControl('', [Validators.required]),
      phone_1: new FormControl('', [Validators.required]),
      phone_2: new FormControl('', [Validators.required]),
    });

    this.form.disable();
  }


  initValues() {
    //Отчищаем состояние currentCar
    this.store.dispatch(partnerGetCurrentReset());

    //Отправляем запрос на получение текущего партнера
    this.store.dispatch(partnerGetCurrent({ id: this.partnerId }));

    this.currentPartnerSelector = this.store.pipe(select(getCurrentPartnerSelector))
    this.currentPartnerSub$ = this.currentPartnerSelector.subscribe({
      next: (currentPartner) => {
        this.currentPartner = currentPartner

        if (currentPartner) {
          this.title = `Просмотр партнера ${currentPartner.surname} ${currentPartner.name}`
          this.pathValuePartner(currentPartner)
          // this.filesSrc = currentPartner.files
        }
      
      }
    })

    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))
  }



  // Проверяем оканчивается ли строка на определенные символы.Внашем случае PDF
  isPDF(str: any, suffix: any) {
    return new RegExp(suffix + '$').test(str);
  };


  // Переключаем состояние edit 
  initEdit()
  {
    this.edit = !this.edit

    if (this.edit === true)
    {
      this.form.enable()
    }
    else
    {
      this.form.disable()
    }
  }


  pathValuePartner(partner: Partner) {
    this.form.patchValue({
      fio: partner.surname + ' ' + partner.name + ' ' + partner.lastname,
      passport_seria_number: partner.passport_seria + '-' + partner.passport_number,
      passport_date: partner.passport_date,
      passport_who_take: partner.passport_who_take,
      code_podrazdeleniya: partner.code_podrazdeleniya,
      passport_register: partner.passport_register,
      phone_1: partner.phone_1,
      phone_2: partner.phone_2,
    });

  }



onSubmit() {

  // Отчищаем загруженные файлы
  this.filesSrc = []
  

  let fio = this.form.value.fio.split(' ');
  let passport_seria_number = this.form.value.passport_seria_number.split('-');


  const partner: Partner = {
    _id: this.currentPartner?._id,
    name: fio[1],
    surname: fio[0],
    lastname: fio[2],
    passport_seria: passport_seria_number[0],
    passport_number: passport_seria_number[1],
    passport_date: this.form.value.passport_date,
    passport_who_take: this.form.value.passport_who_take,
    code_podrazdeleniya: this.form.value.code_podrazdeleniya,
    passport_register: this.form.value.passport_register,
    phone_1: this.form.value.phone_1,
    phone_2: this.form.value.phone_2,
  };




   this.store.dispatch(updatePartnerAction({ partner: partner, files: this.uploadFiles  }))
  }
}
