import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { clientFizDogovorDeleteAction, clientFizDogovorsListAction, clientFizDogovorsListResetAction, noMoreClientsFizListFalseAction, noMoreClientsFizListTrueAction } from 'src/app/clients/store/actions/actionsClientsFiz/clientsFiz.action';
import { clientsFizDogovorsListSelector, isLoadingSelector, noMoreClientDogovorsFizList } from 'src/app/clients/store/selectors/clientsFiz/selectorsClientsFiz';
import { ClientFiz, ClientFizDogovorsParamsFetch, Dogovor } from 'src/app/clients/types/clientsFiz/clientsFiz.interfaces';

@Component({
  selector: 'app-list-dogovors-clients-fiz',
  templateUrl: './list-dogovors-clients-fiz.component.html',
  styleUrls: ['./list-dogovors-clients-fiz.component.css']
})
export class ListDogovorsClientsFizComponent {
  STEP = 30;
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

    // Отчищаем состояние clientsFizList Dogovors если не хотим сохранять список авто  в состояние
    this.store.dispatch(clientFizDogovorsListResetAction());
  }

  getParams() {
    this.getParamsSub$ = this.rote.params.subscribe((params: any) => {
      this.clientFizId = params['id'];
    });
  }

  initValues() {

    // Отчищаем состояние clientsFizList Dogovors если не хотим сохранять список авто  в состояние
    this.store.dispatch(clientFizDogovorsListResetAction());

    // Получаем селектор loader
    this.isLoadingSelector = this.store.pipe(select(isLoadingSelector))


    // Получаем селектор noMoreClientsFizDogovorsList
    this.noMoreClientFizListDogovors = this.store.pipe(select(noMoreClientDogovorsFizList))




    // Получаем селектор на получение списка и подписываемся на него. То есть мы наблюдаем за состоянием и отрисовываем список смен.
    // как только мы подгрузим еще, состояние изменится и соответственно изменится наш список смен
    this.clientFizListDogovorsSelector = this.store.pipe(select(clientsFizDogovorsListSelector))
    this.clientFizListDogovorsSub$ = this.clientFizListDogovorsSelector.subscribe({
      next: (clientsFizDogovorsList) => {
        if (clientsFizDogovorsList) {
          this.clientFizListDogovors = clientsFizDogovorsList;


          if (this.clientFizListDogovors.length >= this.STEP) {
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


  getClientFizListDogovors() {
    const params: ClientFizDogovorsParamsFetch = {
      offset: this.offset,
      limit: this.limit,
      clientId: this.clientFizId
    };

    // // Отправляем запрос на получения списка физических лиц
    this.store.dispatch(clientFizDogovorsListAction({ params: params }));
  }


  // Подгружаем физических лиц
  loadmore() {
    this.offset += this.STEP;
    this.getClientFizListDogovors();
  }


  // Удаление физического лица
  onDeleteClientFizDogovor(event: Event, clientFizDogovor: Dogovor) {
    event.stopPropagation();
    const dicision = window.confirm(`Удалить договор?`);

    if (dicision) {
      this.store.dispatch(clientFizDogovorDeleteAction({ id: clientFizDogovor._id }))
    }
  }
}
