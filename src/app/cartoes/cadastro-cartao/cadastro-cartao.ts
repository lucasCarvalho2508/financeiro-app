import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CartaoService } from '../cartao-service';
import { DadosCartaoForm, DetalhesCartao } from '../dados-cartao';
import { ValidationErrorResponse } from '../common/validation/validation-error-model';
import { CommonModule } from '@angular/common';

interface CartaoForm {
  nome: FormControl<string>;
  bandeira: FormControl<string>;
}

@Component({
  selector: 'app-cadastro-cartao',
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro-cartao.html',
  styleUrl: './cadastro-cartao.scss',
})
export class CadastroCartao implements OnInit {

  form!: FormGroup<CartaoForm>;
  service = inject(CartaoService);

  ngOnInit(): void {

    this.form = new FormGroup<CartaoForm>({
      nome: new FormControl('', { nonNullable: true, validators: Validators.required }),
      bandeira: new FormControl('', { nonNullable: true, validators: Validators.required })
    });
  }

  isFormInvalid(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return true;
    }
    return false;
  }

 handleSubmit(){

    if(this.isFormInvalid()) {
      return;
    }

    const dadosCartao = this.form.value as DadosCartaoForm;
    this.service
      .criar(dadosCartao)
      .subscribe({
        next: (response: DetalhesCartao) => {
          console.log('recebendo a resposta do servidor:', response);
        },
        error: (error) => this.onError(error)
      });
  }

  private aplicarErroValidacao(error: ValidationErrorResponse){
    error.Erros.forEach((erro) => {
      const controle = this.form.get(erro.field);
      if (controle) {
        controle.setErrors({ mensagem: erro.mensage });
        controle.markAsTouched();
      }
    });
  }

  private onError(response: any): void{
    if(response.status === 422) {
      this.aplicarErroValidacao(response.error);
      return;
    } else {
      console.error('Erro inesperado:', response);
    }
}
}