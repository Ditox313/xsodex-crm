import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserResponceRegister } from 'src/app/account/types/account.interfaces';
import { Car } from 'src/app/cars/types/cars.interfaces';
import { SettingAvtopark } from 'src/app/settings/types/settings.interfaces';
import { Smena } from 'src/app/smena/types/smena.interfaces';
import { Booking, BookingData } from '../../types/bookings.interfaces';
import { DatePipe } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { carsListAction, carsListResetAction } from 'src/app/cars/store/actions/cars.action';
import { settingsAvtoparkListAction, settingsAvtoparkListResetAction } from 'src/app/settings/store/actions/settings.action';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { currentClient, getCurrentBookingSelector, isLoadingSelector } from '../../store/selectors';
import { carsListSelector } from 'src/app/cars/store/selectors';
import { currentUserSelector } from 'src/app/account/store/selectors';
import { settingsAvtoparkListSelector } from 'src/app/settings/store/selectors';
import { isOpenedSmenaSelector } from 'src/app/smena/store/selectors';
import { addBookingAction, bookingGetCurrent, bookingGetCurrentReset } from '../../store/actions/bookings.action';
import { ActivatedRoute } from '@angular/router';
import { MasterPriem } from 'src/app/personal/types/masters-priem.interfaces';
import { clientsFizFromResetAction } from 'src/app/clients/store/actions/actionsClientsFiz/clientsFiz.action';
import { mastersPriemListNoParamsAction, mastersPriemListResetAction } from 'src/app/personal/store/actions/masters-priem.action';
import { mastersPriemListSelector } from 'src/app/personal/store/selectors';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})
export class EditBookingComponent {
  title: string = 'Редактировать бронь' 
  form!: FormGroup;
  isLoadingSelector$!: Observable<boolean | null>
  carsListSelector!: Observable<Car[] | null | undefined>
  carsListSub$!: Subscription
  carsList: Car[] | null | undefined = [];
  errorValidTarifMixedDays: boolean = false;
  isVisibleModalClient: boolean = false
  isVisibleModalClientLaw: boolean = false
  minDate: string = '';
  getParamsSub$!: Subscription
  bookingId!: string
  isEdit: boolean = false
 

  @ViewChild('myLocalDate') myLocalDate: ElementRef<any> | undefined;
  // Получаем иппут для триггера события change при инициализации
  @ViewChild('bookingStartInput', { static: false }) bookingStartInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('bookingEndInput', { static: false }) bookingEndInput: ElementRef<HTMLInputElement> | undefined;

  
  settingsAvtoparkListSelector!: Observable<SettingAvtopark[] | null | undefined>
  settingsAvtoparkListSub$!: Subscription
  settingsAvtoparkList: SettingAvtopark[]  | null | undefined = [];
  settingAvnoprokat: any

  currentSmemaSelector!: Observable<Smena | null | undefined>
  currentSmemaSub$!: Subscription
  currentSmema!: Smena | null | undefined


  currentClientSelector!: Observable<any | null | undefined>
  currentClientSub$!: Subscription
  currentClient!: any | null | undefined



  currentUserSelector!: Observable<UserResponceRegister | null | undefined>
  currentUserSub$!: Subscription
  currentUser!: UserResponceRegister | null | undefined



  currentBookingSelector!: Observable<Booking | null | undefined>
  currentBookingSub$!: Subscription
  currentBooking!: Booking & { client: any } & { car: any } & { tarif: any } & { additional_services: any } | null | undefined | any;





  mastersPriemSelector!: Observable<MasterPriem[] | null | undefined>
  mastersPriemListSub$!: Subscription
  mastersPriemList: MasterPriem[] | null | undefined = [];


