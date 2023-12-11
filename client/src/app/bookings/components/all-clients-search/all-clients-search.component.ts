import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ClientFiz, ClientsFizParamsFetch } from 'src/app/clients/types/clientsFiz/clientsFiz.interfaces';
import { clientsForSearchListSelector, clientsSearchSelector, isLoadingSelector, noMoreClientsList } from '../../store/selectors';
import { Store, select } from '@ngrx/store';
import { BookingsParamsFetch } from '../../types/bookings.interfaces';
import { changeCleintForBookingAction, changeCleintForBookingResetAction, clientsForSearchListAction, clientsForSearchListResetAction, clientsSearchAction, clientsSearchResetAction, noMoreClientsForSearchListAction, noMoreClientsForSearchListFalseAction, noMoreClientsForSearchListTrueAction } from '../../store/actions/bookings.action';

@Component({
  selector: 'app-all-clients-search',
  templateUrl: './all-clients-search.component.html',
  styleUrls: ['./all-clients-search.component.css']
})
export class AllClientsSearchComponent {
  STEP = 2;
  offset: number = 0;
  limit: number = this.STEP;
  title: string = 'Клиенты - физические лица'
  isLoadingSelector!: Observable<boolean | null>
  noMoreClientsList!: Observable<boolean | null>
  clientsListSelector!: Observable<ClientFiz[] | null | undefined>
  clientsListSub$!: Subscription
  clientsList: any[] | null | undefined = [];
  clientsSearchSelector!: Observable<any | null | undefined>
  clientsSearchSub$!: Subscription
  clientsSearch: any[] | null | undefined = [];
  searchResult: any[] = [];
  hasQuery: Boolean = false;
  dogovor_active!: string;
  currentClient!: any
  currentClientId: string = ''
  isVisibleModalClient: boolean = false
  isVisibleAddModalClient: boolean = false


  constructor(private store: Store) { }
  ngOnInit(): void {
    this.initValues();
    this.getClientsList();
  }

  ngOnDestroy(): void {
    if (this.clientsListSub$) {
      this.clientsListSub$.unsubscribe();
    }
    if (this.clientsSearchSub$) {
      this.clientsSearchSub$.unsubscribe();
    }


    this.store.dispatch(clientsForSearchListResetAction());
    this.store.dispatch(clientsSearchResetAction());
    this.store.dispatch(changeCleintForBookingResetAction());
  }

  initValues() {

    this.store.dispatch(clientsForSearchListResetAction());
    this.store.dispatch(clientsSearchResetAction());
    this.store.dispatch(changeCleintForBookingResetAction());

    // Получаем селектор loader
    this.isLoadingSelector = this.store.pipe(select(isLoadingSelector))


    // Получаем селектор noMoreClientsFizList
    this.noMoreClientsList = this.store.pipe(select(noMoreClientsList))





    this.clientsListSelector = this.store.pipe(select(clientsForSearchListSelector))
    this.clientsListSub$ = this.clientsListSelector.subscribe({
      next: (clientsList) => {
        if (clientsList) {
          this.clientsList = clientsList;


          if (this.clientsList.length >= this.STEP) {

            this.store.dispatch(noMoreClientsForSearchListFalseAction());
          }
          else {
            // Изменяем значение noMoreClientsFizList в состоянии на true что бы скрыть кнопку загрузить ещё
            this.store.dispatch(noMoreClientsForSearchListTrueAction());
          }
        }
      }
    });
  }


  getClientsList() {
    const params: BookingsParamsFetch = {
      offset: this.offset,
      limit: this.limit,
    };


    this.store.dispatch(clientsForSearchListAction({ params: params }));
  }


  // Проверяем результат создания договора.Если договор создан то запускаем листинг клиентов еще раз
  resultDogovor(result: any)
  {
    if (result)
    {
      this.dogovor_active = 'active'
      this.store.dispatch(changeCleintForBookingAction({ client: this.currentClient }));
      this.store.dispatch(clientsForSearchListResetAction());
      this.store.dispatch(clientsSearchResetAction());
      this.store.dispatch(changeCleintForBookingResetAction());
      this.getClientsList()
    }
    
  }





  loadmore() {
    this.offset += this.STEP;
    this.getClientsList();
  }


  changeClient(client: any)
  {
    this.currentClient = client
    this.currentClientId = client._id
    

    // Проверяем статус договора
    if (client.dogovor_active === 'no_active')
    {
      this.dogovor_active = 'no_active'
    }
    else
    {
      this.store.dispatch(changeCleintForBookingAction({ client: client }));
    }
    
  }

  // Модалка для создания договора
  modalClientClick() {
    this.isVisibleModalClient = !this.isVisibleModalClient
  }

  // Модалка для создания клиента
  modalAddClientClick()
  {
    this.isVisibleAddModalClient = !this.isVisibleAddModalClient
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
    this.store.dispatch(clientsSearchAction({ data: query }));



    this.clientsSearchSelector = this.store.pipe(select(clientsSearchSelector))
    this.clientsSearchSub$ = this.clientsSearchSelector.subscribe({
      next: (clientsSearch) => {
        if (clientsSearch) {
          this.clientsSearch = clientsSearch;
          this.hasQuery = true;
        }
      }
    });
  }
}
