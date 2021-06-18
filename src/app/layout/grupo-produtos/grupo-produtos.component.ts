import { Component, OnInit } from '@angular/core';
import { GrupoProdutos } from './models/grupo-produtos.model';
import { GrupoProdutosService } from './services/grupo-produtos.service';

@Component({
  selector: 'app-grupo-produtos',
  templateUrl: './grupo-produtos.component.html',
  styleUrls: ['./grupo-produtos.component.scss']
})
export class GrupoProdutosComponent implements OnInit {

  grupoProdutos : GrupoProdutos[] = []

  constructor(
    private grupoProdutosService: GrupoProdutosService,
    
  ) {  }

  ngOnInit(): void {
    this.carregaGrupoProdutosFromApi();
  }

  private carregaGrupoProdutosFromApi(): void {

    this.grupoProdutosService.buscarTodos()
      .subscribe(result => {
        // pega o retorno recebido pela api e joga na nossa lista
        this.grupoProdutos = result;

      }, error => {
        // Deu erro na requisição
        (error.message, 'Ops.');
      });
  }

}