  booking: BookingData = {
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
    arendaGorodMixed: 0,
    arendaMejGorodMixed: 0,
    arendaRussiaMixed: 0,
    zalog: 0,
    sale_check: false,
    sale_value: '0',
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
    ],
    additional_services_price: 0,
    masterPriem: {
      name: '',
      surname: '',
      lastname: '',
      id: ''
    }
  }










  constructor(public datePipe: DatePipe, private store: Store, private messageService: MessageService, private rote: ActivatedRoute) { }


  ngOnInit(): void {
    this.getParams()
    this.initForm()
    this.initValues()
    // this.dasable_controls()
    this.setMinDate()  
    

    // Активируем режим редактирования, что бы запретить уведомления при начальной загрузке
    setTimeout(() => {
      this.isEdit = !this.isEdit
    }, 2000)
    
  }

  ngAfterViewInit() {
    if (this.bookingStartInput) {
      this.triggerChangeEventBookingStart();
    }
  }

  triggerChangeEventBookingStart() {
    if (this.bookingStartInput) {
      const inputElement = this.bookingStartInput.nativeElement;
      const event = new Event('change', { bubbles: true });
      inputElement.dispatchEvent(event);
    }
  }

  triggerChangeEventBookingEnd() {
    if (this.bookingEndInput) {
      const inputElement = this.bookingEndInput.nativeElement;
      const event = new Event('change', { bubbles: true });
      inputElement.dispatchEvent(event);
    }
  }

  getParams() {
    this.getParamsSub$ = this.rote.params.subscribe((params: any) => {
      this.bookingId = params['id'];
    });
  }



  ngOnDestroy(): void {
    if (this.carsListSub$) {
      this.carsListSub$.unsubscribe();
    }

    if (this.settingsAvtoparkListSub$) {
      this.settingsAvtoparkListSub$.unsubscribe();
    }

    if (this.currentClientSub$) {
      this.currentClientSub$.unsubscribe();
    }

    if (this.currentUserSub$) {
      this.currentUserSub$.unsubscribe();
    }


    if (this.mastersPriemListSub$) {
      this.mastersPriemListSub$.unsubscribe();
    }


    if (this.currentSmemaSub$) {
      this.currentSmemaSub$.unsubscribe();
    }


    if (this.currentClientSub$) {
      this.currentClientSub$.unsubscribe();
    }

    if (this.getParamsSub$) {
      this.currentUserSub$.unsubscribe();
    }

    if (this.currentBookingSub$) {
      this.currentBookingSub$.unsubscribe();
    }




    

    // Отчищаем состояние carsList
    this.store.dispatch(carsListResetAction());

    // Отчищаем состояние settingsAvtoparkList если не хотим сохранять список авто  в состояние
    this.store.dispatch(settingsAvtoparkListResetAction());

    // Отчищаем состояние from (Откуда был создан клиент)
    this.store.dispatch(clientsFizFromResetAction());


    // Отчищаем состояние списка мастеров приемщиков
    this.store.dispatch(mastersPriemListResetAction());
    


  }


  setMinDate() {
    const today = new Date();
    this.minDate = today.toISOString().slice(0, 16);
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
      master_priem: new FormControl(''),
      comment: new FormControl('',),
      sale_check: new FormControl(''),
      sale_value: new FormControl(''),
    });
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


    // Получаем пользователя
    this.currentUserSelector = this.store.pipe(select(currentUserSelector))
    this.currentUserSub$ = this.currentUserSelector.subscribe({
      next: (user) => {
        this.currentUser = user
      }
    })


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


    // Отправляем запрос на получение текущей смены
    this.currentSmemaSelector = this.store.pipe(select(isOpenedSmenaSelector))
    this.currentSmemaSub$ = this.currentSmemaSelector.subscribe({
      next: (currentSmena) => {
        this.currentSmema = currentSmena
      }
    })


    // Отправляем запрос на получение выбранного клиента
    this.currentClientSelector = this.store.pipe(select(currentClient))
    this.currentClientSub$ = this.currentClientSelector.subscribe({
      next: (currentClient) => {
        // Если получили физ лица то формирует объект нужного типа.если Юр лица то тоже формирует нужныйобъект
        if (currentClient && currentClient.type === 'fiz')
        {
          this.currentClient = {
            _id: currentClient._id,
            name: currentClient.name,
            surname: currentClient.surname,
            lastname: currentClient.lastname,
            phone_1: currentClient.phone_1,
            type: currentClient.type
          }
        }
        else if (currentClient && currentClient.type === 'law')
        {
          this.currentClient = {
            _id: currentClient._id,
            name: currentClient.name,
            short_name: currentClient.short_name,
            lastname: currentClient.lastname,
            phone_1: currentClient.phone_1,
            phone_2: currentClient.phone_2,
            type: currentClient.type
          }
        }

        // Закрываем модальное окно после выбора клиента
        if (this.currentClient)
        {
          this.isVisibleModalClient = false
          this.isVisibleModalClientLaw = false
          // this.store.dispatch(clientsLawListResetAction());
        }
      }
    })



    

    // Получаем селектор на получение списка мастеров приемщиков и подписываемся на него. То есть мы наблюдаем за состоянием и отрисовываем список смен.
    // как только мы подгрузим еще, состояние изменится и соответственно изменится наш список смен
    // Отправляем запрос на получения списка мастеров приемщиков
    this.store.dispatch(mastersPriemListNoParamsAction());
    this.mastersPriemSelector = this.store.pipe(select(mastersPriemListSelector))
    this.mastersPriemListSub$ = this.mastersPriemSelector.subscribe({
      next: (mastersPriemList) => {
        
        if (mastersPriemList) {
          this.mastersPriemList = mastersPriemList;
        }
      }
    });





    //Отправляем запрос на получение брони
    this.store.dispatch(bookingGetCurrent({ id: this.bookingId }));

    this.currentBookingSelector = this.store.pipe(select(getCurrentBookingSelector))
    this.currentBookingSub$ = this.currentBookingSelector.subscribe({
      next: (currentBooking) => {
        this.currentBooking = currentBooking
      
   
        if (currentBooking) {
          this.title = `Редактировать бронь №${currentBooking.order}`

          // this.booking.tarif[0] = this.currentBooking.tarif[0]
          // this.booking.tarif[1] = this.currentBooking.tarif[1]
          // this.booking.tarif[1] = this.currentBooking.tarif[1]

          


         

          // this.booking.booking_start = this.currentBooking.booking_start
          // this.booking.booking_end = this.currentBooking.booking_end
          // this.booking.car = this.currentBooking.car
          // this.booking.tarif = this.currentBooking.tarif
          // this.booking.arenda = this.currentBooking.arenda
          // this.booking.custome_zalog = this.currentBooking.custome_zalog
          // this.booking.place_start = this.currentBooking.place_start
          // this.booking.place_end = this.currentBooking.place_end
          // this.booking.place_start_price = this.currentBooking.place_start_price
          // this.booking.place_end_price = this.currentBooking.place_end_price
          // this.booking.masterPriem = this.currentBooking.masterPriem
         
          // this.booking.custome_place_start = this.currentBooking.custome_place_start
          // this.booking.custome_place_end = this.currentBooking.custome_place_end
          // this.booking.additional_services = this.currentBooking.additional_services

          
          this.booking.additional_services_price = this.currentBooking.additional_services_price
          this.currentClient = this.currentBooking.client
          

          if (this.currentBooking.tarifCheked === 'Смешанный') {
            this.booking.arendaGorodMixed = this.currentBooking.tarif[0].booking_days
            this.booking.arendaGorodMixed = this.currentBooking.tarif[0].booking_days
            this.booking.arendaGorodMixed = this.currentBooking.tarif[0].booking_days

            this.booking.arendaMejGorodMixed = this.currentBooking.tarif[1].booking_days
            this.booking.arendaMejGorodMixed = this.currentBooking.tarif[1].booking_days
            this.booking.arendaMejGorodMixed = this.currentBooking.tarif[1].booking_days

            this.booking.arendaRussiaMixed = this.currentBooking.tarif[2].booking_days
            this.booking.arendaRussiaMixed = this.currentBooking.tarif[2].booking_days
            this.booking.arendaRussiaMixed = this.currentBooking.tarif[2].booking_days
          }

         
      

          this.form.patchValue({
            booking_start: this.currentBooking.booking_start,
            booking_end: this.currentBooking.booking_end,
            tarif: this.currentBooking.tarifCheked,
            arenda: this.currentBooking.tarifCheked,
            car: this.currentBooking.car._id,
            place_start: this.currentBooking.place_start,
            place_end: this.currentBooking.place_end,
            comment: this.currentBooking.comment,
            custome_zalog: this.currentBooking.custome_zalog ? true : false,
            custome_place_start: this.currentBooking.custome_place_start ? true : false,
            custome_place_end: this.currentBooking.custome_place_end ? true : false,
            additionally_det_kreslo: this.currentBooking.additional_services[0].status ? true : false ,
            additionally_buster: this.currentBooking.additional_services[1].status ? true : false,
            additionally_videoregister: this.currentBooking.additional_services[2].status ? true : false ,
            additionally_battery_charger: this.currentBooking.additional_services[3].status ? true : false ,
            additionally_antiradar: this.currentBooking.additional_services[4].status ? true : false ,
            moyka: this.currentBooking.additional_services[5].status ? true : false,
            custome_zalog_value: this.currentBooking.zalog,
            custome_place_start_value: this.currentBooking.place_start,
            custome_place_start_price: this.currentBooking.place_start_price,
            custome_place_end_value: this.currentBooking.place_end,
            custome_place_end_price: this.currentBooking.place_end_price,
            master_priem: `${this.currentBooking.masterPriem.surname} ${this.currentBooking.masterPriem.name} ${this.currentBooking.masterPriem.lastname}`,
            sale_check: this.currentBooking.openInfo.saleOnOpen > 0 ? true : false,
            sale_value: this.currentBooking.openInfo.saleOnOpen,
          })


          //  Отображаем скидку если она есть
          if(this.currentBooking.openInfo.saleOnOpen > 0)
          {
            this.booking.sale_check = true
          }
          else
          {
            this.booking.sale_check = false
          }



          // Запускаем начало всех расчетов если инициализируем при редактировании
          this.triggerChangeEventBookingEnd()




          // Задаем дефолтные значения доп услуг при инициализации когда редактируем бронь
         this.booking.additional_services[0].price = this.currentBooking.additional_services[0].price
         this.booking.additional_services[0].status = this.currentBooking.additional_services[0].status
         this.booking.additional_services[1].price = this.currentBooking.additional_services[1].price
         this.booking.additional_services[1].status = this.currentBooking.additional_services[1].status
         this.booking.additional_services[2].price = this.currentBooking.additional_services[2].price
         this.booking.additional_services[2].status = this.currentBooking.additional_services[2].status
         this.booking.additional_services[3].price = this.currentBooking.additional_services[3].price
         this.booking.additional_services[3].status = this.currentBooking.additional_services[3].status
         this.booking.additional_services[4].price = this.currentBooking.additional_services[4].price
         this.booking.additional_services[4].status = this.currentBooking.additional_services[4].status
         this.booking.additional_services[5].price = this.currentBooking.additional_services[5].price
         this.booking.additional_services[5].status = this.currentBooking.additional_services[5].status



        }
      }
    })


    //Отправляем запрос на получение списка автомобилей
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

    // Вставляем дату старта в дату конца брони
    const startDate = new Date(e.target.value);
    const endDateString = this.formatDateToLocalDateTime(startDate);
    this.form.patchValue({
      booking_end: endDateString
    });

  



    // // Получаем и устанавливаем  начало  аренды
    this.booking.booking_start = e.target.value


    if (this.booking.tarif[0].status === 'active') {
      this.tarifGorod()
    }
    else if (this.booking.tarif[1].status === 'active') {
      this.tarifMejGorod()
    }
    else if (this.booking.tarif[2].status === 'active') {
      this.tarifRussia()
    }

    // this.form.controls['booking_end'].enable();

    console.log('booking при начале', this.booking);
  }


  
