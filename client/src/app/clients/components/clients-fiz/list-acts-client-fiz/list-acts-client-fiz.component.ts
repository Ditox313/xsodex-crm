import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Act } from 'src/app/bookings/types/bookings.interfaces';
import { actsListForClientFizAction, actsListForClientFizResetAction, noMoreActsListClientFizFalseAction, noMoreActsListClientFizTrueAction } from 'src/app/clients/store/actions/actionsClientsFiz/clientsFiz.action';
import { actsListFizSelector, isLoadingSelector, noMoreActsListClientFizActionSelector } from 'src/app/clients/store/selectors/clientsFiz/selectorsClientsFiz';
import { ClientFizDogovorsParamsFetch, ClientsFizParamsFetch } from 'src/app/clients/types/clientsFiz/clientsFiz.interfaces';

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


    // Получаем селектор noMore
    this.noMoreActsList = this.store.pipe(select(noMoreActsListClientFizActionSelector))




    // Получаем акты
    this.actsListSelector = this.store.pipe(select(actsListFizSelector))
    this.actsListSub$ = this.actsListSelector.subscribe({
      next: (actsFizList) => {
        if (actsFizList) {
          this.actsList = actsFizList;
          console.log(this.actsList);
          


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


  // Удаление физического лица
  onDeleteAct(event: Event, act: Act) {
    event.stopPropagation();
    const dicision = window.confirm(`Удалить акт?`);

    // if (dicision) {
    //   this.store.dispatch(clientFizDeleteAction({ id: clientFiz._id }))
    // }
  }

}
