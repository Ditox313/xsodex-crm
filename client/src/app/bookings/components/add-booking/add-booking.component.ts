import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { isLoadingSelector } from '../../store/selectors';
import { Store, select } from '@ngrx/store';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Booking, BookingData } from '../../types/bookings.interfaces';
import { Car } from 'src/app/cars/types/cars.interfaces';
import { carsListSelector } from 'src/app/cars/store/selectors';
import { carsListAction, carsListResetAction } from 'src/app/cars/store/actions/cars.action';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css']
})
export class AddBookingComponent {
  title: string = 'Добавить бронь'
  form!: FormGroup;
  isLoadingSelector$!: Observable<boolean | null>
  carsListSelector!: Observable<Car[] | null | undefined>
  carsListSub$!: Subscription
  carsList: Car[] | null | undefined = [];
  

  booking: BookingData = {
    booking_start: '',
    booking_end: '',
    booking_days: 0,
    dop_hours: 0,
    dop_hours_price: 0,
    car: null,
    tarif: '',
    tarif_price: 0,
    arenda: 0
  }

  

  constructor(public datePipe: DatePipe, private store: Store,) { }


  ngOnInit(): void {
    this.initForm()
    this.initValues()
    this.dasable_controls()
  }

  ngOnDestroy(): void {
    if (this.carsListSub$) {
      this.carsListSub$.unsubscribe();
    }

    // Отчищаем состояние carsList
    this.store.dispatch(carsListResetAction());

  }

  initForm() {
    this.form = new FormGroup({
      booking_start: new FormControl('', [Validators.required]),
      booking_end: new FormControl('', [Validators.required]),
      car: new FormControl('', [Validators.required]),
      tarif: new FormControl('', [Validators.required]),
      // client: new FormControl('', [Validators.required]),
      // place_start: new FormControl('Офис', [Validators.required]),
      // place_end: new FormControl('Офис', [Validators.required]),
      
      // comment: new FormControl(''),
      // isCustomeZalogControl: new FormControl(''),
      // isCustomePlaceStartControl: new FormControl(''),
      // isCustomePlaceStartControlPrice: new FormControl(''),
      // isCustomePlaceInputControl: new FormControl(''),
      // isCustomePlaceInputControlPrice: new FormControl(''),
      // search_fiz: new FormControl(''),
      // search_law: new FormControl(''),
      // additional_services_chair: new FormControl(''),
      // additional_services_buster: new FormControl(''),
      // additional_services_videoregister: new FormControl(''),
      // additional_services_battery_charger: new FormControl(''),
      // additional_services_antiradar: new FormControl(''),
      // additional_services_moyka: new FormControl(''),
      // isCustomePlaceStartControlclick: new FormControl(''),
      // isCustomePlaceInputControlclick: new FormControl(''),
      // isCustomeZalogControlclick: new FormControl(''),
      // tarif_mixed_gorod: new FormControl(''),
      // tarif_mixed_gorod_days: new FormControl(''),
      // tarif_mixed_mezjgorod: new FormControl(''),
      // tarif_mixed_mezjgorod_days: new FormControl(''),
      // tarif_mixed_russia: new FormControl(''),
      // tarif_mixed_russia_days: new FormControl(''),
    });
  }

