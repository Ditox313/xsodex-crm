import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { currentClientForAct, getCurrentBookingSelector, isLoadingSelector } from '../../store/selectors';
import { Booking } from '../../types/bookings.interfaces';
import { UserResponceRegister } from 'src/app/account/types/account.interfaces';
import { bookingGetCurrent, bookingGetCurrentReset, currentClientForActAction, currentClientForActResetAction } from '../../store/actions/bookings.action';
import { Smena } from 'src/app/smena/types/smena.interfaces';
import { currentUserSelector } from 'src/app/account/store/selectors';
import { isOpenedSmenaSelector } from 'src/app/smena/store/selectors';
import { ClientFiz } from 'src/app/clients/types/clientsFiz/clientsFiz.interfaces';
import { ClientLaw } from 'src/app/clients/types/clientsLaw/clientsLaw.interfaces';
import { convert as convertNumberToWordsRu } from 'number-to-words-ru'




// Для корректной работы необходимо установить отдельный пакет типов для каждой библиотеки(см ошибку) и в tsconfig в compilerOptions 
// добавить "allowSyntheticDefaultImports": true,
import * as pdfMake from "pdfmake/build/pdfmake";
import * as  pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from "html-to-pdfmake"
import { Car } from 'src/app/cars/types/cars.interfaces';
import { carGetCurrent, carGetCurrentReset } from 'src/app/cars/store/actions/cars.action';
import { getCurrentCarSelector } from 'src/app/cars/store/selectors';
import { SettingAvtopark } from 'src/app/settings/types/settings.interfaces';
import { settingsAvtoparkListAction, settingsAvtoparkListResetAction } from 'src/app/settings/store/actions/settings.action';
import { settingsAvtoparkListSelector } from 'src/app/settings/store/selectors';


@Component({
  selector: 'app-add-act-booking',
  templateUrl: './add-act-booking.component.html',
  styleUrls: ['./add-act-booking.component.css']
})
export class AddActBookingComponent {
  @ViewChild('content') content!: ElementRef | any;

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

  
  currentClientSelector!: Observable<ClientFiz | ClientLaw | null | undefined>
  currentClientSub$!: Subscription
  currentClient!: ClientFiz | ClientLaw | null | undefined | any


  currentCarSelector!: Observable<Car | null | undefined>
  currentCarSub$!: Subscription
  currentCar!: Car | null | undefined



  settingsAvtoparkListSelector!: Observable<SettingAvtopark[] | null | undefined>
  settingsAvtoparkListSub$!: Subscription
  settingsAvtoparkList: SettingAvtopark[] | null | undefined = [];
  settingAvnoprokat: any

  title: string = ''
  getParamsSub$!: Subscription
  bookingId!: string

  yearDate: any;
  xs_actual_date: any;
  price_ocenka: string  = ''


  constructor(public datePipe: DatePipe, private store: Store, private rote: ActivatedRoute) { }

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

    if (this.currentClientSub$) {
      this.currentClientSub$.unsubscribe();
    }

    
    
    if (this.settingsAvtoparkListSub$) {
      this.settingsAvtoparkListSub$.unsubscribe();
    }

    //Отчищаем состояние 
    this.store.dispatch(bookingGetCurrentReset());
    this.store.dispatch(currentClientForActResetAction());
    this.store.dispatch(carGetCurrentReset());
    this.store.dispatch(settingsAvtoparkListResetAction());
  }


  getParams() {
    this.getParamsSub$ = this.rote.params.subscribe((params: any) => {
      this.bookingId = params['id'];
    });
  }

  initForm() {
    this.form = new FormGroup({
      arenda: new FormControl('',),
      typePayArenda: new FormControl('',),
      zalog: new FormControl('0',),
      typePayZalog: new FormControl('',),
      place_start_price: new FormControl('',),
      place_end_price: new FormControl('',),
      additional_services_price: new FormControl('',),
    });
  }




  initValues() {

    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))

    //Отчищаем состояние 
    this.store.dispatch(bookingGetCurrentReset());
    this.store.dispatch(currentClientForActResetAction());
    this.store.dispatch(carGetCurrentReset());
    this.store.dispatch(settingsAvtoparkListResetAction());


    //Отправляем запрос на получение текущей брони
    this.store.dispatch(bookingGetCurrent({ id: this.bookingId }));
    this.currentBookingSelector = this.store.pipe(select(getCurrentBookingSelector))
    this.currentBookingSub$ = this.currentBookingSelector.subscribe({
      next: (currentBooking) => {
        if (currentBooking) {
          this.currentBooking = currentBooking
          console.log('111', this.currentBooking);
          
          this.title = `Создать акт для брони №${currentBooking.order}`

          //Отправляем запрос на получение текущего физического лица
          this.store.dispatch(currentClientForActAction({ id: this.currentBooking?.client._id }));

          // Задаем необходимые даты
          this.xs_actual_date = this.datePipe.transform(Date.now(), 'dd.MM.yyyy');
          

          //Отправляем запрос на получение текущего автомобиля
          this.store.dispatch(carGetCurrent({ id: this.currentBooking?.car._id }));
        }
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


    // Подписываемся на селектор клиента для акта брони
    this.currentClientSelector = this.store.pipe(select(currentClientForAct))
    this.currentClientSub$ = this.currentClientSelector.subscribe({
      next: (currentClient) => {
        this.currentClient = currentClient
        console.log('222', this.currentClient);
        
      }
    })



   
    this.currentCarSelector = this.store.pipe(select(getCurrentCarSelector))
    this.currentCarSub$ = this.currentCarSelector.subscribe({
      next: (currentCar) => {
        this.currentCar = currentCar

        if (currentCar)
        {
          this.price_ocenka = convertNumberToWordsRu(currentCar.price_ocenka)
        }
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
          console.log('666', this.settingAvnoprokat);
          
        }
      }
    });
    
  }











  onSubmit() {

    // const pay_5: Pay = {
    //   type: 'Прием авто',
    //   pricePay: this.form.value.place_end_price || 0,
    //   typeMoney: this.form.value.typePayArenda,
    //   bookingId: this.bookingId,
    //   smenaId: this.currentSmema?._id,
    //   userId: this.currentUser?._id
    // };

    // this.store.dispatch(bookingCreatePayAction({ pay_1, pay_2, pay_3, pay_4, pay_5 }))

  }
}
