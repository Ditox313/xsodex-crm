import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Act, Booking } from '../../types/bookings.interfaces';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';


import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



// Для корректной работы необходимо установить отдельный пакет типов для каждой библиотеки(см ошибку) и в tsconfig в compilerOptions 
// добавить "allowSyntheticDefaultImports": true,
import * as pdfMake from "pdfmake/build/pdfmake";
import * as  pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from "html-to-pdfmake"
import { getCurrentActSelector, getCurrentBookingSelector, isLoadingSelector } from '../../store/selectors';
import { bookingGetCurrent, bookingGetCurrentReset, currentActAction, currentActResetAction } from '../../store/actions/bookings.action';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-show-act-booking',
  templateUrl: './show-act-booking.component.html',
  styleUrls: ['./show-act-booking.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShowActBookingComponent {
  isLoadingSelector$!: Observable<boolean | null>
  currentActSelector!: Observable<Act | null | undefined>
  currentActSub$!: Subscription
  currentAct!: Act | null | undefined

  currentBookingSelector!: Observable<Booking | null | undefined>
  currentBookingSub$!: Subscription
  currentBooking!: Booking & { client: any } & { car: any } & { tarif: any } & { additional_services: any } | null | undefined;

  
  getParamsSub$!: Subscription
  title: string = ''
  bookingId: string = '';
  @ViewChild('content') content!: ElementRef | any;
  // private htmlString: any = ''
  // safeHtml!: any




  constructor(public datePipe: DatePipe, private store: Store, private rote: ActivatedRoute,private sanitizer: DomSanitizer) { 
    
  }


  ngOnInit(): void {
    this.getParams()
    this.initValues()
  }

  ngOnDestroy(): void {
    if (this.getParamsSub$) {
      this.getParamsSub$.unsubscribe()
    }
    if (this.currentActSub$) {
      this.currentActSub$.unsubscribe()
    }

    if (this.currentBookingSub$) {
      this.currentBookingSub$.unsubscribe()
    }

    //Отчищаем состояние currentClientFiz
    this.store.dispatch(currentActResetAction());
    this.store.dispatch(bookingGetCurrentReset());
  }

  getParams() {
    this.getParamsSub$ = this.rote.params.subscribe((params: any) => {
      this.bookingId = params['id'];
    });
  }


  initValues() {

    //Отчищаем состояние currentClientFiz
    this.store.dispatch(currentActResetAction());
    this.store.dispatch(bookingGetCurrentReset());


    // Получаем селектор loader
    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))
    

    //Отправляем запрос на получение текущей брони
    this.store.dispatch(bookingGetCurrent({ id: this.bookingId }));
    this.currentBookingSelector = this.store.pipe(select(getCurrentBookingSelector))
    this.currentBookingSub$ = this.currentBookingSelector.subscribe({
      next: (currentBooking) => {
        
        if (currentBooking) {
          this.currentBooking = currentBooking
          this.title = `Просмотр акта для брони №${currentBooking.order}`

          //Отправляем запрос на получение текущего акта
          this.store.dispatch(currentActAction({ id: this.currentBooking.act }));
        }
      }
    })

    

    this.currentActSelector = this.store.pipe(select(getCurrentActSelector))
    this.currentActSub$ = this.currentActSelector.subscribe({
      next: (act) => {
        
        
        this.currentAct = act
        // if(act)
        // {
        //   this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(act?.content);
        //   this.getHtmlElement()
        // }
      }
    })

  }

  // Преобразовываем контент который получили в нормальный Html что бы корректно рендерелся
  // getHtmlElement(): HTMLElement {
  //   const tempDiv = document.createElement('div');
  //   tempDiv.innerHTML = this.htmlString;
  //   return tempDiv.firstElementChild as HTMLElement;
  // }


  // Если вам нужно получить строку HTML обратно
  // getHtmlString(): string {
  //   const element = this.getHtmlElement();
  //   return element.outerHTML;
  // }




  // Генерируем PDF
  generatePDF() {
    // var html = htmlToPdfmake(this.content.nativeElement.innerHTML);

    const styledHtml = `<div style="font-size: 10px;">${this.currentAct ? this.currentAct.content : ''}</div>`;
    const html = htmlToPdfmake(styledHtml);

    if(this.currentAct)
    {
      let docDefinition = {
        content: [html],
      };
  
      pdfMake.createPdf(docDefinition).download('Акт  для брони №' + this.currentBooking?.order + '.pdf');
    }
  }




  // Генерируем PDF(V2)
  generatePdf(content: string, filename: string): void {
   // Создаем временный div элемент
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;

  // Устанавливаем шрифт 23px для всех элементов <td>
  const tdElements = tempDiv.getElementsByTagName('td');
  for (let i = 0; i < tdElements.length; i++) {
    tdElements[i].style.fontSize = '23px';
    tdElements[i].style.padding = '5px';
    tdElements[i].style.lineHeight = '110%';
  }



   // Устанавливаем шрифт 23px для всех элементов <div> с классом .xs_table_div
   const divElements = tempDiv.querySelectorAll('div');
   for (let i = 0; i < divElements.length; i++) {
     divElements[i].style.fontSize = '25px';
   }

  

  // Добавляем временный div в DOM (это нужно для корректной работы html2canvas)
  document.body.appendChild(tempDiv);
  
    html2canvas(tempDiv).then(canvas => {
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
  
      // Удаляем временный div из DOM
      document.body.removeChild(tempDiv);
  
      // pdf.autoPrint(); // Автоматически открывает окно печати
      // window.open(pdf.output('bloburl'), '_blank'); // Открывает PDF в новом окне
      pdf.save(filename); // Сохраняем PDF с указанным именем файла
    });
  }



}
