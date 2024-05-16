import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Action } from '@ngrx/store';
import { MasterPriem } from 'src/app/personal/types/masters-priem.interfaces';
import { masterPriemGetCurrent, masterPriemGetCurrentReset, updateMasterPriemAction } from 'src/app/personal/store/actions/masters-priem.action';
import { getCurrentMasterPriemSelector, isLoadingSelector } from 'src/app/personal/store/selectors';

@Component({
  selector: 'app-show-master-priem',
  templateUrl: './show-master-priem.component.html',
  styleUrls: ['./show-master-priem.component.css']
})
export class ShowMasterPriemComponent {
  form!: FormGroup;
  value!: string;
  isLoadingSelector$!: Observable<boolean | null>
  currentMasterPriemSelector!: Observable<MasterPriem | null | undefined>
  currentMasterPriemSub$!: Subscription
  currentMasterPriem!: MasterPriem | null | undefined
  title: string = ''
  edit: boolean = false
  getParamsSub$!: Subscription
  masterPriemId!: string


  isActive!: boolean;





  constructor(public datePipe: DatePipe, private store: Store, private rote: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getParams()
    this.initForm()
    this.initValues()

  }


  ngOnDestroy(): void {
    if (this.getParamsSub$) {
      this.getParamsSub$.unsubscribe()
    }
    if (this.currentMasterPriemSub$) {
      this.currentMasterPriemSub$.unsubscribe()
    }

    //Отчищаем состояние 
    this.store.dispatch(masterPriemGetCurrentReset());

  }




  getParams() {
    this.getParamsSub$ = this.rote.params.subscribe((params: any) => {
      this.masterPriemId = params['id'];
    });
  }



  initForm() {
    this.form = new FormGroup({
      phone: new FormControl(null),
      fio: new FormControl('', [Validators.required]),
      doverenostNumber: new FormControl(null),
      doverenostDate: new FormControl(null),
    });


    this.form.disable();
  }


  initValues() {
    //Отчищаем состояние
    this.store.dispatch(masterPriemGetCurrentReset());

    //Отправляем запрос на получение текущего партнера
    this.store.dispatch(masterPriemGetCurrent({ id: this.masterPriemId }));

    this.currentMasterPriemSelector = this.store.pipe(select(getCurrentMasterPriemSelector))
    this.currentMasterPriemSub$ = this.currentMasterPriemSelector.subscribe({
      next: (currentMasterPriem) => {
        this.currentMasterPriem = currentMasterPriem

        if (currentMasterPriem) {
          this.title = `Просмотр партнера ${currentMasterPriem.surname} ${currentMasterPriem.name}`
          this.pathValueMasterPriem(currentMasterPriem)
        }
      
      }
    })

    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))
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


  pathValueMasterPriem(masterPriem: MasterPriem) {
    this.form.patchValue({
      fio: masterPriem.surname + ' ' + masterPriem.name + ' ' + masterPriem.lastname,
      phone: masterPriem.phone,
      doverenostNumber: masterPriem.doverenostNumber,
      doverenostDate: masterPriem.doverenostDate,
    });
  }



onSubmit() {
  let fio = this.form.value.fio.split(' ');



  const masterPriem: MasterPriem = {
    _id: this.currentMasterPriem?._id,
    name: fio[1],
    surname: fio[0],
    lastname: fio[2],
    phone: this.form.value.phone,
    doverenostNumber: this.form.value.doverenostNumber,
    doverenostDate: this.form.value.doverenostDate,
  };


   this.store.dispatch(updateMasterPriemAction({ masterPriem: masterPriem}))

  }
}
