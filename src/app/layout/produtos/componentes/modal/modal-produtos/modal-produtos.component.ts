import { GenericValidator } from './../../../../../shared/helpers/validator.helper';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { hasErrors, validateAllFormFields } from 'src/app/shared/helpers/ui.helper';

@Component({
  selector: 'app-modal-produtos',
  templateUrl: './modal-produtos.component.html',
  styleUrls: ['./modal-produtos.component.scss']
})
export class ModalProdutosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
