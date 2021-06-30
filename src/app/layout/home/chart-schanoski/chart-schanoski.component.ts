import { Component, OnInit } from '@angular/core';
import { InfoChartViewModel } from '../models/home.models';

@Component({
  selector: 'app-chart-schanoski',
  templateUrl: './chart-schanoski.component.html',
  styleUrls: ['./chart-schanoski.component.scss']
})
export class ChartSchanoskiComponent implements OnInit {

  public vendasPorProduto: InfoChartViewModel =
    {
      loading: true,
      datasets: [],
      labels: []
    };

  constructor() { }

  ngOnInit() {
    this.buscarDadosProdutos();
  }

  private async buscarDadosProdutos(): Promise<void> {
    const produtos = [{ nome: 'Abacate', valor: 123 }, { nome: 'MAça', valor: 12 }, { nome: 'Banana', valor: 151 }];

    this.vendasPorProduto.labels = produtos.map(p => p.nome);
    this.vendasPorProduto.datasets = [
      { data: produtos.map(p => p.valor), label: 'Produto' }
    ];
    this.vendasPorProduto.loading = false;

  }

}
