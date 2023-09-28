import { Component } from '@angular/core';

@Component({
  selector: 'app-list-smena',
  templateUrl: './list-smena.component.html',
  styleUrls: ['./list-smena.component.css']
})
export class ListSmenaComponent {
  title: string = 'Смены'

  products = [
    {
      code: '1',
      name: 'Имя',
      category: 'Категория',
      quantity: 'Колличество'
    },
    {
      code: '1',
      name: 'Имя',
      category: 'Категория',
      quantity: 'Колличество'
    },
    {
      code: '1',
      name: 'Имя',
      category: 'Категория',
      quantity: 'Колличество'
    }
  ]
}
