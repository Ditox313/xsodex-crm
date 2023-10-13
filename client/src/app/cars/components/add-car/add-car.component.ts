import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Car } from '../../types/cars.interfaces';
import { DatePipe } from '@angular/common';
import { CarsService } from '../../services/cars.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  title: string = 'Добавить автомобиль'
  form!: FormGroup;
  uploadFile!: File
  avatar: string | ArrayBuffer | undefined | null = 'https://phonoteka.org/uploads/posts/2023-03/1680212136_phonoteka-org-p-dmitrii-razvarov-art-instagram-90.jpg';
  @ViewChild('upload') upload!: ElementRef;
  value!: string;


  constructor(private cars: CarsService, public datePipe: DatePipe,) { }

  ngOnInit(): void {
    this.initForm();
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



  // Обрабатываем кнопку загрузки тригиря клик по скрытому инпуту
  triggerClickForUploadAvatar() {
    this.upload.nativeElement.click();
  }


  onSubmit() {
    const car: Car = {
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
    

    this.cars.create(car, this.uploadFile).subscribe({
      next: (res)=> {
        console.log(res);
      }
    })
  }
}
