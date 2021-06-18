import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrupoProdutosComponent } from './grupo-produtos.component';

const routes: Routes = [{ path: '', component: GrupoProdutosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoProdutosRoutingModule {
}
