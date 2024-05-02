import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { clientFizDogovorGetCurrent, clientFizGetCurrentReset } from 'src/app/clients/store/actions/actionsClientsFiz/clientsFiz.action';
import { getCurrentDogovorClientFizSelector, isLoadingSelector } from 'src/app/clients/store/selectors/clientsFiz/selectorsClientsFiz';
import { Dogovor } from 'src/app/clients/types/clientsFiz/clientsFiz.interfaces';


// Для корректной работы необходимо установить отдельный пакет типов для каждой библиотеки(см ошибку) и в tsconfig в compilerOptions 
// добавить "allowSyntheticDefaultImports": true,
import * as pdfMake from "pdfmake/build/pdfmake";
import * as  pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from "html-to-pdfmake"


@Component({
  selector: 'app-show-dogovor-client-fiz',
  templateUrl: './show-dogovor-client-fiz.component.html',
  styleUrls: ['./show-dogovor-client-fiz.component.css']
})
export class ShowDogovorClientFizComponent {
  isLoadingSelector$!: Observable<boolean | null>
  currentDogovorClientFizSelector!: Observable<Dogovor | null | undefined>
  currentDogovorClientFizSub$!: Subscription
  currentDogovorClientFiz!: Dogovor | null | undefined
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
    if (this.currentDogovorClientFizSub$) {
      this.currentDogovorClientFizSub$.unsubscribe()
    }

    //Отчищаем состояние currentClientFiz
    this.store.dispatch(clientFizGetCurrentReset());
  }

  getParams() {
    this.getParamsSub$ = this.rote.params.subscribe((params: any) => {
      this.dogovorId = params['id'];
    });
  }


  initValues() {
    // Получаем селектор loader
    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))

    //Отправляем запрос на получение текущего логовора
    this.store.dispatch(clientFizDogovorGetCurrent({ id: this.dogovorId }));

    this.currentDogovorClientFizSelector = this.store.pipe(select(getCurrentDogovorClientFizSelector))
    this.currentDogovorClientFizSub$ = this.currentDogovorClientFizSelector.subscribe({
      next: (currentDogovorClientFiz) => {
        this.currentDogovorClientFiz = currentDogovorClientFiz

        if (currentDogovorClientFiz) {
          this.title = `Просмотр договора`
        }

      }
    })
  }




  // Генерируем PDF
  generatePDF() {
    const styledHtml = `<div style="font-size: 8px;">${this.content.nativeElement.innerHTML}</div>`;
    const html = htmlToPdfmake(styledHtml);

   if (this.currentDogovorClientFiz)
   {
     let docDefinition = {
       content: [html],
     };

     pdfMake.createPdf(docDefinition).download();
   }

  }
}
