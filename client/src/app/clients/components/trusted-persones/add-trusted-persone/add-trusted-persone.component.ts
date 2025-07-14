import { DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { isLoadingSelector } from 'src/app/account/store/selectors';
import { addTrustedPersoneAction, clientLawGetCurrent, clientLawGetCurrentReset, clientsLawListAction, clientsLawListResetAction } from 'src/app/clients/store/actions/actionsClientsLaw/clientsLaw.action';
import { clientsLawListSelector, getCurrentClientLawSelector } from 'src/app/clients/store/selectors/clientslaw/selectorsClientsLaw';
import { ClientLaw, ClientsLawParamsFetch, trustedPersone } from 'src/app/clients/types/clientsLaw/clientsLaw.interfaces';

@Component({
  selector: 'app-add-trusted-persone',
  templateUrl: './add-trusted-persone.component.html',
  styleUrls: ['./add-trusted-persone.component.css']
})
export class AddTrustedPersoneComponent {
  title: string = 'Добавить доверенное лицо'
  form!: FormGroup;
  clientsLawListSelector!: Observable<ClientLaw[] | null | undefined>
  clientsLawListSub$!: Subscription
  clientsLawList: ClientLaw[] | null | undefined = [];
  currentClientLawSelector!: Observable<ClientLaw | null | undefined>
  currentClientLawSub$!: Subscription
  currentClientLaw!: ClientLaw | null | undefined
  STEP = 9999;
  offset: number = 0;
  limit: number = this.STEP;
  isLoadingSelector$!: Observable<boolean | null>
  clientLawId!: string
  getParamsSub$!: Subscription


  // Данные для загрузки файлов
  isActive!: boolean;
  uploadFiles: any = []
  filesSrc: any = []



  constructor(public datePipe: DatePipe, private store: Store, private rote: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getParams()
    this.initForm()
    this.getClientsLawList()
    this.initValues()
  }

   ngOnDestroy(): void {
    if (this.clientsLawListSub$) {
      this.clientsLawListSub$.unsubscribe();
    }
    if (this.getParamsSub$) {
      this.getParamsSub$.unsubscribe()
    }
    if (this.currentClientLawSub$) {
      this.currentClientLawSub$.unsubscribe()
    }


    // Отчищаем состояние clientsLawList 
    this.store.dispatch(clientsLawListResetAction());

    //Отчищаем состояние currentClientLaw
    this.store.dispatch(clientLawGetCurrentReset());
  }


  getParams() {
    this.getParamsSub$ = this.rote.params.subscribe((params: any) => {
      this.clientLawId = params['id'];
    });
  }



  initForm() {
    this.form = new FormGroup({
        fio: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required]),
        doverenostNumber: new FormControl(null),
        doverenostDate: new FormControl(null),
        organization: new FormControl('', [Validators.required]),
    });
  }


  initValues() {
    // Отчищаем состояние clientsLawList
    this.store.dispatch(clientsLawListResetAction());
    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))


    //Отправляем запрос на получение текущего физического лица
    this.store.dispatch(clientLawGetCurrent({ id: this.clientLawId }));
    this.currentClientLawSelector = this.store.pipe(select(getCurrentClientLawSelector))
    this.currentClientLawSub$ = this.currentClientLawSelector.subscribe({
      next: (currentClientLaw) => {
        this.currentClientLaw = currentClientLaw

        console.log(this.currentClientLaw);
      }
    })


    // Получаем селектор на получение списка юридичексих лиц 
    this.clientsLawListSelector = this.store.pipe(select(clientsLawListSelector))
    this.clientsLawListSub$ = this.clientsLawListSelector.subscribe({
      next: (clientsLawList) => {
        if (clientsLawList) {
          this.clientsLawList = clientsLawList;
          console.log(this.clientsLawList);
        }
      }
    });
  }



  getClientsLawList() {
    const params: ClientsLawParamsFetch = {
      offset: this.offset,
      limit: this.limit,
    };

    // Отправляем запрос на получения списка юридичексих лиц
    this.store.dispatch(clientsLawListAction({ params: params }));
  }





  // Принимает загруженные файлы из модуля
  uploadFilesData(data: { isActive: boolean, uploadFiles: any[], filesSrc: any[] }) {
    this.isActive = data.isActive;
    this.uploadFiles = data.uploadFiles;
    this.filesSrc = data.filesSrc;
  }



  onSubmit() {

    let fio = this.form.value.fio.split(' ');
    

    const trustedPersone: trustedPersone = {
      name: fio[1],
      surname: fio[0],
      lastname: fio[2],
      phone: this.form.value.phone,
      doverenostNumber: this.form.value.doverenostNumber,
      doverenostDate: this.form.value.doverenostDate,
      organization: this.currentClientLaw ? this.currentClientLaw.name + ' ' + this.currentClientLaw.short_name : '',
      organizationId: this.clientLawId,
    };
    

    console.log(trustedPersone);
    

    
    this.store.dispatch(addTrustedPersoneAction({ trustedPersone: trustedPersone, files: this.uploadFiles }))
  }
}
