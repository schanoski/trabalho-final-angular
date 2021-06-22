import { ModalComponent } from './componentes/modal/modal.component';
import { Component, OnInit } from '@angular/core';
import { GrupoProdutos } from './models/grupo-produtos.model';
import { GrupoProdutosService } from './services/grupo-produtos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-grupo-produtos',
  templateUrl: './grupo-produtos.component.html',
  styleUrls: ['./grupo-produtos.component.scss']
})
export class GrupoProdutosComponent implements OnInit {

  grupoProdutos : GrupoProdutos[] = [];
  grupoProdutosSearch: GrupoProdutos[] = [];
  searchControl: FormControl = new FormControl();

  constructor(
    private toastr: ToastrService,
    private grupoProdutosService: GrupoProdutosService,
    private modalService: NgbModal
  ) { 


    // pega os valueChange do campo de pesquisa, ai toda vez que o usuário digitar no campo irá cair e nós filtramos o usuário pelo nome
    // debounceTime(500) => cria um timeOut para entrar no subscribe apenas quando o usuário para de digitar após 0.5segundos
    this.searchControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {

        // Chama a função para filtrar os usuarios
        this.filtrarGrupoProdutos(value.toLocaleLowerCase());

      });

   }

  ngOnInit(): void {
    this.carregaGrupoProdutosFromApi();
  }

  private carregaGrupoProdutosFromApi(): void {
    // Chama o service de usuarios para buscar todos
    //    .buscarTodos() retorna um Observable<Usuario[]>
    //    como a chamada é assincrona para capturar o resultado é preciso "se inscrever" para receber o retorno

    this.grupoProdutosService.buscarTodos()
      .subscribe(result => {
        // pega o retorno recebido pela api e joga na nossa lista de usuários
        this.grupoProdutos = result;

        // Chama a função para filtrar os usuários para trazer toda a lista
        this.filtrarGrupoProdutos('');

      }, error => {
        // Deu erro na requisição
        this.toastr.error(error.message, 'Ops.');
      });
  }


  public abrirModal(grupoProdutos: GrupoProdutos | undefined): void {
    // Instancia o modal
    const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });

    // Passa o parâmetro do grupo de produtos para dentro
    modalRef.componentInstance.grupoProdutos = grupoProdutos;

    // Pega a resposta quando o grupo de produtos salvar no modal
    modalRef.componentInstance.onSave.subscribe((result: GrupoProdutos) => {
      this.toastr.success('Grupo de produtos salvo com sucesso!');

      if (!grupoProdutos?.id) {
        // Se não tiver id no grupoProdutos de entrada então é uma insert
        this.grupoProdutos.push(result);
      } else {
        // Remove o usuário anterior e insere o novo
        const idx = this.grupoProdutos.findIndex(u => u.id === result!.id);
        this.grupoProdutos.splice(idx, 1, result);
      }
      this.limpaPesquisa();
    });

    // Pega a resposta quando o grupo de Produtos excluír no modal
    modalRef.componentInstance.onDelete.subscribe(() => {
      this.toastr.success('Grupo de produtos excluído com sucesso!');

      // Acha o grupoProdutos no array inicial e remove ele
      const idx = this.grupoProdutos.findIndex(u => u.id === grupoProdutos!.id);
      this.grupoProdutos.splice(idx, 1);
      this.limpaPesquisa();
    });
  }

  private limpaPesquisa(): void {
    this.searchControl?.setValue('');
  }

  private filtrarGrupoProdutos(value: string): void {
    // Filtra os Grupos de Produtos e responde no array de usuários filtrados
    this.grupoProdutosSearch = this.grupoProdutos.filter(u =>
      // coloca a descrição do grupo de produtos em minusculo para ignorar os maiusculos dos minusculos
      u.descricao.toLocaleLowerCase().includes(value)
    );
  }


}
