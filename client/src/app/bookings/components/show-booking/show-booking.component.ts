import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Booking } from '../../types/bookings.interfaces';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getCurrentBookingSelector, isLoadingSelector } from '../../store/selectors';
import { bookingGetCurrent } from '../../store/actions/bookings.action';
import { UserResponceRegister } from 'src/app/account/types/account.interfaces';
import { currentUserSelector } from 'src/app/account/store/selectors';

@Component({
  selector: 'app-show-booking',
  templateUrl: './show-booking.component.html',
  styleUrls: ['./show-booking.component.css']
})
export class ShowBookingComponent {
  form!: FormGroup;
  isLoadingSelector$!: Observable<boolean | null>
  currentBookingSelector!: Observable<Booking | null | undefined>
  currentBookingSub$!: Subscription
  currentBooking!: Booking & { client: any } & { car: any } & { tarif: any } & { additional_services : any} | null | undefined;
  currentUserSelector!: Observable<UserResponceRegister | null | undefined>
  currentUserSub$!: Subscription
  currentUser!: UserResponceRegister | null | undefined
  title: string = ''
  getParamsSub$!: Subscription
  bookingId!: string



  constructor(public datePipe: DatePipe, private store: Store, private rote: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getParams()
    this.initValues()
  }


  ngOnDestroy(): void {
    if (this.getParamsSub$) {
      this.getParamsSub$.unsubscribe()
    }
    if (this.currentBookingSub$) {
      this.currentBookingSub$.unsubscribe()
    }

    if (this.currentUserSub$) {
      this.currentUserSub$.unsubscribe();
    }

    //Отчищаем состояние currentCar
    // this.store.dispatch(partnerGetCurrentReset());

  }


  getParams() {
    this.getParamsSub$ = this.rote.params.subscribe((params: any) => {
      this.bookingId = params['id'];
    });
  }




  initValues() {

    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))

    //Отчищаем состояние currentCar
    // this.store.dispatch(partnerGetCurrentReset());

    //Отправляем запрос на получение брони
    this.store.dispatch(bookingGetCurrent({ id: this.bookingId }));

    this.currentBookingSelector = this.store.pipe(select(getCurrentBookingSelector))
    this.currentBookingSub$ = this.currentBookingSelector.subscribe({
      next: (currentBooking) => {
        this.currentBooking = currentBooking
        console.log('111',this.currentBooking);
        

        if (currentBooking) {
          this.title = `Просмотр брони №${currentBooking.order}`
        }
      }
    })



    this.currentUserSelector = this.store.pipe(select(currentUserSelector))
    this.currentUserSub$ = this.currentUserSelector.subscribe({
      next: (user) => {
        this.currentUser = user
      }
    })

   
  }




  onSubmit() {

    let fio = this.form.value.fio.split(' ');
    let passport_seria_number = this.form.value.passport_seria_number.split('-');


    // const partner: Partner = {
    //   _id: this.currentPartner?._id,
    //   name: fio[1],
    //   surname: fio[0],
    //   lastname: fio[2],
    //   passport_seria: passport_seria_number[0],
    //   passport_number: passport_seria_number[1],
    //   passport_date: this.form.value.passport_date,
    //   passport_who_take: this.form.value.passport_who_take,
    //   code_podrazdeleniya: this.form.value.code_podrazdeleniya,
    //   passport_register: this.form.value.passport_register,
    //   phone_1: this.form.value.phone_1,
    //   phone_2: this.form.value.phone_2,
    // };


    // this.store.dispatch(updatePartnerAction({ partner: partner, file_1: this.uploadFile_1, file_2: this.uploadFile_2, }))
  }
}
