import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
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
  title: string = 'Добавить клиента'
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
  resident!: string



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



  onSubmit() {

    let boss_fio = this.form.value.boss_fio.split(' ');
    

    const clientLaw: ClientLaw = {
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

    console.log(clientLaw);
    

    
    this.store.dispatch(addClientLawAction({ clientLaw: clientLaw, file_1: this.uploadFile_1, file_2: this.uploadFile_2, file_3: this.uploadFile_3, file_4: this.uploadFile_4 }))
  }
}
