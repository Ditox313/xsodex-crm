import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Car } from '../../types/cars.interfaces';
import { getCurrentCarSelector, isLoadingSelector } from '../../store/selectors';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { carGetCurrent, carGetCurrentReset, updateCarAction } from '../../store/actions/cars.action';
import { getCurrentSmenaSelector } from 'src/app/smena/store/selectors';

@Component({
  selector: 'app-show-car',
  templateUrl: './show-car.component.html',
  styleUrls: ['./show-car.component.css']
})
export class ShowCarComponent implements OnInit, OnDestroy {
  title: string = ''
  getParamsSub$!: Subscription
  isLoadingSelector!: Observable<boolean | null>
  currentCarSelector!: Observable<Car | null | undefined>
  currentCarSub$!: Subscription
  currentCar!: Car | null | undefined
  carId!: string
  form!: FormGroup;
  uploadFile!: File
  avatar: string | ArrayBuffer | undefined | null = 'https://phonoteka.org/uploads/posts/2023-03/1680212136_phonoteka-org-p-dmitrii-razvarov-art-instagram-90.jpg';
  @ViewChild('upload') upload!: ElementRef;
  edit: boolean = false
  



  constructor(
    private store: Store,
    private rote: ActivatedRoute,
    private datePipe: DatePipe,
  ) { }
  


  ngOnInit(): void {
    this.getParams()
    this.initForm()
    this.initValues()
  }

  ngOnDestroy(): void {
    if (this.getParamsSub$) {
      this.getParamsSub$.unsubscribe()
    }
    if (this.currentCarSub$) {
      this.currentCarSub$.unsubscribe()
    }

    // // Отчищаем состояние currentSmena
    this.store.dispatch(carGetCurrentReset());

  }



