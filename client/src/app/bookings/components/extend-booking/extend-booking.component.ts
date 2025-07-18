import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Booking, BookingData, BookingEtend, Pay } from '../../types/bookings.interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getCurrentBookingSelector, isLoadingSelector } from '../../store/selectors';
import { bookingGetCurrent, bookingGetCurrentReset, extendBookingAction } from '../../store/actions/bookings.action';
import { Store, select } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/cars/types/cars.interfaces';
import { getCurrentCarSelector } from 'src/app/cars/store/selectors';
import { carGetCurrent, carGetCurrentReset } from 'src/app/cars/store/actions/cars.action';
import { UserResponceRegister } from 'src/app/account/types/account.interfaces';
import { currentUserSelector } from 'src/app/account/store/selectors';
import { Smena } from 'src/app/smena/types/smena.interfaces';
import { isOpenedSmenaSelector } from 'src/app/smena/store/selectors';

@Component({
  selector: 'app-extend-booking',
  templateUrl: './extend-booking.component.html',
  styleUrls: ['./extend-booking.component.css']
})
export class ExtendBookingComponent {
  title: string = ''
  form!: FormGroup;
  isLoadingSelector$!: Observable<boolean | null>
  errorValidTarifMixedDays: boolean = false;
  currentBookingSelector!: Observable<Booking | null | undefined>
  currentBookingSub$!: Subscription
  currentBooking!: Booking & { client: any } & { car: any } & { extends?: any } & { tarif: any } & { booking_start: any }  & { additional_services: any } | null | undefined;
  currentCarSelector!: Observable<Car | null | undefined>
  currentCarSub$!: Subscription
  currentCar!: Car | null | undefined
  bookingId!: string
  getParamsSub$!: Subscription
  currentUserSelector!: Observable<UserResponceRegister | null | undefined>
  currentUserSub$!: Subscription
  currentUser!: UserResponceRegister | null | undefined
  currentSmemaSelector!: Observable<Smena | null | undefined>
  currentSmemaSub$!: Subscription
  currentSmema!: Smena | null | undefined

  booking: any  = {
    booking_start: '',
    booking_end: '',
    car: null,
    tarif: [
      { name: 'Город', status: 'no_active', tarif_price: 0, booking_days: 0, dop_hours: 0, dop_hours_price: 0 },
      { name: 'Межгород', status: 'no_active', tarif_price: 0, booking_days: 0, dop_hours: 0, dop_hours_price: 0 },
      { name: 'Россия', status: 'no_active', tarif_price: 0, booking_days: 0, dop_hours: 0, dop_hours_price: 0 }
    ],
    booking_days_extend: 0,
    tarifCheked: '',
    sale: 0,
    arenda: 0,
    arendaGorodMixed: 0,
    arendaMejGorodMixed: 0,
    arendaRussiaMixed: 0,
    zalog: 0,
    custome_zalog: false,
    place_start: '',
    place_start_price: 0,
    place_end: '',
    place_end_price: 0,
    custome_place_start: false,
    custome_place_end: false,
    additional_services: [
      { name: 'additionally_det_kreslo', status: false, price: 0 },
      { name: 'additionally_buster', status: false, price: 0 },
      { name: 'additionally_videoregister', status: false, price: 0 },
      { name: 'additionally_battery_charger', status: false, price: 0 },
      { name: 'additionally_antiradar', status: false, price: 0 },
      { name: 'moyka', price: 0 },
    ],
    additional_services_price: 0
  }

  minDateBooking: string = ''

  constructor(public datePipe: DatePipe, private store: Store, private messageService: MessageService, private rote: ActivatedRoute) { }


  ngOnInit(): void {
    this.getParams()
    this.initForm()
    this.initValues()
    this.customeZalogCheck()
    
  }

  ngOnDestroy(): void {
    if (this.getParamsSub$) {
      this.getParamsSub$.unsubscribe();
    }

    if (this.currentBookingSub$) {
      this.currentBookingSub$.unsubscribe();
    }

    if (this.currentCarSub$) {
      this.currentCarSub$.unsubscribe();
    }
    
    if (this.currentUserSub$) {
      this.currentUserSub$.unsubscribe();
    }

    if (this.currentSmemaSub$) {
      this.currentSmemaSub$.unsubscribe();
    }
    

    // Отчищаем состояние
    this.store.dispatch(bookingGetCurrentReset());
    this.store.dispatch(carGetCurrentReset());

  }


  getParams() {
    this.getParamsSub$ = this.rote.params.subscribe((params: any) => {
      this.bookingId = params['id'];
    });
  }

