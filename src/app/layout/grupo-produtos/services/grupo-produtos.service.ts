import { take } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRestService } from 'src/app/shared/services/base-rest.service';
import { GrupoProdutos } from '../models/grupo-produtos.model';

@Injectable({
  providedIn: 'root'
})
export class GrupoProdutosService extends BaseRestService {

  public buscarTodos(): Observable<GrupoProdutos[]> {
    return this.getter<GrupoProdutos[]>('grupoProdutos').pipe(take(1));
  }

  public buscarTodosQuery(filtros: any): Observable<GrupoProdutos[]> {
    // Verifica se tem os parâmetros e vai adicionando no array para jogar na URL
    const query = new Array<string>();
    if (filtros.id) {
      query.push(`id=${filtros.id}`);
    }
    if (filtros.descricao) {
      query.push(`descricao=${filtros.descricao}`);
    }

    const params = query.length > 0 ? '?' + query.join('&') : '';
    return this.getter<GrupoProdutos[]>(`grupoProdutos?${params}`).pipe(take(1));
  }

  public buscarTodosQuery2(filtros: any): Observable<GrupoProdutos[]> {
    const options = {
      params: this.parseObjectToHttpParams(filtros)
    };
    return this.getter<GrupoProdutos[]>('grupoProdutos', options).pipe(take(1));
  }

  public buscarPorId(id: number): Observable<GrupoProdutos> {
    return this.getter<GrupoProdutos>(`grupoProdutos/${id}`).pipe(take(1));
  }

  public salvar(grupoProdutos: GrupoProdutos): Observable<GrupoProdutos> {
    // Verifica se o usuário já tem ID, se tiver chama o PUT para atual, senão o POST para inserir
    if (grupoProdutos.id) {
      return this.put<GrupoProdutos>(`grupoProdutos/${grupoProdutos.id}`, grupoProdutos);
    } else {
      return this.post<GrupoProdutos>('grupoProdutos', grupoProdutos);
    }
  }

  public excluir(id: number): Observable<void> {
    return this.delete(`grupoProdutos/${id}`).pipe(take(1));
  }

}
