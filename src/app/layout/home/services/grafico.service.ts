import { ProdutosPorGrupos } from './../models/home.models';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseRestService } from 'src/app/shared/services/base-rest.service';

@Injectable({
  providedIn: 'root'
})
export class GraficoService extends BaseRestService {

  public produtosPorGrupo(): Observable<ProdutosPorGrupos[]> {
    return this.getter<ProdutosPorGrupos[]>('produtos?grupoId=:grupoId').pipe(take(1));
  }

}
