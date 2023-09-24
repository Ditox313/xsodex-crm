import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserResponceRegister } from '../../types/account.interfaces';
import { Store, select } from '@ngrx/store';
import { currentUserSelector } from '../../store/selectors';

@Component({
  selector: 'app-account-setting-page',
  templateUrl: './account-setting-page.component.html',
  styleUrls: ['./account-setting-page.component.css']
})
export class AccountSettingPageComponent {
  title: string = 'Настройки аккаунта'
  form!: FormGroup; 
  currentUserSelector$!: Observable<UserResponceRegister | null | undefined>
  currentUser!: UserResponceRegister | null | undefined





  constructor(private store: Store) { }

  ngOnInit(): void {
    this.initionalForm();
    this.initValues()
  }

  initionalForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.minLength(6),
      ]),
      name: new FormControl(null, [Validators.required]),
      secondName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      doverenostNumber: new FormControl(null),
      doverenostDate: new FormControl(null),
    });
  }

  initValues() {
    this.currentUserSelector$ = this.store.pipe(select(currentUserSelector))
    this.currentUserSelector$.subscribe({
      next: (user) => {
        this.currentUser = user

        console.log(user);
        
        if(user)
        {
          this.form.patchValue({
            email: user.email,
            phone: user.phone,
            password: user.password,
            name: user.name,
            secondName: user.secondName,
            lastName: user.lastName,
            doverenostNumber: user.doverenostNumber,
            doverenostDate: user.doverenostDate,
          });
        }
      }
    })
  }



  onSubmitProfile()
  {

  }
}
