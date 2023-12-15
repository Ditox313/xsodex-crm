import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Booking, BookingData } from '../../types/bookings.interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getCurrentBookingSelector, isLoadingSelector } from '../../store/selectors';
import { bookingGetCurrent } from '../../store/actions/bookings.action';
import { Store, select } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

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
  currentBooking!: Booking & { client: any } & { car: any } & { tarif: any } & { additional_services: any } | null | undefined;
  bookingId!: string
  getParamsSub$!: Subscription

  booking: any  = {
    booking_start: '',
    booking_end: '',
    car: null,
    tarif: [
      { name: 'Город', status: 'no_active', tarif_price: 0, booking_days: 0, dop_hours: 0, dop_hours_price: 0 },
      { name: 'Межгород', status: 'no_active', tarif_price: 0, booking_days: 0, dop_hours: 0, dop_hours_price: 0 },
      { name: 'Россия', status: 'no_active', tarif_price: 0, booking_days: 0, dop_hours: 0, dop_hours_price: 0 }
    ],
    tarifCheked: '',
    arenda: 0,
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

  constructor(public datePipe: DatePipe, private store: Store, private messageService: MessageService, private rote: ActivatedRoute) { }


  ngOnInit(): void {
    this.getParams()
    this.initValues()
    this.initForm()
  }

  ngOnDestroy(): void {
    if (this.getParamsSub$) {
      this.getParamsSub$.unsubscribe();
    }

    if (this.currentBookingSub$) {
      this.currentBookingSub$.unsubscribe();
    }



    // Отчищаем состояние
    // this.store.dispatch(carsListResetAction());
    // this.store.dispatch(settingsAvtoparkListResetAction());

  }


  getParams() {
    this.getParamsSub$ = this.rote.params.subscribe((params: any) => {
      this.bookingId = params['id'];
    });
  }

  initForm() {
    this.form = new FormGroup({
      booking_end: new FormControl('', [Validators.required]),
      tarif: new FormControl('', [Validators.required]),
    });


    if (this.currentBooking)
    {
      this.form.patchValue({
        booking_end: this.currentBooking.booking_end,
        tarif: this.currentBooking.tarifCheked
      })
    } 
  }


  initValues() {
    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))



    //Отправляем запрос на получение брони
    this.store.dispatch(bookingGetCurrent({ id: this.bookingId }));

    this.currentBookingSelector = this.store.pipe(select(getCurrentBookingSelector))
    this.currentBookingSub$ = this.currentBookingSelector.subscribe({
      next: (currentBooking) => {
        this.currentBooking = currentBooking



        if (currentBooking) {
          this.title = `Продление брони №${currentBooking.order}`

          
          // this.booking.car = currentBooking.car
          // this.booking.tarif = currentBooking.tarif
          // this.booking.tarifCheked = currentBooking.tarifCheked
          // this.booking.arenda = +currentBooking.arenda
          // this.booking.zalog = +currentBooking.zalog,
          // this.booking.custome_zalog = currentBooking.custome_zalog
          // this.booking.place_start = currentBooking.place_start
          // this.booking.place_start_price = +currentBooking.place_start_price
          // this.booking.place_end = currentBooking.place_end
          // this.booking.place_end_price = +currentBooking.place_end_price
          // this.booking.custome_place_start = currentBooking.custome_place_start
          // this.booking.custome_place_end = currentBooking.custome_place_end
          // this.booking.additional_services = currentBooking.additional_services
          // this.booking.additional_services_price = +currentBooking.additional_services_price

        }
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

  }









  // При выборе тарифа
  checkedTarif(e: any) {
    if (e === 'Город') {
      this.booking.tarifCheked = e
      this.tarifGorod()
    }
    else if (e === 'Межгород') {
      this.booking.tarifCheked = e
      this.tarifMejGorod()
    }
    else if (e === 'Россия') {
      this.booking.tarifCheked = e
      this.tarifRussia()
    }
    else if (e === 'Смешанный') {
      this.booking.tarifCheked = e
      this.booking.tarif[0].dop_hours = 0
      this.booking.tarif[1].dop_hours = 0
      this.booking.tarif[2].dop_hours = 0
      this.tarifMixed()
    }

    console.log(this.booking);

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
    
    if(this.currentBooking)
    {
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

    }
    

    this.form.patchValue({
      custome_zalog: ['false']
    })
    this.booking.custome_zalog = false



    this.booking.zalog = Number(this.booking.car?.tarif_gorod[this.booking.car?.tarif_gorod.length - 2][1])
    this.booking.tarif[0].booking_days = this.isBookingdays()
    this.booking.tarif[0].dop_hours = this.isDopHour()




    this.booking.car?.tarif_gorod.forEach((period: any) => {
      let interval = period[0].split('-')
      if (this.booking.tarif[0].booking_days >= interval[0] && this.booking.tarif[0].booking_days <= interval[1]) {
        this.booking.arenda = this.booking.tarif[0].booking_days * Number(period[1]) + (this.booking.car?.tarif_gorod[this.booking.car?.tarif_gorod.length - 1][1] * this.booking.tarif[0].dop_hours)
        this.booking.tarif[0].tarif_price = Number(period[1])
        this.booking.tarif[0].dop_hours_price = Number(this.booking.car?.tarif_gorod[this.booking.car?.tarif_gorod.length - 1][1])
        console.log(this.booking);
      }

      if (this.booking.tarif[0].booking_days >= interval[0] && interval[1] === '00') {
        this.booking.arenda = this.booking.tarif[0].booking_days * Number(period[1]) + (this.booking.car?.tarif_gorod[this.booking.car?.tarif_gorod.length - 1][1] * this.booking.tarif[0].dop_hours)
        this.booking.tarif[0].tarif_price = Number(period[1])
        this.booking.tarif[0].dop_hours_price = Number(this.booking.car?.tarif_gorod[this.booking.car?.tarif_gorod.length - 1][1])
        console.log(this.booking);
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



    this.form.patchValue({
      custome_zalog: ['false']
    })
    this.booking.custome_zalog = false



    this.booking.zalog = Number(this.booking.car?.tarif_mejgorod[this.booking.car?.tarif_mejgorod.length - 2][1])
    this.booking.tarif[1].booking_days = this.isBookingdays()
    this.booking.tarif[1].dop_hours = this.isDopHour()




    this.booking.car?.tarif_mejgorod.forEach((period: any) => {
      let interval = period[0].split('-')
      if (this.booking.tarif[1].booking_days >= interval[0] && this.booking.tarif[1].booking_days <= interval[1]) {
        this.booking.arenda = this.booking.tarif[1].booking_days * Number(period[1]) + (this.booking.car?.tarif_mejgorod[this.booking.car?.tarif_mejgorod.length - 1][1] * this.booking.tarif[1].dop_hours)
        this.booking.tarif[1].tarif_price = Number(period[1])
        this.booking.tarif[1].dop_hours_price = Number(this.booking.car?.tarif_mejgorod[this.booking.car?.tarif_mejgorod.length - 1][1])
        console.log(this.booking);
      }

      if (this.booking.tarif[1].booking_days >= interval[0] && interval[1] === '00') {
        this.booking.arenda = this.booking.tarif[1].booking_days * Number(period[1]) + (this.booking.car?.tarif_mejgorod[this.booking.car?.tarif_mejgorod.length - 1][1] * this.booking.tarif[1].dop_hours)
        this.booking.tarif[1].tarif_price = Number(period[1])
        this.booking.tarif[1].dop_hours_price = Number(this.booking.car?.tarif_mejgorod[this.booking.car?.tarif_mejgorod.length - 1][1])
        console.log(this.booking);
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



    this.form.patchValue({
      custome_zalog: ['false']
    })
    this.booking.custome_zalog = false



    this.booking.zalog = Number(this.booking.car?.tarif_russia[this.booking.car?.tarif_russia.length - 2][1])
    this.booking.tarif[2].booking_days = this.isBookingdays()
    this.booking.tarif[2].dop_hours = this.isDopHour()




    this.booking.car?.tarif_russia.forEach((period: any) => {
      let interval = period[0].split('-')
      if (this.booking.tarif[2].booking_days >= interval[0] && this.booking.tarif[2].booking_days <= interval[1]) {
        this.booking.arenda = this.booking.tarif[2].booking_days * Number(period[1]) + (this.booking.car?.tarif_russia[this.booking.car?.tarif_russia.length - 1][1] * this.booking.tarif[2].dop_hours)
        this.booking.tarif[2].tarif_price = Number(period[1])
        this.booking.tarif[2].dop_hours_price = Number(this.booking.car?.tarif_russia[this.booking.car?.tarif_russia.length - 1][1])
        console.log(this.booking);
      }

      if (this.booking.tarif[2].booking_days >= interval[0] && interval[1] === '00') {
        this.booking.arenda = this.booking.tarif[2].booking_days * Number(period[1]) + (this.booking.car?.tarif_russia[this.booking.car?.tarif_russia.length - 1][1] * this.booking.tarif[2].dop_hours)
        this.booking.tarif[2].tarif_price = Number(period[1])
        this.booking.tarif[2].dop_hours_price = Number(this.booking.car?.tarif_russia[this.booking.car?.tarif_russia.length - 1][1])
        console.log(this.booking);
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


    console.log(this.booking);
  }



  // При выборе кол-ва дней смешанного тарифа - город
  tarifMixedGorodDays(e: any) {
    this.booking.tarif[0].booking_days = e | 0



    if (this.booking.tarif[0].booking_days + this.booking.tarif[1].booking_days + this.booking.tarif[2].booking_days > this.isBookingdays()) {
      this.form.patchValue({
        tarif_mixed_gorod_days: 0
      })
      this.errorValidTarifMixedDays = true
    }
    else {
      this.errorValidTarifMixedDays = false
    }




    if (e !== 0 && e !== null) {
      this.booking.tarif[0].status = 'active'
    }
    else {
      this.booking.tarif[0].status = 'no_active'
    }




    this.booking.car?.tarif_gorod.forEach((period: any) => {
      let interval = period[0].split('-')
      if (this.booking.tarif[0].booking_days >= interval[0] && this.booking.tarif[0].booking_days <= interval[1]) {
        this.booking.arenda += this.booking.tarif[0].booking_days * Number(period[1]) + (this.booking.car?.tarif_gorod[this.booking.car?.tarif_gorod.length - 1][1] * this.booking.tarif[0].dop_hours)
        this.booking.tarif[0].tarif_price = Number(period[1])
        this.booking.tarif[0].dop_hours_price = Number(this.booking.car?.tarif_gorod[this.booking.car?.tarif_gorod.length - 1][1])
        console.log(this.booking);
      }

      if (this.booking.tarif[0].booking_days >= interval[0] && interval[1] === '00') {
        this.booking.arenda += this.booking.tarif[0].booking_days * Number(period[1]) + (this.booking.car?.tarif_gorod[this.booking.car?.tarif_gorod.length - 1][1] * this.booking.tarif[0].dop_hours)
        this.booking.tarif[0].tarif_price = Number(period[1])
        this.booking.tarif[0].dop_hours_price = Number(this.booking.car?.tarif_gorod[this.booking.car?.tarif_gorod.length - 1][1])
        console.log(this.booking);
      }
    });

    console.log(this.booking);
  }


  // При выборе кол-ва дней смешанного тарифа - межгород
  tarifMixedMejgorodDays(e: any) {
    this.booking.tarif[1].booking_days = e | 0



    if (this.booking.tarif[0].booking_days + this.booking.tarif[1].booking_days + this.booking.tarif[2].booking_days > this.isBookingdays()) {
      this.form.patchValue({
        tarif_mixed_mezjgorod_days: 0
      })

      this.errorValidTarifMixedDays = true
    }
    else {
      this.errorValidTarifMixedDays = false
    }




    if (e !== 0 && e !== null) {
      this.booking.tarif[1].status = 'active'
    }
    else {
      this.booking.tarif[1].status = 'no_active'
    }





    this.booking.car?.tarif_mejgorod.forEach((period: any) => {
      let interval = period[0].split('-')
      if (this.booking.tarif[1].booking_days >= interval[0] && this.booking.tarif[1].booking_days <= interval[1]) {
        this.booking.arenda += this.booking.tarif[1].booking_days * Number(period[1]) + (this.booking.car?.tarif_mejgorod[this.booking.car?.tarif_mejgorod.length - 1][1] * this.booking.tarif[1].dop_hours)
        this.booking.tarif[1].tarif_price = Number(period[1])
        this.booking.tarif[1].dop_hours_price = Number(this.booking.car?.tarif_mejgorod[this.booking.car?.tarif_mejgorod.length - 1][1])
        console.log(this.booking);
      }

      if (this.booking.tarif[1].booking_days >= interval[0] && interval[1] === '00') {
        this.booking.arenda += this.booking.tarif[1].booking_days * Number(period[1]) + (this.booking.car?.tarif_mejgorod[this.booking.car?.tarif_mejgorod.length - 1][1] * this.booking.tarif[1].dop_hours)
        this.booking.tarif[1].tarif_price = Number(period[1])
        this.booking.tarif[1].dop_hours_price = Number(this.booking.car?.tarif_mejgorod[this.booking.car?.tarif_mejgorod.length - 1][1])
        console.log(this.booking);
      }
    });


    console.log(this.booking);
  }



  // При выборе кол-ва дней смешанного тарифа - Россия
  tarifMixedRussiaDays(e: any) {
    this.booking.tarif[2].booking_days = e | 0



    if (this.booking.tarif[0].booking_days + this.booking.tarif[1].booking_days + this.booking.tarif[2].booking_days > this.isBookingdays()) {
      this.form.patchValue({
        tarif_mixed_russia_days: 0
      })

      this.errorValidTarifMixedDays = true
    }
    else {
      this.errorValidTarifMixedDays = false
    }




    if (e !== 0 && e !== null) {
      this.booking.tarif[2].status = 'active'
    }
    else {
      this.booking.tarif[2].status = 'no_active'
    }






    this.booking.car?.tarif_russia.forEach((period: any) => {
      let interval = period[0].split('-')
      if (this.booking.tarif[2].booking_days >= interval[0] && this.booking.tarif[2].booking_days <= interval[1]) {
        this.booking.arenda += this.booking.tarif[2].booking_days * Number(period[1]) + (this.booking.car?.tarif_russia[this.booking.car?.tarif_russia.length - 1][1] * this.booking.tarif[2].dop_hours)
        this.booking.tarif[2].tarif_price = Number(period[1])
        this.booking.tarif[2].dop_hours_price = Number(this.booking.car?.tarif_russia[this.booking.car?.tarif_russia.length - 1][1])
        console.log(this.booking);
      }

      if (this.booking.tarif[2].booking_days >= interval[0] && interval[1] === '00') {
        this.booking.arenda += this.booking.tarif[2].booking_days * Number(period[1]) + (this.booking.car?.tarif_russia[this.booking.car?.tarif_russia.length - 1][1] * this.booking.tarif[2].dop_hours)
        this.booking.tarif[2].tarif_price = Number(period[1])
        this.booking.tarif[2].dop_hours_price = Number(this.booking.car?.tarif_russia[this.booking.car?.tarif_russia.length - 1][1])
        console.log(this.booking);
      }
    });


    console.log(this.booking);
  }




  onSubmit() {

    // const booking: Booking = {
    //   booking_start: this.booking.booking_start,
    //   booking_end: this.booking.booking_end,
    //   booking_days: this.booking.tarif[0].booking_days + this.booking.tarif[1].booking_days + this.booking.tarif[2].booking_days,
    //   car: {
    //     _id: this.booking.car?._id,
    //     marka: this.booking.car?.marka,
    //     model: this.booking.car?.model,
    //     number: this.booking.car?.number,
    //     category: this.booking.car?.category,
    //   },
    //   tarif: this.booking.tarif,
    //   tarifCheked: this.booking.tarifCheked,
    //   zalog: this.booking.zalog,
    //   client: this.currentClient,
    //   place_start: this.booking.place_start,
    //   place_start_price: this.booking.place_start_price,
    //   place_end: this.booking.place_end,
    //   place_end_price: this.booking.place_end_price,
    //   arenda: this.booking.arenda,
    //   custome_place_start: this.booking.custome_place_start,
    //   custome_place_end: this.booking.custome_place_end,
    //   custome_zalog: this.booking.custome_zalog,
    //   additional_services: this.booking.additional_services,
    //   additional_services_price: this.booking.additional_services_price,
    //   smenaId: this.currentSmema?._id,
    //   summaFull: this.booking.arenda + this.booking.zalog + this.booking.place_start_price + this.booking.place_end_price + this.booking.additional_services_price,
    //   paidCount: 0,
    //   comment: this.form.value.comment,
    //   status: 'В ожидании',
    //   sale: 0,
    //   act: '',
    //   userId: this.currentSmema?.userId,
    // }

    // this.store.dispatch(addBookingAction({ booking: booking }))

    // console.log(booking);

  }
}
