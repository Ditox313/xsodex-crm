import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { currentUserSelector, isLoadingSelector } from 'src/app/account/store/selectors';
import { UserResponceRegister } from 'src/app/account/types/account.interfaces';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-smena',
  templateUrl: './add-smena.component.html',
  styleUrls: ['./add-smena.component.css']
})
export class AddSmenaComponent {
  title: string = 'Создать смену'
  form!: FormGroup;
  isLoadingSelector$!: Observable<boolean | null>
  currentUserSelector$!: Observable<UserResponceRegister | null | undefined>
  currentUser!: UserResponceRegister | null | undefined
  open_date: string | null= ''
  close_date: string | null= ''

  constructor(private store: Store, private datePipe: DatePipe) { }


  ngOnInit(): void {
    this.initionalForm()
    this.initValues()
    this.initDateOpenSmena()
  }


  initionalForm() {
    this.form = new FormGroup({
      responsible: new FormControl(null, [Validators.required]),
    });
  }


  initValues() {
    this.currentUserSelector$ = this.store.pipe(select(currentUserSelector))
    this.currentUserSelector$.subscribe({
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
      responsible: user.secondName + ' ' + user.secondName + ' ' + user.lastName,
    });
  }


  initDateOpenSmena() {
    this.open_date = this.datePipe.transform(new Date(), 'dd.MM.yyyy HH:mm')
  }



  onSubmit()
  {
    const smena = {
      open_date: this.open_date,
      responsible: this.form.value.responsible,
      status: 'open',
      close_date: this.close_date,
      userId: this.currentUser?._id
    }

    console.log(smena);
    



    // Отправляем запрос
    // this.subCreateSmena$ = this.smenaService.create(smena).subscribe((smena) => {
    //   MaterialService.toast('Смена создана');
    //   this.router.navigate(['/smena-list']);
    // });
  }
}
