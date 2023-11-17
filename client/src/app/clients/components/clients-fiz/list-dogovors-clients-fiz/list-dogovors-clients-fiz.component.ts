import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { isLoadingSelector } from 'src/app/clients/store/selectors/clientsFiz/selectorsClientsFiz';
import { ClientFiz } from 'src/app/clients/types/clientsFiz/clientsFiz.interfaces';

@Component({
  selector: 'app-list-dogovors-clients-fiz',
  templateUrl: './list-dogovors-clients-fiz.component.html',
  styleUrls: ['./list-dogovors-clients-fiz.component.css']
})
export class ListDogovorsClientsFizComponent {
  STEP = 2;
  offset: number = 0;
  limit: number = this.STEP;
  title: string = 'Договоры - физические лица'
  getParamsSub$!: Subscription
  isLoadingSelector!: Observable<boolean | null>
  noMoreClientFizListDogovors!: Observable<boolean | null>
  clientFizListDogovorsSelector!: Observable<ClientFiz[] | null | undefined>
  clientFizListDogovorsSub$!: Subscription
  clientFizListDogovors: ClientFiz[] | null | undefined = [];
  clientFizId!: string


  constructor(private store: Store, private rote: ActivatedRoute,) { }


  ngOnInit(): void {
    this.getParams()
    this.initValues();
    this.getClientFizListDogovors();
  }

  ngOnDestroy(): void {
    if (this.clientFizListDogovorsSub$) {
      this.clientFizListDogovorsSub$.unsubscribe();
    }

    if (this.getParamsSub$) {
      this.getParamsSub$.unsubscribe();
    }

    // Отчищаем состояние clientsFizList если не хотим сохранять список авто  в состояние
    // this.store.dispatch(clientsFizListResetAction());
  }

  getParams() {
    this.getParamsSub$ = this.rote.params.subscribe((params: any) => {
      this.clientFizId = params['id'];
    });
  }

  initValues() {
    // Отчищаем состояние перед запросом на получение списка физических лиц
    // this.store.dispatch(clientsFizListResetAction());


    // Получаем селектор loader
    this.isLoadingSelector = this.store.pipe(select(isLoadingSelector))


    // Получаем селектор noMoreClientsFizList
    // this.noMoreClientsFizList = this.store.pipe(select(noMoreClientsFizList))




    // Получаем селектор на получение списка физических лиц и подписываемся на него. То есть мы наблюдаем за состоянием и отрисовываем список смен.
    // как только мы подгрузим еще, состояние изменится и соответственно изменится наш список смен
    // this.clientsFizListSelector = this.store.pipe(select(clientsFizListSelector))
    // this.clientsFizListSub$ = this.clientsFizListSelector.subscribe({
    //   next: (clientsFizList) => {
    //     if (clientsFizList) {
    //       this.clientsFizList = clientsFizList;


    //       if (this.clientsFizList.length >= this.STEP) {
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


  getClientFizListDogovors() {
    // const params: ClientsFizParamsFetch = {
    //   offset: this.offset,
    //   limit: this.limit,
    // };

    // // Отправляем запрос на получения списка физических лиц
    // this.store.dispatch(clientsFizListAction({ params: params }));
  }


  // Подгружаем физических лиц
  loadmore() {
    this.offset += this.STEP;
    this.getClientFizListDogovors();
  }


  // Удаление физического лица
  onDeleteClientFizDogovor(event: Event, clientFiz: ClientFiz) {
    event.stopPropagation();
    const dicision = window.confirm(`Удалить клиента?`);

    if (dicision) {
      // this.store.dispatch(clientFizDeleteAction({ id: clientFiz._id }))
    }
  }
}
