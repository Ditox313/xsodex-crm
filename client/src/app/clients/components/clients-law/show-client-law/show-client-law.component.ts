import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { clientLawGetCurrent, clientLawGetCurrentReset, updateClientLawAction } from 'src/app/clients/store/actions/actionsClientsLaw/clientsLaw.action';
import { getCurrentClientLawSelector, isLoadingSelector } from 'src/app/clients/store/selectors/clientslaw/selectorsClientsLaw';
import { ClientLaw } from 'src/app/clients/types/clientsLaw/clientsLaw.interfaces';

@Component({
  selector: 'app-show-client-law',
  templateUrl: './show-client-law.component.html',
  styleUrls: ['./show-client-law.component.css']
})
export class ShowClientLawComponent {
  form!: FormGroup;
  uploadFile_1!: File
  uploadFile_2!: File
  uploadFile_3!: File
  uploadFile_4!: File
  file_1: string | ArrayBuffer | undefined | null = 'https://phonoteka.org/uploads/posts/2023-03/1680212136_phonoteka-org-p-dmitrii-razvarov-art-instagram-90.jpg';
  file_2: string | ArrayBuffer | undefined | null = 'https://phonoteka.org/uploads/posts/2023-03/1680212136_phonoteka-org-p-dmitrii-razvarov-art-instagram-90.jpg';
  file_3: string | ArrayBuffer | undefined | null = 'https://phonoteka.org/uploads/posts/2023-03/1680212136_phonoteka-org-p-dmitrii-razvarov-art-instagram-90.jpg';
  file_4: string | ArrayBuffer | undefined | null = 'https://phonoteka.org/uploads/posts/2023-03/1680212136_phonoteka-org-p-dmitrii-razvarov-art-instagram-90.jpg';
  @ViewChild('upload_1') upload_1!: ElementRef;
  @ViewChild('upload_2') upload_2!: ElementRef;
  @ViewChild('upload_3') upload_3!: ElementRef;
  @ViewChild('upload_4') upload_4!: ElementRef;
  isLoadingSelector$!: Observable<boolean | null>
  currentClientLawSelector!: Observable<ClientLaw | null | undefined>
  currentClientLawSub$!: Subscription
  currentClientLaw!: ClientLaw | null | undefined
  getParamsSub$!: Subscription
  title: string = ''
  edit: boolean = false
  clientLawId!: string
  resident!: string

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
    if (this.currentClientLawSub$) {
      this.currentClientLawSub$.unsubscribe()
    }

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

