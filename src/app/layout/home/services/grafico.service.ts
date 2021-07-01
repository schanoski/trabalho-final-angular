import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseRestService } from 'src/app/shared/services/base-rest.service';
import { Produto } from '../../produtos/models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class GraficoService extends BaseRestService {

  public grupoPorProdutos(id: number): Observable<Produto[]>{
    return this.getter<Produto[]>(`produtos?grupoId=${id}`).pipe(take(1));
  }

}
