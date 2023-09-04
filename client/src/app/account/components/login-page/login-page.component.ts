import { AfterViewInit, Component, Injectable, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})


export class LoginPageComponent implements OnInit, AfterViewInit {

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
   
  }

  ngAfterViewInit(): void {

  }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Вы успешно авторизированы', detail: 'Желаем удачи' });
  }


}