    this.form.disable();
  }


  initValues() {
    //Отправляем запрос на получение текущего физического лица
    this.store.dispatch(clientLawGetCurrent({ id: this.clientLawId }));

    this.currentClientLawSelector = this.store.pipe(select(getCurrentClientLawSelector))
    this.currentClientLawSub$ = this.currentClientLawSelector.subscribe({
      next: (currentClientLaw) => {
        this.currentClientLaw = currentClientLaw

        if (currentClientLaw) {
          this.title = `Просмотр клиента ${currentClientLaw.short_name} ${currentClientLaw.name}`
          this.pathValueClient(currentClientLaw)
        }

      }
    })

    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))
  }


  // Обрабатываем загрузку картинок
  onFile1Upload(event: any) {
    const file = event.target.files['0'];
    this.uploadFile_1 = file;

    const reader = new FileReader();
    // Метод вызовется тогда, когда загрузится вся картинка
    reader.onload = () => {
      if (event.target.files['0'].type !== 'application/pdf') {
        // Переменная для хранения информации об изображении
        this.file_1 = reader.result;
      }
      else {
        // Переменная для хранения информации об изображении
        this.file_1 = 'https://i.etsystatic.com/7267864/r/il/5235cc/1979275153/il_1588xN.1979275153_71s3.jpg';
      }
    };
    // Читаем нужный нам файл
    reader.readAsDataURL(file);
  };



  onFile2Upload(event: any) {
    const file = event.target.files['0'];
    this.uploadFile_2 = file;

    const reader = new FileReader();
    // Метод вызовется тогда, когда загрузится вся картинка
    reader.onload = () => {
      if (event.target.files['0'].type !== 'application/pdf') {
        // Переменная для хранения информации об изображении
        this.file_2 = reader.result;
      }
      else {
        // Переменная для хранения информации об изображении
        this.file_2 = 'https://i.etsystatic.com/7267864/r/il/5235cc/1979275153/il_1588xN.1979275153_71s3.jpg';
      }
    };
    // Читаем нужный нам файл
    reader.readAsDataURL(file);
  }


  onFile3Upload(event: any) {
    const file = event.target.files['0'];
    this.uploadFile_3 = file;

    const reader = new FileReader();
    // Метод вызовется тогда, когда загрузится вся картинка
    // Метод вызовется тогда, когда загрузится вся картинка
    reader.onload = () => {
      if (event.target.files['0'].type !== 'application/pdf') {
        // Переменная для хранения информации об изображении
        this.file_3 = reader.result;
      }
      else {
        // Переменная для хранения информации об изображении
        this.file_3 = 'https://i.etsystatic.com/7267864/r/il/5235cc/1979275153/il_1588xN.1979275153_71s3.jpg';
      }
    };
    // Читаем нужный нам файл
    reader.readAsDataURL(file);
  }



  onFile4Upload(event: any) {
    const file = event.target.files['0'];
    this.uploadFile_4 = file;

    const reader = new FileReader();
    // Метод вызовется тогда, когда загрузится вся картинка
    // Метод вызовется тогда, когда загрузится вся картинка
    reader.onload = () => {
      if (event.target.files['0'].type !== 'application/pdf') {
        // Переменная для хранения информации об изображении
        this.file_4 = reader.result;
      }
      else {
        // Переменная для хранения информации об изображении
        this.file_4 = 'https://i.etsystatic.com/7267864/r/il/5235cc/1979275153/il_1588xN.1979275153_71s3.jpg';
      }
    };
    // Читаем нужный нам файл
    reader.readAsDataURL(file);
  }


  // Обрабатываем кнопку загрузки тригиря клик по скрытому инпуту
  onFile1UploadClick() {
    this.upload_1.nativeElement.click();
  }
  onFile2UploadClick() {
    this.upload_2.nativeElement.click();
  }
  onFile3UploadClick() {
    this.upload_3.nativeElement.click();
  }

  onFile4UploadClick() {
    this.upload_4.nativeElement.click();
  }



  // Проверяем оканчивается ли строка на определенные символы.Внашем случае PDF
  isPDF(str: any, suffix: any) {
    return new RegExp(suffix + '$').test(str);
  };


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


  pathValueClient(clientsLaw: ClientLaw) {
    this.form.patchValue({
      name: clientsLaw.name,
      short_name: clientsLaw.short_name,
      inn: clientsLaw.inn,
      kpp: clientsLaw.kpp,
      ogrn: clientsLaw.ogrn,
      ogrn_ip: clientsLaw.ogrn_ip,
      svidetelstvo_ip: clientsLaw.svidetelstvo_ip,
      law_address: clientsLaw.law_address,
      fact_address: clientsLaw.fact_address,
      mail_address: clientsLaw.mail_address,
      boss_role: clientsLaw.boss_role,
      boss_fio: clientsLaw.boss_surname + ' ' + clientsLaw.boss_name + ' ' + clientsLaw.boss_lastname,
      osnovanie_boss_role: clientsLaw.osnovanie_boss_role,
      phone_1: clientsLaw.phone_1,
      phone_2: clientsLaw.phone_2,
      email: clientsLaw.email,
      rc_number: clientsLaw.rc_number,
      kor_rc_number: clientsLaw.kor_rc_number,
      bik_number: clientsLaw.bik_number,
      name_bank: clientsLaw.name_bank,
    });

    this.file_1 = clientsLaw.file_1
    this.file_2 = clientsLaw.file_2
    this.file_3 = clientsLaw.file_3
    this.file_4 = clientsLaw.file_4


  }



  onSubmit() {


    let boss_fio = this.form.value.boss_fio.split(' ');


    const clientLaw: ClientLaw = {
      _id: this.currentClientLaw?._id,
      type: this.form.value.type,
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


    this.store.dispatch(updateClientLawAction({ clientLaw: clientLaw, file_1: this.uploadFile_1, file_2: this.uploadFile_2, file_3: this.uploadFile_3, file_4: this.uploadFile_4 }))
  }
}
