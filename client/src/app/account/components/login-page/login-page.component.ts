import { Component, ContentChildren, OnInit, QueryList } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewChild, ElementRef, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  @ViewChildren('switcher') switchers!: QueryList<ElementRef>;

  ngOnInit(): void {

  }
}
