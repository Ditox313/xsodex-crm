import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Dogovor } from 'src/app/clients/types/clientsLaw/clientsLaw.interfaces';
import { DatePipe } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

// Для корректной работы необходимо установить отдельный пакет типов для каждой библиотеки(см ошибку) и в tsconfig в compilerOptions 
// добавить "allowSyntheticDefaultImports": true,
import * as pdfMake from "pdfmake/build/pdfmake";
import * as  pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from "html-to-pdfmake"
import { getCurrentDogovorClientLawSelector, isLoadingSelector } from 'src/app/clients/store/selectors/clientslaw/selectorsClientsLaw';
import { clientLawDogovorGetCurrent, clientLawGetCurrentReset } from 'src/app/clients/store/actions/actionsClientsLaw/clientsLaw.action';

@Component({
  selector: 'app-show-dogovor-client-law',
  templateUrl: './show-dogovor-client-law.component.html',
  styleUrls: ['./show-dogovor-client-law.component.css']
})
export class ShowDogovorClientLawComponent {
  isLoadingSelector$!: Observable<boolean | null>
  currentDogovorClientLawSelector!: Observable<Dogovor | null | undefined>
  currentDogovorClientLawSub$!: Subscription
  currentDogovorClientLaw!: Dogovor | null | undefined
  getParamsSub$!: Subscription
  title: string = ''
  dogovorId = '';
  @ViewChild('content') content!: ElementRef | any;


  constructor(public datePipe: DatePipe, private store: Store, private rote: ActivatedRoute,) { }


  ngOnInit(): void {
    this.getParams()
    this.initValues()
  }

  ngOnDestroy(): void {
    if (this.getParamsSub$) {
      this.getParamsSub$.unsubscribe()
    }
    if (this.currentDogovorClientLawSub$) {
      this.currentDogovorClientLawSub$.unsubscribe()
    }

    //Отчищаем состояние currentClientLaw
    this.store.dispatch(clientLawGetCurrentReset());
  }

  getParams() {
    this.getParamsSub$ = this.rote.params.subscribe((params: any) => {
      this.dogovorId = params['id'];
    });
  }


  initValues() {
    // Получаем селектор loader
    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))

    //Отправляем запрос на получение текущего договора
    this.store.dispatch(clientLawDogovorGetCurrent({ id: this.dogovorId }));

    this.currentDogovorClientLawSelector = this.store.pipe(select(getCurrentDogovorClientLawSelector))
    this.currentDogovorClientLawSub$ = this.currentDogovorClientLawSelector.subscribe({
      next: (currentDogovorClientLaw) => {
        this.currentDogovorClientLaw = currentDogovorClientLaw

        if (currentDogovorClientLaw) {
          this.title = `Просмотр договора`
        }

      }
    })
  }




  // Генерируем PDF
  generatePDF() {
    var html = htmlToPdfmake(this.content.nativeElement.innerHTML);

    if (this.currentDogovorClientLaw) {
      let docDefinition = {
        content: [html],
      };

      pdfMake.createPdf(docDefinition).download();
    }

  }
}
