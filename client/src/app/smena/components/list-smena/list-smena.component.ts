import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { isOpenedSmenaAction, smenaListAction, smenaListResetAction } from '../../store/actions/smena.action';
import { Smena, SmenaParamsFetch } from '../../types/smena.interfaces';
import { Observable, Subscription, of } from 'rxjs';
import { isLoadingSelector, isOpenedSmenaSelector, smenaListSelector } from 'src/app/smena/store/selectors';


// Шаг пагинации
const STEP = 2;

@Component({
  selector: 'app-list-smena',
  templateUrl: './list-smena.component.html',
  styleUrls: ['./list-smena.component.css']
})
export class ListSmenaComponent implements OnInit {
  title: string = 'Смены'
  isOpenedSmenaSelector!: Observable<Smena | null | undefined>
  isOpenedSmenaSub$!: Subscription
  isOpenedSmena!: Smena | null | undefined
  isLoadingSelector!: Observable<boolean | null>
  smenaListSelector!: Observable<Smena[] | null | undefined >
  smenaListSub$!: Subscription
  smenaList: Smena[] | null | undefined = [];
  smenaListLoadmoreSelector!: Observable<Smena[] | null | undefined>
  smenaListLoadmoreSub$!: Subscription
  
  offset: number = 0;
  limit: number = STEP;
  noMoreSmenaList: Boolean = false;
  


  constructor(private store: Store) { }



  ngOnInit(): void {
    this.initValues();
    this.getSmenaList();
  }

  ngOnDestroy(): void {
    if (this.smenaListSub$) {
      this.smenaListSub$.unsubscribe();
    }
    if (this.smenaListLoadmoreSub$) {
      this.smenaListLoadmoreSub$.unsubscribe();
    }

    // Отчищаем состояние smenaList(Что бы после перехода на другую страницу список смен грузился заново)
    this.store.dispatch(smenaListResetAction());
    
  }


  initValues() {
    // Отправляем запрос на получение открытой смены
    this.store.dispatch(isOpenedSmenaAction())


    // Получаем селектор loader
    this.isLoadingSelector = this.store.pipe(select(isLoadingSelector))


    // Получаем селектор на получение открытой смены
    this.isOpenedSmenaSelector = this.store.pipe(select(isOpenedSmenaSelector))
    this.isOpenedSmenaSub$ = this.isOpenedSmenaSelector.subscribe({
      next: (isOpenedSmena) => {
        this.isOpenedSmena = isOpenedSmena
        console.log(this.isOpenedSmena);
        
      }
    })
    

    // Получаем селектор на получение списка смен и подписываемся на него. То есть мы наблюдаем за состоянием и отрисовываем список смен.
    // как только мы подгрузим еще, состояние изменится и соответственно изменится наш список смен
    this.smenaListSelector = this.store.pipe(select(smenaListSelector))
    this.smenaListSub$ = this.smenaListSelector.subscribe({
      next: (smenaList) => {
        if (smenaList) {
          this.smenaList = this.smenaList?.concat(smenaList);

          if(smenaList.length < STEP)
          {
            this.noMoreSmenaList = true
          }
        }
      }
    });
  }



  getSmenaList() {
    const params: SmenaParamsFetch = {
      offset: this.offset,
      limit: this.limit,
    };

    // Отправляем запрос на получения списка смен
    this.store.dispatch(smenaListAction({ params }));
  }



  // Подгружаем смены
  loadmore() {
    this.offset += STEP;
    this.getSmenaList();
  }

}
