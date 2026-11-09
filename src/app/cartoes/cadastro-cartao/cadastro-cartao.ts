import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CartaoService } from '../cartao-service';
import { DadosCartaoForm, DetalhesCartao } from '../dados-cartao';


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

 handleSubmit(){
    console.log(this.form.value);
    const dadosCartao = this.form.value as DadosCartaoForm;
    this.service
      .criar(dadosCartao)
      .subscribe({
        next: (response: DetalhesCartao) => {
          console.log('recebendo a resposta do servidor:', response);
        },
        error: (error) => {
          console.error('Falha ao cadastrar cartão:', {
            status: error.status,
            mensagem: error.message,
            resposta: error.error,
          });
        }
      });
  }
}