  initForm() {
    this.form = new FormGroup({
      booking_end: new FormControl('', [Validators.required]),
      booking_start: new FormControl(''),
      tarif: new FormControl('', [Validators.required]),
      sale: new FormControl(0),
      extra: new FormControl(0), 
      pay: new FormControl(0),
      custome_zalog: new FormControl(''),
      custome_zalog_value: new FormControl(''),
      tarif_mixed_gorod_days: new FormControl(0),
      tarif_mixed_mezjgorod_days: new FormControl(0),
      tarif_mixed_russia_days: new FormControl(0),
      typePayArenda: new FormControl('Наличные',),
    });
  }


  initValues() {
    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))

    //Отправляем запрос на получение брони
    this.store.dispatch(bookingGetCurrent({ id: this.bookingId }));


    // Получаем пользователя
    this.currentUserSelector = this.store.pipe(select(currentUserSelector))
    this.currentUserSub$ = this.currentUserSelector.subscribe({
      next: (user) => {
        this.currentUser = user
      }
    })


    // Отправляем запрос на получение текущей смены
    this.currentSmemaSelector = this.store.pipe(select(isOpenedSmenaSelector))
    this.currentSmemaSub$ = this.currentSmemaSelector.subscribe({
      next: (currentSmena) => {
        this.currentSmema = currentSmena

      }
    })


    // Получаем текущую бронь
    this.currentBookingSelector = this.store.pipe(select(getCurrentBookingSelector))
    this.currentBookingSub$ = this.currentBookingSelector.subscribe({
      next: (currentBooking) => {
        this.currentBooking = currentBooking

        if (currentBooking) {
          this.title = `Продление брони №${currentBooking.order}`


          this.booking.booking_start = currentBooking.booking_end
          this.minDateBooking = currentBooking.booking_end

          this.form.patchValue({
            booking_end: currentBooking.booking_end,
          })

          // this.form.patchValue({
          //   custome_zalog_value: currentBooking?.zalog,
          // })


          //Отправляем запрос на получение текущего автомобиля
          this.store.dispatch(carGetCurrent({ id: this.currentBooking?.car._id }));
          
        }
      }
    })



    

    this.currentCarSelector = this.store.pipe(select(getCurrentCarSelector))
    this.currentCarSub$ = this.currentCarSelector.subscribe({
      next: (currentCar) => {
        this.currentCar = currentCar
        this.booking.car = this.currentCar
      }
    })
  }



  // При выборе даты окончания брони
  checkedEndBookingDate(e: any) {
    // Получаем и устанавливаем  окончание  аренды
    this.booking.booking_end = e.target.value

    if (this.booking.tarif[0].status === 'active') {
      this.tarifGorod()
    }
    else if (this.booking.tarif[1].status === 'active') {
      this.tarifMejGorod()
    }
    else if (this.booking.tarif[2].status === 'active') {
      this.tarifRussia()
    }

    this.checkedTarif(this.form.value.tarif)
    
  }


  // При выборе тарифа
  checkedTarif(e: any) {
    const extra = +this.form.value.extra || 0;
    const sale = +this.form.value.sale || 0;

    if (e === 'Город') {
      this.booking.tarifCheked = e;
      this.tarifGorod();
      if (this.currentBooking) {
        this.form.patchValue({
          custome_zalog_value: this.booking.zalog,
          pay: (+this.booking.arenda) + (+this.booking.zalog - +this.currentBooking.zalog) - sale + extra
        });
      }
    }
    else if (e === 'Межгород') {
      this.booking.tarifCheked = e;
      this.tarifMejGorod();
      if (this.currentBooking) {
        this.form.patchValue({
          custome_zalog_value: this.booking.zalog,
          pay: (+this.booking.arenda) + (+this.booking.zalog - +this.currentBooking.zalog) - sale + extra
        });
      }
    }
    else if (e === 'Россия') {
      this.booking.tarifCheked = e;
      this.tarifRussia();
      if (this.currentBooking) {
        this.form.patchValue({
          custome_zalog_value: this.booking.zalog,
          pay: (+this.booking.arenda) + (+this.booking.zalog - +this.currentBooking.zalog) - sale + extra
        });
      }
    }
    else if (e === 'Смешанный') {
      this.booking.tarifCheked = e;
      this.booking.tarif[0].dop_hours = 0;
      this.booking.tarif[1].dop_hours = 0;
      this.booking.tarif[2].dop_hours = 0;
      this.tarifMixed();
      this.form.controls['custome_zalog_value'].disable();
    }
  }








  // Запускаем рассчет кол-ва дней и доп часов
  isBookingdays() {
    // Получаем знапчения начала и конца аренды
    const booking_start: any = new Date(this.booking.booking_start);
    const booking_end: any = new Date(this.booking.booking_end);
    return Math.round((booking_end - booking_start) / (1000 * 60 * 60 * 24));
  }



  isDopHour() {
    // Получаем знапчения начала и конца аренды
    const booking_start: any = new Date(this.booking.booking_start);
    const booking_end: any = new Date(this.booking.booking_end);

    // Считаем дополнительные часы
    const booking_days = (booking_end - booking_start) / (1000 * 60 * 60 * 24);


    // Если есть доп часы(booking_days не целое)
    if (!Number.isInteger(booking_days)) {
      return Math.floor(((booking_end - booking_start) / (1000 * 60 * 60)) % 24);
    }
    else {
      return 0
    }
  }





  // Считаем тариф город
  tarifGorod() {
    
    this.booking.tarif[0].status = 'active'
    this.booking.tarif[1].status = 'no_active'
    this.booking.tarif[2].status = 'no_active'
    this.booking.tarif[1].booking_days = 0
    this.booking.tarif[2].booking_days = 0
    this.booking.tarif[1].dop_hours = 0
    this.booking.tarif[2].dop_hours = 0
    this.booking.tarif[1].dop_hours_price = 0
    this.booking.tarif[2].dop_hours_price = 0
    this.booking.tarif[1].tarif_price = 0
    this.booking.tarif[2].tarif_price = 0
    



    this.booking.zalog = Number(this.booking.car?.tarif_gorod[this.booking.car?.tarif_gorod.length - 2][1])
    this.booking.tarif[0].booking_days = this.isBookingdays()
    this.booking.tarif[0].dop_hours = this.isDopHour()




    this.booking.car?.tarif_gorod.forEach((period: any) => {
      let interval = period[0].split('-')
      if ((this.booking.tarif[0].booking_days + this.currentBooking?.tarif[0].booking_days) >= interval[0] && (this.booking.tarif[0].booking_days + this.currentBooking?.tarif[0].booking_days) <= interval[1]) {
        this.booking.arenda = this.booking.tarif[0].booking_days * Number(period[1]) + (this.booking.car?.tarif_gorod[this.booking.car?.tarif_gorod.length - 1][1] * this.booking.tarif[0].dop_hours)
        this.booking.tarif[0].tarif_price = Number(period[1])
        this.booking.tarif[0].dop_hours_price = Number(this.booking.car?.tarif_gorod[this.booking.car?.tarif_gorod.length - 1][1])
      }

      if ((this.booking.tarif[0].booking_days + this.currentBooking?.tarif[0].booking_days) >= interval[0] && interval[1] === '00') {
        this.booking.arenda = this.booking.tarif[0].booking_days * Number(period[1]) + (this.booking.car?.tarif_gorod[this.booking.car?.tarif_gorod.length - 1][1] * this.booking.tarif[0].dop_hours)
        this.booking.tarif[0].tarif_price = Number(period[1])
        this.booking.tarif[0].dop_hours_price = Number(this.booking.car?.tarif_gorod[this.booking.car?.tarif_gorod.length - 1][1])
      }
    });


    
  }

  // Считаем тариф межгород
  tarifMejGorod() {
    this.booking.tarif[0].status = 'no_active'
    this.booking.tarif[1].status = 'active'
    this.booking.tarif[2].status = 'no_active'

    this.booking.tarif[0].booking_days = 0
    this.booking.tarif[2].booking_days = 0

    this.booking.tarif[0].dop_hours = 0
    this.booking.tarif[2].dop_hours = 0

    this.booking.tarif[0].dop_hours_price = 0
    this.booking.tarif[2].dop_hours_price = 0

    this.booking.tarif[0].tarif_price = 0
    this.booking.tarif[2].tarif_price = 0





    this.booking.zalog = Number(this.booking.car?.tarif_mejgorod[this.booking.car?.tarif_mejgorod.length - 2][1])
    this.booking.tarif[1].booking_days = this.isBookingdays() 
    this.booking.tarif[1].dop_hours = this.isDopHour()




    this.booking.car?.tarif_mejgorod.forEach((period: any) => {
      let interval = period[0].split('-')
      if ((this.booking.tarif[1].booking_days + this.currentBooking?.tarif[1].booking_days) >= interval[0] && (this.booking.tarif[1].booking_days + this.currentBooking?.tarif[1].booking_days) <= interval[1]) {
        this.booking.arenda = this.booking.tarif[1].booking_days * Number(period[1]) + (this.booking.car?.tarif_mejgorod[this.booking.car?.tarif_mejgorod.length - 1][1] * this.booking.tarif[1].dop_hours)
        this.booking.tarif[1].tarif_price = Number(period[1])
        this.booking.tarif[1].dop_hours_price = Number(this.booking.car?.tarif_mejgorod[this.booking.car?.tarif_mejgorod.length - 1][1])

      }

      if ((this.booking.tarif[1].booking_days + this.currentBooking?.tarif[1].booking_days) >= interval[0] && interval[1] === '00') {
        this.booking.arenda = this.booking.tarif[1].booking_days * Number(period[1]) + (this.booking.car?.tarif_mejgorod[this.booking.car?.tarif_mejgorod.length - 1][1] * this.booking.tarif[1].dop_hours)
        this.booking.tarif[1].tarif_price = Number(period[1])
        this.booking.tarif[1].dop_hours_price = Number(this.booking.car?.tarif_mejgorod[this.booking.car?.tarif_mejgorod.length - 1][1])

      }
    });

  }


  // Считаем тариф Россия
  tarifRussia() {
    this.booking.tarif[0].status = 'no_active'
    this.booking.tarif[1].status = 'no_active'
    this.booking.tarif[2].status = 'active'

    this.booking.tarif[0].booking_days = 0
    this.booking.tarif[1].booking_days = 0

    this.booking.tarif[0].dop_hours = 0
    this.booking.tarif[1].dop_hours = 0

    this.booking.tarif[0].dop_hours_price = 0
    this.booking.tarif[1].dop_hours_price = 0

    this.booking.tarif[0].tarif_price = 0
    this.booking.tarif[1].tarif_price = 0





    this.booking.zalog = Number(this.booking.car?.tarif_russia[this.booking.car?.tarif_russia.length - 2][1])
    this.booking.tarif[2].booking_days = this.isBookingdays()
    this.booking.tarif[2].dop_hours = this.isDopHour()




    this.booking.car?.tarif_russia.forEach((period: any) => {
      let interval = period[0].split('-')
      if ((this.booking.tarif[2].booking_days + this.currentBooking?.tarif[2].booking_days) >= interval[0] && (this.booking.tarif[2].booking_days + this.currentBooking?.tarif[2].booking_days) <= interval[1]) {
        this.booking.arenda = this.booking.tarif[2].booking_days * Number(period[1]) + (this.booking.car?.tarif_russia[this.booking.car?.tarif_russia.length - 1][1] * this.booking.tarif[2].dop_hours)
        this.booking.tarif[2].tarif_price = Number(period[1])
        this.booking.tarif[2].dop_hours_price = Number(this.booking.car?.tarif_russia[this.booking.car?.tarif_russia.length - 1][1])
      }

      if ((this.booking.tarif[2].booking_days + this.currentBooking?.tarif[2].booking_days) >= interval[0] && interval[1] === '00') {
        this.booking.arenda = this.booking.tarif[2].booking_days * Number(period[1]) + (this.booking.car?.tarif_russia[this.booking.car?.tarif_russia.length - 1][1] * this.booking.tarif[2].dop_hours)
        this.booking.tarif[2].tarif_price = Number(period[1])
        this.booking.tarif[2].dop_hours_price = Number(this.booking.car?.tarif_russia[this.booking.car?.tarif_russia.length - 1][1])
      }
    });
  }




  // Считаем смешанный тариф
  tarifMixed() {
    this.booking.tarif[0].status = 'no_active'
    this.booking.tarif[1].status = 'no_active'
    this.booking.tarif[2].status = 'no_active'

    this.booking.tarif[0].booking_days = 0
    this.booking.tarif[1].booking_days = 0
    this.booking.tarif[2].booking_days = 0

    this.booking.tarif[0].dop_hours = 0
    this.booking.tarif[1].dop_hours = 0
    this.booking.tarif[2].dop_hours = 0

    this.booking.tarif[0].dop_hours_price = 0
    this.booking.tarif[1].dop_hours_price = 0
    this.booking.tarif[2].dop_hours_price = 0

    this.booking.tarif[0].tarif_price = 0
    this.booking.tarif[1].tarif_price = 0
    this.booking.tarif[2].tarif_price = 0

    this.booking.arenda = 0
    this.booking.zalog = 0


    this.form.patchValue({
      custome_zalog: ['true'],
      tarif_mixed_gorod_days: 0,
      tarif_mixed_mezjgorod_days: 0,
      tarif_mixed_russia_days: 0,
      custome_zalog_value: 0
    })
    this.booking.custome_zalog = true


  }



  // При выборе кол-ва дней смешанного тарифа - город
  tarifMixedGorodDays(e: any) {
  this.booking.tarif[0].booking_days = e | 0

  const extra = this.form.value.extra || 0;

  if (e === null || e === 0) {
    this.booking.arendaGorodMixed = 0
    this.booking.arenda = this.booking.arendaGorodMixed + this.booking.arendaMejGorodMixed + this.booking.arendaRussiaMixed
    this.booking.tarif[0].tarif_price = 0
    this.booking.tarif[0].dop_hours_price = 0
  } else {
    if (this.booking.tarif[0].booking_days + this.booking.tarif[1].booking_days + this.booking.tarif[2].booking_days > this.isBookingdays()) {
      this.form.patchValue({ tarif_mixed_gorod_days: 0 })
      this.errorValidTarifMixedDays = true
    } else {
      this.errorValidTarifMixedDays = false
    }

    if (e !== 0 && e !== null) {
      this.booking.tarif[0].status = 'active'
    } else {
      this.booking.tarif[0].status = 'no_active'
    }

    this.booking.car?.tarif_gorod.forEach((period: any) => {
      let interval = period[0].split('-')
      if ((this.booking.tarif[0].booking_days + this.currentBooking?.tarif[0].booking_days) >= interval[0] && 
          ((this.booking.tarif[0].booking_days + this.currentBooking?.tarif[0].booking_days) <= interval[1] || interval[1] === '00')) {
        this.booking.arendaGorodMixed = this.booking.tarif[0].booking_days * Number(period[1]) + 
          (this.booking.car?.tarif_gorod[this.booking.car?.tarif_gorod.length - 1][1] * this.booking.tarif[0].dop_hours)
        this.booking.arenda = this.booking.arendaGorodMixed + this.booking.arendaMejGorodMixed + this.booking.arendaRussiaMixed
        this.booking.tarif[0].tarif_price = Number(period[1])
        this.booking.tarif[0].dop_hours_price = Number(this.booking.car?.tarif_gorod[this.booking.car?.tarif_gorod.length - 1][1])
      }
    });

    this.form.patchValue({
      pay: this.booking.arenda - this.form.value.sale + extra
    })

    this.form.controls['custome_zalog_value'].enable();

  }
  }



  // При выборе кол-ва дней смешанного тарифа - межгород
  tarifMixedMejgorodDays(e: any) {
  this.booking.tarif[1].booking_days = e | 0

  const extra = this.form.value.extra || 0;

  if (e === null || e === 0) {
    this.booking.arendaMejGorodMixed = 0
    this.booking.arenda = this.booking.arendaGorodMixed + this.booking.arendaMejGorodMixed + this.booking.arendaRussiaMixed
    this.booking.tarif[1].tarif_price = 0
    this.booking.tarif[1].dop_hours_price = 0
  } else {
    if (this.booking.tarif[0].booking_days + this.booking.tarif[1].booking_days + this.booking.tarif[2].booking_days > this.isBookingdays()) {
      this.form.patchValue({ tarif_mixed_mezjgorod_days: 0 })
      this.errorValidTarifMixedDays = true
    } else {
      this.errorValidTarifMixedDays = false
    }

    if (e !== 0 && e !== null) {
      this.booking.tarif[1].status = 'active'
    } else {
      this.booking.tarif[1].status = 'no_active'
    }

    this.booking.car?.tarif_mejgorod.forEach((period: any) => {
      let interval = period[0].split('-')
      if ((this.booking.tarif[1].booking_days + this.currentBooking?.tarif[1].booking_days) >= interval[0] && 
          ((this.booking.tarif[1].booking_days + this.currentBooking?.tarif[1].booking_days) <= interval[1] || interval[1] === '00')) {
        this.booking.arendaMejGorodMixed = this.booking.tarif[1].booking_days * Number(period[1]) + 
          (this.booking.car?.tarif_mejgorod[this.booking.car?.tarif_mejgorod.length - 1][1] * this.booking.tarif[1].dop_hours)
        this.booking.arenda = this.booking.arendaGorodMixed + this.booking.arendaMejGorodMixed + this.booking.arendaRussiaMixed
        this.booking.tarif[1].tarif_price = Number(period[1])
        this.booking.tarif[1].dop_hours_price = Number(this.booking.car?.tarif_mejgorod[this.booking.car?.tarif_mejgorod.length - 1][1])
      }
    });

    this.form.patchValue({
      pay: this.booking.arenda - this.form.value.sale + extra
    })

    this.form.controls['custome_zalog_value'].enable();

  }
  }




  // При выборе кол-ва дней смешанного тарифа - Россия
  tarifMixedRussiaDays(e: any) {
  this.booking.tarif[2].booking_days = e | 0

  const extra = this.form.value.extra || 0;

  if (e === null || e === 0) {
    this.booking.arendaRussiaMixed = 0
    this.booking.arenda = this.booking.arendaGorodMixed + this.booking.arendaMejGorodMixed + this.booking.arendaRussiaMixed
    this.booking.tarif[2].tarif_price = 0
    this.booking.tarif[2].dop_hours_price = 0
  } else {
    if (this.booking.tarif[0].booking_days + this.booking.tarif[1].booking_days + this.booking.tarif[2].booking_days > this.isBookingdays()) {
      this.form.patchValue({ tarif_mixed_russia_days: 0 })
      this.errorValidTarifMixedDays = true
    } else {
      this.errorValidTarifMixedDays = false
    }

    if (e !== 0 && e !== null) {
      this.booking.tarif[2].status = 'active'
    } else {
      this.booking.tarif[2].status = 'no_active'
    }

    this.booking.car?.tarif_russia.forEach((period: any) => {
      let interval = period[0].split('-')
      if ((this.booking.tarif[2].booking_days + this.currentBooking?.tarif[2].booking_days) >= interval[0] && 
          ((this.booking.tarif[2].booking_days + this.currentBooking?.tarif[2].booking_days) <= interval[1] || interval[1] === '00')) {
        this.booking.arendaRussiaMixed = this.booking.tarif[2].booking_days * Number(period[1]) + 
          (this.booking.car?.tarif_russia[this.booking.car?.tarif_russia.length - 1][1] * this.booking.tarif[2].dop_hours)
        this.booking.arenda = this.booking.arendaGorodMixed + this.booking.arendaMejGorodMixed + this.booking.arendaRussiaMixed
        this.booking.tarif[2].tarif_price = Number(period[1])
        this.booking.tarif[2].dop_hours_price = Number(this.booking.car?.tarif_russia[this.booking.car?.tarif_russia.length - 1][1])
      }
    });

    this.form.controls['custome_zalog_value'].enable();

    this.form.patchValue({
      pay: this.booking.arenda - this.form.value.sale + extra
    })

  }
  }







  // Проверяем нажат кастомный залог
  customeZalogCheck() {
    // Задаем значение true или false кастомному залогу
    this.booking.custome_zalog = !this.booking.custome_zalog


    // Отчищаем поле значения при клике
    this.form.controls['custome_zalog_value'].reset();


    // Если кастомный залог false то ставим залог по умолчанию в соответствии с тарифом
    if (!this.booking.custome_zalog) {
      if (this.booking.tarif[0].status === 'active') {
        this.booking.zalog = Number(this.booking.car?.tarif_gorod[this.booking.car?.tarif_gorod.length - 2][1])
      }
      else if (this.booking.tarif[1].status === 'active') {
        this.booking.zalog = Number(this.booking.car?.tarif_mejgorod[this.booking.car?.tarif_mejgorod.length - 2][1])
      }
      else if (this.booking.tarif[2].status === 'active') {
        this.booking.zalog = Number(this.booking.car?.tarif_russia[this.booking.car?.tarif_russia.length - 2][1])
      }

    }

  }


  // Присваеваем значение кастомного залога
  customeZalogValue(e: any) {
    this.booking.zalog = Number(e.target.value);

    const extra = +this.form.value.extra || 0;
    const sale = +this.form.value.sale || 0;

    if (this.currentBooking && this.booking.zalog > this.currentBooking.zalog) {
      this.form.patchValue({
        pay: (+this.booking.arenda) + (+this.booking.zalog - +this.currentBooking.zalog) - sale + extra
      });
    }
    else if (this.currentBooking && this.booking.zalog < this.currentBooking.zalog) {
      this.form.patchValue({
        pay: (+this.booking.arenda) + (+this.booking.zalog - +this.currentBooking.zalog) - sale + extra
      });
    }
    else if (this.currentBooking && this.booking.zalog === this.currentBooking.zalog) {
      this.form.patchValue({
        pay: (+this.booking.arenda) - sale + extra
      });
    }
  }








  // Выбираем тип оплаты продления
  checkedTypeExtend(e: any) {
    this.form.value.typePayArenda = e
  }


  // Выбираем вводе скидки
  checkedSale(e: any) {
    const extra = +this.form.value.extra || 0;
    const sale = +this.form.value.sale || 0;

    if (this.currentBooking && this.booking.zalog > this.currentBooking.zalog) {
      this.form.patchValue({
        pay: (+this.booking.arenda) + (+this.booking.zalog - +this.currentBooking.zalog) - sale + extra
      });
    }
    else if (this.currentBooking && this.booking.zalog < this.currentBooking.zalog) {
      this.form.patchValue({
        pay: (+this.booking.arenda) + (+this.booking.zalog - +this.currentBooking.zalog) - sale + extra
      });
    }
    else if (this.currentBooking && this.booking.zalog === this.currentBooking.zalog) {
      this.form.patchValue({
        pay: (+this.booking.arenda) - sale + extra
      });
    }
  }







  // Выбираем вводе наценки
  checkedExtra(e: any) {
    if (!this.currentBooking) {
      return;
    }

    // приводим sale и extra к числу
    const sale  = +this.form.value.sale  || 0;
    const extra = +e                   || 0;  // можно +this.form.value.extra

    const basePay = this.booking.arenda
                  + (this.booking.zalog - +this.currentBooking.zalog);

    this.form.patchValue({
      pay: basePay - sale + extra
    });
  }

  




