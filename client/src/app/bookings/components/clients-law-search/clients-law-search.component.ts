import { Component, EventEmitter, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ClientFiz, ClientsFizParamsFetch } from 'src/app/clients/types/clientsFiz/clientsFiz.interfaces';
import { isLoadingSelector } from '../../store/selectors';
import { clientsFizListSelector, clientsFizSearchSelector, getCurrentClientFizSelector, getFromAddClientSelector, noMoreClientsFizList } from 'src/app/clients/store/selectors/clientsFiz/selectorsClientsFiz';
import { BookingsParamsFetch } from '../../types/bookings.interfaces';
import { changeCleintForBookingAction, changeCleintForBookingResetAction  } from '../../store/actions/bookings.action';
import { clientFizGetCurrentReset, clientsFizListAction, clientsFizListResetAction, clientsFizSearchAction, clientsFizSearchResetAction, noMoreClientsFizListFalseAction, noMoreClientsFizListTrueAction } from 'src/app/clients/store/actions/actionsClientsFiz/clientsFiz.action';
import { clientLawGetCurrentReset, clientsLawListAction, clientsLawListResetAction, clientsLawSearchAction, clientsLawSearchResetAction, noMoreClientsLawListFalseAction, noMoreClientsLawListTrueAction } from 'src/app/clients/store/actions/actionsClientsLaw/clientsLaw.action';
import { clientsLawListSelector, clientsLawSearchSelector, getCurrentClientLawSelector, noMoreClientsLawList } from 'src/app/clients/store/selectors/clientslaw/selectorsClientsLaw';
import { ClientsLawParamsFetch } from 'src/app/clients/types/clientsLaw/clientsLaw.interfaces';


@Component({
  selector: 'app-clients-law-search',
  templateUrl: './clients-law-search.component.html',
  styleUrls: ['./clients-law-search.component.css']
})
export class ClientsLawSearchComponent {
  STEP = 2;
  offset: number = 0;
  limit: number = this.STEP;
  isLoadingSelector!: Observable<boolean | null>
  noMoreClientsLawList!: Observable<boolean | null>
  clientsLawListSelector!: Observable<ClientFiz[] | null | undefined>
  clientsLawListSub$!: Subscription
  clientsLawList: any[] | null | undefined = [];
  clientsLawSearchSelector!: Observable<any | null | undefined>
  clientsLawSearchSub$!: Subscription
  clientsLawSearch: any[] | null | undefined = [];
  searchResult: any[] = [];
  hasQuery: Boolean = false;
  dogovor_active!: string;
  currentClient!: any
  currentClientId: string = ''
  isVisibleModalClient: boolean = false
  isVisibleAddModalClientLaw: boolean = false
  fromAddClientSelector?: Observable<string | null | undefined>
  fromAddClientSub$!: Subscription
  fromAddClient?: string = ''
  currentClientLawSelector!: Observable<ClientFiz | null | undefined>
  currentClientLawSub$!: Subscription


  @Output() toggleOnFiz: EventEmitter<string> = new EventEmitter()



  
  constructor(private store: Store) { }
  ngOnInit(): void {
    this.initValues();
    this.getClientsList();
  }

  ngOnDestroy(): void {
    if (this.clientsLawListSub$) {
      this.clientsLawListSub$.unsubscribe();
    }
    if (this.clientsLawSearchSub$) {
      this.clientsLawSearchSub$.unsubscribe();
    }
    if (this.fromAddClientSub$) {
      this.fromAddClientSub$.unsubscribe();
    }


      // Отчищаем состояние clientsLawList если не хотим сохранять список авто  в состояние
      this.store.dispatch(clientsLawListResetAction());

      // Отчищаем состояние поиска
      this.store.dispatch(clientsLawSearchResetAction());

      // Отчищаем выбранного клиента
      this.store.dispatch(changeCleintForBookingResetAction());
    

  }

