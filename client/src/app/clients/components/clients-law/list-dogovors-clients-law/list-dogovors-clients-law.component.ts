import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { clientLawDogovorDeleteAction, clientLawDogovorsListAction, clientLawDogovorsListResetAction, noMoreClientsLawListFalseAction, noMoreClientsLawListTrueAction } from 'src/app/clients/store/actions/actionsClientsLaw/clientsLaw.action';
import { clientsLawDogovorsListSelector, isLoadingSelector, noMoreClientDogovorsLawList } from 'src/app/clients/store/selectors/clientslaw/selectorsClientsLaw';
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

    // Отчищаем состояние clientsLawList Dogovors если не хотим сохранять список авто  в состояние
    this.store.dispatch(clientLawDogovorsListResetAction());
  }

  getParams() {
    this.getParamsSub$ = this.rote.params.subscribe((params: any) => {
      this.clientLawId = params['id'];
    });
  }

  initValues() {

    // Отчищаем состояние clientsLawList Dogovors если не хотим сохранять список авто  в состояние
    this.store.dispatch(clientLawDogovorsListResetAction());

    // Получаем селектор loader
    this.isLoadingSelector = this.store.pipe(select(isLoadingSelector))


    // Получаем селектор noMoreClientsFizDogovorsList
    this.noMoreClientLawListDogovors = this.store.pipe(select(noMoreClientDogovorsLawList))




    // Получаем селектор на получение списка и подписываемся на него. То есть мы наблюдаем за состоянием и отрисовываем список смен.
    // как только мы подгрузим еще, состояние изменится и соответственно изменится наш список смен
    this.clientLawListDogovorsSelector = this.store.pipe(select(clientsLawDogovorsListSelector))
    this.clientLawListDogovorsSub$ = this.clientLawListDogovorsSelector.subscribe({
      next: (clientsLawDogovorsList) => {
        if (clientsLawDogovorsList) {
          this.clientLawListDogovors = clientsLawDogovorsList;


          if (this.clientLawListDogovors.length >= this.STEP) {
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


  getClientLawListDogovors() {
    const params: ClientLawDogovorsParamsFetch = {
      offset: this.offset,
      limit: this.limit,
      clientId: this.clientLawId
    };

    // // Отправляем запрос на получения списка физических лиц
    this.store.dispatch(clientLawDogovorsListAction({ params: params }));
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
      this.store.dispatch(clientLawDogovorDeleteAction({ id: clientLawDogovor._id }))
    }
  }
}
