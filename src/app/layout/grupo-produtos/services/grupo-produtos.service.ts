import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseRestService } from 'src/app/shared/services/base-rest.service';
import {GrupoProdutos} from '../models/grupo-produtos.model'

@Injectable({
  providedIn: 'root'
})
export class GrupoProdutosService extends BaseRestService {

  public buscarTodos(): Observable<GrupoProdutos[]> {
    return this.getter<GrupoProdutos[]>('grupoProdutos').pipe(take(1));
  }

  //constructor() { }
}