onSubmit() {
  const sale  = +this.form.value.sale  || 0;
  const extra = +this.form.value.extra || 0;

  const extend = {
    date: new Date(),
    extend_days: this.booking.tarifCheked === 'Смешанный'
      ? this.booking.tarif[0].booking_days
        + this.booking.tarif[1].booking_days
        + this.booking.tarif[2].booking_days
      : this.isBookingdays(),
    summ: +this.booking.arenda,
    sale,
    tariff: this.booking.tarifCheked
  };


  this.booking.tarif[0].booking_days += this.currentBooking?.tarif[0].booking_days;
  this.booking.tarif[1].booking_days += this.currentBooking?.tarif[1].booking_days;
  this.booking.tarif[2].booking_days += this.currentBooking?.tarif[2].booking_days;
  this.booking.tarif[0].dop_hours += this.currentBooking?.tarif[0].dop_hours;
  this.booking.tarif[1].dop_hours += this.currentBooking?.tarif[1].dop_hours;
  this.booking.tarif[2].dop_hours += this.currentBooking?.tarif[2].dop_hours;
  this.booking.tarif[0].dop_hours_price += this.currentBooking?.tarif[0].dop_hours_price;
  this.booking.tarif[1].dop_hours_price += this.currentBooking?.tarif[1].dop_hours_price;
  this.booking.tarif[2].dop_hours_price += this.currentBooking?.tarif[2].dop_hours_price;

  let pay_1: Pay = {
    type: 'Продление брони',
    pricePay: +this.booking.arenda - sale + extra,
    typeMoney: this.form.value.typePayArenda,
    bookingId: this.currentBooking?._id,
    smenaId:   this.currentSmema?._id,
    userId:    this.currentUser?._id,
    clientId:  this.currentBooking?.client._id
  };

  let pay_2: Pay = {
    type: 'Залог',
    pricePay: 0,
    typeMoney: this.form.value.typePayArenda,
    bookingId: this.currentBooking?._id,
    smenaId:   this.currentSmema?._id,
    userId:    this.currentUser?._id,
    clientId:  this.currentBooking?.client._id
  };

  if (this.currentBooking && this.booking.zalog > this.currentBooking.zalog) {
    pay_2 = {
      type: 'Залог',
      pricePay: this.booking.zalog - +this.currentBooking.zalog,
      typeMoney: this.form.value.typePayArenda,
      bookingId: this.currentBooking._id,
      smenaId:   this.currentSmema?._id,
      userId:    this.currentUser?._id,
      clientId:  this.currentBooking.client._id
    };

    const booking: Booking = {
      _id: this.currentBooking._id,
      extends: [...this.currentBooking.extends, extend],
      booking_start: this.currentBooking.booking_start,
      booking_end:   this.booking.booking_end,
      booking_days:  this.booking.tarif[0].booking_days + this.booking.tarif[1].booking_days + this.booking.tarif[2].booking_days + this.currentBooking.booking_days,
      car:         this.currentBooking.car,
      tarif:       this.booking.tarif,
      tarifCheked: this.booking.tarifCheked,
      client:      this.currentBooking.client,
      place_start: this.currentBooking.place_start  || '',
      place_start_price: this.currentBooking.place_start_price || 0,
      place_end:   this.currentBooking.place_end    || '',
      place_end_price:   this.currentBooking.place_end_price   || 0,
      arenda: +this.booking.arenda + +this.currentBooking.arenda - sale + extra,
      custome_place_start: this.currentBooking.custome_place_start || false,
      custome_place_end:   this.currentBooking.custome_place_end   || false,
      custome_zalog: this.booking.custome_zalog,
      additional_services:       this.currentBooking.additional_services,
      additional_services_price: this.currentBooking.additional_services_price || 0,
      smenaId: this.currentBooking.smenaId,
      summaFull: +this.booking.arenda
               + this.booking.zalog
               + +this.currentBooking.arenda
               + this.currentBooking.place_start_price
               + this.currentBooking.place_end_price
               + this.currentBooking.additional_services_price
               - sale + extra,
      zalog: this.booking.zalog,
      paidCount: +this.currentBooking.paidCount
                - (this.booking.zalog - +this.currentBooking.zalog)
                + +this.form.value.pay
                + +pay_2.pricePay,
      comment: this.currentBooking.comment,
      status:  this.currentBooking.status || '',
      sale:    sale + +this.currentBooking.sale,
      act:     this.currentBooking.act || '',
      userId:  this.currentBooking.userId,
    };

    this.store.dispatch(extendBookingAction({ data: { booking, pay_1, pay_2 } }));

  } else if (this.currentBooking && this.booking.zalog < this.currentBooking.zalog) {
    pay_2 = {
      type: 'Возврат залога',
      pricePay: this.booking.zalog - +this.currentBooking.zalog,
      typeMoney: this.form.value.typePayArenda,
      bookingId: this.currentBooking._id,
      smenaId:   this.currentSmema?._id,
      userId:    this.currentUser?._id,
      clientId:  this.currentBooking.client._id
    };

    const booking: Booking = {
      _id: this.currentBooking._id,
      extends: [...this.currentBooking.extends, extend],
      booking_start: this.currentBooking.booking_start,
      booking_end:   this.booking.booking_end,
      booking_days:  this.booking.tarif[0].booking_days + this.booking.tarif[1].booking_days + this.booking.tarif[2].booking_days + this.currentBooking.booking_days,
      car:         this.currentBooking.car,
      tarif:       this.booking.tarif,
      tarifCheked: this.booking.tarifCheked,
      client:      this.currentBooking.client,
      place_start: this.currentBooking.place_start  || '',
      place_start_price: this.currentBooking.place_start_price || 0,
      place_end:   this.currentBooking.place_end    || '',
      place_end_price:   this.currentBooking.place_end_price   || 0,
      arenda: +this.booking.arenda + +this.currentBooking.arenda - sale + extra,
      custome_place_start: this.currentBooking.custome_place_start || false,
      custome_place_end:   this.currentBooking.custome_place_end   || false,
      custome_zalog: this.booking.custome_zalog,
      additional_services:       this.currentBooking.additional_services,
      additional_services_price: this.currentBooking.additional_services_price || 0,
      smenaId: this.currentBooking.smenaId,
      summaFull: +this.booking.arenda
               + this.booking.zalog
               + +this.currentBooking.arenda
               + this.currentBooking.place_start_price
               + this.currentBooking.place_end_price
               + this.currentBooking.additional_services_price
               - sale + extra,
      zalog: this.booking.zalog,
      paidCount: +this.currentBooking.paidCount
                - (this.booking.zalog - +this.currentBooking.zalog)
                + +this.form.value.pay
                + +pay_2.pricePay,
      comment: this.currentBooking.comment,
      status:  this.currentBooking.status || '',
      sale:    sale + +this.currentBooking.sale,
      act:     this.currentBooking.act || '',
      userId:  this.currentBooking.userId,
    };

    this.store.dispatch(extendBookingAction({ data: { booking, pay_1, pay_2 } }));

  } else if (this.currentBooking && this.booking.zalog === this.currentBooking.zalog) {
    pay_2 = {
      type: 'Залог',
      pricePay: 0,
      typeMoney: this.form.value.typePayArenda,
      bookingId: this.currentBooking._id,
      smenaId:   this.currentSmema?._id,
      userId:    this.currentUser?._id,
      clientId:  this.currentBooking.client._id
    };

    const booking: Booking = {
      _id: this.currentBooking._id,
      extends: [...this.currentBooking.extends, extend],
      booking_start: this.currentBooking.booking_start,
      booking_end:   this.booking.booking_end,
      booking_days:  this.booking.tarif[0].booking_days + this.booking.tarif[1].booking_days + this.booking.tarif[2].booking_days + this.currentBooking.booking_days,
      car:         this.currentBooking.car,
      tarif:       this.booking.tarif,
      tarifCheked: this.booking.tarifCheked,
      client:      this.currentBooking.client,
      place_start: this.currentBooking.place_start  || '',
      place_start_price: this.currentBooking.place_start_price || 0,
      place_end:   this.currentBooking.place_end    || '',
      place_end_price:   this.currentBooking.place_end_price   || 0,
      arenda: +this.booking.arenda + +this.currentBooking.arenda - sale + extra,
      custome_place_start: this.currentBooking.custome_place_start || false,
      custome_place_end:   this.currentBooking.custome_place_end   || false,
      custome_zalog: this.booking.custome_zalog,
      additional_services:       this.currentBooking.additional_services,
      additional_services_price: this.currentBooking.additional_services_price || 0,
      smenaId: this.currentBooking.smenaId,
      summaFull: +this.booking.arenda
               + this.booking.zalog
               + +this.currentBooking.arenda
               + this.currentBooking.place_start_price
               + this.currentBooking.place_end_price
               + this.currentBooking.additional_services_price
               - sale + extra + +pay_2.pricePay,
      zalog: this.booking.zalog,
      paidCount: +this.currentBooking.paidCount + +this.form.value.pay + +pay_2.pricePay,
      comment: this.currentBooking.comment,
      status:  this.currentBooking.status || '',
      sale:    sale + +this.currentBooking.sale,
      act:     this.currentBooking.act || '',
      userId:  this.currentBooking.userId,
    };

    this.store.dispatch(extendBookingAction({ data: { booking, pay_1, pay_2 } }));
  }
}



}
