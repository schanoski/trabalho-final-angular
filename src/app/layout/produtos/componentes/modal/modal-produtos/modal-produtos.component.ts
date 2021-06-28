import { GrupoProdutos } from './../../../../grupo-produtos/models/grupo-produtos.model';
import { ProdutoService } from './../../../services/produto.service';
import { Preco } from './../../../models/produto.model';
import { GenericValidator } from './../../../../../shared/helpers/validator.helper';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { hasErrors, validateAllFormFields } from 'src/app/shared/helpers/ui.helper';
import { Produto } from '../../../models/produto.model';

@Component({
  selector: 'app-modal-produtos',
  templateUrl: './modal-produtos.component.html',
  styleUrls: ['./modal-produtos.component.scss']
})
export class ModalProdutosComponent implements OnInit {

  @Input()
  produto: Produto | undefined;

  @Output()
  onSave: EventEmitter<Produto> = new EventEmitter<Produto>();

  @Output()
  onDelete: EventEmitter<void> = new EventEmitter<void>();

  formGroup?: FormGroup;

  public preco: Preco[] = [];
  public grupoProdutos: GrupoProdutos[] = [];

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private produtosService: ProdutoService
  ) { }

  ngOnInit(): void {
    this.carregaGrupoProdutos();
    this.createForm(this.produto || {} as Produto);
  }

  private async carregaGrupoProdutos(): Promise<void> {
    this.grupoProdutos = await this.produtosService.buscarGrupoProdutos().toPromise();
  }

  createForm(produto: Produto) {
    this.formGroup = this.formBuilder.group({
      descricao: [
        produto.descricao,
        Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])
      ],
      ativo: [
        produto.ativo,
        Validators.compose([Validators.required])
      ],
      grupoId: [
        produto.grupoId,
        Validators.compose([Validators.required])
      ],
      estoque: [
        produto.estoque,
        Validators.compose([Validators.required, Validators.min(0), Validators.max(999999999)])
      ],
      preco: this.createFormPreco(produto.preco || {})
    });
  }

  private createFormPreco(preco: Preco): FormGroup {
    return this.formBuilder.group({
      venda: [
        preco.venda,
        Validators.compose([Validators.required, Validators.min(0), Validators.max(999999999)])
      ],      
      custo: [
        preco.venda,
        Validators.compose([Validators.required, Validators.min(0), Validators.max(999999999)])
      ],
    });
  }

  public salvar(): void {
    if (this.formGroup?.invalid) {
      this.toastr.error('Campos inválidos ou não preenchidos!');
      validateAllFormFields(this.formGroup);
      return;
    }

    // Pega as informações que estão no formGroup (que são os campos da tela)
    const produtoForm = this.formGroup?.getRawValue();
    // Faz o merge dos objeto cliente inicial com os campos alterados na tela
    const produto = { ...this.produto, ...produtoForm };

    // Chama o service para salvar na API
    this.produtosService.salvar(produto)
      .subscribe(result => {
        // Emite o evento que salvou com sucesso e passa o cliente que retornou do serviço atualizado
        this.onSave.emit(result);

        // Fecha o modal
        this.activeModal.close();
      }, error => {
        this.toastr.error(error.message);
      });

  }

  public excluir(): void {
    this.produtosService.excluir(this.produto!.id!).subscribe(() => {
      // Emite o evento que excluiu
      this.onDelete.emit();

      // Fecha o modal
      this.activeModal.close();
    }, error => {
      this.toastr.error(error.message);
    });
  }

  public getControl(controlName: string): AbstractControl {
    return this.formGroup?.get(controlName)!;
  }

  hasErrors = hasErrors;

  public getName(item: any): string {
    return item ? `${item.descricao}` : '';
  }

}

