import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs/operators';
import { ModalProdutosComponent } from './componentes/modal/modal-produtos/modal-produtos.component';
import { Produto } from './models/produto.model';
import { ProdutoService } from './services/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  produtos: Produto[] = [];
  produtosSearch: Produto[] = [];
  searchControl: FormControl = new FormControl();

  constructor(
    private toastr: ToastrService,
    private produtosService: ProdutoService,
    private modalService: NgbModal
  ) { 


    // pega os valueChange do campo de pesquisa, ai toda vez que o usuário digitar no campo irá cair e nós filtramos o produto pelo nome
    // debounceTime(500) => cria um timeOut para entrar no subscribe apenas quando o usuário para de digitar após 0.5segundos
    this.searchControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {

        // Chama a função para filtrar os produtos
        this.filtrarProdutos(value.toLocaleLowerCase());

      });

   }

  ngOnInit(): void {
    this.carregaProdutosFromApi();
  }

  private carregaProdutosFromApi(): void {
    // Chama o service de produtos para buscar todos
    //    .buscarTodos() retorna um Observable<Produto[]>
    //    como a chamada é assincrona para capturar o resultado é preciso "se inscrever" para receber o retorno

    this.produtosService.buscarTodos()
      .subscribe(result => {
        // pega o retorno recebido pela api e joga na nossa lista de produto
        this.produtos = result;

        // Chama a função para filtrar os produtos para trazer toda a lista
        this.filtrarProdutos('');

      }, error => {
        // Deu erro na requisição
        this.toastr.error(error.message, 'Ops.');
      });
  }

  public abrirModal(produto: Produto | undefined): void {
    // Instancia o modal
    const modalRef = this.modalService.open( ModalProdutosComponent, { size: 'lg' });

    // Passa o parâmetro do produtos para dentro
    modalRef.componentInstance.produto = produto;

    // Pega a resposta quando o grupo de produtos salvar no modal
    modalRef.componentInstance.onSave.subscribe((result: Produto) => {
      this.toastr.success('Produto salvo com sucesso!');

      if (!produto?.id) {
        // Se não tiver id no produto de entrada então é uma insert
        this.produtos.push(result);
      } else {
        // Remove o produto anterior e insere o novo
        const idx = this.produtos.findIndex(u => u.id === result!.id);
        this.produtos.splice(idx, 1, result);
      }
      this.limpaPesquisa();
    });

    // Pega a resposta quando o Produto excluír no modal
    modalRef.componentInstance.onDelete.subscribe(() => {
      this.toastr.success('Produto excluído com sucesso!');

      // Acha o produtos no array inicial e remove ele
      const idx = this.produtos.findIndex(u => u.id === produto!.id);
      this.produtos.splice(idx, 1);
      this.limpaPesquisa();
    });
  }

  private limpaPesquisa(): void {
    this.searchControl?.setValue('');
  }

  private filtrarProdutos(value: string): void {
    // Filtra os Grupos de Produtos e responde no array de produtos filtrados
    this.produtosSearch = this.produtos.filter(u =>
      // coloca a descrição do grupo de produtos em minusculo para ignorar os maiusculos dos minusculos
      u.descricao.toLocaleLowerCase().includes(value)
    );
  }

}
