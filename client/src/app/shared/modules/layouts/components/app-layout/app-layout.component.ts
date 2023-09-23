import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logoutAction } from 'src/app/account/store/actions/logout.action';
import { updateStateAction } from 'src/app/account/store/actions/updateState.action';
import { isLoadingSelector, tokenSelector } from 'src/app/account/store/selectors';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit, OnDestroy {
  isLoadingSelector$!: Observable<boolean | null>
  isTokenStateSub$!: Observable<string | null>

  links: any = [
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

  ngOnDestroy(): void {
    if (this.isTokenStateSub$)
    {
      this.isTokenStateSub$.subscribe()
    }
  }

  saveState()
  {
    this.store.subscribe(state => {
      localStorage.setItem('appState', JSON.stringify(state))
    })
  }


  initValues() {
    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))

    this.isTokenStateSub$ = this.store.pipe(select(tokenSelector))
    
    this.isTokenStateSub$.subscribe({
      next : (token) => {
       if(token !== '')
       {
         this.saveState()
       }
       else
       {
         this.store.dispatch(updateStateAction())
       }
      }
    })
  }

  logout(): void {
    this.store.dispatch(logoutAction())
  }
}
