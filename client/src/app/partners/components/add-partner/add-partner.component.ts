import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Partner } from '../../types/partners.interfaces';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.css']
})
export class AddPartnerComponent {
  title: string = 'Добавить партнера'
  form!: FormGroup;
  uploadFile_1!: File
  uploadFile_2!: File
  file_1: string | ArrayBuffer | undefined | null = '';
  file_2: string | ArrayBuffer | undefined | null = '';
  @ViewChild('upload_1') upload_1!: ElementRef;
  @ViewChild('upload_2') upload_2!: ElementRef;
  value!: string;
  isLoadingSelector$!: Observable<boolean | null>
  currentPartnerSelector$!: Observable<Partner | null | undefined>
  // currentUser!: Partner | null | undefined
  // currentUserSub$!: Subscription


  constructor(public datePipe: DatePipe, private store: Store,) { }


  ngOnInit(): void {
    this.initForm()
    this.initValues()
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
  }


  initValues() {
    // this.currentUserSelector$ = this.store.pipe(select(currentUserSelector))
    // this.currentUserSub$ = this.currentUserSelector$.subscribe({
    //   next: (user) => {
    //     this.currentUser = user
    //   }
    // })
    // this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))
  }


  ngOnDestroy(): void {
    // if (this.currentUserSub$) {
    //   this.currentUserSub$.unsubscribe()
    // }
  }



  // Обрабатываем загрузку картинок
  onFile1Upload(event: any) {
    // const file = event.target.files['0'];
    // this.passport__1 = file;

    // // Подключаем ридер для считывания картинки
    // const reader = new FileReader();

    // // Метод вызовется тогда, когда загрузится вся картинка
    // reader.onload = () => {
    //   if (event.target.files['0'].type !== 'application/pdf') {
    //     // Переменная для хранения информации об изображении
    //     this.passport_1_preview = reader.result;
    //   }
    //   else {
    //     // Переменная для хранения информации об изображении
    //     this.passport_1_preview = 'https://i.etsystatic.com/7267864/r/il/5235cc/1979275153/il_1588xN.1979275153_71s3.jpg';
    //   }

    //   this.passport__1_name = event.target.files['0'].name;
    // };

    // // Читаем нужный нам файл
    // reader.readAsDataURL(file);
  }
  onFile2Upload(event: any) {
    // const file = event.target.files['0'];
    // this.passport__2 = file;

    // // Подключаем ридер для считывания картинки
    // const reader = new FileReader();

    // // Метод вызовется тогда, когда загрузится вся картинка
    // reader.onload = () => {
    //   if (event.target.files['0'].type !== 'application/pdf') {
    //     // Переменная для хранения информации об изображении
    //     this.passport_2_preview = reader.result;
    //   }
    //   else {
    //     // Переменная для хранения информации об изображении
    //     this.passport_2_preview = 'https://i.etsystatic.com/7267864/r/il/5235cc/1979275153/il_1588xN.1979275153_71s3.jpg';
    //   }

    //   this.passport__2_name = event.target.files['0'].name;
    // };

    // // Читаем нужный нам файл
    // reader.readAsDataURL(file);
  }


  // Обрабатываем кнопку загрузки тригиря клик по скрытому инпуту
  onFile1UploadClick() {
    // this.inputRef.nativeElement.click();
  }
  onFile2UploadClick() {
    // this.inputRef2.nativeElement.click();
  }









