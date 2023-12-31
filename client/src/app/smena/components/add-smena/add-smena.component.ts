import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { currentUserSelector } from 'src/app/account/store/selectors';
import { isLoadingSelector } from 'src/app/smena/store/selectors';
import { UserResponceRegister } from 'src/app/account/types/account.interfaces';
import { DatePipe } from '@angular/common';
import { openSmenaAction } from '../../store/actions/smena.action';

@Component({
  selector: 'app-add-smena',
  templateUrl: './add-smena.component.html',
  styleUrls: ['./add-smena.component.css']
})
export class AddSmenaComponent implements OnDestroy{
  title: string = 'Создать смену'
  form!: FormGroup;
  isLoadingSelector$!: Observable<boolean | null>
  currentUserSelector$!: Observable<UserResponceRegister | null | undefined>
  currentUserSub$!: Subscription
  currentUser!: UserResponceRegister | null | undefined
  open_date: string= ''
  close_date: string= ''

  constructor(private store: Store, private datePipe: DatePipe) { }


  ngOnInit(): void {
    this.initionalForm()
    this.initValues()
    this.initDateOpenSmena()
  }

  ngOnDestroy(): void {
    if (this.currentUserSub$)
    {
      this.currentUserSub$.unsubscribe()
    }
  }


  initionalForm() {
    this.form = new FormGroup({
      responsible: new FormControl(null, [Validators.required]),
    });
  }


  initValues() {
    this.currentUserSelector$ = this.store.pipe(select(currentUserSelector))
    this.currentUserSub$ =  this.currentUserSelector$.subscribe({
      next: (user) => {
        this.currentUser = user
        if (user) {
          this.pathValueUser(user)
        }
      }
    })
    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))
  }


  pathValueUser(user: UserResponceRegister) {
    this.form.patchValue({
      responsible: user.secondName + ' ' + user.name + ' ' + user.lastName,
    });
  }


  initDateOpenSmena() {
    this.open_date = this.datePipe.transform(new Date(), 'dd.MM.yyyy HH:mm') || ''
  }



  onSubmit()
  {
    let responsible = this.form.value.responsible.split(' ');
    console.log(responsible);
    

    const smena = {
      open_date: this.open_date,
      responsible_name: responsible[1],
      responsible_secondName: responsible[0],
      responsible_lastName: responsible[2],
      status: 'open',
      close_date: this.close_date,
      userId: this.currentUser?._id || ''
    }

    this.store.dispatch(openSmenaAction({ smena }))
  }
}
