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
import { ClientLaw, trustedPersone, TrustedPersoneParamsFetch } from 'src/app/clients/types/clientsLaw/clientsLaw.interfaces';
import { convert as convertNumberToWordsRu } from 'number-to-words-ru'


// Новый способо печати
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';




// Для корректной работы необходимо установить отдельный пакет типов для каждой библиотеки(см ошибку) и в tsconfig в compilerOptions 
// добавить "allowSyntheticDefaultImports": true,
import * as pdfMake from "pdfmake/build/pdfmake";
import * as  pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from "html-to-pdfmake"
import { Car } from 'src/app/cars/types/cars.interfaces';
import { carGetCurrent, carGetCurrentReset } from 'src/app/cars/store/actions/cars.action';
import { getCurrentCarSelector } from 'src/app/cars/store/selectors';
import { SettingAvtopark, SettingGlobal } from 'src/app/settings/types/settings.interfaces';
import { settingsAvtoparkListAction, settingsAvtoparkListResetAction, settingsGlobalListAction, settingsGlobalListResetAction } from 'src/app/settings/store/actions/settings.action';
import { settingsAvtoparkListSelector, settingsGlobalListSelector } from 'src/app/settings/store/selectors';
import { clientFizDogovorsListAction, clientFizDogovorsListResetAction } from 'src/app/clients/store/actions/actionsClientsFiz/clientsFiz.action';
import { clientsFizDogovorsListSelector } from 'src/app/clients/store/selectors/clientsFiz/selectorsClientsFiz';
import { masterPriemGetCurrent, masterPriemGetCurrentReset } from 'src/app/personal/store/actions/masters-priem.action';
import { MasterPriem } from 'src/app/personal/types/masters-priem.interfaces';
import { getCurrentMasterPriemSelector } from 'src/app/personal/store/selectors';
import { trustedPersonesListSelector } from 'src/app/clients/store/selectors/clientslaw/selectorsClientsLaw';
import { trustedPersoneListAction, TrustedPersoneListResetAction } from 'src/app/clients/store/actions/actionsClientsLaw/clientsLaw.action';


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



  currentMasterPriemSelector!: Observable<MasterPriem | null | undefined>
  currentMasterPriemSub$!: Subscription
  currentMasterPriem!: Car | null | undefined




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
  masterPriem: any = {
    name: '',
    surname: '',
    lastname: '',
    id: ''
  }



  settingsGlobalListSelector!: Observable<SettingGlobal[] | null | undefined>
  settingsGlobalListSub$!: Subscription
  settingsGlobalList: SettingGlobal[] | null | undefined = [];




  TrustedPersoneListSelector!: Observable<trustedPersone[] | null | undefined>
  TrustedPersoneListSub$!: Subscription
  TrustedPersoneList: trustedPersone[] | null | undefined = [];
  


  isVisibleTrustedPersonesModal: boolean = false
  isTrustedPersoneCheck: boolean = false
  isActDirectCheck: boolean = false
  checkedTrustedPersone: trustedPersone | null | undefined
  

  



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

    if (this.currentCarSub$) {
      this.currentCarSub$.unsubscribe();
    }

    if (this.currentMasterPriemSub$) {
      this.currentMasterPriemSub$.unsubscribe();
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

    if (this.settingsGlobalListSub$) {
      this.settingsGlobalListSub$.unsubscribe();
    }



    if (this.TrustedPersoneListSub$) {
      this.TrustedPersoneListSub$.unsubscribe();
    }

  
 


    

    //Отчищаем состояние 
    this.store.dispatch(bookingGetCurrentReset());
    this.store.dispatch(currentClientForActResetAction());
    this.store.dispatch(carGetCurrentReset());
    this.store.dispatch(masterPriemGetCurrentReset());
    this.store.dispatch(settingsAvtoparkListResetAction());
    this.store.dispatch(clientFizDogovorsListResetAction());
    this.store.dispatch(settingsGlobalListResetAction());
    this.store.dispatch(TrustedPersoneListResetAction());
    
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
      act_direct: new FormControl('',),
      trusted_persone: new FormControl('',),
    });
  }


  act_direct(){
    this.isActDirectCheck = ! this.isActDirectCheck
  }


  trusted_persone(){
    this.isTrustedPersoneCheck = !this.isTrustedPersoneCheck

    if(this.isTrustedPersoneCheck )
    {
      this.trustedPersonesModal()
    }

    if(!this.isTrustedPersoneCheck )
    {
      this.checkedTrustedPersone = null
    }


  }



  initValues() {

    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))

    //Отчищаем состояние 
    this.store.dispatch(bookingGetCurrentReset());
    this.store.dispatch(currentClientForActResetAction());
    this.store.dispatch(carGetCurrentReset());
    this.store.dispatch(settingsAvtoparkListResetAction());
    this.store.dispatch(clientFizDogovorsListResetAction());
    this.store.dispatch(masterPriemGetCurrentReset());
    this.store.dispatch(settingsGlobalListResetAction());
    this.store.dispatch(TrustedPersoneListResetAction());


    // Отправляем запрос на получения списка настроек глобальных
    this.store.dispatch(settingsGlobalListAction({ params: {} }));


    //Отправляем запрос на получение текущей брони
    this.store.dispatch(bookingGetCurrent({ id: this.bookingId }));
    this.currentBookingSelector = this.store.pipe(select(getCurrentBookingSelector))
    this.currentBookingSub$ = this.currentBookingSelector.subscribe({
      next: (currentBooking) => {
        if (currentBooking) {
          this.currentBooking = currentBooking
          this.masterPriem = currentBooking.masterPriem 

          

          this.getClientFizListDogovors()
          
          this.title = `Создать акт для брони №${currentBooking.order}`

          //Отправляем запрос на получение текущего физического лица
          this.store.dispatch(currentClientForActAction({ id: this.currentBooking?.client._id }));

          // Задаем необходимые даты
          this.xs_actual_date = this.datePipe.transform(Date.now(), 'dd.MM.yyyy');
          

          //Отправляем запрос на получение текущего автомобиля
          this.store.dispatch(carGetCurrent({ id: this.currentBooking?.car._id }));


          //Отправляем запрос на получение текущего мастера приемщика если он указан в брони
          if(this.masterPriem.name !== '')
          {
            this.store.dispatch(masterPriemGetCurrent({ id: this.masterPriem.id }));
          }
         
          
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

        if(this.currentClient && this.currentClient._id)
        {
           this.getTrustedPersoneList()
        }
       
        
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





    // Получаем текущего мастера приемщика
    this.currentMasterPriemSelector = this.store.pipe(select(getCurrentMasterPriemSelector))
    this.currentMasterPriemSub$ = this.currentMasterPriemSelector.subscribe({
      next: (masterPriem) => {
       this.masterPriem = masterPriem
       console.log(this.masterPriem);
       
      }
    })



      // Получаем селектор на получение списка settingsGlobalList и подписываемся на него.
    this.settingsGlobalListSelector = this.store.pipe(select(settingsGlobalListSelector))
    this.settingsGlobalListSub$ = this.settingsGlobalListSelector.subscribe({
      next: (settingsGlobalList) => {
        if (settingsGlobalList) {
          this.settingsGlobalList = settingsGlobalList;
          
        }
      }
    });



    // Получаем доверенных лиц
    this.TrustedPersoneListSelector = this.store.pipe(select(trustedPersonesListSelector))
    this.TrustedPersoneListSub$ = this.TrustedPersoneListSelector.subscribe({
      next: (TrustedPersoneList) => {
        if (TrustedPersoneList) {
          this.TrustedPersoneList = TrustedPersoneList;

          console.log('довq', this.TrustedPersoneList);
          
        }
      }
    });


    
  }



  // Получаем доверенных лиц
  getTrustedPersoneList() {
    const params: TrustedPersoneParamsFetch = {
      offset: this.offset,
      limit: this.limit,
      clientLawId: this.currentClient? this.currentClient._id : ''
    };

    // Отправляем запрос на получения списка физических лиц
    this.store.dispatch(trustedPersoneListAction({ params: params }));
  }




  
  // Регулируем видимость формы оплаты
  trustedPersonesModal()
  {
    this.isVisibleTrustedPersonesModal = !this.isVisibleTrustedPersonesModal
  }



  // При выборе доверенного лица
  trusted_persone_onchange(trustedPersone:trustedPersone)
  {
    this.checkedTrustedPersone = trustedPersone
    this.trustedPersonesModal()
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
    const styledHtml = `<div style="font-size: 10px;">${this.content.nativeElement.innerHTML}</div>`;
    const html = htmlToPdfmake(styledHtml);

    let docDefinition = {
      content: [html],
      pageMargins: [20, 20, 20, 20] as [number, number, number, number],
    };

    pdfMake.createPdf(docDefinition).download('Акт  для брони №' + this.currentBooking?.order + '.pdf');

  } 




  // Генерируем PDF(V2)
  generatePdf(elementRef: ElementRef, filename: string): void {
    const element = elementRef.nativeElement;
    if (!element) {
      console.error('Element not found');
      return;
    }

    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // pdf.autoPrint(); // Автоматически открывает окно печати
      // window.open(pdf.output('bloburl'), '_blank'); // Открывает PDF в новом окне
      pdf.save(filename); // Сохраняем PDF с указанным именем файла
    });
  }
    



  formatName(lastName: string, firstName?: string, middleName?: string): string {
      if (!lastName) {
        return '';
      }
    
      const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
      const middleInitial = middleName ? middleName.charAt(0).toUpperCase() : '';
    
      if (firstInitial && middleInitial) {
        return `${lastName} ${firstInitial}.${middleInitial}.`;
      } else if (firstInitial) {
        return `${lastName} ${firstInitial}.`;
      } else {
        return lastName;
      }
  }


// Проверяем значение на наличие-00 из тарифрв
hasDoubleZero(value: any): boolean {
  return String(value).includes('00');
}
removeDoubleZeroWithDash(value: any): string {
  return String(value).replace(/-?00/g, '');
}



// Извлекаем значение доверенности
getTextAfterColon(input: string): string {
  const index = input.indexOf(':');
  return index !== -1 ? input.substring(index + 1) : '';
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
