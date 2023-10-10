import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    
  }
}
