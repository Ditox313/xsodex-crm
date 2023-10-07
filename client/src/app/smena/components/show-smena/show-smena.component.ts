import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Smena } from '../../types/smena.interfaces';
import { SmenaService } from '../../services/smena.service';
import { DatePipe } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { smenaCloseAction, smenaGetCurrent, smenaGetCurrentReset } from '../../store/actions/smena.action';
import { getCurrentSmenaSelector, isLoadingSelector } from '../../store/selectors';

@Component({
  selector: 'app-show-smena',
  templateUrl: './show-smena.component.html',
  styleUrls: ['./show-smena.component.css']
})
export class ShowSmenaComponent implements OnInit, OnDestroy {
  title: string = 'Просмотр смены №'
  getParamsSub$!: Subscription
  isLoadingSelector!: Observable<boolean | null>
  currentSmemaSelector!: Observable<Smena | null | undefined>
  currentSmemaSub$!: Subscription
  currentSmema!: Smena | null | undefined
  smenaId!: string
  close_date: string = ''

  


  constructor( 
    private store: Store, 
    private router: Router,
    private rote: ActivatedRoute, 
    private smena: SmenaService,
    private datePipe: DatePipe,
    ) {}

  ngOnInit(): void {
    this.getParams()
    this.initValues()
  }

  ngOnDestroy(): void {
    if (this.getParamsSub$)
    {
      this.getParamsSub$.unsubscribe()
    } 
    if (this.currentSmemaSub$) {
      this.currentSmemaSub$.unsubscribe()
    } 

    // Отчищаем состояние smenaList перед началом работы компонента
    this.store.dispatch(smenaGetCurrentReset());

  }


  getParams() {
    this.getParamsSub$ = this.rote.params.subscribe((params: any) => {
      this.smenaId = params['id'];
    });
  }


  initValues()
  {
    // Отправляем запрос на получение текущей смены
    this.store.dispatch(smenaGetCurrent({ id: this.smenaId }));
    this.currentSmemaSelector = this.store.pipe(select(getCurrentSmenaSelector))
    this.currentSmemaSub$ = this.currentSmemaSelector.subscribe({
      next: (currentSmena) => {
        this.currentSmema = currentSmena
      }
    })


    // Получаем селектор loader
    this.isLoadingSelector = this.store.pipe(select(isLoadingSelector))
  }



  closeSmena(event: any) {
    this.close_date = this.datePipe.transform(new Date(), 'dd.MM.yyyy HH:mm') || ''
    
    //Закрытие смены
    this.store.dispatch(smenaCloseAction({
      id: this.smenaId,
      close_date: this.close_date
    }));
  }
}
