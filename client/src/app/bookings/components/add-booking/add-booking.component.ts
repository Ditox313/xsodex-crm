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
import { SettingAvtopark } from 'src/app/settings/types/settings.interfaces';
import { settingsAvtoparkListSelector } from 'src/app/settings/store/selectors';
import { settingsAvtoparkListAction, settingsAvtoparkListResetAction } from 'src/app/settings/store/actions/settings.action';

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
  errorValidTarifMixedDays: boolean = false;

  settingsAvtoparkListSelector!: Observable<SettingAvtopark[] | null | undefined>
  settingsAvtoparkListSub$!: Subscription
  settingsAvtoparkList: SettingAvtopark[]  | null | undefined = [];
  settingAvnoprokat: any


  booking: BookingData = {
    booking_start: '',
    booking_end: '',
    car: null,
    tarif: [
      { name: 'Город', status: 'no_active', tarif_price: 0, booking_days: 0, dop_hours: 0, dop_hours_price: 0 },
      { name: 'Межгород', status: 'no_active', tarif_price: 0, booking_days: 0, dop_hours: 0, dop_hours_price: 0 },
      { name: 'Россия', status: 'no_active', tarif_price: 0, booking_days: 0, dop_hours: 0, dop_hours_price: 0 }
    ],
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
      { name: 'additionally_det_kreslo', status: false, price: 0},
      { name: 'additionally_buster', status: false, price: 0},
      { name: 'additionally_videoregister', status: false, price: 0},
      { name: 'additionally_battery_charger', status: false, price: 0},
      { name: 'additionally_antiradar', status: false, price: 0},
      { name: 'moyka', price: 0},
    ]
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

    if (this.settingsAvtoparkListSub$) {
      this.settingsAvtoparkListSub$.unsubscribe();
    }

    // Отчищаем состояние carsList
    this.store.dispatch(carsListResetAction());

    // Отчищаем состояние settingsAvtoparkList если не хотим сохранять список авто  в состояние
    this.store.dispatch(settingsAvtoparkListResetAction());

  }

  initForm() {
    this.form = new FormGroup({
      booking_start: new FormControl('', [Validators.required]),
      booking_end: new FormControl('', [Validators.required]),
      car: new FormControl('', [Validators.required]),
      tarif: new FormControl('', [Validators.required]),
      custome_zalog: new FormControl(''),
      custome_zalog_value: new FormControl(''),
      place_start: new FormControl(''),
      place_end: new FormControl(''),
      custome_place_start: new FormControl(''),
      custome_place_start_value: new FormControl(''),
      custome_place_start_price: new FormControl(''),
      custome_place_end: new FormControl(''),
      custome_place_end_value: new FormControl(''),
      custome_place_end_price: new FormControl(''),
      tarif_mixed_gorod_days: new FormControl(0),
      tarif_mixed_mezjgorod_days: new FormControl(0),
      tarif_mixed_russia_days: new FormControl(0),
      additionally_det_kreslo: new FormControl(false),
      additionally_buster: new FormControl(false),
      additionally_videoregister: new FormControl(false),
      additionally_battery_charger: new FormControl(false),
      additionally_antiradar: new FormControl(false),
      moyka: new FormControl(false),
      client: new FormControl('', [Validators.required]),
      comment: new FormControl('',)
    });
  }

  additionally_det_kreslo()
  {
    this.booking.additional_services[0].status = !this.booking.additional_services[0].status  
    console.log(this.booking);
      
  }

  additionally_buster()
  {
    this.booking.additional_services[1].status = !this.booking.additional_services[1].status
    console.log(this.booking);
  }

  additionally_videoregister()
  {
    this.booking.additional_services[2].status = !this.booking.additional_services[2].status
    console.log(this.booking);
  }

  additionally_battery_charger()
  {
    this.booking.additional_services[3].status = !this.booking.additional_services[3].status
    console.log(this.booking);
  }

  additionally_antiradar()
  {
    this.booking.additional_services[4].status = !this.booking.additional_services[4].status
    console.log(this.booking);
  }

  additionally_moyka()
  {
    this.booking.additional_services[5].status = !this.booking.additional_services[5].status
    console.log(this.booking);
  }

  initValues() {
    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))

    // Отчищаем состояние settingsAvtoparkList если не хотим сохранять список авто  в состояние
    this.store.dispatch(settingsAvtoparkListResetAction());

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


    // Получаем настройки автопарка
    this.store.dispatch(settingsAvtoparkListAction({ params: {} }));


    this.settingsAvtoparkListSelector = this.store.pipe(select(settingsAvtoparkListSelector))
    this.settingsAvtoparkListSub$ = this.settingsAvtoparkListSelector.subscribe({
      next: (settingsAvtoparkList) => {
        if (settingsAvtoparkList) {
          this.settingsAvtoparkList = settingsAvtoparkList;
          this.settingAvnoprokat = settingsAvtoparkList[0]
        }
      }
    });
  }


  // При выборе даты старта брони
  checkedStartBookingDate(e: any) {
    // // Получаем и устанавливаем  начало  аренды
    this.booking.booking_start = e.target.value
  }


  // При выборе даты окончания брони
  checkedEndBookingDate(e: any) {
    // Получаем и устанавливаем  окончание  аренды
    this.booking.booking_end = e.target.value
  }





  // При выборе автомобиля
  checkedCar(e: any) {
    // Получаем авто по переданному id
    if (this.carsList) {
      const actulaCar = this.carsList.filter(car => car._id === e);
      this.booking.car = actulaCar[0]

      // Устанавливает настройки доп услуг
      this.booking.additional_services[0].price = Number(this.settingAvnoprokat.additionally_avto.det_kreslo)
      this.booking.additional_services[1].price = Number(this.settingAvnoprokat.additionally_avto.buster)
      this.booking.additional_services[2].price = Number(this.settingAvnoprokat.additionally_avto.videoregister)
      this.booking.additional_services[3].price = Number(this.settingAvnoprokat.additionally_avto.battery_charger)
      this.booking.additional_services[4].price = Number(this.settingAvnoprokat.additionally_avto.antiradar)
      if (this.booking.car?.category === 'Бизнес') {
        this.booking.additional_services[5].price = Number(this.settingAvnoprokat.washing_avto.business)
      }
      else if (this.booking.car?.category === 'Комфорт') {
        this.booking.additional_services[5].price = Number(this.settingAvnoprokat.washing_avto.komfort)
      }
      else if (this.booking.car?.category === 'Премиум') {
        this.booking.additional_services[5].price = Number(this.settingAvnoprokat.washing_avto.premium)
      }

    }

    console.log(this.booking);
  }



  // При выборе тарифа
  checkedTarif(e: any) {
    if (e === 'Город') {
      this.tarifGorod()
    }
    else if (e === 'Межгород')
    {
      this.tarifMejGorod()
    }
    else if (e === 'Россия')
    {
      this.tarifRussia()
    }
    else if (e === 'Смешанный')
    {
      this.tarifMixed()
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
  tarifMixed()
  {
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
  tarifMixedGorodDays(e: any)
  {
    this.booking.tarif[0].booking_days = e | 0



    if (this.booking.tarif[0].booking_days + this.booking.tarif[1].booking_days + this.booking.tarif[2].booking_days > this.isBookingdays()) {
      this.form.patchValue({
        tarif_mixed_gorod_days: 0
      })
      this.errorValidTarifMixedDays = true
    }
    else
    {
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

      this.errorValidTarifMixedDays =  true
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








  // Проверяем нажат кастомный залог
  customeZalogCheck() {
    // Задаем значение true или false кастомному залогу
    this.booking.custome_zalog = !this.booking.custome_zalog
    console.log(this.booking.custome_zalog);


    // Отчищаем поле значения при клике
    this.form.controls['custome_zalog_value'].reset();


    // Если кастомный залог false то ставим залог по умолчанию в соответствии с тарифом
    if (!this.booking.custome_zalog) {
      if(this.booking.tarif[0].status === 'active')
      {
        this.booking.zalog = Number(this.booking.car?.tarif_gorod[this.booking.car?.tarif_gorod.length - 2][1])
      }
      else if (this.booking.tarif[1].status === 'active')
      {
        this.booking.zalog = Number(this.booking.car?.tarif_mejgorod[this.booking.car?.tarif_mejgorod.length - 2][1])
      }
      else if (this.booking.tarif[2].status === 'active')
      {
        this.booking.zalog = Number(this.booking.car?.tarif_russia[this.booking.car?.tarif_russia.length - 2][1])
      }
      
    }

    console.log(this.booking);
  }


  // Присваеваем значение кастомного залога
  customeZalogValue(e: any) {
    this.booking.zalog = Number(e.target.value)
    
    console.log(this.booking);
  }

  











 




  // При выборе места подачи
  placeStart(e: any)
  {
    if (e === 'Аэропорт') {
      this.booking.place_start = e
      this.booking.place_start_price = Number(this.settingAvnoprokat?.share_avto.airport_price) 
    }
    else if (e === 'Ж/д вокзал') {
      this.booking.place_start = e
      this.booking.place_start_price = Number(this.settingAvnoprokat?.share_avto.railway_price) 

    }
    else if (e === 'ТЦ Кристалл') {
      this.booking.place_start = e
      this.booking.place_start_price = Number(this.settingAvnoprokat?.share_avto.kristal_tc_price) 

    }
    else if (e === 'Тц Сити Молл') {
      this.booking.place_start = e
      this.booking.place_start_price = Number(this.settingAvnoprokat?.share_avto.sitymol_tc_price) 
    }
    else if (e === 'Офис') {
      this.booking.place_start = e
      this.booking.place_start_price = 0
    }
    console.log(this.booking);
  }




  // При выборе места приема
  placeEnd(e: any) {
    if (e === 'Аэропорт') {
      this.booking.place_end = e
      this.booking.place_end_price = Number(this.settingAvnoprokat?.input_avto.airport_price_input)
    }
    else if (e === 'Ж/д вокзал') {
      this.booking.place_end = e
      this.booking.place_end_price = Number(this.settingAvnoprokat?.input_avto.railway_price_input)

    }
    else if (e === 'ТЦ Кристалл') {
      this.booking.place_end = e
      this.booking.place_end_price = Number(this.settingAvnoprokat?.input_avto.kristal_tc_price_input)

    }
    else if (e === 'Тц Сити Молл') {
      this.booking.place_end = e
      this.booking.place_end_price = Number(this.settingAvnoprokat?.input_avto.sitymol_tc_price_input)
    }
    else if (e === 'Офис') {
      this.booking.place_end = e
      this.booking.place_end_price = 0
    }    

    console.log(this.booking);
  }





 



  // Отключаем все инпуты кроме даты старта
  dasable_controls() {
    // this.form.controls['booking_end'].disable();
    // this.form.controls['car'].disable();
    // this.form.controls['tarif'].disable();
    // this.form.controls['custome_zalog'].disable();
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




  // Произвольное место подачи
  customePlaceStartCheck()
  {
    // Задаем значение true или false кастомному месту подачи
    this.booking.custome_place_start = !this.booking.custome_place_start
    

    // Отчищаем поле значения при клике
    this.form.controls['custome_place_start_value'].reset();
    this.form.controls['custome_place_start_price'].reset();
    this.form.controls['place_start'].reset();
    this.booking.place_start = ''
    this.booking.place_start_price = 0

 

    console.log(this.booking);
  }


  // Присваеваем значение кастомного места подачи
  customePlaceStartValue(e: any) {
    this.booking.place_start = e.target.value
    console.log(this.booking);
  }

  customePlaceStartPrice(e: any) {
    this.booking.place_start_price = Number(e.target.value)
    console.log(this.booking);
  }





  // Произвольное место приема
  customePlaceEndCheck() {
    // Задаем значение true или false кастомному месту приема
    this.booking.custome_place_end = !this.booking.custome_place_end

    // Отчищаем поле значения при клике
    this.form.controls['custome_place_end_value'].reset();
    this.form.controls['custome_place_end_price'].reset();
    this.form.controls['place_end'].reset();
    this.booking.place_end = ''
    this.booking.place_end_price = 0



    console.log(this.booking);
  }


  // Присваеваем значение кастомного места подачи
  customePlaceEndValue(e: any) {
    this.booking.place_end = e.target.value
    console.log(this.booking);
  }

  customePlaceEndPrice(e: any) {
    this.booking.place_end_price = Number(e.target.value)
    console.log(this.booking);
  }






















  onSubmit() {
  }
}
