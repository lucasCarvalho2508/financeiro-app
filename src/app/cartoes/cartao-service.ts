import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DadosCartaoForm, DetalhesCartao } from './dados-cartao';

@Injectable({
  providedIn: 'root',
})
export class CartaoService {
http = inject(HttpClient);

criar(dados: DadosCartaoForm) : Observable<DetalhesCartao> {
  const url = 'http://localhost:8080/cartoes';
  return this.http.post<DetalhesCartao>(url, dados);
}
}
