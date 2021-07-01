import { ProdutosPorGrupos } from './../models/home.models';
import { ProdutoService } from './../../produtos/services/produto.service';
import { GrupoProdutosService } from './../../grupo-produtos/services/grupo-produtos.service';
import { Component, OnInit } from '@angular/core';
import { InfoChartViewModel } from '../models/home.models';

@Component({
  selector: 'app-chart-schanoski',
  templateUrl: './chart-schanoski.component.html',
  styleUrls: ['./chart-schanoski.component.scss']
})
export class ChartSchanoskiComponent implements OnInit {


  constructor(
    private grupoProdutosService: GrupoProdutosService,
    private produtosService: ProdutoService
  ) { }

  public produtosPorGrupos: InfoChartViewModel = {
    loading: true,
    datasets: [],
    labels: []
  };
  

  ngOnInit() {
    this.buscarDadosAsync();
  }


  private async buscarDadosAsync(): Promise<void>{
    this.grupoProdutosService.buscarTodos().subscribe(async(grupos) =>{
      for(const grupo of grupos){
        const produtos = await this.produtosService.buscarPorGrupo(grupo.id).toPromise();

        this.produtosPorGrupos.push({
          labels: grupo.descricao,
          datasets: produtos.length
        })

      }


    })
  }


/*

      this.produtosPorGrupos.labels = grupos.map(p => p.descricao)
      this.produtosPorGrupos.datasets = [
        { data: produtos.map(p => p.), label: 'Produto' }
      ];  //aqui precisa passar o produtos.length



  public produtosPorGrupos: InfoChartViewModel =
  {
    loading: true,
    datasets: [],
    labels: []
  };

  private async buscarDadosProdutos(): Promise<void> {
    const produtos = [{ nome: 'Alimento', valor: 23 }, { nome: 'Informática', valor: 5 }, { nome: 'Eletrônico', valor: 10 }];

    this.produtosPorGrupos.labels = produtos.map(p => p.nome);
    this.produtosPorGrupos.datasets = [
      { data: produtos.map(p => p.valor), label: 'Produto' }
    ];
    this.produtosPorGrupos.loading = false;

  }
*/

}