// Вспомогательная функция для форматирования даты для подставления даты старта в дату конца брони
private formatDateToLocalDateTime(date: Date): string {
  return date.getFullYear() +
    '-' + this.pad(date.getMonth() + 1) +
    '-' + this.pad(date.getDate()) +
    'T' + this.pad(date.getHours()) +
    ':' + this.pad(date.getMinutes());
}


// Вспомогательная функция для formatDateToLocalDateTime
private pad(number: number): string {
  return number < 10 ? '0' + number : number.toString();
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

    // this.form.controls['car'].enable();
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


      // Задаем цену мойки сходя из того, заполнено ли поле кастомная мойка в авто
      if (this.booking.car?.category === 'Бизнес') {
        if((this.booking.car?.custome_wash) === '0')
        {
          this.booking.additional_services[5].price = Number(this.settingAvnoprokat.washing_avto.business)
        }
        else
        {
          this.booking.additional_services[5].price = Number(this.booking.car.custome_wash)
        }
        
      }
      else if (this.booking.car?.category === 'Комфорт') {
        if((this.booking.car?.custome_wash) === '0')
        {
          this.booking.additional_services[5].price = Number(this.settingAvnoprokat.washing_avto.komfort)
        }
        else
        {
          this.booking.additional_services[5].price = Number(this.booking.car.custome_wash)
        }
       
      }
      else if (this.booking.car?.category === 'Премиум') {
        if((this.booking.car?.custome_wash) === '0')
        {
          this.booking.additional_services[5].price = Number(this.settingAvnoprokat.washing_avto.premium)
        }
        else
        {
          this.booking.additional_services[5].price = Number(this.booking.car.custome_wash)
        }
      }

    }



    if (this.booking.tarif[0].status === 'active') {
      this.tarifGorod()
    }
    else if (this.booking.tarif[1].status === 'active') {
      this.tarifMejGorod()
    }
    else if (this.booking.tarif[2].status === 'active') {
      this.tarifRussia()
    }

    // this.form.controls['tarif'].enable();
    

  }



  // При выборе тарифа
  checkedTarif(e: any) {
    if (e === 'Город') {
      this.booking.tarifCheked = e
      this.tarifGorod()
    }
    else if (e === 'Межгород')
    {
      this.booking.tarifCheked = e
      this.tarifMejGorod()
    }
    else if (e === 'Россия')
    {
      this.booking.tarifCheked = e
      this.tarifRussia()
    }
    else if (e === 'Смешанный')
    {
      this.booking.tarifCheked = e
      this.booking.tarif[0].dop_hours = 0
      this.booking.tarif[1].dop_hours = 0
      this.booking.tarif[2].dop_hours = 0
      this.tarifMixed()
    }



    this.form.controls['custome_zalog'].enable();
    this.form.controls['client'].enable();
    this.form.controls['place_start'].enable();
    this.form.controls['place_end'].enable();
    this.form.controls['additionally_det_kreslo'].enable();
    this.form.controls['additionally_buster'].enable();
    this.form.controls['additionally_videoregister'].enable();
    this.form.controls['additionally_battery_charger'].enable();
    this.form.controls['additionally_antiradar'].enable();
    this.form.controls['moyka'].enable();
    
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
      }

      if (this.booking.tarif[0].booking_days >= interval[0] && interval[1] === '00') {
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
      }

      if (this.booking.tarif[1].booking_days >= interval[0] && interval[1] === '00') {
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
      }

      if (this.booking.tarif[2].booking_days >= interval[0] && interval[1] === '00') {
        this.booking.arenda = this.booking.tarif[2].booking_days * Number(period[1]) + (this.booking.car?.tarif_russia[this.booking.car?.tarif_russia.length - 1][1] * this.booking.tarif[2].dop_hours)
        this.booking.tarif[2].tarif_price = Number(period[1])
        this.booking.tarif[2].dop_hours_price = Number(this.booking.car?.tarif_russia[this.booking.car?.tarif_russia.length - 1][1])
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


  }



  // При выборе кол-ва дней смешанного тарифа - город
  tarifMixedGorodDays(e: any)
  {
    if(e < 0)
    {
      this.form.patchValue({
        tarif_mixed_gorod_days: 0
      })
    }

    this.booking.tarif[0].booking_days = e | 0

    if (e === null || e === 0) {
      this.booking.arendaGorodMixed = 0
      this.booking.arenda = this.booking.arendaGorodMixed + this.booking.arendaMejGorodMixed + this.booking.arendaRussiaMixed
      this.booking.tarif[0].tarif_price = 0
      this.booking.tarif[0].dop_hours_price = 0
    }else
    {
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
          this.booking.arendaGorodMixed = this.booking.tarif[0].booking_days * Number(period[1]) + (this.booking.car?.tarif_gorod[this.booking.car?.tarif_gorod.length - 1][1] * this.booking.tarif[0].dop_hours)
          this.booking.arenda = this.booking.arendaGorodMixed + this.booking.arendaMejGorodMixed + this.booking.arendaRussiaMixed
          this.booking.tarif[0].tarif_price = Number(period[1])
          this.booking.tarif[0].dop_hours_price = Number(this.booking.car?.tarif_gorod[this.booking.car?.tarif_gorod.length - 1][1])
        }

        if (this.booking.tarif[0].booking_days >= interval[0] && interval[1] === '00') {
          this.booking.arendaGorodMixed = this.booking.tarif[0].booking_days * Number(period[1]) + (this.booking.car?.tarif_gorod[this.booking.car?.tarif_gorod.length - 1][1] * this.booking.tarif[0].dop_hours)
          this.booking.arenda = this.booking.arendaGorodMixed + this.booking.arendaMejGorodMixed + this.booking.arendaRussiaMixed
          this.booking.tarif[0].tarif_price = Number(period[1])
          this.booking.tarif[0].dop_hours_price = Number(this.booking.car?.tarif_gorod[this.booking.car?.tarif_gorod.length - 1][1])
        }
      });

    }
  }


  // При выборе кол-ва дней смешанного тарифа - межгород
  tarifMixedMejgorodDays(e: any) {
    this.booking.tarif[1].booking_days = e | 0

    if(e < 0)
    {
      this.form.patchValue({
        tarif_mixed_mezjgorod_days: 0
      })
    }

    if (e === null || e === 0) {
      this.booking.arendaMejGorodMixed = 0
      this.booking.arenda = this.booking.arendaGorodMixed + this.booking.arendaMejGorodMixed + this.booking.arendaRussiaMixed
      this.booking.tarif[1].tarif_price = 0
      this.booking.tarif[1].dop_hours_price = 0
    }
    else
    {
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
          this.booking.arendaMejGorodMixed = this.booking.tarif[1].booking_days * Number(period[1]) + (this.booking.car?.tarif_mejgorod[this.booking.car?.tarif_mejgorod.length - 1][1] * this.booking.tarif[1].dop_hours)
          this.booking.arenda = this.booking.arendaGorodMixed + this.booking.arendaMejGorodMixed + this.booking.arendaRussiaMixed
          this.booking.tarif[1].tarif_price = Number(period[1])
          this.booking.tarif[1].dop_hours_price = Number(this.booking.car?.tarif_mejgorod[this.booking.car?.tarif_mejgorod.length - 1][1])

        }

        if (this.booking.tarif[1].booking_days >= interval[0] && interval[1] === '00') {
          this.booking.arendaMejGorodMixed += this.booking.tarif[1].booking_days * Number(period[1]) + (this.booking.car?.tarif_mejgorod[this.booking.car?.tarif_mejgorod.length - 1][1] * this.booking.tarif[1].dop_hours)
          this.booking.arenda = this.booking.arendaGorodMixed + this.booking.arendaMejGorodMixed + this.booking.arendaRussiaMixed
          this.booking.tarif[1].tarif_price = Number(period[1])
          this.booking.tarif[1].dop_hours_price = Number(this.booking.car?.tarif_mejgorod[this.booking.car?.tarif_mejgorod.length - 1][1])

        }
      });



    } 
  }



  // При выборе кол-ва дней смешанного тарифа - Россия
  tarifMixedRussiaDays(e: any) {
    this.booking.tarif[2].booking_days = e | 0

    if(e < 0)
    {
      this.form.patchValue({
        tarif_mixed_russia_days: 0
      })
    }

    if (e === null || e === 0) {
      this.booking.arendaRussiaMixed = 0
      this.booking.arenda = this.booking.arendaGorodMixed + this.booking.arendaMejGorodMixed + this.booking.arendaRussiaMixed
      this.booking.tarif[2].tarif_price = 0
      this.booking.tarif[2].dop_hours_price = 0
    }
    else
    {
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
          this.booking.arendaRussiaMixed = this.booking.tarif[2].booking_days * Number(period[1]) + (this.booking.car?.tarif_russia[this.booking.car?.tarif_russia.length - 1][1] * this.booking.tarif[2].dop_hours)
          this.booking.arenda = this.booking.arendaGorodMixed + this.booking.arendaMejGorodMixed + this.booking.arendaRussiaMixed
          this.booking.tarif[2].tarif_price = Number(period[1])
          this.booking.tarif[2].dop_hours_price = Number(this.booking.car?.tarif_russia[this.booking.car?.tarif_russia.length - 1][1])

        }

        if (this.booking.tarif[2].booking_days >= interval[0] && interval[1] === '00') {
          this.booking.arendaRussiaMixed = this.booking.tarif[2].booking_days * Number(period[1]) + (this.booking.car?.tarif_russia[this.booking.car?.tarif_russia.length - 1][1] * this.booking.tarif[2].dop_hours)
          this.booking.arenda = this.booking.arendaGorodMixed + this.booking.arendaMejGorodMixed + this.booking.arendaRussiaMixed
          this.booking.tarif[2].tarif_price = Number(period[1])
          this.booking.tarif[2].dop_hours_price = Number(this.booking.car?.tarif_russia[this.booking.car?.tarif_russia.length - 1][1])

        }
      });


   
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


  }


  // Присваеваем значение кастомного залога
  customeZalogValue(e: any) {
    this.booking.zalog = Number(e.target.value)
    

  }





  

  // При выборе места подачи
  placeStart(e: any)
  {
    if (e === 'Аэропорт') {
      this.booking.place_start = e
      this.booking.place_start_price = Number(this.settingAvnoprokat?.share_avto.airport_price) 
      if(this.isEdit)
      {
        this.messageService.add({ severity: 'success', summary: `+ ${this.booking.place_start_price } руб`, detail: 'Успешно!' });
      }
    }
    else if (e === 'Ж/д вокзал') {
      this.booking.place_start = e
      this.booking.place_start_price = Number(this.settingAvnoprokat?.share_avto.railway_price) 

      if(this.isEdit)
      {
        this.messageService.add({ severity: 'success', summary: `+ ${this.booking.place_start_price} руб`, detail: 'Успешно!' });
      }
      
    }
    else if (e === 'ТЦ Кристалл') {
      this.booking.place_start = e
      this.booking.place_start_price = Number(this.settingAvnoprokat?.share_avto.kristal_tc_price) 
      if(this.isEdit)
      {
        this.messageService.add({ severity: 'success', summary: `+ ${this.booking.place_start_price} руб`, detail: 'Успешно!' });
      }
  
    }
    else if (e === 'Тц Сити Молл') {
      this.booking.place_start = e
      this.booking.place_start_price = Number(this.settingAvnoprokat?.share_avto.sitymol_tc_price) 
      if(this.isEdit)
      {
        this.messageService.add({ severity: 'success', summary: `+ ${this.booking.place_start_price} руб`, detail: 'Успешно!' });
      }
      
    }
    else if (e === 'Офис') {
      this.booking.place_start = e
      this.booking.place_start_price = 0
    }

  }




  // При выборе места приема
  placeEnd(e: any) {
    if (e === 'Аэропорт') {
      this.booking.place_end = e
      this.booking.place_end_price = Number(this.settingAvnoprokat?.input_avto.airport_price_input)
      if(this.isEdit)
      {
        this.messageService.add({ severity: 'success', summary: `+ ${this.booking.place_end_price} руб`, detail: 'Успешно!' });
      }
     
    }
    else if (e === 'Ж/д вокзал') {
      this.booking.place_end = e
      this.booking.place_end_price = Number(this.settingAvnoprokat?.input_avto.railway_price_input)
      if(this.isEdit)
      {
        this.messageService.add({ severity: 'success', summary: `+ ${this.booking.place_end_price} руб`, detail: 'Успешно!' });
      }
     
    }
    else if (e === 'ТЦ Кристалл') {
      this.booking.place_end = e
      this.booking.place_end_price = Number(this.settingAvnoprokat?.input_avto.kristal_tc_price_input)
      if(this.isEdit)
      {
        this.messageService.add({ severity: 'success', summary: `+ ${this.booking.place_end_price} руб`, detail: 'Успешно!' });
      }

    }
    else if (e === 'Тц Сити Молл') {
      this.booking.place_end = e
      this.booking.place_end_price = Number(this.settingAvnoprokat?.input_avto.sitymol_tc_price_input)
      
      if(this.isEdit)
      {
        this.messageService.add({ severity: 'success', summary: `+ ${this.booking.place_end_price} руб`, detail: 'Успешно!' });
      }

    }
    else if (e === 'Офис') {
      this.booking.place_end = e
      this.booking.place_end_price = 0
    }    


  }





 



  // Отключаем все инпуты кроме даты старта
  dasable_controls() {
    this.form.controls['booking_end'].disable();
    this.form.controls['car'].disable();
    this.form.controls['tarif'].disable();
    this.form.controls['custome_zalog'].disable();
    // this.form.controls['client'].disable();
    this.form.controls['place_start'].disable();
    this.form.controls['place_end'].disable();
    this.form.controls['additionally_det_kreslo'].disable();
    this.form.controls['additionally_buster'].disable();
    this.form.controls['additionally_videoregister'].disable();
    this.form.controls['additionally_battery_charger'].disable();
    this.form.controls['additionally_antiradar'].disable();
    this.form.controls['moyka'].disable();
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

 


  }


  // Присваеваем значение кастомного места подачи
  customePlaceStartValue(e: any) {
    this.booking.place_start = e.target.value

  }

  customePlaceStartPrice(e: any) {
    this.booking.place_start_price = Number(e.target.value)

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




  }


  // Присваеваем значение кастомного места подачи
  customePlaceEndValue(e: any) {
    this.booking.place_end = e.target.value

  }

  customePlaceEndPrice(e: any) {
    this.booking.place_end_price = Number(e.target.value)

  }






  // Дополнительнеы услуги
  additionally_det_kreslo() {
    this.booking.additional_services[0].status = !this.booking.additional_services[0].status

    if (this.booking.additional_services[0].status)
    {
      this.booking.additional_services_price += this.booking.additional_services[0].price
      this.messageService.add({ severity: 'success', summary: `+ ${this.booking.additional_services[0].price} руб`, detail: 'Успешно!' });
    }
    else
    {
      this.booking.additional_services_price -= this.booking.additional_services[0].price
      this.messageService.add({ severity: 'success', summary: `- ${this.booking.additional_services[0].price} руб`, detail: 'Успешно!' });
    }
    
    

    
  }

  additionally_buster() {
    this.booking.additional_services[1].status = !this.booking.additional_services[1].status

    if (this.booking.additional_services[1].status)
    {
      this.booking.additional_services_price += this.booking.additional_services[1].price
      this.messageService.add({ severity: 'success', summary: `+ ${this.booking.additional_services[1].price} руб`, detail: 'Успешно!' });
    }
    else
    {
      this.booking.additional_services_price -= this.booking.additional_services[1].price
      this.messageService.add({ severity: 'success', summary: `- ${this.booking.additional_services[1].price} руб`, detail: 'Успешно!' });
    }
    

  }

  additionally_videoregister() {
    this.booking.additional_services[2].status = !this.booking.additional_services[2].status

    if (this.booking.additional_services[2].status) {
      this.booking.additional_services_price += this.booking.additional_services[2].price
      this.messageService.add({ severity: 'success', summary: `+ ${this.booking.additional_services[2].price} руб`, detail: 'Успешно!' });
    }
    else {
      this.booking.additional_services_price -= this.booking.additional_services[2].price
      this.messageService.add({ severity: 'success', summary: `- ${this.booking.additional_services[2].price} руб`, detail: 'Успешно!' });
    }

    

  }

  additionally_battery_charger() {
    this.booking.additional_services[3].status = !this.booking.additional_services[3].status

    if (this.booking.additional_services[3].status)
    {
      this.booking.additional_services_price += this.booking.additional_services[3].price
      this.messageService.add({ severity: 'success', summary: `+ ${this.booking.additional_services[3].price} руб`, detail: 'Успешно!' });
    }
    else
    {
      this.booking.additional_services_price -= this.booking.additional_services[3].price
      this.messageService.add({ severity: 'success', summary: `- ${this.booking.additional_services[3].price} руб`, detail: 'Успешно!' });
    }

  }

  additionally_antiradar() {
    this.booking.additional_services[4].status = !this.booking.additional_services[4].status

    if (this.booking.additional_services[4].status)
    {
      this.booking.additional_services_price += this.booking.additional_services[4].price
      this.messageService.add({ severity: 'success', summary: `+ ${this.booking.additional_services[4].price} руб`, detail: 'Успешно!' });
    }
    else
    {
      this.booking.additional_services_price -= this.booking.additional_services[4].price
      this.messageService.add({ severity: 'success', summary: `- ${this.booking.additional_services[4].price} руб`, detail: 'Успешно!' });
    }
    

  }

  additionally_moyka() {
    this.booking.additional_services[5].status = !this.booking.additional_services[5].status

    
    if (this.booking.additional_services[5].status)
    {
      this.booking.additional_services_price += this.booking.additional_services[5].price
      this.messageService.add({ severity: 'success', summary: `+ ${this.booking.additional_services[5].price} руб`, detail: 'Успешно!' });
    }
    else
    {
      this.booking.additional_services_price -= this.booking.additional_services[5].price
      this.messageService.add({ severity: 'success', summary: `- ${this.booking.additional_services[5].price} руб`, detail: 'Успешно!' });
    }
    

  }



