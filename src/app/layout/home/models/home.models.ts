import { ChartDataSets } from 'chart.js';
import { Label } from "ng2-charts";

export interface InfoChartViewModel {
  loading: boolean;
  labels: Label[],
  datasets: ChartDataSets[],
}

export interface ProdutosPorGrupos {
  descricao: string;
  quantidade: number;
}
