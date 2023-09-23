import { Component } from '@angular/core';
import { AuthService } from './account/services/auth.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService, private store: Store ) { }



  ngOnInit() {
    // Если у нас есть токен в localStorage, то мы его заносим в переменную токем в нашем сервисе auth.service
    const potentialToken = localStorage.getItem('auth-token');
    if (potentialToken !== null) {
      this.authService.setToken(potentialToken);
    }
  }
}
