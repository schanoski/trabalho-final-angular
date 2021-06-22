import { GrupoProdutos } from './../../models/grupo-produtos.model';
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

  // Parâmetro para receber o usuário como entrada
  @Input()
  grupoProdutos: GrupoProdutos | undefined;

  // Função para emitir de volta que o usuário for salvo (emite o novo usuário inserido/alterado)
  @Output()
  onSave: EventEmitter<GrupoProdutos> = new EventEmitter<GrupoProdutos>();

  // Função para emitir de volta que o usuário for excluído
  @Output()
  onDelete: EventEmitter<void> = new EventEmitter<void>();

  formGroup?: FormGroup;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private grupoProdutosService: GrupoProdutosService
  ) { }

  ngOnInit(): void {
    this.createForm(this.grupoProdutos || {} as GrupoProdutos);
  }

  createForm(grupoProdutos: GrupoProdutos) {
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
    // Faz o merge dos objeto usuário inicial com os campos alterados na tela
    const grupoProdutos = { ...this.grupoProdutos, ...grupoProdutosForm };

    // Chama o service para salvar na API
    this.grupoProdutosService.salvar(grupoProdutos)
      .subscribe(result => {
        // Emite o evento que salvou com sucesso e passa o usuário que retornou do serviço atualizado
        this.onSave.emit(result);

        // Fecha o modal
        this.activeModal.close();
      }, error => {
        this.toastr.error(error.message);
      });

  }

  public excluir(): void {
    this.grupoProdutosService.excluir(this.grupoProdutos!.id!).subscribe(() => {
      // Emite o evento que excluiu
      this.onDelete.emit();

      // Fecha o modal
      this.activeModal.close();
    }, error => {
      this.toastr.error(error.message);
    });
  }

  get descricao() {
    return this.formGroup?.get('descricao');
  }

  hasErrors = hasErrors;

}