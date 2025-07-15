import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { clientFizDeleteAction, clientsFizListAction, clientsFizListResetAction, clientsFizSearchAction, clientsFizSearchResetAction, noMoreClientsFizListFalseAction, noMoreClientsFizListTrueAction } from 'src/app/clients/store/actions/actionsClientsFiz/clientsFiz.action';
import { noMoreTrustedPersoneListFalseAction, noMoreTrustedPersoneListTrueAction, trustedPersoneDeleteAction, trustedPersoneListAction, TrustedPersoneListResetAction, trustedPersoneSearchAction, trustedPersoneSearchResetAction } from 'src/app/clients/store/actions/actionsClientsLaw/clientsLaw.action';
import { clientsFizListSelector, clientsFizSearchSelector, isLoadingSelector, noMoreClientsFizList } from 'src/app/clients/store/selectors/clientsFiz/selectorsClientsFiz';
import { noMoreTrustedPersoneLawList, trustedPersoneSearchSelector, trustedPersonesListSelector } from 'src/app/clients/store/selectors/clientslaw/selectorsClientsLaw';
import { ClientFiz, ClientsFizParamsFetch } from 'src/app/clients/types/clientsFiz/clientsFiz.interfaces';
import { ClientsLawParamsFetch, trustedPersone, TrustedPersoneParamsFetch } from 'src/app/clients/types/clientsLaw/clientsLaw.interfaces';

@Component({
  selector: 'app-list-trusted-persone',
  templateUrl: './list-trusted-persone.component.html',
  styleUrls: ['./list-trusted-persone.component.css']
})
export class ListTrustedPersoneComponent {
  STEP = 25;
  offset: number = 0;
  limit: number = this.STEP;
  title: string | null | undefined = 'Доверенные лица для ....' 
  isLoadingSelector!: Observable<boolean | null>
  noMoreTrustedPersoneList!: Observable<boolean | null>
  TrustedPersoneListSelector!: Observable<trustedPersone[] | null | undefined>
  TrustedPersoneListSub$!: Subscription
  TrustedPersoneList: trustedPersone[] | null | undefined = [];
  TrustedPersoneSearchSelector!: Observable<trustedPersone[] | null | undefined>
  TrustedPersoneSearchSub$!: Subscription
  TrustedPersoneSearch: trustedPersone[] | null | undefined = [];
  searchResult: ClientFiz[] = [];
  hasQuery: Boolean = false;
  clientLawId!: string
  getParamsSub$!: Subscription



  constructor( public datePipe: DatePipe, private store: Store, private rote: ActivatedRoute,) { }
  ngOnInit(): void {
    this.getParams()
    this.initValues();
    this.getTrustedPersoneList();
  }

  getParams() {
    this.getParamsSub$ = this.rote.params.subscribe((params: any) => {
      this.clientLawId = params['id'];
    });
  }

  ngOnDestroy(): void {
    if (this.TrustedPersoneListSub$) {
      this.TrustedPersoneListSub$.unsubscribe();
    }
    if (this.TrustedPersoneSearchSub$) {
      this.TrustedPersoneSearchSub$.unsubscribe();
    }

    this.store.dispatch(TrustedPersoneListResetAction());
    this.store.dispatch(trustedPersoneSearchResetAction());
  }

  initValues() {
    // Отчищаем состояние перед запросом на получение списка физических лиц
    this.store.dispatch(TrustedPersoneListResetAction());

    // Отчищаем состояние поиска
    this.store.dispatch(trustedPersoneSearchResetAction());


    // Получаем селектор loader
    this.isLoadingSelector = this.store.pipe(select(isLoadingSelector))


    this.noMoreTrustedPersoneList = this.store.pipe(select(noMoreTrustedPersoneLawList))





    this.TrustedPersoneListSelector = this.store.pipe(select(trustedPersonesListSelector))
    this.TrustedPersoneListSub$ = this.TrustedPersoneListSelector.subscribe({
      next: (TrustedPersoneList) => {
        if (TrustedPersoneList) {
          this.TrustedPersoneList = TrustedPersoneList;
          this.title = 'Доверенные лица для ' + TrustedPersoneList[0].organization

      

          if (this.TrustedPersoneList.length >= this.STEP) {
            this.store.dispatch(noMoreTrustedPersoneListFalseAction());
          }
          else {
            // Изменяем значение noMoreClientsFizList в состоянии на true что бы скрыть кнопку загрузить ещё
            this.store.dispatch(noMoreTrustedPersoneListTrueAction());
          }
        }
      }
    });
  }


  getTrustedPersoneList() {
    const params: TrustedPersoneParamsFetch = {
      offset: this.offset,
      limit: this.limit,
      clientLawId: this.clientLawId
    };

    // Отправляем запрос на получения списка физических лиц
    this.store.dispatch(trustedPersoneListAction({ params: params }));
  }


  // Подгружаем физических лиц
  loadmore() {
    this.offset += this.STEP;
    this.getTrustedPersoneList();
  }


  // Удаление физического лица
  onDeleteTrustedPerson(event: Event, trustedPersone: trustedPersone) {
    event.stopPropagation();
    const dicision = window.confirm(`Удалить доверенное лицо?`);

    if (dicision) {
      this.store.dispatch(trustedPersoneDeleteAction({ id: trustedPersone._id }))
    }
  }


  // Поиск физ.лица
  search(e: any) {
    // Отчищаем запрос
    let query: string = e.target.value.trim()

    // Если запрос ничего не содержит или содержит только пробелы
    let matchSpaces = query.match(/\s*/);

    if (matchSpaces && matchSpaces[0] === query) {
      this.hasQuery = false;
      return;
    }

    

    // Отправляем запрос на сервер
    this.store.dispatch(trustedPersoneSearchAction({ data: query,  clientLawId: this.clientLawId}));



    this.TrustedPersoneSearchSelector = this.store.pipe(select(trustedPersoneSearchSelector))
    this.TrustedPersoneSearchSub$ = this.TrustedPersoneSearchSelector.subscribe({
      next: (trustedPersoneSearch) => {
        if (trustedPersoneSearch) {
          this.TrustedPersoneSearch = trustedPersoneSearch;
          this.hasQuery = true;
        }
      }
    });
  }
}