  initForm() {
    this.form = new FormGroup({
      marka: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      probeg: new FormControl('', [Validators.required]),
      transmission: new FormControl('',),
      start_arenda: new FormControl('', [Validators.required]),
      end_arenda: new FormControl('', [Validators.required]),
      vladelec: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      sts_seria: new FormControl('', [Validators.required]),
      sts_number: new FormControl('', [Validators.required]),
      sts_date: new FormControl('', [Validators.required]),
      osago_seria: new FormControl('', [Validators.required]),
      osago_number: new FormControl('', [Validators.required]),
      osago_date_finish: new FormControl('', [Validators.required]),
      vin: new FormControl('', [Validators.required]),
      kuzov_number: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required]),
      year_production: new FormControl('', [Validators.required]),
      price_ocenka: new FormControl('', [Validators.required]),
      to_date: new FormControl('', [Validators.required]),
      to_probeg_prev: new FormControl('', [Validators.required]),
      to_probeg_next: new FormControl('', [Validators.required]),
      to_interval: new FormControl('', [Validators.required]),
      oil_name: new FormControl('', [Validators.required]),
      stoa_name: new FormControl('', [Validators.required]),
      stoa_phone: new FormControl('', [Validators.required]),


      gorod_name_1: new FormControl('',),
      gorod_value_1: new FormControl('',),
      gorod_name_2: new FormControl('',),
      gorod_value_2: new FormControl('',),
      gorod_name_3: new FormControl('',),
      gorod_value_3: new FormControl('',),
      gorod_name_4: new FormControl('',),
      gorod_value_4: new FormControl('',),
      gorod_name_5: new FormControl('',),
      gorod_value_5: new FormControl('',),
      gorod_name_6: new FormControl('',),
      gorod_value_6: new FormControl('',),
      gorod_name_7: new FormControl('',),
      gorod_value_7: new FormControl('',),
      gorod_name_8: new FormControl('',),
      gorod_value_8: new FormControl('',),
      gorod_name_9: new FormControl('',),
      gorod_value_9: new FormControl('',),
      gorod_name_10: new FormControl('',),
      gorod_value_10: new FormControl('',),
      gorod_value_zalog: new FormControl('',),
      gorod_value_dop_hour: new FormControl('',),

      mejgorod_name_1: new FormControl('',),
      mejgorod_value_1: new FormControl('',),
      mejgorod_name_2: new FormControl('',),
      mejgorod_value_2: new FormControl('',),
      mejgorod_name_3: new FormControl('',),
      mejgorod_value_3: new FormControl('',),
      mejgorod_name_4: new FormControl('',),
      mejgorod_value_4: new FormControl('',),
      mejgorod_name_5: new FormControl('',),
      mejgorod_value_5: new FormControl('',),
      mejgorod_name_6: new FormControl('',),
      mejgorod_value_6: new FormControl('',),
      mejgorod_name_7: new FormControl('',),
      mejgorod_value_7: new FormControl('',),
      mejgorod_name_8: new FormControl('',),
      mejgorod_value_8: new FormControl('',),
      mejgorod_name_9: new FormControl('',),
      mejgorod_value_9: new FormControl('',),
      mejgorod_name_10: new FormControl('',),
      mejgorod_value_10: new FormControl('',),
      mejgorod_value_zalog: new FormControl('',),
      mejgorod_value_dop_hour: new FormControl('',),

      russia_name_1: new FormControl('',),
      russia_value_1: new FormControl('',),
      russia_name_2: new FormControl('',),
      russia_value_2: new FormControl('',),
      russia_name_3: new FormControl('',),
      russia_value_3: new FormControl('',),
      russia_name_4: new FormControl('',),
      russia_value_4: new FormControl('',),
      russia_name_5: new FormControl('',),
      russia_value_5: new FormControl('',),
      russia_name_6: new FormControl('',),
      russia_value_6: new FormControl('',),
      russia_name_7: new FormControl('',),
      russia_value_7: new FormControl('',),
      russia_name_8: new FormControl('',),
      russia_value_8: new FormControl('',),
      russia_name_9: new FormControl('',),
      russia_value_9: new FormControl('',),
      russia_name_10: new FormControl('',),
      russia_value_10: new FormControl('',),
      russia_value_zalog: new FormControl('',),
      russia_value_dop_hour: new FormControl('',),
    });

    this.form.disable();
  }


  getParams() {
    this.getParamsSub$ = this.rote.params.subscribe((params: any) => {
      this.carId = params['id'];
    });
  }


  initValues() {
    //Отправляем запрос на получение текущего автомобиля
    this.store.dispatch(carGetCurrent({ id: this.carId }));

    this.currentCarSelector = this.store.pipe(select(getCurrentCarSelector))
    this.currentCarSub$ = this.currentCarSelector.subscribe({
      next: (currentCar) => {
        this.currentCar = currentCar
        
        if (currentCar) {
          this.title = `Просмотр автомобиля ${currentCar.marka} ${currentCar.model}`
          this.pathValueCar(currentCar)
        }
      }
    })

    // Получаем селектор loader
    this.isLoadingSelector = this.store.pipe(select(isLoadingSelector))
  }




  pathValueCar(car: Car) {
    console.log(car);
    
    this.form.patchValue({
      marka: car?.marka,
      model: car?.model,
      number: car?.number,
      probeg: car?.probeg,
      transmission: car?.transmission,
      start_arenda: car?.start_arenda,
      end_arenda: car?.end_arenda,
      vladelec: car?.vladelec,
      category: car?.category,
      status: car?.status,
      sts_seria: car?.sts_seria,
      sts_number: car?.sts_number,
      sts_date: car?.sts_date,
      osago_seria: car?.osago_seria,
      osago_number: car?.osago_number,
      osago_date_finish: car?.osago_date_finish,
      vin: car?.vin,
      kuzov_number: car?.kuzov_number,
      color: car?.color,
      year_production: car?.year_production,
      price_ocenka: car?.price_ocenka,
      to_date: car?.to_date,
      to_probeg_prev: car?.to_probeg_prev,
      to_probeg_next: car?.to_probeg_next,
      to_interval: car?.to_interval,
      oil_name: car?.oil_name,
      stoa_name: car?.stoa_name,
      stoa_phone: car?.stoa_phone,


      gorod_name_1: car?.tarif_gorod[0][0],
      gorod_value_1: car?.tarif_gorod[0][1],
      gorod_name_2: car?.tarif_gorod[1][0],
      gorod_value_2: car?.tarif_gorod[1][1],
      gorod_name_3: car?.tarif_gorod[2][0],
      gorod_value_3: car?.tarif_gorod[2][1],
      gorod_name_4: car?.tarif_gorod[3][0],
      gorod_value_4: car?.tarif_gorod[3][1],
      gorod_name_5: car?.tarif_gorod[4][0],
      gorod_value_5: car?.tarif_gorod[4][1],
      gorod_name_6: car?.tarif_gorod[5][0],
      gorod_value_6: car?.tarif_gorod[5][1],
      gorod_name_7: car?.tarif_gorod[6][0],
      gorod_value_7: car?.tarif_gorod[6][1],
      gorod_name_8: car?.tarif_gorod[7][0],
      gorod_value_8: car?.tarif_gorod[7][1],
      gorod_name_9: car?.tarif_gorod[8][0],
      gorod_value_9: car?.tarif_gorod[8][1],
      gorod_name_10: car?.tarif_gorod[9][0],
      gorod_value_10: car?.tarif_gorod[9][1],
      gorod_value_zalog: car?.tarif_gorod[10][1],
      gorod_value_dop_hour: car?.tarif_gorod[11][1],

      mejgorod_name_1: car?.tarif_mejgorod[0][0],
      mejgorod_value_1: car?.tarif_mejgorod[0][1],
      mejgorod_name_2: car?.tarif_mejgorod[1][0],
      mejgorod_value_2: car?.tarif_mejgorod[1][1],
      mejgorod_name_3: car?.tarif_mejgorod[2][0],
      mejgorod_value_3: car?.tarif_mejgorod[2][1],
      mejgorod_name_4: car?.tarif_mejgorod[3][0],
      mejgorod_value_4: car?.tarif_mejgorod[3][1],
      mejgorod_name_5: car?.tarif_mejgorod[4][0],
      mejgorod_value_5: car?.tarif_mejgorod[4][1],
      mejgorod_name_6: car?.tarif_mejgorod[5][0],
      mejgorod_value_6: car?.tarif_mejgorod[5][1],
      mejgorod_name_7: car?.tarif_mejgorod[6][0],
      mejgorod_value_7: car?.tarif_mejgorod[6][1],
      mejgorod_name_8: car?.tarif_mejgorod[7][0],
      mejgorod_value_8: car?.tarif_mejgorod[7][1],
      mejgorod_name_9: car?.tarif_mejgorod[8][0],
      mejgorod_value_9: car?.tarif_mejgorod[8][1],
      mejgorod_name_10: car?.tarif_mejgorod[9][0],
      mejgorod_value_10: car?.tarif_mejgorod[9][1],
      mejgorod_value_zalog: car?.tarif_mejgorod[10][1],
      mejgorod_value_dop_hour: car?.tarif_mejgorod[11][1],

      russia_name_1: car?.tarif_russia[0][0],
      russia_value_1: car?.tarif_russia[0][1],
      russia_name_2: car?.tarif_russia[1][0],
      russia_value_2: car?.tarif_russia[1][1],
      russia_name_3: car?.tarif_russia[2][0],
      russia_value_3: car?.tarif_russia[2][1],
      russia_name_4: car?.tarif_russia[3][0],
      russia_value_4: car?.tarif_russia[3][1],
      russia_name_5: car?.tarif_russia[4][0],
      russia_value_5: car?.tarif_russia[4][1],
      russia_name_6: car?.tarif_russia[5][0],
      russia_value_6: car?.tarif_russia[5][1],
      russia_name_7: car?.tarif_russia[6][0],
      russia_value_7: car?.tarif_russia[6][1],
      russia_name_8: car?.tarif_russia[7][0],
      russia_value_8: car?.tarif_russia[7][1],
      russia_name_9: car?.tarif_russia[8][0],
      russia_value_9: car?.tarif_russia[8][1],
      russia_name_10: car?.tarif_russia[9][0],
      russia_value_10: car?.tarif_russia[9][1],
      russia_value_zalog: car?.tarif_russia[10][1],
      russia_value_dop_hour: car?.tarif_russia[11][1],
    });

    this.avatar = car.avatar
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



  // Обрабатываем кнопку загрузки тригиря клик по скрытому инпуту
  triggerClickForUploadAvatar() {
    this.upload.nativeElement.click();
  }




  // Обрабатываем загрузку картинок
  onFileUploadAvatar(event: any) {
    const file = event.target.files['0'];
    this.uploadFile = file;
    // Подключаем ридер для считывания картинки
    const reader = new FileReader();
    // Метод вызовется тогда, когда загрузится вся картинка
    reader.onload = () => {
      // Переменная для хранения информации об изображении
      this.avatar = reader.result;
    };
    // Читаем нужный нам файл
    reader.readAsDataURL(file);
  }




  onSubmit() {
    const car: Car = {
      _id: this.currentCar?._id,
      marka: this.form.value.marka,
      model: this.form.value.model,
      number: this.form.value.number,
      probeg: this.form.value.probeg,
      transmission: this.form.value.transmission,
      start_arenda: this.form.value.start_arenda,
      end_arenda: this.form.value.end_arenda,
      vladelec: this.form.value.vladelec,
      category: this.form.value.category,
      status: this.form.value.status,
      sts_seria: this.form.value.sts_seria,
      sts_number: this.form.value.sts_number,
      sts_date: this.form.value.sts_date,
      osago_seria: this.form.value.osago_seria,
      osago_number: this.form.value.osago_number,
      osago_date_finish: this.form.value.osago_date_finish,
      vin: this.form.value.vin,
      kuzov_number: this.form.value.kuzov_number,
      color: this.form.value.color,
      year_production: this.form.value.year_production,
      price_ocenka: this.form.value.price_ocenka,
      to_date: this.form.value.to_date,
      to_probeg_prev: this.form.value.to_probeg_prev,
      to_probeg_next: this.form.value.to_probeg_next,
      to_interval: this.form.value.to_interval,
      oil_name: this.form.value.oil_name,
      stoa_name: this.form.value.stoa_name,
      stoa_phone: this.form.value.stoa_phone,
      tarif_gorod: [
        [this.form.value.gorod_name_1, this.form.value.gorod_value_1],
        [this.form.value.gorod_name_2, this.form.value.gorod_value_2],
        [this.form.value.gorod_name_3, this.form.value.gorod_value_3],
        [this.form.value.gorod_name_4, this.form.value.gorod_value_4],
        [this.form.value.gorod_name_5, this.form.value.gorod_value_5],
        [this.form.value.gorod_name_6, this.form.value.gorod_value_6],
        [this.form.value.gorod_name_7, this.form.value.gorod_value_7],
        [this.form.value.gorod_name_8, this.form.value.gorod_value_8],
        [this.form.value.gorod_name_9, this.form.value.gorod_value_9],
        [this.form.value.gorod_name_10, this.form.value.gorod_value_10],
        ['zalog', this.form.value.gorod_value_zalog],
        ['dop_hour', this.form.value.gorod_value_dop_hour],
      ],
      tarif_mejgorod: [
        [this.form.value.mejgorod_name_1, this.form.value.mejgorod_value_1],
        [this.form.value.mejgorod_name_2, this.form.value.mejgorod_value_2],
        [this.form.value.mejgorod_name_3, this.form.value.mejgorod_value_3],
        [this.form.value.mejgorod_name_4, this.form.value.mejgorod_value_4],
        [this.form.value.mejgorod_name_5, this.form.value.mejgorod_value_5],
        [this.form.value.mejgorod_name_6, this.form.value.mejgorod_value_6],
        [this.form.value.mejgorod_name_7, this.form.value.mejgorod_value_7],
        [this.form.value.mejgorod_name_8, this.form.value.mejgorod_value_8],
        [this.form.value.mejgorod_name_9, this.form.value.mejgorod_value_9],
        [this.form.value.mejgorod_name_10, this.form.value.mejgorod_value_10],
        ['zalog', this.form.value.mejgorod_value_zalog],
        ['dop_hour', this.form.value.mejgorod_value_dop_hour],
      ],
      tarif_russia: [
        [this.form.value.russia_name_1, this.form.value.russia_value_1],
        [this.form.value.russia_name_2, this.form.value.russia_value_2],
        [this.form.value.russia_name_3, this.form.value.russia_value_3],
        [this.form.value.russia_name_4, this.form.value.russia_value_4],
        [this.form.value.russia_name_5, this.form.value.russia_value_5],
        [this.form.value.russia_name_6, this.form.value.russia_value_6],
        [this.form.value.russia_name_7, this.form.value.russia_value_7],
        [this.form.value.russia_name_8, this.form.value.russia_value_8],
        [this.form.value.russia_name_9, this.form.value.russia_value_9],
        [this.form.value.russia_name_10, this.form.value.russia_value_10],
        ['zalog', this.form.value.russia_value_zalog],
        ['dop_hour', this.form.value.russia_value_dop_hour],
      ],
    }

    this.store.dispatch(updateCarAction({ car: car, avatar: this.uploadFile }))
  }
}
