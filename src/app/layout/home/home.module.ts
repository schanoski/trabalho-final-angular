import { CardGraficoComponent } from './card-grafico/card-grafico.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ChartSchanoskiComponent } from './chart-schanoski/chart-schanoski.component';
import { CardComponent } from './card/card.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    HomeRoutingModule,
    ChartsModule
  ],
  declarations: [
    HomeComponent,
    ChartSchanoskiComponent,
    CardComponent,
    CardGraficoComponent
  ],
  exports: [

  ]
})
export class HomeModule { }