  initValues() {
    // Отчищаем состояние clientsLawList если не хотим сохранять список авто  в состояние
    this.store.dispatch(clientsLawListResetAction());


    // Отчищаем состояние поиска
    this.store.dispatch(clientsLawSearchResetAction());

    // Отчищаем выбранного клиента
    this.store.dispatch(changeCleintForBookingResetAction());


    //Отчищаем состояние currentClientFiz
    this.store.dispatch(clientLawGetCurrentReset());


    // Получаем селектор loader
    this.isLoadingSelector = this.store.pipe(select(isLoadingSelector))


    // Получаем селектор noMoreClientsLawList
    this.noMoreClientsLawList = this.store.pipe(select(noMoreClientsLawList))




    // Получаем селектор на получение списка физических лиц и подписываемся на него. То есть мы наблюдаем за состоянием и отрисовываем список смен.
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



  getClientsList() {
    const params: ClientsLawParamsFetch = {
      offset: this.offset,
      limit: this.limit,
    };

    // Отправляем запрос на получения списка физических лиц
    this.store.dispatch(clientsLawListAction({ params: params }));
  }


  // Проверяем результат создания договора.Если договор создан то запускаем листинг клиентов еще раз
  resultDogovor(result: any)
  {
    if (result)
    {
      this.dogovor_active = 'active'
      this.store.dispatch(changeCleintForBookingAction({ client: this.currentClient }));
      this.store.dispatch(clientsLawSearchResetAction());
      this.store.dispatch(clientsLawListResetAction());

      // Отчищаем список и состояние списка что бы обновить его.Для того что бы у вабранного клиента изменить состояние активного договора
      this.clientsLawList = []
      this.getClientsList()
    }
    
  }




  loadmore() {
    this.offset += this.STEP;
    this.getClientsList();
  }


  changeClientLaw(client: any)
  {
    this.currentClient = client
    this.currentClientId = client._id
    

    // Проверяем статус договора
    if (this.currentClient.dogovor_active === 'no_active')
    {
      this.dogovor_active = 'no_active'
    }
    else
    {
      this.dogovor_active = 'active'
      this.store.dispatch(changeCleintForBookingAction({ client: client }));
    }
    
    
  }

  // Модалка для создания договора
  modalClientAddDogovor() {
    this.isVisibleModalClient = !this.isVisibleModalClient
  }


  // Модалка для создания клиента юр
  modalAddClientLawClick()
  {
    this.isVisibleAddModalClientLaw = !this.isVisibleAddModalClientLaw
  }



  // Переключаем на физ.лиц
  toggleOnClientsFiz()
  {
    this.toggleOnFiz?.emit('toggleOnFiz')
  }
  



  // Обрабатывает @output из компонента создания физ.лица(Когда создаем клиента из брони)
  clientAddStatus(e: any)
  {
    if(e === 'client_ok')
    {
      // Закрываем модальную форму после создания клиента
      this.isVisibleAddModalClientLaw = false


      // Получаем клиента которого только создали
      this.currentClientLawSelector = this.store.pipe(select(getCurrentClientLawSelector))
      this.currentClientLawSub$ = this.currentClientLawSelector.subscribe({
        next: (currentClientLaw) => {
          this.currentClient = currentClientLaw
          this.currentClientId = currentClientLaw?._id || ''

          if(this.currentClient.dogovor_active === 'no_active')
          {
            this.dogovor_active = 'no_active'
          }
          else
          {
            this.dogovor_active = 'active'
            this.store.dispatch(changeCleintForBookingAction({ client: this.currentClient  }));
          }
          
        }
      })
  }
}





   // Поиск юр.лица
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
    this.store.dispatch(clientsLawSearchAction({ data: query }));


    // Получаем селектор на получение списка поиска физических лиц и подписываемся на него. То есть мы наблюдаем за состоянием и отрисовываем список смен.
    // как только мы подгрузим еще, состояние изменится и соответственно изменится наш список смен
    this.clientsLawSearchSelector = this.store.pipe(select(clientsLawSearchSelector))
    this.clientsLawSearchSub$ = this.clientsLawSearchSelector.subscribe({
      next: (clientsFizSearch) => {
        if (clientsFizSearch) {
          this.clientsLawSearch = clientsFizSearch;
          this.hasQuery = true;
        }
      }
    });
  }
}
