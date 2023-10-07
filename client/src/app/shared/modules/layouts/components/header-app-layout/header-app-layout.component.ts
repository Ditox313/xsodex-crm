import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { currentUserSelector } from 'src/app/account/store/selectors';
import { UserResponceRegister } from 'src/app/account/types/account.interfaces';
import { Location } from '@angular/common';
import { logoutAction } from 'src/app/account/store/actions/account.action';

@Component({
  selector: 'app-header-app-layout',
  templateUrl: './header-app-layout.component.html',
  styleUrls: ['./header-app-layout.component.css']
})
export class HeaderAppLayoutComponent implements OnInit {
  @Input() title: string = '';
  @Input() number?: any = '';
  currentUserSelector$!: Observable<UserResponceRegister | null | undefined>
  currentUser!: UserResponceRegister | null | undefined
  isVisibleAccountInfo: boolean = false



  
  constructor(private store: Store, private location: Location) { }
  
  ngOnInit(): void {
    this.initValues()
  }



  initValues() {
    this.currentUserSelector$ = this.store.pipe(select(currentUserSelector))
    this.currentUserSelector$.subscribe({
      next: (user)=>{
        this.currentUser = user
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

  isGoBack() {
    this.location.back();
  }
}
