import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { clientLawGetCurrent, clientLawGetCurrentReset, trustedPersoneGetCurrent, trustedPersoneGetCurrentReset, updateClientLawAction, updateTrustedPersoneAction } from 'src/app/clients/store/actions/actionsClientsLaw/clientsLaw.action';
import { getCurrentClientLawSelector, getCurrentTrustedPersoneSelector, isLoadingSelector } from 'src/app/clients/store/selectors/clientslaw/selectorsClientsLaw';
import { ClientLaw, trustedPersone } from 'src/app/clients/types/clientsLaw/clientsLaw.interfaces';

@Component({
  selector: 'app-show-trusted-persone',
  templateUrl: './show-trusted-persone.component.html',
  styleUrls: ['./show-trusted-persone.component.css']
})
export class ShowTrustedPersoneComponent {
  form!: FormGroup;
  isLoadingSelector$!: Observable<boolean | null>
  currentTrustedPersoneSelector!: Observable<trustedPersone | null | undefined>
  currentTrustedPersoneSub$!: Subscription
  currentTrustedPersone!: trustedPersone | null | undefined
  getParamsSub$!: Subscription
  title: string = ''
  edit: boolean = false
  trustedPersoneId!: string


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
    if (this.currentTrustedPersoneSub$) {
      this.currentTrustedPersoneSub$.unsubscribe()
    }

    //Отчищаем состояние currentClientLaw
    this.store.dispatch(trustedPersoneGetCurrentReset());
  }


  getParams() {
    this.getParamsSub$ = this.rote.params.subscribe((params: any) => {
      this.trustedPersoneId = params['id'];
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

    this.form.disable();
  }


  initValues() {
    this.store.dispatch(trustedPersoneGetCurrent({ id: this.trustedPersoneId }));

    this.currentTrustedPersoneSelector = this.store.pipe(select(getCurrentTrustedPersoneSelector))
    this.currentTrustedPersoneSub$ = this.currentTrustedPersoneSelector.subscribe({
      next: (currentTrustedPersone) => {
        this.currentTrustedPersone = currentTrustedPersone

        console.log(this.currentTrustedPersone);
        

        if (currentTrustedPersone) {
          this.title = `Просмотр доверенного лица - ${currentTrustedPersone.surname} ${currentTrustedPersone.name}`
          this.pathValueTrustedPersone(currentTrustedPersone)
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
  initEdit() {
    this.edit = !this.edit

    if (this.edit === true) {
      this.form.enable()
    }
    else {
      this.form.disable()
    }
  }


  pathValueTrustedPersone(trustedPersone: trustedPersone) {
    this.form.patchValue({
      fio: trustedPersone.surname + ' ' +  trustedPersone.name + ' ' +  trustedPersone.lastname,
      phone: trustedPersone.phone,
      doverenostNumber: trustedPersone.doverenostNumber,
      doverenostDate: trustedPersone.doverenostDate,
      organization: trustedPersone.organization,
    });
  }



  onSubmit() {

     // Отчищаем загруженные файлы
    this.filesSrc = []

      let fio = this.form.value.fio.split(' ');


    const trustedPersone: trustedPersone = {
      _id: this.currentTrustedPersone?._id,
      name: fio[1],
      surname: fio[0],
      lastname: fio[2],
      phone: this.form.value.phone,
      doverenostNumber: this.form.value.doverenostNumber,
      doverenostDate: this.form.value.doverenostDate,
      organization: this.currentTrustedPersone?.organization,
      organizationId: this.currentTrustedPersone?.organizationId,
    };

    console.log(trustedPersone);
    


    this.store.dispatch(updateTrustedPersoneAction({ trustedPersone: trustedPersone, files: this.uploadFiles }))

    //  Отчищаем загруженные файлы
   this.uploadFiles = []

  }
}
