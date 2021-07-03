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

  public arrayProdutoGrupos: ProdutosPorGrupos[] = [];
  toastr: any;

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
        this.arrayProdutoGrupos.push({
          descricao: grupo.descricao,
          quantidade: produtos.length
        })
      }
      try {
        const labels = this.arrayProdutoGrupos.map(p => p.descricao);
        const datasets = this.arrayProdutoGrupos.map(p => p.quantidade);

        this.produtosPorGrupos.datasets = [
          { data: datasets, label: 'Quantidade' }
        ];
        this.produtosPorGrupos.labels = labels;

      } catch (error) {
        this.toastr.error(error.message);
      } finally {
        this.produtosPorGrupos.loading = false;
      }

    })
  }

}
