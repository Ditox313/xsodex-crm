import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { isLoadingSelector } from 'src/app/clients/store/selectors/clientslaw/selectorsClientsLaw';
import { ClientLaw, ClientLawDogovorsParamsFetch, Dogovor } from 'src/app/clients/types/clientsLaw/clientsLaw.interfaces';

@Component({
  selector: 'app-list-dogovors-clients-law',
  templateUrl: './list-dogovors-clients-law.component.html',
  styleUrls: ['./list-dogovors-clients-law.component.css']
})
export class ListDogovorsClientsLawComponent {
  STEP = 2;
  offset: number = 0;
  limit: number = this.STEP;
  title: string = 'Договоры - юридические лица'
  getParamsSub$!: Subscription
  isLoadingSelector!: Observable<boolean | null>
  noMoreClientLawListDogovors!: Observable<boolean | null>
  clientLawListDogovorsSelector!: Observable<ClientLaw[] | null | undefined>
  clientLawListDogovorsSub$!: Subscription
  clientLawListDogovors: ClientLaw[] | null | undefined = [];
  clientLawId!: string


  constructor(private store: Store, private rote: ActivatedRoute,) { }


  ngOnInit(): void {
    this.getParams()
    this.initValues();
    this.getClientLawListDogovors();
  }

  ngOnDestroy(): void {
    if (this.clientLawListDogovorsSub$) {
      this.clientLawListDogovorsSub$.unsubscribe();
    }

    if (this.getParamsSub$) {
      this.getParamsSub$.unsubscribe();
    }

    // Отчищаем состояние clientsFizList Dogovors если не хотим сохранять список авто  в состояние
    // this.store.dispatch(clientFizDogovorsListResetAction());
  }

  getParams() {
    this.getParamsSub$ = this.rote.params.subscribe((params: any) => {
      this.clientLawId = params['id'];
    });
  }

  initValues() {

    // Отчищаем состояние clientsFizList Dogovors если не хотим сохранять список авто  в состояние
    // this.store.dispatch(clientFizDogovorsListResetAction());

    // Получаем селектор loader
    this.isLoadingSelector = this.store.pipe(select(isLoadingSelector))


    // Получаем селектор noMoreClientsFizDogovorsList
    // this.noMoreClientFizListDogovors = this.store.pipe(select(noMoreClientDogovorsFizList))




    // Получаем селектор на получение списка и подписываемся на него. То есть мы наблюдаем за состоянием и отрисовываем список смен.
    // как только мы подгрузим еще, состояние изменится и соответственно изменится наш список смен
    // this.clientFizListDogovorsSelector = this.store.pipe(select(clientsFizDogovorsListSelector))
    // this.clientFizListDogovorsSub$ = this.clientFizListDogovorsSelector.subscribe({
    //   next: (clientsFizDogovorsList) => {
    //     if (clientsFizDogovorsList) {
    //       this.clientFizListDogovors = clientsFizDogovorsList;


    //       if (this.clientFizListDogovors.length >= this.STEP) {
    //         // Изменяем значение noMoreClientsFizList в состоянии на false что бы открыть кнопку загрузить ещё
    //         this.store.dispatch(noMoreClientsFizListFalseAction());
    //       }
    //       else {
    //         // Изменяем значение noMoreClientsFizList в состоянии на true что бы скрыть кнопку загрузить ещё
    //         this.store.dispatch(noMoreClientsFizListTrueAction());
    //       }
    //     }
    //   }
    // });
  }


  getClientLawListDogovors() {
    const params: ClientLawDogovorsParamsFetch = {
      offset: this.offset,
      limit: this.limit,
      clientId: this.clientLawId
    };

    // // Отправляем запрос на получения списка физических лиц
    // this.store.dispatch(clientFizDogovorsListAction({ params: params }));
  }


  // Подгружаем физических лиц
  loadmore() {
    this.offset += this.STEP;
    this.getClientLawListDogovors();
  }


  // Удаление договор физического лица
  onDeleteClientLawDogovor(event: Event, clientLawDogovor: Dogovor) {
    event.stopPropagation();
    const dicision = window.confirm(`Удалить договор?`);

    if (dicision) {
      // this.store.dispatch(clientFizDogovorDeleteAction({ id: clientFizDogovor._id }))
    }
  }
}
