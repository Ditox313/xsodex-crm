import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Partner, UploadResponse } from '../../types/partners.interfaces';
import { DatePipe } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { addPartnerAction } from '../../store/actions/partners.action';
import { isLoadingSelector } from '../../store/selectors';


@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.css']
})
export class AddPartnerComponent {
  title: string = 'Добавить партнера'
  form!: FormGroup;
  isLoadingSelector$!: Observable<boolean | null>
  // upload!: UploadResponse

  // Данные для загрузки файлов
  isActive!: boolean;
  uploadFiles: any = []
  filesSrc: any = []


  constructor(public datePipe: DatePipe, private store: Store) { }


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
    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))
  }



  // Проверяем оканчивается ли строка на определенные символы.Внашем случае PDF
  // isPDF(str: any, suffix: any) {
  //   return new RegExp(suffix + '$').test(str);
  // };


  


  // Принимает загруженные файлы из модуля
  uploadFilesData(data: { isActive: boolean, uploadFiles: any[], filesSrc: any[] }) {
    this.isActive = data.isActive;
    this.uploadFiles = data.uploadFiles;
    this.filesSrc = data.filesSrc;
  }



  onSubmit() {

    let fio = this.form.value.fio.split(' ');
    let passport_seria_number = this.form.value.passport_seria_number.split('-');


    const partner: Partner = {
      name: fio[1],
      surname: fio[0],
      lastname: fio[2],
      passport_seria: passport_seria_number[0],
      passport_number: passport_seria_number[1],
      passport_date: this.form.value.passport_date,
      passport_who_take: this.form.value.passport_who_take,
      code_podrazdeleniya: this.form.value.code_podrazdeleniya,
      passport_register: this.form.value.passport_register,
      phone_1: this.form.value.phone_1,
      phone_2: this.form.value.phone_2,
    };

    
    this.store.dispatch(addPartnerAction({ partner: partner, files: this.uploadFiles }))
  }

}
