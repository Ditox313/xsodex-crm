import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { clientFizDeleteAction, clientsFizListAction, clientsFizListResetAction, clientsFizSearchAction, clientsFizSearchResetAction, noMoreClientsFizListFalseAction, noMoreClientsFizListTrueAction } from 'src/app/clients/store/actions/actionsClientsFiz/clientsFiz.action';
import { clientsFizListSelector, clientsFizSearchSelector, isLoadingSelector, noMoreClientsFizList } from 'src/app/clients/store/selectors/clientsFiz/selectorsClientsFiz';
import { ClientFiz, ClientsFizParamsFetch } from 'src/app/clients/types/clientsFiz/clientsFiz.interfaces';

@Component({
  selector: 'app-list-clients-fiz',
  templateUrl: './list-clients-fiz.component.html',
  styleUrls: ['./list-clients-fiz.component.css']
})
export class ListClientsFizComponent {
  STEP = 25;
  offset: number = 0;
  limit: number = this.STEP;
  title: string = 'Клиенты - физические лица'
  isLoadingSelector!: Observable<boolean | null>
  noMoreClientsFizList!: Observable<boolean | null>
  clientsFizListSelector!: Observable<ClientFiz[] | null | undefined>
  clientsFizListSub$!: Subscription
  clientsFizList: ClientFiz[] | null | undefined = [];
  clientsFizSearchSelector!: Observable<ClientFiz[] | null | undefined>
  clientsFizSearchSub$!: Subscription
  clientsFizSearch: ClientFiz[] | null | undefined = [];
  searchResult: ClientFiz[] = [];
  hasQuery: Boolean = false;



  constructor(private store: Store) { }
  ngOnInit(): void {
    this.initValues();
    this.getClientsFizList();
  }

  ngOnDestroy(): void {
    if (this.clientsFizListSub$) {
      this.clientsFizListSub$.unsubscribe();
    }
    if (this.clientsFizSearchSub$) {
      this.clientsFizSearchSub$.unsubscribe();
    }

    // Отчищаем состояние clientsFizList если не хотим сохранять список авто  в состояние
    this.store.dispatch(clientsFizListResetAction());

    // Отчищаем состояние поиска
    this.store.dispatch(clientsFizSearchResetAction());
  }

  initValues() {
    // Отчищаем состояние перед запросом на получение списка физических лиц
    this.store.dispatch(clientsFizListResetAction());

    // Отчищаем состояние поиска
    this.store.dispatch(clientsFizSearchResetAction());


    // Получаем селектор loader
    this.isLoadingSelector = this.store.pipe(select(isLoadingSelector))


    // Получаем селектор noMoreClientsFizList
    this.noMoreClientsFizList = this.store.pipe(select(noMoreClientsFizList))




    // Получаем селектор на получение списка физических лиц и подписываемся на него. То есть мы наблюдаем за состоянием и отрисовываем список смен.
    // как только мы подгрузим еще, состояние изменится и соответственно изменится наш список смен
    this.clientsFizListSelector = this.store.pipe(select(clientsFizListSelector))
    this.clientsFizListSub$ = this.clientsFizListSelector.subscribe({
      next: (clientsFizList) => {
        if (clientsFizList) {
          this.clientsFizList = clientsFizList;


          if (this.clientsFizList.length >= this.STEP) {
            // Изменяем значение noMoreClientsFizList в состоянии на false что бы открыть кнопку загрузить ещё
            this.store.dispatch(noMoreClientsFizListFalseAction());
          }
          else {
            // Изменяем значение noMoreClientsFizList в состоянии на true что бы скрыть кнопку загрузить ещё
            this.store.dispatch(noMoreClientsFizListTrueAction());
          }
        }
      }
    });
  }


  getClientsFizList() {
    const params: ClientsFizParamsFetch = {
      offset: this.offset,
      limit: this.limit,
    };

    // Отправляем запрос на получения списка физических лиц
    this.store.dispatch(clientsFizListAction({ params: params }));
  }


  // Подгружаем физических лиц
  loadmore() {
    this.offset += this.STEP;
    this.getClientsFizList();
  }


  // Удаление физического лица
  onDeleteClientFiz(event: Event, clientFiz: ClientFiz) {
    event.stopPropagation();
    const dicision = window.confirm(`Удалить клиента?`);

    if (dicision) {
      this.store.dispatch(clientFizDeleteAction({ id: clientFiz._id }))
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
    this.store.dispatch(clientsFizSearchAction({ data: query }));


    // Получаем селектор на получение списка поиска физических лиц и подписываемся на него. То есть мы наблюдаем за состоянием и отрисовываем список смен.
    // как только мы подгрузим еще, состояние изменится и соответственно изменится наш список смен
    this.clientsFizSearchSelector = this.store.pipe(select(clientsFizSearchSelector))
    this.clientsFizSearchSub$ = this.clientsFizSearchSelector.subscribe({
      next: (clientsFizSearch) => {
        if (clientsFizSearch) {
          this.clientsFizSearch = clientsFizSearch;
          this.hasQuery = true;
        }
      }
    });
  }
}
