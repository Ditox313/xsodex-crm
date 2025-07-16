import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { clientLawDeleteAction, clientsLawListAction, clientsLawListResetAction, clientsLawSearchAction, clientsLawSearchResetAction, noMoreClientsLawListFalseAction, noMoreClientsLawListTrueAction } from 'src/app/clients/store/actions/actionsClientsLaw/clientsLaw.action';
import { clientsLawListSelector, clientsLawSearchSelector, isLoadingSelector, noMoreClientsLawList } from 'src/app/clients/store/selectors/clientslaw/selectorsClientsLaw';
import { ClientLaw, ClientsLawParamsFetch } from 'src/app/clients/types/clientsLaw/clientsLaw.interfaces';

@Component({
  selector: 'app-list-clients-law',
  templateUrl: './list-clients-law.component.html',
  styleUrls: ['./list-clients-law.component.css']
})
export class ListClientsLawComponent {
  STEP = 25;
  offset: number = 0;
  limit: number = this.STEP;
  title: string = 'Клиенты - юридические лица'
  isLoadingSelector!: Observable<boolean | null>
  noMoreClientsLawList!: Observable<boolean | null>
  clientsLawListSelector!: Observable<ClientLaw[] | null | undefined>
  clientsLawListSub$!: Subscription
  clientsLawList: ClientLaw[] | null | undefined = [];
  clientsLawSearchSelector!: Observable<ClientLaw[] | null | undefined>
  clientsLawSearchSub$!: Subscription
  clientsLawSearch: ClientLaw[] | null | undefined = [];
  searchResult: ClientLaw[] = [];
  hasQuery: Boolean = false;




  constructor(private store: Store) { }
  ngOnInit(): void {
    this.initValues();
    this.getClientsLawList();
  }

  ngOnDestroy(): void {
    if (this.clientsLawListSub$) {
      this.clientsLawListSub$.unsubscribe();
    }
    if (this.clientsLawSearchSub$) {
      this.clientsLawSearchSub$.unsubscribe();
    }

    // Отчищаем состояние clientsLawList если не хотим сохранять список авто  в состояние
    this.store.dispatch(clientsLawListResetAction());

    // Отчищаем состояние поиска
    this.store.dispatch(clientsLawSearchResetAction());
  }

  initValues() {
    // Отчищаем состояние clientsLawList если не хотим сохранять список авто  в состояние
    this.store.dispatch(clientsLawListResetAction());


    // Отчищаем состояние поиска
    this.store.dispatch(clientsLawSearchResetAction());


    // Получаем селектор loader
    this.isLoadingSelector = this.store.pipe(select(isLoadingSelector))


    // Получаем селектор noMoreClientsLawList
    this.noMoreClientsLawList = this.store.pipe(select(noMoreClientsLawList))




    // Получаем селектор на получение списка юридичексих лиц и подписываемся на него. То есть мы наблюдаем за состоянием и отрисовываем список смен.
    // как только мы подгрузим еще, состояние изменится и соответственно изменится наш список смен
    this.clientsLawListSelector = this.store.pipe(select(clientsLawListSelector))
    this.clientsLawListSub$ = this.clientsLawListSelector.subscribe({
      next: (clientsLawList) => {
        if (clientsLawList) {
          this.clientsLawList = clientsLawList;

         
          


          if (this.clientsLawList.length >= this.STEP) {
            // Изменяем значение noMoreClientsFizList в состоянии на false что бы открыть кнопку загрузить ещё
            this.store.dispatch(noMoreClientsLawListFalseAction());
          }
          else {
            // Изменяем значение noMoreClientsFizList в состоянии на true что бы скрыть кнопку загрузить ещё
            this.store.dispatch(noMoreClientsLawListTrueAction());
          }
        }
      }
    });
  }


  getClientsLawList() {
    const params: ClientsLawParamsFetch = {
      offset: this.offset,
      limit: this.limit,
    };

    // Отправляем запрос на получения списка юридичексих лиц
    this.store.dispatch(clientsLawListAction({ params: params }));
  }


  // Подгружаем юридических лиц
  loadmore() {
    this.offset += this.STEP;
    this.getClientsLawList();
  }


  // Удаление юридического лица
  onDeleteClientLaw(event: Event, clientLaw: ClientLaw) {
    event.stopPropagation();
    const dicision = window.confirm(`Удалить клиента?`);

    if (dicision) {
      this.store.dispatch(clientLawDeleteAction({ id: clientLaw._id }))
    }
  }


  // Поиск физ.лица
  searchClientLaw(e: any) {
    // Отчищаем запрос
    let query: string = e.target.value.trim()

    //Если запрос ничего не содержит или содержит только пробелы
    let matchSpaces = query.match(/\s*/);

    if (matchSpaces && matchSpaces[0] === query) {
      this.hasQuery = false;
      return;
    }



    //Отправляем запрос на сервер
    this.store.dispatch(clientsLawSearchAction({ data: query }));


    // Получаем селектор на получение списка поиска физических лиц и подписываемся на него. То есть мы наблюдаем за состоянием и отрисовываем список смен.
    // как только мы подгрузим еще, состояние изменится и соответственно изменится наш список смен
    this.clientsLawSearchSelector = this.store.pipe(select(clientsLawSearchSelector))
    this.clientsLawSearchSub$ = this.clientsLawSearchSelector.subscribe({
      next: (clientsLawSearch) => {
        if (clientsLawSearch) {
          this.clientsLawSearch = clientsLawSearch;
          this.hasQuery = true;
        }
      }
    });
  }
}
