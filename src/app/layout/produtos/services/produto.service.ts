import { GrupoProdutos } from './../../grupo-produtos/models/grupo-produtos.model';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseRestService } from 'src/app/shared/services/base-rest.service';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends BaseRestService {
  countSaved: any;

  public buscarTodos(): Observable<Produto[]> {
    return this.getter<Produto[]>('produtos').pipe(take(1));
  }

  public buscarPorId(id: number): Observable<Produto> {
    return this.getter<Produto>(`produtos/${id}`).pipe(take(1));
  }

  public salvar(produto: Produto): Observable<Produto> {
    this.countSaved++;
    // Verifica se o cliente já tem ID, se tiver chama o PUT para atual, senão o POST para inserir
    if (produto.id) {
      return this.put<Produto>(`produtos/${produto.id}`, produto);
    } else {
      return this.post<Produto>('produtos', produto);
    }
  }

  public excluir(id: number): Observable<void> {
    return this.delete(`clientes/${id}`).pipe(take(1));
  }

  public buscarGrupoProdutos(): Observable<GrupoProdutos[]> {
    return this.getter<GrupoProdutos[]>('grupoProdutos').pipe(take(1));
  }


}
