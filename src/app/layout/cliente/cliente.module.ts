import { ClienteModalComponent } from './componentes/modal/cliente-modal.component';
import { ClienteComponent } from './cliente.component';
import { HomeModule } from './../home/home.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ClienteRoutingModule } from './cliente-routing.module';
import { TextMaskModule } from 'angular2-text-mask';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ClienteRoutingModule,
    ToastrModule,
    TextMaskModule,
    CurrencyMaskModule,
    HomeModule,
    NgSelectModule,
    SharedModule
  ],
  declarations: [
    ClienteComponent,
    ClienteModalComponent
  ]
})
export class ClienteModule { }