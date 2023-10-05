import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { isOpenedSmenaAction, smenaListAction } from '../../store/actions/smena.action';
import { Smena, SmenaParamsFetch } from '../../types/smena.interfaces';
import { Observable, Subscription, of } from 'rxjs';
import { isLoadingSelector, smenaListSelector } from 'src/app/smena/store/selectors';


// Шаг пагинации
const STEP = 60;

@Component({
  selector: 'app-list-smena',
  templateUrl: './list-smena.component.html',
  styleUrls: ['./list-smena.component.css']
})
export class ListSmenaComponent implements OnInit {
  title: string = 'Смены'
  isOpenedSmena : Smena | null = null
  isLoadingSelector$!: Observable<boolean | null>
  smenaListSelector!: Observable<Smena[] | null | undefined >
  smenaListSub$!: Subscription
  smenaList: Smena[] | null | undefined = [] ;
  offset: number = 0;
  limit: number = STEP;
  noMoreSmenaList: Boolean = false;
  




  constructor(private store: Store) { }



  ngOnInit(): void {
    this.initValues()
    this.getAllSmena();
  }

  ngOnDestroy(): void {
    if (this.smenaListSub$) {
      this.smenaListSub$.unsubscribe();
    }
  }


  initValues() {
    // Получаем открытую смену если она есть
    this.store.dispatch(isOpenedSmenaAction())

    // Получаем селектор loader
    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))


    // Получаем список смен
    this.smenaListSelector = this.store.pipe(select(smenaListSelector))
    this.smenaListSub$ = this.smenaListSelector.subscribe({
      next: (smenaList) => {
        if (smenaList)
        {
          this.smenaList = smenaList

          if (this.smenaList.length < STEP) {
            this.noMoreSmenaList = true;
          }
        }
        
      }
    })
  }



  getAllSmena() {
    const params: SmenaParamsFetch = {
      offset: this.offset,
      limit: this.limit,
    };

    this.store.dispatch(smenaListAction({params}))

    // this.smenaListSelector$ = this.smenaService.getAllSmena(params).subscribe((smenas) => {
    //   if (smenas.length < STEP) {
    //     this.noMoreSmenas = true;
    //   }

    //   this.smenaList = this.smenaList.concat(smenas);
    //   console.log(smenas);
      
    // });
  }

}
