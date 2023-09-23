import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { currentUserSelector } from 'src/app/account/store/selectors';
import { UserResponceRegister } from 'src/app/account/types/account.interfaces';
import { logoutAction } from 'src/app/account/store/actions/logout.action';

@Component({
  selector: 'app-header-app-layout',
  templateUrl: './header-app-layout.component.html',
  styleUrls: ['./header-app-layout.component.css']
})
export class HeaderAppLayoutComponent implements OnInit {
  currentUserSelector$!: Observable<UserResponceRegister | null | undefined>
  currentUser!: UserResponceRegister | null | undefined
  isVisibleAccountInfo: boolean = false

  constructor(private store: Store) { }
  
  ngOnInit(): void {
    this.initValues()
  }



  initValues() {
    this.currentUserSelector$ = this.store.pipe(select(currentUserSelector))
    this.currentUserSelector$.subscribe({
      next: (user)=>{
        this.currentUser = user
        console.log(this.currentUser?.avatar);
        
      }
    })
  }


  setVisibleAccountInfo()
  {
    this.isVisibleAccountInfo = !this.isVisibleAccountInfo
  }

  logout(): void {
    this.store.dispatch(logoutAction())
  }
}
