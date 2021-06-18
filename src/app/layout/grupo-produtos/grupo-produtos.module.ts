import { GrupoProdutosRoutingModule } from './grupo-produtos-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GrupoProdutosComponent} from './grupo-produtos.component'

@NgModule({
  declarations: [ 
    GrupoProdutosComponent
   ],
  imports: [
    CommonModule,
    GrupoProdutosRoutingModule
  ]
})
export class GrupoProdutosModule { }
