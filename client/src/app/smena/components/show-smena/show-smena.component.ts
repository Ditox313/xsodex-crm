import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-show-smena',
  templateUrl: './show-smena.component.html',
  styleUrls: ['./show-smena.component.css']
})
export class ShowSmenaComponent implements OnInit {
  title: string = 'Смена № 111'

  constructor(private store: Store) { }
  ngOnInit(): void {
  
  }
}