  onSubmit() {

    // const test = this.form

    // const car: Car = {
    //   marka: this.form.value.marka,
    //   model: this.form.value.model,
    //   number: this.form.value.number,
    //   probeg: this.form.value.probeg,
    //   transmission: this.form.value.transmission,
    //   start_arenda: this.form.value.start_arenda,
    //   end_arenda: this.form.value.end_arenda,
    //   vladelec: this.form.value.vladelec,
    //   category: this.form.value.category,
    //   status: this.form.value.status,
    //   sts_seria: this.form.value.sts_seria,
    //   sts_number: this.form.value.sts_number,
    //   sts_date: this.form.value.sts_date,
    //   osago_seria: this.form.value.osago_seria,
    //   osago_number: this.form.value.osago_number,
    //   osago_date_finish: this.form.value.osago_date_finish,
    //   vin: this.form.value.vin,
    //   kuzov_number: this.form.value.kuzov_number,
    //   color: this.form.value.color,
    //   year_production: this.form.value.year_production,
    //   price_ocenka: this.form.value.price_ocenka,
    //   to_date: this.form.value.to_date,
    //   to_probeg_prev: this.form.value.to_probeg_prev,
    //   to_probeg_next: this.form.value.to_probeg_next,
    //   to_interval: this.form.value.to_interval,
    //   oil_name: this.form.value.oil_name,
    //   stoa_name: this.form.value.stoa_name,
    //   stoa_phone: this.form.value.stoa_phone,
    //   userId: this.currentUser?._id,
    //   tarif_gorod: [
    //     [this.form.value.gorod_name_1, this.form.value.gorod_value_1],
    //     [this.form.value.gorod_name_2, this.form.value.gorod_value_2],
    //     [this.form.value.gorod_name_3, this.form.value.gorod_value_3],
    //     [this.form.value.gorod_name_4, this.form.value.gorod_value_4],
    //     [this.form.value.gorod_name_5, this.form.value.gorod_value_5],
    //     [this.form.value.gorod_name_6, this.form.value.gorod_value_6],
    //     [this.form.value.gorod_name_7, this.form.value.gorod_value_7],
    //     [this.form.value.gorod_name_8, this.form.value.gorod_value_8],
    //     [this.form.value.gorod_name_9, this.form.value.gorod_value_9],
    //     [this.form.value.gorod_name_10, this.form.value.gorod_value_10],
    //     ['zalog', this.form.value.gorod_value_zalog],
    //     ['dop_hour', this.form.value.gorod_value_dop_hour],
    //   ],
    //   tarif_mejgorod: [
    //     [this.form.value.mejgorod_name_1, this.form.value.mejgorod_value_1],
    //     [this.form.value.mejgorod_name_2, this.form.value.mejgorod_value_2],
    //     [this.form.value.mejgorod_name_3, this.form.value.mejgorod_value_3],
    //     [this.form.value.mejgorod_name_4, this.form.value.mejgorod_value_4],
    //     [this.form.value.mejgorod_name_5, this.form.value.mejgorod_value_5],
    //     [this.form.value.mejgorod_name_6, this.form.value.mejgorod_value_6],
    //     [this.form.value.mejgorod_name_7, this.form.value.mejgorod_value_7],
    //     [this.form.value.mejgorod_name_8, this.form.value.mejgorod_value_8],
    //     [this.form.value.mejgorod_name_9, this.form.value.mejgorod_value_9],
    //     [this.form.value.mejgorod_name_10, this.form.value.mejgorod_value_10],
    //     ['zalog', this.form.value.mejgorod_value_zalog],
    //     ['dop_hour', this.form.value.mejgorod_value_dop_hour],
    //   ],
    //   tarif_russia: [
    //     [this.form.value.russia_name_1, this.form.value.russia_value_1],
    //     [this.form.value.russia_name_2, this.form.value.russia_value_2],
    //     [this.form.value.russia_name_3, this.form.value.russia_value_3],
    //     [this.form.value.russia_name_4, this.form.value.russia_value_4],
    //     [this.form.value.russia_name_5, this.form.value.russia_value_5],
    //     [this.form.value.russia_name_6, this.form.value.russia_value_6],
    //     [this.form.value.russia_name_7, this.form.value.russia_value_7],
    //     [this.form.value.russia_name_8, this.form.value.russia_value_8],
    //     [this.form.value.russia_name_9, this.form.value.russia_value_9],
    //     [this.form.value.russia_name_10, this.form.value.russia_value_10],
    //     ['zalog', this.form.value.russia_value_zalog],
    //     ['dop_hour', this.form.value.russia_value_dop_hour],
    //   ],

    // }


    // this.store.dispatch(addCarAction({ car: car, avatar: this.uploadFile }))
  }
}
