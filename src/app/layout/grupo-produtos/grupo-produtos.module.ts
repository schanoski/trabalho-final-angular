import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GrupoProdutosComponent } from './grupo-produtos.component';
import { GrupoProdutosRoutingModule } from './grupo-produtos-routing.module';
import { ModalComponent } from './componentes/modal/modal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    GrupoProdutosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    ToastrModule,
    NgSelectModule
  ],
  declarations: [
    GrupoProdutosComponent,
    ModalComponent
  ]
})
export class GrupoProdutosModule { }
