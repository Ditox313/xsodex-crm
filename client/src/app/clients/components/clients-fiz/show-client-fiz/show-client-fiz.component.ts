import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { clientFizGetCurrent, clientFizGetCurrentReset, clientsFizListResetAction, updateClientFizAction } from 'src/app/clients/store/actions/actionsClientsFiz/clientsFiz.action';
import { getCurrentClientFizSelector, isLoadingSelector } from 'src/app/clients/store/selectors/clientsFiz/selectorsClientsFiz';
import { ClientFiz } from 'src/app/clients/types/clientsFiz/clientsFiz.interfaces';

@Component({
  selector: 'app-show-client-fiz',
  templateUrl: './show-client-fiz.component.html',
  styleUrls: ['./show-client-fiz.component.css']
})
export class ShowClientFizComponent {
  form!: FormGroup;
  isLoadingSelector$!: Observable<boolean | null>
  currentClientFizSelector!: Observable<ClientFiz | null | undefined>
  currentClientFizSub$!: Subscription
  currentClientFiz!: ClientFiz | null | undefined
  getParamsSub$!: Subscription
  title: string = ''
  edit: boolean = false
  clientFizId!: string
  resident!: string


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
    if (this.currentClientFizSub$) {
      this.currentClientFizSub$.unsubscribe()
    }

    //Отчищаем состояние currentClientFiz
    this.store.dispatch(clientFizGetCurrentReset());
  }


  getParams() {
    this.getParamsSub$ = this.rote.params.subscribe((params: any) => {
      this.clientFizId = params['id'];
    });
  }

  initForm() {
    this.form = new FormGroup({
      fio: new FormControl('', [Validators.required]),
      date_birth: new FormControl('', [Validators.required]),
      passport_seria_number: new FormControl('', [Validators.required]),
      passport_date: new FormControl('', [Validators.required]),
      passport_who_take: new FormControl('', [Validators.required]),
      code_podrazdeleniya: new FormControl('', [Validators.required]),
      passport_register: new FormControl('', [Validators.required]),
      passport_address_fact: new FormControl(''),
      prava_seria_number: new FormControl('', [Validators.required]),
      prava_date: new FormControl('', [Validators.required]),
      phone_1: new FormControl('', [Validators.required]),
      phone_2_dop_name: new FormControl(''),
      phone_2_dop_number: new FormControl(''),
      phone_3_dop_name: new FormControl(''),
      phone_3_dop_number: new FormControl(''),
      phone_4_dop_name: new FormControl(''),
      phone_4_dop_number: new FormControl(''),
      phone_5_dop_name: new FormControl(''),
      phone_5_dop_number: new FormControl(''),
      resident: new FormControl(''),
    });

    this.form.disable();
  }


  initValues() {
    //Отправляем запрос на получение текущего физического лица
    this.store.dispatch(clientFizGetCurrent({ id: this.clientFizId }));

    this.currentClientFizSelector = this.store.pipe(select(getCurrentClientFizSelector))
    this.currentClientFizSub$ = this.currentClientFizSelector.subscribe({
      next: (currentClientFiz) => {
        this.currentClientFiz = currentClientFiz

        if (currentClientFiz) {
          this.title = `Просмотр клиента ${currentClientFiz.surname} ${currentClientFiz.name}`
          this.pathValueClient(currentClientFiz)
        }
      
      }
    })

    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))
  }



  // Принимает загруженные файлы из модуля
  uploadFilesData(data: { isActive: boolean, uploadFiles: any[], filesSrc: any[] }) {
    this.isActive = data.isActive;
    this.uploadFiles = data.uploadFiles;
    this.filesSrc = data.filesSrc;
  }





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


  pathValueClient(ClientFiz: ClientFiz) {
    this.form.patchValue({
      fio: ClientFiz.surname + ' ' + ClientFiz.name + ' ' + ClientFiz.lastname,
      passport_seria_number: ClientFiz.passport_seria + '-' + ClientFiz.passport_number,
      passport_date: ClientFiz.passport_date,
      date_birth: ClientFiz.date_birth,
      passport_who_take: ClientFiz.passport_who_take,
      code_podrazdeleniya: ClientFiz.code_podrazdeleniya,
      passport_register: ClientFiz.passport_register,
      passport_address_fact: ClientFiz.passport_address_fact,
      prava_seria_number: ClientFiz.prava_seria + '-' + ClientFiz.prava_number,
      prava_date: ClientFiz.prava_date,
      phone_1: ClientFiz.phone_1,
      phone_2_dop_name: ClientFiz.phone_2_dop_name,
      phone_2_dop_number: ClientFiz.phone_2_dop_number,
      phone_3_dop_name: ClientFiz.phone_3_dop_name,
      phone_3_dop_number: ClientFiz.phone_3_dop_number,
      phone_4_dop_name: ClientFiz.phone_4_dop_name,
      phone_4_dop_number: ClientFiz.phone_4_dop_number,
      phone_5_dop_name: ClientFiz.phone_5_dop_name,
      phone_5_dop_number: ClientFiz.phone_5_dop_number,
      resident: ClientFiz.resident === 'true' ? true : false
    });

  }



  onSubmit() {

     // Отчищаем загруженные файлы
  this.filesSrc = []

  let fio = this.form.value.fio.split(' ');
  let passport_seria_number = this.form.value.passport_seria_number.split('-');
  let prava_seria_number = this.form.value.prava_seria_number.split('-');
  this.resident = this.form.value.resident ? 'true' : 'false'


  const clientFiz: ClientFiz = {
    _id: this.currentClientFiz?._id,
    type: 'fiz',
    name: fio[1],
    surname: fio[0],
    lastname: fio[2],
    date_birth: this.form.value.date_birth,
    passport_seria: passport_seria_number[0],
    passport_number: passport_seria_number[1],
    passport_date: this.form.value.passport_date,
    passport_who_take: this.form.value.passport_who_take,
    code_podrazdeleniya: this.form.value.code_podrazdeleniya,
    passport_register: this.form.value.passport_register,
    passport_address_fact: this.form.value.passport_register,
    prava_seria: prava_seria_number[0],
    prava_number: prava_seria_number[1],
    prava_date: this.form.value.prava_date,
    resident: this.resident,
    phone_1: this.form.value.phone_1,
    phone_2_dop_name: this.form.value.phone_2_dop_name,
    phone_2_dop_number: this.form.value.phone_2_dop_number,
    phone_3_dop_name: this.form.value.phone_3_dop_name,
    phone_3_dop_number: this.form.value.phone_3_dop_number,
    phone_4_dop_name: this.form.value.phone_4_dop_name,
    phone_4_dop_number: this.form.value.phone_4_dop_number,
    phone_5_dop_name: this.form.value.phone_5_dop_name,
    phone_5_dop_number: this.form.value.phone_5_dop_number,
  };


  this.store.dispatch(updateClientFizAction({ clientFiz: clientFiz, files: this.uploadFiles }))


    //  Отчищаем загруженные файлы
    this.uploadFiles = []
  }
}
