import { Exercicio, Treino } from '../types/treino';

const treinosMock: Treino[] = [
  {
    id: '1',
    alunoId: '1',
    alunoNome: 'Pedro Lima',
    nome: 'Treino de Peito A',
    objetivo: 'hipertrofia',
    criadoEm: new Date().toISOString(),
    exercicios: [
      {
        id: '1',
        nome: 'Supino Reto',
        grupoMuscular: 'Peito',
        series: 3,
        repeticoes: 12,
        descansoSegundos: 60,
      },
      {
        id: '2',
        nome: 'Supino Inclinado',
        grupoMuscular: 'Peito',
        series: 3,
        repeticoes: 10,
        descansoSegundos: 60,
      },
    ],
  },
];

export async function buscarTreinos(): Promise<Treino[]> {
  return treinosMock;
}

export async function buscarTreinoPorId(id: string): Promise<Treino | undefined> {
  return treinosMock.find((treino) => treino.id === id);
}

export async function buscarTreinosPorAluno(alunoId: string): Promise<Treino[]> {
  return treinosMock.filter((treino) => treino.alunoId === alunoId);
}

export async function salvarTreino(
  treino: Omit<Treino, 'id' | 'criadoEm'>
): Promise<Treino> {
  const novoTreino: Treino = {
    ...treino,
    id: String(Date.now()),
    criadoEm: new Date().toISOString(),
  };

  treinosMock.push(novoTreino);

  return novoTreino;
}

export async function adicionarExercicioAoTreino(
  treinoId: string,
  exercicio: Exercicio
): Promise<Treino | undefined> {
  const treino = treinosMock.find((item) => item.id === treinoId);

  if (!treino) {
    return undefined;
  }

  treino.exercicios.push(exercicio);

  return treino;
}