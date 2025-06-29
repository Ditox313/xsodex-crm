import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Booking, Pay } from '../../types/bookings.interfaces';
import { UserResponceRegister } from 'src/app/account/types/account.interfaces';
import { Smena } from 'src/app/smena/types/smena.interfaces';
import { DatePipe } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { bookingGetCurrent, bookingGetCurrentReset, closeBookingAction } from '../../store/actions/bookings.action';
import { getCurrentBookingSelector, isLoadingSelector } from '../../store/selectors';
import { isOpenedSmenaSelector } from 'src/app/smena/store/selectors';
import { currentUserSelector } from 'src/app/account/store/selectors';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/cars/types/cars.interfaces';
import { getCurrentCarSelector } from 'src/app/cars/store/selectors';
import { carGetCurrent } from 'src/app/cars/store/actions/cars.action';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-close-booking',
  templateUrl: './close-booking.component.html',
  styleUrls: ['./close-booking.component.css']
})
export class CloseBookingComponent {
  form!: FormGroup;
  isLoadingSelector$!: Observable<boolean | null>
  currentBookingSelector!: Observable<Booking | null | undefined>
  currentBookingSub$!: Subscription
  currentBooking!: Booking & { client: any } & { car: any } & { tarif: any } & { additional_services: any } | null | undefined;
  currentUserSelector!: Observable<UserResponceRegister | null | undefined>
  currentUserSub$!: Subscription
  currentUser!: UserResponceRegister | null | undefined
  currentSmemaSelector!: Observable<Smena | null | undefined>
  currentSmemaSub$!: Subscription
  currentSmema!: Smena | null | undefined
  title: string = ''
  getParamsSub$!: Subscription
  bookingId!: string
  currentCarSelector!: Observable<Car | null | undefined>
  currentCarSub$!: Subscription
  currentCar!: Car | null | undefined





  constructor(public datePipe: DatePipe, private store: Store, private rote: ActivatedRoute, private messageService: MessageService, ) { }

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

    if (this.currentSmemaSub$) {
      this.currentSmemaSub$.unsubscribe();
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
      booking_end: new FormControl('',),
      probeg_old: new FormControl(0),
      probeg: new FormControl(0, [Validators.required]),
      isCarClean: new FormControl(false),
      isCarFuel: new FormControl(false),
      outputZalog: new FormControl(0),
      typePayOutputZalog: new FormControl('Наличные'),
      comment: new FormControl(''),
      moyka: new FormControl(''),
      typePayMoyka: new FormControl('Наличные'),
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
        if (currentBooking) {
          this.title = `Закрыть бронь №${currentBooking.order}`
          this.store.dispatch(carGetCurrent({ id: this.currentBooking?.car._id }));
          this.form.controls['probeg_old'].disable();
        }
      }
    })




   
    this.currentCarSelector = this.store.pipe(select(getCurrentCarSelector))
    this.currentCarSub$ = this.currentCarSelector.subscribe({
      next: (currentCar) => {
        this.currentCar = currentCar

        this.form.patchValue({
          booking_end: this.currentBooking?.booking_end,
          probeg_old: currentCar?.probeg,
          outputZalog: this.currentBooking?.zalog,
          moyka: this.currentBooking && this.currentBooking?.additional_services[5] === false ? this.currentBooking?.additional_services[5].price : 0,
        })
      }
    })




    // Получаем смену
    this.currentSmemaSelector = this.store.pipe(select(isOpenedSmenaSelector))
    this.currentSmemaSub$ = this.currentSmemaSelector.subscribe({
      next: (currentSmena) => {
        this.currentSmema = currentSmena
      }
    })


    // Получаем текущего пользователя
    this.currentUserSelector = this.store.pipe(select(currentUserSelector))
    this.currentUserSub$ = this.currentUserSelector.subscribe({
      next: (user) => {
        this.currentUser = user
      }
    })

  
  }






  onSubmit() {
    const close = {
      date: this.form.value.booking_end,
      isCarClean: Boolean(this.form.value.isCarClean[0]) || false,
      isCarFuel: Boolean(this.form.value.isCarFuel[0]) || false,
      zalogOutput: +this.form.value.outputZalog,
      zalogOutputPart: this.currentBooking && this.currentBooking.zalog > this.form.value.outputZalog ? true : false,
      moyka: +this.form.value.moyka,
      comment: this.form.value.comment,
      oldProbeg: this.currentCar ? +this.currentCar.probeg : 0,
      newProbeg: +this.form.value.probeg,
      smenaIdClose:this.currentSmema?._id,
      userIdClose: this.currentUser?._id
    };



    const bookingUpdate = {
      booking_end: this.form.value.booking_end,
      zalog: this.currentBooking ? (+this.currentBooking?.zalog) - this.form.value.outputZalog : 0,
      summaFull: this.currentBooking ? +this.currentBooking.summaFull - +this.form.value.outputZalog + +this.form.value.moyka : 0,
      paidCount: this.currentBooking ? +this.currentBooking.paidCount - +this.form.value.outputZalog + +this.form.value.moyka : 0,
      status: 'Закрыта',
      _id: this.currentBooking?._id
    }



    let pay_1: Pay = {
      type: 'Залог',
      pricePay: -(+this.form.value.outputZalog),
      typeMoney: this.form.value.typePayOutputZalog,
      bookingId: this.currentBooking?._id,
      smenaId: this.currentSmema?._id,
      userId: this.currentUser?._id,
      clientId: this.currentBooking?.client._id
    };


    let pay_2: Pay = {
      type: 'Мойка',
      pricePay: +this.form.value.moyka,
      typeMoney: this.form.value.typePayMoyka,
      bookingId: this.currentBooking?._id,
      smenaId: this.currentSmema?._id,
      userId: this.currentUser?._id,
      clientId: this.currentBooking?.client._id
    };

    


    const data = {
      bookingUpdate: bookingUpdate,
      close: close,
      pay_1: pay_1,
      pay_2: pay_2,
      carId: this.currentCar?._id
    }


    // if (this.currentCar && (Number(this.currentCar.probeg) < Number(this.form.value.probeg))) {
    //   this.store.dispatch(closeBookingAction({ data: data }))
    // } else {
    //   this.messageService.add({ severity: 'error', summary: `Некорректный пробег`, detail: 'Исправьте значение!' });
    // }


    this.store.dispatch(closeBookingAction({ data: data }))

  }
}