  initValues() {
    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))

    // Отправляем запрос на получения списка автомобилей
    this.store.dispatch(carsListResetAction());
    this.store.dispatch(carsListAction({ params: {} }));

    // Получаем селектор на получение списка смен и подписываемся на него. То есть мы наблюдаем за состоянием и отрисовываем список смен.
    // как только мы подгрузим еще, состояние изменится и соответственно изменится наш список смен
    this.carsListSelector = this.store.pipe(select(carsListSelector))
    this.carsListSub$ = this.carsListSelector.subscribe({
      next: (carsList) => {
        if (carsList) {
          this.carsList = carsList;
        }
      }
    });

  }



  // При выборе даты старта брони
  checkedStartBookingDate(e: any) {
    // Включаем поле ввода даты окончания аренды
    if (this.form.value.booking_start) {
      this.form.controls['booking_end'].enable();
    }


    // Получаем и устанавливаем  начало  аренды
    this.booking.booking_start = e.target.value
    

    this.isBookingdays() 
     
  }


  // При выборе даты окончания брони
  checkedEndBookingDate(e: any) {
    // Включаем поле автомобиль
    if (this.form.value.booking_start) {
      this.form.controls['car'].enable();
    }


    // Получаем и устанавливаем  окончание  аренды
    this.booking.booking_end = e.target.value


    this.isBookingdays()
  }



  // При выборе автомобиля
  checkedCar(e: any)
  {
    // Включаем поле автомобиль
    if (this.form.value.booking_start) {
      this.form.controls['tarif'].enable();
    }

    // Получаем авто по переданному id
    if (this.carsList)
    {
      const actulaCar = this.carsList.filter(car => car._id === e);
      this.booking.car = actulaCar[0]
    }
  }


  // При выборе тарифа
  checkedTarif(e: any)
  {
    if(e === 'Город')
    {
      this.booking.tarif = e
      
      this.tarifGorod()
    }
  }



  isBookingdays()
  {
    // Получаем знапчения начала и конца аренды
    const booking_start: any = new Date(this.booking.booking_start);
    const booking_end: any = new Date(this.booking.booking_end);

    this.booking.booking_days = Math.round((booking_end - booking_start) / (1000 * 60 * 60 * 24));

    this.isDopHour()
    
    console.log(this.booking);
    
    return this.booking.booking_days
  }



  isDopHour()
  {
    // Получаем знапчения начала и конца аренды
    const booking_start: any = new Date(this.booking.booking_start);
    const booking_end: any = new Date(this.booking.booking_end);

    // Считаем дополнительные часы
    const booking_days = (booking_end - booking_start) / (1000 * 60 * 60 * 24);


    // Если есть доп часы(booking_days не целое)
    if (!Number.isInteger(booking_days)) {
      this.booking.dop_hours = Math.floor(((booking_end - booking_start) / (1000 * 60 * 60)) % 24);
      return this.booking.dop_hours
    }
    else {
      this.booking.dop_hours = 0
      return 0
    } 
  }



  // Отключаем все инпуты кроме даты старта
  dasable_controls() {
    this.form.controls['booking_end'].disable();
    this.form.controls['car'].disable();
    this.form.controls['tarif'].disable();
    // this.form.controls['client'].disable();
    // this.form.controls['place_start'].disable();
    // this.form.controls['additional_services_chair'].disable();
    // this.form.controls['additional_services_buster'].disable();
    // this.form.controls['additional_services_videoregister'].disable();
    // this.form.controls['additional_services_battery_charger'].disable();
    // this.form.controls['additional_services_antiradar'].disable();
    // this.form.controls['additional_services_moyka'].disable();
    // this.form.controls['isCustomePlaceStartControlclick'].disable();
    // this.form.controls['isCustomeZalogControlclick'].disable();
  }




  // Считаем тариф город
  tarifGorod()
  {
    this.booking.car?.tarif_gorod.forEach((period: any) => {
      let interval = period[0].split('-')
      if (this.booking.booking_days >= interval[0] && this.booking.booking_days <= interval[1])
      {
        this.booking.arenda = this.booking.booking_days * Number(period[1]) + (this.booking.car?.tarif_gorod[this.booking.car?.tarif_gorod.length - 1][1] * this.booking.dop_hours)
        this.booking.tarif_price = Number(period[1])
        this.booking.dop_hours_price = Number(this.booking.car?.tarif_gorod[this.booking.car?.tarif_gorod.length - 1][1])
        console.log(this.booking);
      }

      if (this.booking.booking_days >= interval[0] && interval[1] === '00')
      {
        this.booking.arenda = this.booking.booking_days * Number(period[1]) + (this.booking.car?.tarif_gorod[this.booking.car?.tarif_gorod.length - 1][1] * this.booking.dop_hours)
        this.booking.tarif_price = Number(period[1])
        this.booking.dop_hours_price = Number(this.booking.car?.tarif_gorod[this.booking.car?.tarif_gorod.length - 1][1])
        console.log(this.booking);
      }
    });
  }




















  onSubmit() {
  }
}
