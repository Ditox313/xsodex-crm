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
  title: string = 'Просмотр автомобиля'
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
          this.pathValueCar(currentCar)
        }
      }
    })

    // Получаем селектор loader
    this.isLoadingSelector = this.store.pipe(select(isLoadingSelector))
  }




  pathValueCar(car: Car) {
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
    }

    this.store.dispatch(updateCarAction({ car: car, avatar: this.uploadFile }))
  }
}
