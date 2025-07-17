import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Pay } from 'src/app/bookings/types/bookings.interfaces';
import {
  paysListForGeneralReportAction,
  paysListForGeneralReportResetAction
} from '../../store/actions/smena.action';
import { isLoadingSelector, paysListForGeneralreportSelector } from '../../store/selectors';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-general-report-all-smena',
  templateUrl: './general-report-all-smena.component.html',
  styleUrls: ['./general-report-all-smena.component.css']
})
export class GeneralReportAllSmenaComponent implements OnInit, OnDestroy {
  @ViewChild('content') content!: ElementRef;

  isLoadingSelector!: Observable<boolean>;
  paysListSelector!: Observable<Pay[]>;
  private paysListSub$!: Subscription;
  private paysList: Pay[] = [];

  startDate: string = '';
  endDate:   string = '';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isLoadingSelector = this.store.pipe(select(isLoadingSelector));

    this.paysListSelector = this.store.pipe(
      select(paysListForGeneralreportSelector),
      filter((list): list is Pay[] => Array.isArray(list))
    );

    this.paysListSub$ = this.paysListSelector.subscribe(list => {
      this.paysList = list;
    });

    this.store.dispatch(paysListForGeneralReportAction());
  }

  ngOnDestroy(): void {
    this.paysListSub$.unsubscribe();
    this.store.dispatch(paysListForGeneralReportResetAction());
  }

  get filteredPaysList(): Pay[] {
    if (!this.startDate || !this.endDate) {
      return this.paysList;
    }
    const from = new Date(this.startDate);
    from.setHours(0, 0, 0, 0);
    const to = new Date(this.endDate);
    to.setHours(23, 59, 59, 999);

    return this.paysList.filter(pay => {
      if (!pay.date) return false;
      const d = new Date(pay.date);
      return d >= from && d <= to;
    });
  }

  reset(): void {
    this.startDate = '';
    this.endDate   = '';
  }

  generatePdf(elementRef: ElementRef, filename: string): void {
    const element = elementRef.nativeElement;
    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        pdf.addPage();
        position = heightLeft - imgHeight + 10;
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(filename);
    });
  }

  private convertToNumber(price: string | number | Number): number {
    if (typeof price === 'string') {
      return Number(price);
    }
    return typeof price === 'number' ? price : price.valueOf();
  }

  calculateSumByType(type: string): number {
    const list = this.filteredPaysList;
    const regular = list
      .filter(p => p.typeMoney === type && p.type !== 'Залог')
      .reduce((sum, p) => sum + this.convertToNumber(p.pricePay), 0);

    const received = list
      .filter(p => p.typeMoney === type && p.type === 'Залог' && this.convertToNumber(p.pricePay) > 0)
      .reduce((sum, p) => sum + this.convertToNumber(p.pricePay), 0);

    const returned = list
      .filter(p => p.typeMoney === type && p.type === 'Залог' && this.convertToNumber(p.pricePay) < 0)
      .reduce((sum, p) => sum + this.convertToNumber(p.pricePay), 0);

    return regular + received + returned;
  }

  calculateTotalDeposits(): number {
    return this.filteredPaysList
      .filter(p => p.type === 'Залог')
      .reduce((sum, p) => sum + this.convertToNumber(p.pricePay), 0);
  }

  calculateTotalIncome(): number {
    return this.filteredPaysList
      .filter(p => p.type !== 'Залог')
      .reduce((sum, p) => sum + this.convertToNumber(p.pricePay), 0);
  }
}
