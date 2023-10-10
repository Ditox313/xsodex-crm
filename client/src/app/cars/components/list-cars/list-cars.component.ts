import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-list-cars',
  templateUrl: './list-cars.component.html',
  styleUrls: ['./list-cars.component.css']
})
export class ListCarsComponent implements OnInit {
  title: string = 'Автопарк'

  carsList: any = [
    {
      img: 'https://ivanglazunov.ru/wp-content/uploads/d/d/a/ddad95fbc17a5169eb94455718ca9330.jpeg',
      marka:'BMW',
      number: 'а152аа 52',
      category: 'Бизнес',
      status: 'Рабочий в парке',
    }
  ]


  constructor(private store: Store) { }
  ngOnInit(): void {
   
  }
}
