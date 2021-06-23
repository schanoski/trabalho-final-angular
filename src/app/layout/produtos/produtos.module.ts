import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProdutosComponent } from './produtos.component';
import { ProdutosRoutingModule } from './produtos-routing.module';
import { ModalProdutosComponent } from './componentes/modal/modal-produtos/modal-produtos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ProdutosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    ToastrModule,
    NgSelectModule
  ],
  declarations: [
    ProdutosComponent,
    ModalProdutosComponent
  ]
})
export class ProdutosModule { }
