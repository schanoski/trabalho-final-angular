import { ProdutoService } from './../../../produtos/services/produto.service';
import { Grupo } from './../../models/grupo-produtos.model';
import { validateAllFormFields } from './../../../../shared/helpers/ui.helper';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GrupoProdutosService } from './../../services/grupo-produtos.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { hasErrors } from 'src/app/shared/helpers/ui.helper';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  // Parâmetro para receber o grupo como entrada
  @Input()
  grupoProdutos: Grupo | undefined;

  // Função para emitir de volta que o grupo for salvo (emite o novo grupo inserido/alterado)
  @Output()
  onSave: EventEmitter<Grupo> = new EventEmitter<Grupo>();

  // Função para emitir de volta que o grupo for excluído
  @Output()
  onDelete: EventEmitter<void> = new EventEmitter<void>();

  formGroup?: FormGroup;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private grupoProdutosService: GrupoProdutosService,
    private produtosService: ProdutoService
  ) { }

  ngOnInit(): void {
    this.createForm(this.grupoProdutos || {} as Grupo);
  }

  createForm(grupoProdutos: Grupo) {
    this.formGroup = this.formBuilder.group({
      descricao: [
        grupoProdutos.descricao,
        Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])
      ]
    });
  }

  public salvar(): void {
    if (this.formGroup?.invalid) {
      this.toastr.error('Campos inválidos ou não preenchidos!');
      validateAllFormFields(this.formGroup);
      return;
    }

    // Pega as informações que estão no formGroup (que são os campos da tela)
    const grupoProdutosForm = this.formGroup?.getRawValue();
    // Faz o merge dos objeto grupo inicial com os campos alterados na tela
    const grupoProdutos = { ...this.grupoProdutos, ...grupoProdutosForm };

    // Chama o service para salvar na API
    this.grupoProdutosService.salvar(grupoProdutos)
      .subscribe(result => {
        // Emite o evento que salvou com sucesso e passa o grupo que retornou do serviço atualizado
        this.onSave.emit(result);

        // Fecha o modal
        this.activeModal.close();
      }, error => {
        this.toastr.error(error.message);
      });

  }

  public async excluir(): Promise<void> {
    const filhos = await this.produtosService.buscarPorGrupo(this.grupoProdutos!.id!).toPromise();
    if(filhos.length===0){

      this.grupoProdutosService.excluir(this.grupoProdutos!.id!).subscribe(() => {
        // Emite o evento que excluiu
        this.onDelete.emit();
  
        // Fecha o modal
        this.activeModal.close();
      }, error => {
        this.toastr.error(error.message);
      });
    }
    else this.toastr.error("Existem produtos cadastrados nesse grupo")
    }
    

  get descricao() {
    return this.formGroup?.get('descricao');
  }

  hasErrors = hasErrors;

}