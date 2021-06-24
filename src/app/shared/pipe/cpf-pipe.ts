import { formatToCEP } from './../helpers/utils.helper';
import { Pipe, PipeTransform } from "@angular/core";
import { formatToCNPJ, formatToCPF } from "../helpers/utils.helper";

@Pipe ({ name: 'cep' })
export class CepPipe implements PipeTransform {
    transform(value: string | null){
        return formatToCEP(value || '');
    }
}

@Pipe ({ name: 'cpf' })
export class CpfPipe implements PipeTransform {
    transform(value: string | null){
        return formatToCPF(value || '');
    }
}
@Pipe ({ name: 'cpfoOrCnpj' })
export class CpfCnpjPipe implements PipeTransform {

    transform(value: string | null){
        const str = value || '';
        if (str.length === 11){
            return formatToCPF(str);
        } else if (str.length === 14){
            return formatToCNPJ(str);
        } else {
            return ''
        }
        
    }
}