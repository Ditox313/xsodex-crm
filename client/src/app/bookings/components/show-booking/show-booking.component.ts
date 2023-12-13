import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Booking, Pay } from '../../types/bookings.interfaces';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getCurrentBookingSelector, isLoadingSelector } from '../../store/selectors';
import { bookingCreatePayAction, bookingGetCurrent, bookingGetCurrentReset } from '../../store/actions/bookings.action';
import { UserResponceRegister } from 'src/app/account/types/account.interfaces';
import { currentUserSelector } from 'src/app/account/store/selectors';
import { Smena } from 'src/app/smena/types/smena.interfaces';
import { isOpenedSmenaSelector } from 'src/app/smena/store/selectors';

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
  currentSmemaSelector!: Observable<Smena | null | undefined>
  currentSmemaSub$!: Subscription
  currentSmema!: Smena | null | undefined
  title: string = ''
  getParamsSub$!: Subscription
  bookingId!: string
  isVisibleModalPay: boolean = false





  constructor(public datePipe: DatePipe, private store: Store, private rote: ActivatedRoute,) { }

  ngOnInit(): void {
    this.initForm()
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

    //Отчищаем состояние 
    this.store.dispatch(bookingGetCurrentReset());

  }


  getParams() {
    this.getParamsSub$ = this.rote.params.subscribe((params: any) => {
      this.bookingId = params['id'];
    });
  }

  initForm() {
    this.form = new FormGroup({
      arenda: new FormControl('0',),
      typePayArenda: new FormControl('Наличные',),
      zalog: new FormControl('0',),
      typePayZalog: new FormControl('Наличные',),
      place_start_price: new FormControl('0',),
      place_end_price: new FormControl('0',),
      additional_services_price: new FormControl('0',),
    });
  }




  initValues() {

    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))

    //Отчищаем состояние 
    this.store.dispatch(bookingGetCurrentReset());

    //Отправляем запрос на получение брони
    this.store.dispatch(bookingGetCurrent({ id: this.bookingId }));

    this.currentBookingSelector = this.store.pipe(select(getCurrentBookingSelector))
    this.currentBookingSub$ = this.currentBookingSelector.subscribe({
      next: (currentBooking) => {
        this.currentBooking = currentBooking
        console.log('111',this.currentBooking);
        

        if (currentBooking) {
          this.title = `Просмотр брони №${currentBooking.order}`

          this.form.patchValue({
            // typePayArenda: 'Наличные',
            // typePayZalog: 'Наличные',
            place_start_price: currentBooking.place_start_price,
            place_end_price: currentBooking.place_end_price,
            additional_services_price: currentBooking.additional_services_price,
            zalog: currentBooking.zalog,
            arenda: currentBooking.arenda,
          })
        }
      }
    })
    


    // Получаем пользователя
    this.currentSmemaSelector = this.store.pipe(select(isOpenedSmenaSelector))
    this.currentSmemaSub$ = this.currentSmemaSelector.subscribe({
      next: (currentSmena) => {
        this.currentSmema = currentSmena
      }
    })



    this.currentUserSelector = this.store.pipe(select(currentUserSelector))
    this.currentUserSub$ = this.currentUserSelector.subscribe({
      next: (user) => {
        this.currentUser = user
      }
    })

   
  }

  // Регулируем видимость формы оплаты
  payBooking()
  {
    this.isVisibleModalPay = !this.isVisibleModalPay
  }

  // Выбираем тип оплаты аренды
  checkedTypeArenda(e: any)
  {
    this.form.value.typePayArenda = e
    console.log(this.form.value.typePayArenda);
    
  }

  // Выбираем тип оплаты залога
  checkedTypeZalog(e: any) {
    this.form.value.typePayZalog = e
    console.log(this.form.value.typePayZalog);
  }




  onSubmit() {

    // Создаем платежи
    const pay_1: Pay = {
      type: 'Аренда',
      pricePay: this.form.value.arenda || 0,
      typeMoney: this.form.value.typePayArenda,
      bookingId: this.bookingId,
      smenaId: this.currentSmema?._id,
      userId: this.currentUser?._id
    };


  
    const pay_2: Pay = {
      type: 'Залог',
      pricePay: this.form.value.zalog || 0,
      typeMoney: this.form.value.typePayZalog,
      bookingId: this.bookingId,
      smenaId: this.currentSmema?._id,
      userId: this.currentUser?._id
    };

    const pay_3: Pay = {
      type: 'Подача авто',
      pricePay: this.form.value.place_start_price || 0,
      typeMoney: this.form.value.typePayArenda,
      bookingId: this.bookingId,
      smenaId: this.currentSmema?._id,
      userId: this.currentUser?._id
    };


    const pay_4: Pay = {
      type: 'Доп.услуги',
      pricePay: this.form.value.additional_services_price || 0,
      typeMoney: this.form.value.typePayArenda,
      bookingId: this.bookingId,
      smenaId: this.currentSmema?._id,
      userId: this.currentUser?._id
    };


    const pay_5: Pay = {
      type: 'Прием авто',
      pricePay: this.form.value.place_end_price || 0,
      typeMoney: this.form.value.typePayArenda,
      bookingId: this.bookingId,
      smenaId: this.currentSmema?._id,
      userId: this.currentUser?._id
    };

    this.store.dispatch(bookingCreatePayAction({ pay_1, pay_2, pay_3, pay_4, pay_5}))


    // this.subCreatePay$ = this.pays.create(pay).pipe(
    //   switchMap(res => this.pays.create(pay_2)),
    //   switchMap(res => this.pays.create(pay_3)),
    //   switchMap(res => this.pays.create(pay_4)),
    //   switchMap(res => this.pays.create(pay_5)),
    //   switchMap(res => this.bookings.update_after_booking_pay(this.actualBooking._id, pay)),
    //   switchMap(res => this.bookings.update_after_booking_pay(this.actualBooking._id, pay_2)),
    //   switchMap(res => this.bookings.update_after_booking_pay(this.actualBooking._id, pay_3)),
    //   switchMap(res => this.bookings.update_after_booking_pay(this.actualBooking._id, pay_4)),
    //   switchMap(res => this.bookings.update_after_booking_pay(this.actualBooking._id, pay_5)),
    // ).subscribe((pay) => {
    //   MaterialService.toast('Платеж создан');
    //   this.router.navigate(['/view-booking', this.bookingId]);
    // });

    this.payBooking()
  }
}
