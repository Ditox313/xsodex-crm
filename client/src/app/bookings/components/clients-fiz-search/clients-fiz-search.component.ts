import { Component, EventEmitter, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ClientFiz, ClientsFizParamsFetch } from 'src/app/clients/types/clientsFiz/clientsFiz.interfaces';
import { isLoadingSelector } from '../../store/selectors';
import { clientsFizListSelector, clientsFizSearchSelector, getCurrentClientFizSelector, getFromAddClientSelector, noMoreClientsFizList } from 'src/app/clients/store/selectors/clientsFiz/selectorsClientsFiz';
import { BookingsParamsFetch } from '../../types/bookings.interfaces';
import { changeCleintForBookingAction, changeCleintForBookingResetAction  } from '../../store/actions/bookings.action';
import { clientFizGetCurrentReset, clientsFizListAction, clientsFizListResetAction, clientsFizSearchAction, clientsFizSearchResetAction, noMoreClientsFizListFalseAction, noMoreClientsFizListTrueAction } from 'src/app/clients/store/actions/actionsClientsFiz/clientsFiz.action';

@Component({
  selector: 'app-clients-fiz-search',
  templateUrl: './clients-fiz-search.component.html',
  styleUrls: ['./clients-fiz-search.component.css']
})
export class ClientsFizSearchComponent {
  STEP = 50;
  offset: number = 0;
  limit: number = this.STEP;
  isLoadingSelector!: Observable<boolean | null>
  noMoreClientsFizList!: Observable<boolean | null>
  clientsFizListSelector!: Observable<ClientFiz[] | null | undefined>
  clientsFizListSub$!: Subscription
  clientsFizList: any[] | null | undefined = [];
  clientsFizSearchSelector!: Observable<any | null | undefined>
  clientsFizSearchSub$!: Subscription
  clientsFizSearch: any[] | null | undefined = [];
  searchResult: any[] = [];
  hasQuery: Boolean = false;
  dogovor_active!: string;
  currentClient!: any
  currentClientId: string = ''
  isVisibleModalClient: boolean = false
  isVisibleAddModalClientFiz: boolean = false
  fromAddClientSelector?: Observable<string | null | undefined>
  fromAddClientSub$!: Subscription
  fromAddClient?: string = ''
  currentClientFizSelector!: Observable<ClientFiz | null | undefined>
  currentClientFizSub$!: Subscription


  @Output() toggleOnLaw: EventEmitter<string> = new EventEmitter()



  
  constructor(private store: Store) { }
  ngOnInit(): void {
    this.initValues();
    this.getClientsList();
  }

  ngOnDestroy(): void {
    if (this.clientsFizListSub$) {
      this.clientsFizListSub$.unsubscribe();
    }
    if (this.clientsFizSearchSub$) {
      this.clientsFizSearchSub$.unsubscribe();
    }
    if (this.fromAddClientSub$) {
      this.fromAddClientSub$.unsubscribe();
    }


     // Отчищаем состояние clientsFizList если не хотим сохранять список авто  в состояние
     this.store.dispatch(clientsFizListResetAction());

     // Отчищаем состояние поиска
     this.store.dispatch(clientsFizSearchResetAction());

      // Отчищаем выбранного клиента
      this.store.dispatch(changeCleintForBookingResetAction());
    

  }

  initValues() {
    // Отчищаем состояние перед запросом на получение списка физических лиц
    this.store.dispatch(clientsFizListResetAction());

    // Отчищаем состояние поиска
    this.store.dispatch(clientsFizSearchResetAction());

    // Отчищаем выбранного клиента
    this.store.dispatch(changeCleintForBookingResetAction());


    //Отчищаем состояние currentClientFiz
    this.store.dispatch(clientFizGetCurrentReset());


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



  getClientsList() {
    const params: ClientsFizParamsFetch = {
      offset: this.offset,
      limit: this.limit,
    };

    // Отправляем запрос на получения списка физических лиц
    this.store.dispatch(clientsFizListAction({ params: params }));
  }


  // Проверяем результат создания договора.Если договор создан то запускаем листинг клиентов еще раз
  resultDogovor(result: any)
  {
    if (result)
    {
      this.dogovor_active = 'active'
      this.store.dispatch(changeCleintForBookingAction({ client: this.currentClient }));
      this.store.dispatch(clientsFizSearchResetAction());
      this.store.dispatch(clientsFizListResetAction());

      // Отчищаем список и состояние списка что бы обновить его.Для того что бы у вабранного клиента изменить состояние активного договора
      this.clientsFizList = []
      this.getClientsList()

      // Ставим статус неактивный договор, работало при создании 2-х и более клиентов
      setTimeout(()=>{
        this.dogovor_active = 'no_active'
      }, 200)
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
      this.dogovor_active = 'active'
      this.store.dispatch(changeCleintForBookingAction({ client: client }));
    }
    
  }

  // Модалка для создания договора
  modalClientAddDogovor() {
    this.isVisibleModalClient = !this.isVisibleModalClient
  }

  // Модалка для создания клиента физ
  modalAddClientFizClick()
  {
    this.isVisibleAddModalClientFiz = !this.isVisibleAddModalClientFiz
  }



  // Переключаем на Юр.лиц
  toggleOnClientsLaw()
  {
    this.toggleOnLaw?.emit('toggleOnLaw')
  }
  



  // Обрабатывает @output из компонента создания физ.лица(Когда создаем клиента из брони)
  clientAddStatus(e: any)
  {
    if(e === 'client_ok')
    {
      // Закрываем модальную форму после создания клиента
      this.isVisibleAddModalClientFiz = false


      // Получаем клиента которого только создали
      this.currentClientFizSelector = this.store.pipe(select(getCurrentClientFizSelector))
      this.currentClientFizSub$ = this.currentClientFizSelector.subscribe({
        next: (currentClientFiz) => {
          this.currentClient = currentClientFiz
          this.currentClientId = currentClientFiz?._id || ''

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
