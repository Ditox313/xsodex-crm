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
import { settingsAvtoparkListAction } from 'src/app/settings/store/actions/settings.action';

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

  settingsAvtoparkListSelector!: Observable<SettingAvtopark[] | null | undefined>
  settingsAvtoparkListSub$!: Subscription
  settingsAvtoparkList: SettingAvtopark[]  | null | undefined = [];
  settingAvnoprokat: any


  booking: BookingData = {
    booking_start: '',
    booking_end: '',
    booking_days: 0,
    dop_hours: 0,
    dop_hours_price: 0,
    car: null,
    tarif: '',
    tarif_price: 0,
    arenda: 0,
    zalog: 0,
    custome_zalog: false,
    place_start: '',
    place_start_price: 0,
    place_end: '',
    place_end_price: 0,
    custome_place_start: false,
    custome_place_end: false,
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
      // client: new FormControl('', [Validators.required]),
      // place_start: new FormControl('Офис', [Validators.required]),
      // place_end: new FormControl('Офис', [Validators.required]),

      // comment: new FormControl(''),

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


    // Получаем настройки автопарка
    this.store.dispatch(settingsAvtoparkListAction({ params: {} }));


    this.settingsAvtoparkListSelector = this.store.pipe(select(settingsAvtoparkListSelector))
    this.settingsAvtoparkListSub$ = this.settingsAvtoparkListSelector.subscribe({
      next: (settingsAvtoparkList) => {
        if (settingsAvtoparkList) {
          this.settingsAvtoparkList = settingsAvtoparkList;
          this.settingAvnoprokat = settingsAvtoparkList[0]
          console.log(this.settingAvnoprokat);
          
        }
      }
    });

  }



  // При выборе даты старта брони
  checkedStartBookingDate(e: any) {
    // Получаем и устанавливаем  начало  аренды
    this.booking.booking_start = e.target.value


    this.isBookingdays()

  }


  // При выборе даты окончания брони
  checkedEndBookingDate(e: any) {
    // Получаем и устанавливаем  окончание  аренды
    this.booking.booking_end = e.target.value


    this.isBookingdays()
  }



  // При выборе автомобиля
  checkedCar(e: any) {
    // Получаем авто по переданному id
    if (this.carsList) {
      const actulaCar = this.carsList.filter(car => car._id === e);
      this.booking.car = actulaCar[0]
      this.booking.zalog = Number(actulaCar[0].tarif_gorod[this.booking.car?.tarif_gorod.length - 2][1])
    }

    console.log(this.booking);

  }


  // При выборе тарифа
  checkedTarif(e: any) {
    if (e === 'Город') {
      this.booking.tarif = e

      this.tarifGorod()
    }
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


  // Запускаем рассчет кол-ва дней и доп часов
  isBookingdays() {
    // Получаем знапчения начала и конца аренды
    const booking_start: any = new Date(this.booking.booking_start);
    const booking_end: any = new Date(this.booking.booking_end);

    this.booking.booking_days = Math.round((booking_end - booking_start) / (1000 * 60 * 60 * 24));

    this.isDopHour()


    return this.booking.booking_days
  }



  isDopHour() {
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




  // Считаем тариф город
  tarifGorod() {
    this.booking.car?.tarif_gorod.forEach((period: any) => {
      let interval = period[0].split('-')
      if (this.booking.booking_days >= interval[0] && this.booking.booking_days <= interval[1]) {
        this.booking.arenda = this.booking.booking_days * Number(period[1]) + (this.booking.car?.tarif_gorod[this.booking.car?.tarif_gorod.length - 1][1] * this.booking.dop_hours)
        this.booking.tarif_price = Number(period[1])
        this.booking.dop_hours_price = Number(this.booking.car?.tarif_gorod[this.booking.car?.tarif_gorod.length - 1][1]) * this.booking.dop_hours
        console.log(this.booking);
      }

      if (this.booking.booking_days >= interval[0] && interval[1] === '00') {
        this.booking.arenda = this.booking.booking_days * Number(period[1]) + (this.booking.car?.tarif_gorod[this.booking.car?.tarif_gorod.length - 1][1] * this.booking.dop_hours)
        this.booking.tarif_price = Number(period[1])
        this.booking.dop_hours_price = Number(this.booking.car?.tarif_gorod[this.booking.car?.tarif_gorod.length - 1][1]) * this.booking.dop_hours
        console.log(this.booking);
      }
    });
  }




  // Проверяем нажат кастомный залог
  customeZalogCheck() {
    // Задаем значение true или false кастомному залогу
    if (Boolean(this.form.value.custome_zalog))
    {
      this.booking.custome_zalog = Boolean(this.form.value.custome_zalog[0])
    }
    

    // Отчищаем поле значения при клике
    this.form.controls['custome_zalog_value'].reset();


    // Если кастомный залог false то ставим залог по умолчанию в соответствии с тарифом
    if (!this.booking.custome_zalog) {
      this.booking.zalog = Number(this.booking.car?.tarif_gorod[this.booking.car?.tarif_gorod.length - 2][1])
    }
  }


  // Присваеваем значение кастомного залога
  customeZalogValue(e: any) {
    this.booking.zalog = Number(e.target.value)
    console.log(this.booking);
  }



  // Произвольное место подачи
  customePlaceStartCheck()
  {
    // Задаем значение true или false кастомному месту подачи
    if (Boolean(this.form.value.custome_place_start)) {
      this.booking.custome_place_start = Boolean(this.form.value.custome_place_start[0])
    }

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
    if (Boolean(this.form.value.custome_place_end)) {
      this.booking.custome_place_end = Boolean(this.form.value.custome_place_end[0])
    }

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
