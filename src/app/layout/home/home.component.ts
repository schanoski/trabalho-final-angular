
import { ToastrService } from 'ngx-toastr';
import { GraficoService } from './services/grafico.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { InfoChartViewModel, ProdutosPorGrupos } from './models/home.models';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(  ) { }

  ngOnInit(): void {  }

  ngOnDestroy(): void {  }


}