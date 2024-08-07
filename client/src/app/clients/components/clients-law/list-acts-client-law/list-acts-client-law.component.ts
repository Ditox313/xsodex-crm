import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';
import { Act } from 'src/app/bookings/types/bookings.interfaces';
import { actsListForClientLawAction, actsListForClientLawResetAction, clientLawGetCurrent, noMoreActsListClientLawFalseAction, noMoreActsListClientLawTrueAction } from 'src/app/clients/store/actions/actionsClientsLaw/clientsLaw.action';
import { actsListLawSelector, getCurrentClientLawSelector, isLoadingSelector, noMoreActsListClientLawActionSelector } from 'src/app/clients/store/selectors/clientslaw/selectorsClientsLaw';
import { ClientFizDogovorsParamsFetch } from 'src/app/clients/types/clientsFiz/clientsFiz.interfaces';
import { ClientLaw, ClientLawDogovorsParamsFetch } from 'src/app/clients/types/clientsLaw/clientsLaw.interfaces';

@Component({
  selector: 'app-list-acts-client-law',
  templateUrl: './list-acts-client-law.component.html',
  styleUrls: ['./list-acts-client-law.component.css']
})
export class ListActsClientLawComponent {
  STEP = 2;
  offset: number = 0;
  limit: number = this.STEP;
  title: string = ''
  isLoadingSelector!: Observable<boolean | null>
  noMoreActsList!: Observable<boolean | null>
  actsListSelector!: Observable<Act[] | null | undefined>
  actsListSub$!: Subscription
  actsList: Act[] | null | undefined = [];
  currentClientLawSelector!: Observable<ClientLaw | null | undefined>
  currentClientLawSub$!: Subscription
  currentClientLaw!: ClientLaw | null | undefined
  getParamsSub$!: Subscription
  clientLawId!: string


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

    if (this.currentClientLawSub$) {
      this.currentClientLawSub$.unsubscribe();
    }

    // Отчищаем состояние 
    this.store.dispatch(actsListForClientLawResetAction());
  }

  getParams() {
    this.getParamsSub$ = this.rote.params.subscribe((params: any) => {
      this.clientLawId = params['id'];
    });
  }

  initValues() {

    // Отчищаем состояние 
    this.store.dispatch(actsListForClientLawResetAction());

    // Получаем селектор loader
    this.isLoadingSelector = this.store.pipe(select(isLoadingSelector))


    // Получаем селектор noMore
    this.noMoreActsList = this.store.pipe(select(noMoreActsListClientLawActionSelector))



    //Отправляем запрос на получение текущего Юридичекого лица
    this.store.dispatch(clientLawGetCurrent({ id: this.clientLawId }));

    this.currentClientLawSelector = this.store.pipe(select(getCurrentClientLawSelector))
    this.currentClientLawSub$ = this.currentClientLawSelector.subscribe({
      next: (currentClientLaw) => {
        this.currentClientLaw = currentClientLaw

        if (currentClientLaw) {
          this.title = `Акты для клиента - ${currentClientLaw.short_name} ${currentClientLaw.name}`
        }

      }
    })




    // Получаем акты
    this.actsListSelector = this.store.pipe(
      select(actsListLawSelector),
    );
    this.actsListSub$ = this.actsListSelector.subscribe((actsLawList)=>{
      if (actsLawList) {
        this.actsList = actsLawList;
      }
    });




    
  }


  getActsList() {
    const params: ClientLawDogovorsParamsFetch = {
      offset: this.offset,
      limit: this.limit,
      clientId: this.clientLawId,
    };

    // Отправляем запрос на получения актов
    this.store.dispatch(actsListForClientLawAction({ params: params }));
  }


  // Подгружаем физических лиц
  loadmore() {
    this.offset += this.STEP;
    this.getActsList();
  }
}
