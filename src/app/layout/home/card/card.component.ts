import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ChartType } from 'chart.js';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  titulo?: string;

  @Input()
  loading = true;

  @Output()
  onRefresh: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}

