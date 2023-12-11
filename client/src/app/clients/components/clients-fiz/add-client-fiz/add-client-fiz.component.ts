import { DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isLoadingSelector } from 'src/app/account/store/selectors';
import { changeCleintForBookingResetAction, clientsForSearchListResetAction, clientsSearchResetAction } from 'src/app/bookings/store/actions/bookings.action';
import { addClientFizAction } from 'src/app/clients/store/actions/actionsClientsFiz/clientsFiz.action';
import { ClientFiz } from 'src/app/clients/types/clientsFiz/clientsFiz.interfaces';

@Component({
  selector: 'app-add-client-fiz',
  templateUrl: './add-client-fiz.component.html',
  styleUrls: ['./add-client-fiz.component.css']
})
export class AddClientFizComponent {
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
      resident: new FormControl(true),
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

    let fio = this.form.value.fio.split(' ');
    let passport_seria_number = this.form.value.passport_seria_number.split('-');
    let prava_seria_number = this.form.value.prava_seria_number.split('-');
    this.resident = this.form.value.resident ? 'true' : 'false'
    

    const clientFiz: ClientFiz = {
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



    this.store.dispatch(addClientFizAction({ clientFiz: clientFiz, file_1: this.uploadFile_1, file_2: this.uploadFile_2, file_3: this.uploadFile_3, file_4: this.uploadFile_4 }))

    
    
  }
}
