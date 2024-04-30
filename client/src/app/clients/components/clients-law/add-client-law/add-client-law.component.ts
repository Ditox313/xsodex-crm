import { DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isLoadingSelector } from 'src/app/account/store/selectors';
import { addClientLawAction } from 'src/app/clients/store/actions/actionsClientsLaw/clientsLaw.action';
import { ClientLaw } from 'src/app/clients/types/clientsLaw/clientsLaw.interfaces';

@Component({
  selector: 'app-add-client-law',
  templateUrl: './add-client-law.component.html',
  styleUrls: ['./add-client-law.component.css']
})
export class AddClientLawComponent {
  title: string = 'Добавить клиента (юр-лицо)'
  form!: FormGroup;

  isLoadingSelector$!: Observable<boolean | null>
  resident!: string


   // Данные для загрузки файлов
   isActive!: boolean;
   uploadFiles: any = []
   filesSrc: any = []


     // Если мы из создния брони хотим создать клиента
  @Input() fromAddBooking?: boolean = false
  @Output() clientAddStatus: EventEmitter<string> = new EventEmitter()


   constructor(public datePipe: DatePipe, private store: Store,) { }


  ngOnInit(): void {
    this.initForm()
    this.initValues()
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      short_name: new FormControl('', [Validators.required]),
      inn: new FormControl('', [Validators.required]),
      kpp: new FormControl('', [Validators.required]),
      ogrn: new FormControl('',),
      ogrn_ip: new FormControl('',),
      svidetelstvo_ip: new FormControl('',),
      law_address: new FormControl('', [Validators.required]),
      fact_address: new FormControl('', [Validators.required]),
      mail_address: new FormControl('', [Validators.required]),
      boss_role: new FormControl('', [Validators.required]),
      boss_fio: new FormControl('', [Validators.required]),
      osnovanie_boss_role: new FormControl('', [Validators.required]),
      phone_1: new FormControl('', [Validators.required]),
      phone_2: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      rc_number: new FormControl('', [Validators.required]),
      kor_rc_number: new FormControl('', [Validators.required]),
      bik_number: new FormControl('', [Validators.required]),
      name_bank: new FormControl('', [Validators.required]),
    });
  }


  initValues() {
    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))
  }





  // Принимает загруженные файлы из модуля
  uploadFilesData(data: { isActive: boolean, uploadFiles: any[], filesSrc: any[] }) {
    this.isActive = data.isActive;
    this.uploadFiles = data.uploadFiles;
    this.filesSrc = data.filesSrc;
  }



  onSubmit() {

    let boss_fio = this.form.value.boss_fio.split(' ');
    

    const clientLaw: ClientLaw = {
      type: 'law',
      name: this.form.value.name,
      short_name: this.form.value.short_name,
      inn: this.form.value.inn,
      kpp: this.form.value.kpp,
      ogrn: this.form.value.ogrn,
      ogrn_ip: this.form.value.ogrn_ip,
      svidetelstvo_ip: this.form.value.svidetelstvo_ip,
      law_address: this.form.value.law_address,
      fact_address: this.form.value.fact_address,
      mail_address: this.form.value.mail_address,
      boss_role: this.form.value.boss_role,
      boss_name: boss_fio[1],
      boss_surname: boss_fio[0],
      boss_lastname: boss_fio[2],
      osnovanie_boss_role: this.form.value.osnovanie_boss_role,
      phone_1: this.form.value.phone_1,
      phone_2: this.form.value.phone_2,
      email: this.form.value.email,
      rc_number: this.form.value.rc_number,
      kor_rc_number: this.form.value.kor_rc_number,
      bik_number: this.form.value.bik_number,
      name_bank: this.form.value.name_bank,
    };

    
    this.store.dispatch(addClientLawAction({ clientLaw: clientLaw, files: this.uploadFiles, from: this.fromAddBooking ? 'add_booking' : 'add_client' }))

    if(this.fromAddBooking)
    {
      this.clientAddStatus?.emit('client_ok')
    }
  }
}
