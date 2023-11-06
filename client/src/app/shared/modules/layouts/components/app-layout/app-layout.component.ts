import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { updateStateAction } from 'src/app/account/store/actions/account.action';
import { isLoadingSelector, tokenSelector } from 'src/app/account/store/selectors';
import { updateStateCarsAction } from 'src/app/cars/store/actions/cars.action';
import { isOpenedSmenaAction, updateStateSmenaAction } from 'src/app/smena/store/actions/smena.action';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit {
  isLoadingSelector$!: Observable<boolean | null>
  isTokenStateSub$!: Observable<string | null>

  links: any = [
    {
      url: '/list-smena',
      name: 'Смены',
      icon: 'pi-file-import'
    },
    {
      url: '/list-cars',
      name: 'Автопарк',
      icon: 'pi-car'
    },
    {
      url: '/account-settings-page',
      name: 'Настройки',
      icon: 'pi-cog'
    },
  ];

  constructor( private store: Store) { }
  
  ngOnInit(): void {
    this.initValues()
  }


  // Обновляем состояние в LocalStorage
  updateState()
  {
    this.store.subscribe(state => {
      localStorage.setItem('appState', JSON.stringify(state))
    })
  }


  initValues() {
    
    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))
    this.isTokenStateSub$ = this.store.pipe(select(tokenSelector))
    

    // Когда мы сделаем перезагрузку у нас слетит токнен. Соответственно пока мы не выполним dispatch по обновлении User, у нас токена не будет в state
    // И мы можем обновлять все другие состояния.А dispatch по обновлении User стоит выполнить в последнюю очередь. В редьюсере выбираем какие поля из 
    // состояния нужно обновлять при перезагрузки страницы.
    this.isTokenStateSub$.subscribe({
      next : (token) => {
        // Подписываемся на токнен.Пока его не будет мы будем просто базово обновлять состояние.
       if(token !== '')
       {
         this.updateState()
       }
       else
       {
        // Обновляем состояние смены
         this.store.dispatch(updateStateSmenaAction())

         // Обновляем состояние cars
         this.store.dispatch(updateStateCarsAction())




        //  Выполнять последним, что бы обновить токен только после всех обновлений состояний
         this.store.dispatch(updateStateAction())
       }
      }
    })
  }

  
}
