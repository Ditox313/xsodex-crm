import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { MasterPriem } from '../../../types/masters-priem.interfaces';
import { DatePipe } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { addMasterPriemAction } from 'src/app/personal/store/actions/masters-priem.action';
import { isLoadingSelector } from 'src/app/personal/store/selectors';

@Component({
  selector: 'app-add-master-priem',
  templateUrl: './add-master-priem.component.html',
  styleUrls: ['./add-master-priem.component.css']
})
export class AddMasterPriemComponent {
  title: string = 'Добавить мастера-приемщика'
  form!: FormGroup;
  isLoadingSelector$!: Observable<boolean | null>


  constructor(public datePipe: DatePipe, private store: Store) { }


  ngOnInit(): void {
    this.initForm()
    this.initValues()
  }

  initForm() {
    this.form = new FormGroup({
      phone: new FormControl(null),
      fio: new FormControl('', [Validators.required]),
      doverenostNumber: new FormControl(null),
      doverenostDate: new FormControl(null),
    });
  }


  initValues() {
    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))
  }







  onSubmit() {

    let fio = this.form.value.fio.split(' ');

    const masterPriem: MasterPriem = {
      name: fio[1],
      surname: fio[0],
      lastname: fio[2],
      phone: this.form.value.phone,
      doverenostNumber: this.form.value.doverenostNumber,
      doverenostDate: this.form.value.doverenostDate,
    };

    
    this.store.dispatch(addMasterPriemAction({ masterPriem: masterPriem}))
    
  }
}
