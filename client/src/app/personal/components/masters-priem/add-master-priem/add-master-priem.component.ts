import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { MasterPriem, UploadResponse } from '../../../types/masters-priem.interfaces';
import { DatePipe } from '@angular/common';
import { Store, select } from '@ngrx/store';
// import { addPartnerAction } from '../../store/actions/partners.action';
// import { isLoadingSelector } from '../../store/selectors';

@Component({
  selector: 'app-add-master-priem',
  templateUrl: './add-master-priem.component.html',
  styleUrls: ['./add-master-priem.component.css']
})
export class AddMasterPriemComponent {
  title: string = 'Добавить мастера-приемщика'
  form!: FormGroup;
  isLoadingSelector$!: Observable<boolean | null>
  // upload!: UploadResponse

  // Данные для загрузки файлов
  // isActive!: boolean;
  // uploadFiles: any = []
  // filesSrc: any = []


  constructor(public datePipe: DatePipe, private store: Store) { }


  ngOnInit(): void {
    this.initForm()
    this.initValues()
  }

  initForm() {
    this.form = new FormGroup({
      fio: new FormControl('', [Validators.required]),
    });
  }


  initValues() {
    // this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))
  }




  


  // Принимает загруженные файлы из модуля
  uploadFilesData(data: { isActive: boolean, uploadFiles: any[], filesSrc: any[] }) {
    // this.isActive = data.isActive;
    // this.uploadFiles = data.uploadFiles;
    // this.filesSrc = data.filesSrc;
  }



  onSubmit() {

    let fio = this.form.value.fio.split(' ');

    const masterPriem: MasterPriem = {
      name: fio[1],
      surname: fio[0],
      lastname: fio[2],
    };

    
    // this.store.dispatch(addPartnerAction({ partner: partner, files: this.uploadFiles }))

    console.log(masterPriem);
    
  }
}
