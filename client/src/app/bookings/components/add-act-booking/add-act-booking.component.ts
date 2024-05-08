import { DatePipe } from '@angular/common';
import { Component, ElementRef, Renderer2, RendererFactory2, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { currentClientForAct, getCurrentBookingSelector, isLoadingSelector } from '../../store/selectors';
import { Act, Booking } from '../../types/bookings.interfaces';
import { UserResponceRegister } from 'src/app/account/types/account.interfaces';
import { addActBookingAction, bookingGetCurrent, bookingGetCurrentReset, currentClientForActAction, currentClientForActResetAction } from '../../store/actions/bookings.action';
import { Smena } from 'src/app/smena/types/smena.interfaces';
import { currentUserSelector } from 'src/app/account/store/selectors';
import { isOpenedSmenaSelector } from 'src/app/smena/store/selectors';
import { ClientFiz, ClientFizDogovorsParamsFetch, Dogovor } from 'src/app/clients/types/clientsFiz/clientsFiz.interfaces';
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
import { clientFizDogovorsListAction, clientFizDogovorsListResetAction } from 'src/app/clients/store/actions/actionsClientsFiz/clientsFiz.action';
import { clientsFizDogovorsListSelector } from 'src/app/clients/store/selectors/clientsFiz/selectorsClientsFiz';


@Component({
  selector: 'app-add-act-booking',
  templateUrl: './add-act-booking.component.html',
  styleUrls: ['./add-act-booking.component.css']
})


export class AddActBookingComponent {
  @ViewChild('content') content!: ElementRef | any;
  STEP = 1000;
  offset: number = 0;
  limit: number = this.STEP;

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




  clientFizListDogovorsSelector!: Observable<Dogovor[] | null | undefined>
  clientFizListDogovorsSub$!: Subscription
  clientFizListDogovors: Dogovor[] | null | undefined = [];



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
  private renderer!: Renderer2;
  actualDogovorForClientBooking!: Dogovor;


  constructor(public datePipe: DatePipe, private store: Store, private rote: ActivatedRoute, private rendererFactory: RendererFactory2) { 
    this.renderer = rendererFactory.createRenderer(null, null);
  }

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


    if (this.clientFizListDogovorsSub$) {
      this.clientFizListDogovorsSub$.unsubscribe();
    }


    

    //Отчищаем состояние 
    this.store.dispatch(bookingGetCurrentReset());
    this.store.dispatch(currentClientForActResetAction());
    this.store.dispatch(carGetCurrentReset());
    this.store.dispatch(settingsAvtoparkListResetAction());
    this.store.dispatch(clientFizDogovorsListResetAction());
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
    this.store.dispatch(clientFizDogovorsListResetAction());


    //Отправляем запрос на получение текущей брони
    this.store.dispatch(bookingGetCurrent({ id: this.bookingId }));
    this.currentBookingSelector = this.store.pipe(select(getCurrentBookingSelector))
    this.currentBookingSub$ = this.currentBookingSelector.subscribe({
      next: (currentBooking) => {
        if (currentBooking) {
          this.currentBooking = currentBooking

          this.getClientFizListDogovors()
          
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
          
        }
      }
    });




     // Получаем список договоров для клиента
    this.clientFizListDogovorsSelector = this.store.pipe(select(clientsFizDogovorsListSelector))
    this.clientFizListDogovorsSub$ = this.clientFizListDogovorsSelector.subscribe({
      next: (clientsFizDogovorsList) => {
        if (clientsFizDogovorsList) {
          this.clientFizListDogovors = clientsFizDogovorsList;
          clientsFizDogovorsList.forEach(dogovor => {
          
            if(dogovor.state === 'active')
            {
              this.actualDogovorForClientBooking = dogovor
            }
            
          })
        }
      }
    });


    
  }





  // Функция для получаения всех договоров для клиента
  getClientFizListDogovors() {
    const params: ClientFizDogovorsParamsFetch = {
      offset: this.offset,
      limit: this.limit,
      clientId: this.currentBooking?.client._id
    };

    // // Отправляем запрос на получения списка физических лиц
    this.store.dispatch(clientFizDogovorsListAction({ params: params }));
  }

  


  // Отчищаем сохраняемый контент от служебных тегов Angular(ng-content и тд)
  cleanHtmlContent(): string {
    if (!this.content || !this.content.nativeElement) {
      return '';
    }
  
    const tempEl = this.renderer.createElement('div');
    this.renderer.appendChild(tempEl, this.content.nativeElement.cloneNode(true));
  
    const allElements = tempEl.getElementsByTagName('*');
    for (let i = 0; i < allElements.length; i++) {
      const element = allElements[i];
      const attributes = element.attributes;
  
      for (let j = attributes.length - 1; j >= 0; j--) {
        const attrName = attributes[j].name;
        if (attrName.startsWith('ng-') || attrName.startsWith('_ng')) {
          element.removeAttribute(attrName);
        }
      }
    }
  
    return tempEl.innerHTML;
  }








  // Генерируем PDF
  generatePDF() {
    const styledHtml = `<div style="font-size: 9px;">${this.content.nativeElement.innerHTML}</div>`;
    const html = htmlToPdfmake(styledHtml);

    let docDefinition = {
      content: [html],
    };

    pdfMake.createPdf(docDefinition).download('Акт  для брони №' + this.currentBooking?.order + '.pdf');

  } 


  







  // Создаем договор
  createAct() {
    const cleanedContent = this.cleanHtmlContent();

    const act: Act = {
      act_number: this.xs_actual_date + '/СТС-' + this.currentClient._id,
      userId: this.currentUser?._id,
      content: cleanedContent,
      clientId: this.currentClient._id,
      bookingId: this.currentBooking?._id,
      smenaId: this.currentSmema?._id
    }

    this.store.dispatch(addActBookingAction({ act: act }));

  }
}
