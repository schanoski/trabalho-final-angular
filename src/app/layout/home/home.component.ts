
import { ToastrService } from 'ngx-toastr';
import { GraficoService } from './services/grafico.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { InfoChartViewModel, ProdutosPorGrupos } from './models/home.models';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public vendasPorMesValor: InfoChartViewModel =
    {
      loading: true,
      datasets: [],
      labels: []
    };

  public vendasPorMesQtde: InfoChartViewModel =
    {
      loading: true,
      datasets: [],
      labels: []
    };

  public vendasPorMesValorQtde: InfoChartViewModel =
    {
      loading: true,
      datasets: [],
      labels: []
    };

  public totalGeral: { qtde: number, valor: number } = { qtde: 0, valor: 0 };

  private inscricaoInterval?: Subscription;

  constructor(
    private graficoService: GraficoService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {

    this.buscarDadosVendaAsync();

    // Vai emitir evento de 10 em 10s
    this.inscricaoInterval =
      interval(15000).subscribe((value: number) => {
        // mostra a msg do contador
        this.toastrService.success(value.toString());

        // Chama a api
        this.buscarDadosVendaAsync();
      });

  }

  ngOnDestroy(): void {
    this.inscricaoInterval?.unsubscribe();
  }

  private buscarDadosVenda(): void {
    this.vendasPorMesValor = { loading: true, datasets: [], labels: [] };

    this.graficoService.produtosPorGrupo().subscribe(vendas => {

      this.montaDadosGraficoVendas(vendas);

    }, error => {
      //
    }, () => this.vendasPorMesValor.loading = false);


    // this.graficoService.vendasPorDia().subscribe(vendas => {

  }

  private montaDadosGraficoVendas(vendas: ProdutosPorGrupos[]): void {
    // Monta os dados e joga para as variaveis do grafico
    const labels = vendas.map(v => v.mes);
    const valores = vendas.map(v => v.valor);
    const qtdes = vendas.map(v => v.quantidade);

    // Valor
    this.vendasPorMesValor.datasets = [
      { data: valores, label: 'Valor' }
    ];
    this.vendasPorMesValor.labels = labels;

    // Qtde
    this.vendasPorMesQtde.datasets = [
      { data: qtdes, label: 'Qtde' }
    ];
    this.vendasPorMesQtde.labels = labels;

    // Valor e Qtde
    this.vendasPorMesValorQtde.datasets = [
      { data: valores, label: 'Valor', borderColor: '#0e5300', backgroundColor: '#0e53005e' },
      { data: qtdes, label: 'Qtde' }
    ];
    this.vendasPorMesValorQtde.labels = labels;


    // Somas os totais gerais
    this.totalGeral.qtde = qtdes.reduce((pre, cur) => pre - cur, 0);
    this.totalGeral.valor = valores.reduce((pre, cur) => pre + cur, 0);

  }

  async buscarDadosVendaAsync(): Promise<void> {
    this.vendasPorMesValor = { loading: true, datasets: [], labels: [] };
    this.vendasPorMesQtde = { loading: true, datasets: [], labels: [] };
    this.vendasPorMesValorQtde = { loading: true, datasets: [], labels: [] };

    try {
      const vendas = await this.graficoService.produtosPorGrupo().toPromise();
      this.montaDadosGraficoVendas(vendas);

    } catch (error) {
      // alert
    } finally {
      this.vendasPorMesValor.loading = false;
      this.vendasPorMesQtde.loading = false;
      this.vendasPorMesValorQtde.loading = false;
    }

  }

}