export type ObjetivoTreino =
  | 'hipertrofia'
  | 'emagrecimento'
  | 'forca'
  | 'resistencia';

export type Exercicio = {
  id: string;
  nome: string;
  grupoMuscular: string;
  series: number;
  repeticoes: number;
  descansoSegundos: number;
};

export type Treino = {
  id: string;
  alunoId: string;
  alunoNome: string;
  nome: string;
  objetivo: ObjetivoTreino;
  dias: string; // frontend usa isso
  exercicios: Exercicio[];
  criadoEm: string;
};