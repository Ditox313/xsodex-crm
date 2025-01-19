import { Component, ElementRef, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Pay } from 'src/app/bookings/types/bookings.interfaces';
import { paysListForGeneralReportAction, paysListForGeneralReportResetAction } from '../../store/actions/smena.action';
import { isLoadingSelector, paysListForGeneralreportSelector } from '../../store/selectors';


import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-general-report-all-smena',
  templateUrl: './general-report-all-smena.component.html',
  styleUrls: ['./general-report-all-smena.component.css']
})
export class GeneralReportAllSmenaComponent implements OnInit, OnDestroy {
  @ViewChild('content') content!: ElementRef | any;
  isLoadingSelector!: Observable<boolean | null>
  paysListSelector!: Observable<Pay[] | null | undefined>;
  paysListSub$!: Subscription;
  paysList: Pay[] | null | undefined = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  ngOnDestroy(): void {
    if (this.paysListSub$) {
      this.paysListSub$.unsubscribe();
    }
    this.store.dispatch(paysListForGeneralReportResetAction());
  }

  private initializeValues(): void {
    this.paysListSelector = this.store.pipe(select(paysListForGeneralreportSelector));
    this.paysListSub$ = this.paysListSelector.subscribe({
      next: (paysList) => {
        if (paysList) {
          this.paysList = paysList;
        }
      }
    });
    this.isLoadingSelector = this.store.pipe(select(isLoadingSelector));
  }

  private fetchData(): void {
    this.store.dispatch(paysListForGeneralReportAction());
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

    // Добавляем отступ сверху (50 пикселей)
    const paddingTop = 10; // Отступ сверху
    let position = paddingTop; // Начинаем с отступа


    // let position = 0;
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





  // Методы расчета как в вашем примере
  private convertToNumber(price: string | Number): number {
    return typeof price === 'string' ? Number(price) : price.valueOf();
  }

  calculateSumByType(type: string): number {
    if (!this.paysList) return 0;
    
    const regularPayments = this.paysList
      .filter(pay => pay.typeMoney === type && pay.type !== 'Залог')
      .reduce((sum, pay) => sum + this.convertToNumber(pay.pricePay), 0);

    const depositsReceived = this.paysList
      .filter(pay => pay.typeMoney === type && pay.type === 'Залог' && this.convertToNumber(pay.pricePay) > 0)
      .reduce((sum, pay) => sum + this.convertToNumber(pay.pricePay), 0);

    const depositsReturned = this.paysList
      .filter(pay => pay.typeMoney === type && pay.type === 'Залог' && this.convertToNumber(pay.pricePay) < 0)
      .reduce((sum, pay) => sum + this.convertToNumber(pay.pricePay), 0);

    return regularPayments + depositsReceived + depositsReturned;
  }

  calculateTotalDeposits(): number {
    if (!this.paysList) return 0;
    return this.paysList
      .filter(pay => pay.type === 'Залог')
      .reduce((sum, pay) => sum + this.convertToNumber(pay.pricePay), 0);
  }

  calculateTotalIncome(): number {
    if (!this.paysList) return 0;
    return this.paysList
      .filter(pay => pay.type !== 'Залог')
      .reduce((sum, pay) => sum + this.convertToNumber(pay.pricePay), 0);
  }
}