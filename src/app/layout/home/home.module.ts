import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ChartSchanoskiComponent } from './chart-schanoski/chart-schanoski.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    ChartSchanoskiComponent
  ],
  exports: [

  ]
})
export class HomeModule { }