// Открываем модалку клиента физ.лиц
  modalClientClick()
  {
    this.isVisibleModalClient = !this.isVisibleModalClient
  }




  // Закрываем модалку физ.лиц и открываем модалку юр.лиц
  toggleClientsLaw(e:any)
  {
    if(e === 'toggleOnLaw')
    {
      this.isVisibleModalClient = false
      this.isVisibleModalClientLaw = true
    }
  }


  // Закрываем модалку юр.лиц и открываем модалку физ.лиц
  toggleClientsFiz(e:any)
  {
    if(e === 'toggleOnFiz')
    {
      this.isVisibleModalClient = true
      this.isVisibleModalClientLaw = false
    }
  }






    // При выборе мастера приемщика
    masterPriemChange(data: any) {
      let fio = data.split(' ');

      

      this.mastersPriemList?.forEach(item => {
        if(fio[0] === item.surname && fio[1] === item.name && fio[2] === item.lastname) 
          {
            this.booking.masterPriem = {
              name: item.name,
              surname: item.surname,
              lastname: item.lastname,
              id: item._id
            }
          }
      })
      
    }





    // Чекбокс для скидки
  bookingSaleCheck() {
    // Задаем значение true или false кастомному залогу
    this.booking.sale_check = !this.booking.sale_check
    this.booking.sale_value = '0'


    //Отчищаем поле значения при клике
    this.form.controls['sale_value'].reset();
  }


  // Значение для скидки
   bookingSaleValue(e: any) {
    this.booking.sale_value = e.target.value
  }
 




  onSubmit() {

    const booking: Booking = {
      extends: [],
      closeInfo: {
        date: '',
        isCarClean: false,
        isCarFuel:  false,
        zalogOutput: 0,
        zalogOutputPart:  false,
        moyka: 0,
        comment: '',
        oldProbeg:  0,
        newProbeg: 0,
        smenaIdClose: '',
        userIdClose: ''
      },
      openInfo: {
        userIdOpen: this.currentUser?._id,
        smenaIdOpen: this.currentSmema?._id,
        saleOnOpen: +this.form.value.sale_value
      },
      booking_start: this.booking.booking_start,
      booking_end: this.booking.booking_end,
      booking_days: this.booking.tarif[0].booking_days + this.booking.tarif[1].booking_days + this.booking.tarif[2].booking_days,
      car: {
        _id: this.booking.car?._id,
        marka: this.booking.car?.marka,
        model: this.booking.car?.model,
        number: this.booking.car?.number,
        category: this.booking.car?.category,
      },
      tarif: this.booking.tarif,
      tarifCheked: this.booking.tarifCheked,
      zalog: this.booking.zalog,
      client: this.currentClient,
      place_start: this.booking.place_start,
      place_start_price: this.booking.place_start_price,
      place_end: this.booking.place_end,
      place_end_price: this.booking.place_end_price,
      arenda: this.booking.arenda  - +this.form.value.sale_value,
      custome_place_start: this.booking.custome_place_start,
      custome_place_end: this.booking.custome_place_end,
      custome_zalog: this.booking.custome_zalog,
      additional_services: this.booking.additional_services,
      additional_services_price: this.booking.additional_services_price,
      smenaId: this.currentSmema?._id,
      summaFull: this.booking.arenda + this.booking.zalog + this.booking.place_start_price + this.booking.place_end_price + this.booking.additional_services_price - +this.form.value.sale_value,
      paidCount: 0 ,
      comment: this.form.value.comment,
      status: 'В ожидании',
      sale: 0 +  +this.form.value.sale_value,
      act: '',
      masterPriem: this.booking.masterPriem,
      userId: this.currentUser?._id,
    }


    console.log('222', booking);

    // this.store.dispatch(addBookingAction({ booking: booking }))

  }
}
