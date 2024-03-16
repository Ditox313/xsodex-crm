import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Partner } from '../../types/partners.interfaces';
import { DatePipe } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { addPartnerAction } from '../../store/actions/partners.action';
import { isLoadingSelector } from '../../store/selectors';
import { UploadResponse } from '..//../../shared/types/product-response';
import { PartnersService } from '../../services/partners.service';

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.css']
})
export class AddPartnerComponent {
  title: string = 'Добавить партнера'
  form!: FormGroup;
  isLoadingSelector$!: Observable<boolean | null>
  upload: UploadResponse = new UploadResponse();
  isActive!: boolean;
  uploadFiles: any = []
  filesSrc: any = []


  constructor(public datePipe: DatePipe, private store: Store, private partnersService: PartnersService,) { }


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
  isPDF(str: any, suffix: any) {
    return new RegExp(suffix + '$').test(str);
  };







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












  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = true;
  }

  onDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = false;
  }

  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    let droppedFiles = event.dataTransfer.files;
    if(droppedFiles.length > 0) {
      // this.onDroppedFile(droppedFiles)

      const fileArray = Array.from(droppedFiles);

      fileArray.forEach((file: any, i) => {
        this.uploadFiles.push(file)
        

        const reader = new FileReader();
        
        reader.onload = () => {
          if (this.uploadFiles[i].type !== 'application/pdf') {
            // Переменная для хранения информации об изображении
            this.filesSrc[i] = reader.result;
          }
          else {
            // Переменная для хранения информации об изображении
            this.filesSrc[i] = 'https://i.etsystatic.com/7267864/r/il/5235cc/1979275153/il_1588xN.1979275153_71s3.jpg';
          }
        };



        // Читаем нужный нам файл
        reader.readAsDataURL(file);
      });
    }
    this.isActive = false;
  }

  onDroppedFile(droppedFiles: any) {
    let formData = new FormData();
    for(let item of droppedFiles) {
      formData.append('userfiles', item);
    }

    this.partnersService.fileUpload(formData).subscribe(
      result => {
        this.upload = result;
      }
    )
  }


  
  onSelectedFile(event: any) {
    if (event.target.files.length > 0) {

      const fileArray = Array.from(event.target.files);

      fileArray.forEach((file: any, i) => {
        this.uploadFiles.push(file)
        

        const reader = new FileReader();
        
        reader.onload = () => {
          if (this.uploadFiles[i].type !== 'application/pdf') {
            // Переменная для хранения информации об изображении
            this.filesSrc[i] = reader.result;
          }
          else {
            // Переменная для хранения информации об изображении
            this.filesSrc[i] = 'https://i.etsystatic.com/7267864/r/il/5235cc/1979275153/il_1588xN.1979275153_71s3.jpg';
          }
        };



        // Читаем нужный нам файл
        reader.readAsDataURL(file);
      });

      // this.onDroppedFile(event.target.files);
    }
  }




  formatFileSize(size: number) {
    if (size < 1024) {
      return `${size} байт`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} КБ`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(2)} МБ`;
    }
  }


  onDeleteUploadInList(i: number)
  {
    this.uploadFiles.splice(i, 1);
    this.filesSrc.splice(i, 1);
    
  }


  
}
