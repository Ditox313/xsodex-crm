import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Act } from 'src/app/bookings/types/bookings.interfaces';
import { actsListForClientFizAction, actsListForClientFizResetAction, clientFizGetCurrent, noMoreActsListClientFizFalseAction, noMoreActsListClientFizTrueAction } from 'src/app/clients/store/actions/actionsClientsFiz/clientsFiz.action';
import { actsListFizSelector, getCurrentClientFizSelector, isLoadingSelector, noMoreActsListClientFizActionSelector } from 'src/app/clients/store/selectors/clientsFiz/selectorsClientsFiz';
import { ClientFiz, ClientFizDogovorsParamsFetch, ClientsFizParamsFetch } from 'src/app/clients/types/clientsFiz/clientsFiz.interfaces';

@Component({
  selector: 'app-list-acts-client-fiz',
  templateUrl: './list-acts-client-fiz.component.html',
  styleUrls: ['./list-acts-client-fiz.component.css']
})
export class ListActsClientFizComponent {
  STEP = 2;
  offset: number = 0;
  limit: number = this.STEP;
  title: string = ''
  isLoadingSelector!: Observable<boolean | null>
  noMoreActsList!: Observable<boolean | null>
  actsListSelector!: Observable<Act[] | null | undefined>
  actsListSub$!: Subscription
  currentClientFizSelector!: Observable<ClientFiz | null | undefined>
  currentClientFizSub$!: Subscription
  currentClientFiz!: ClientFiz | null | undefined
  actsList: Act[] | null | undefined = [];
  getParamsSub$!: Subscription
  clientFizId!: string


  constructor(private store: Store, private rote: ActivatedRoute,) { }
  ngOnInit(): void {
    this.getParams()
    this.initValues();
    this.getActsList();
  }

  ngOnDestroy(): void {
    if (this.actsListSub$) {
      this.actsListSub$.unsubscribe();
    }

    if (this.getParamsSub$) {
      this.getParamsSub$.unsubscribe();
    }

    // Отчищаем состояние 
    this.store.dispatch(actsListForClientFizResetAction());
  }

  getParams() {
    this.getParamsSub$ = this.rote.params.subscribe((params: any) => {
      this.clientFizId = params['id'];
    });
  }

  initValues() {

    // Отчищаем состояние 
    this.store.dispatch(actsListForClientFizResetAction());

    // Получаем селектор loader
    this.isLoadingSelector = this.store.pipe(select(isLoadingSelector))



    //Отправляем запрос на получение текущего физического лица
    this.store.dispatch(clientFizGetCurrent({ id: this.clientFizId }));

    this.currentClientFizSelector = this.store.pipe(select(getCurrentClientFizSelector))
    this.currentClientFizSub$ = this.currentClientFizSelector.subscribe({
      next: (currentClientFiz) => {
        this.currentClientFiz = currentClientFiz

        if (currentClientFiz) {
          this.title = `Акты для клиента - ${currentClientFiz.surname} ${currentClientFiz.name} ${currentClientFiz.lastname}`
        }

      }
    })



    // Получаем акты
    this.actsListSelector = this.store.pipe(select(actsListFizSelector))
    this.actsListSub$ = this.actsListSelector.subscribe({
      next: (actsFizList) => {
        if (actsFizList) {
          this.actsList = actsFizList;

          if (this.actsList.length >= this.STEP) {
            // Изменяем значение noMoreClientsFizList в состоянии на false что бы открыть кнопку загрузить ещё
            this.store.dispatch(noMoreActsListClientFizFalseAction());
          }
          else {
            // Изменяем значение noMoreClientsFizList в состоянии на true что бы скрыть кнопку загрузить ещё
            this.store.dispatch(noMoreActsListClientFizTrueAction());
          }
        }
      }
    });
  }


  getActsList() {
    const params: ClientFizDogovorsParamsFetch = {
      offset: this.offset,
      limit: this.limit,
      clientId: this.clientFizId,
    };

    // Отправляем запрос на получения актов
    this.store.dispatch(actsListForClientFizAction({ params: params }));
  }


  // Подгружаем физических лиц
  loadmore() {
    this.offset += this.STEP;
    this.getActsList();
  }

}
