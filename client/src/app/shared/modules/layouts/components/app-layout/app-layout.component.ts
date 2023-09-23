import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { logoutAction } from 'src/app/account/store/actions/logout.action';
import { isLoadingSelector } from 'src/app/account/store/selectors';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit {
  isLoadingSelector$!: Observable<boolean | null>

  constructor(
    private store: Store
  ) { }
  
  ngOnInit(): void {
    this.initValues()
  }


  initValues() {
    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))
  }

  logout(): void {
    this.store.dispatch(logoutAction())
  }
}
