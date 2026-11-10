export interface ValidationErrorResponse {
  timestamp: Date;
  status: number;
  error: string;
  Erros: Erros[];
}

export interface Erros {
  field: string;
  mensage: string;
}