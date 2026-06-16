import { supabase } from './supabase';
import { Exercicio, Treino } from '../types/treino';

/* =========================
   BUSCAR TREINOS
========================= */
export async function buscarTreinos() {
  const { data, error } = await supabase
    .from('treinos')
    .select(`
      *,
      exercicios:exercicios!treino_id(*)
    `);

  if (error) throw error;
  return data;
}

/* =========================
   BUSCAR TREINO POR ID
========================= */
export async function buscarTreinoPorId(id: string): Promise<Treino | undefined> {
  const { data, error } = await supabase
    .from('treinos')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Erro ao buscar treino:', error);
    return undefined;
  }

  return data as Treino;
}

/* =========================
   BUSCAR TREINOS POR ALUNO
========================= */
export async function buscarTreinosPorAluno(alunoId: string): Promise<Treino[]> {
  const { data, error } = await supabase
    .from('treinos')
    .select('*')
    .eq('aluno_id', alunoId);

  if (error) {
    console.error('Erro ao buscar treinos do aluno:', error);
    return [];
  }

  return (data ?? []) as Treino[];
}

/* =========================
   SALVAR TREINO (CORRIGIDO)
========================= */
export async function salvarTreino(treino: any): Promise<any> {
  console.log('📦 DADOS RECEBIDOS NO SERVICE:', treino);

  const payload = {
    aluno_id: treino.alunoId,
    aluno_nome: treino.alunoNome,
    nome: treino.nome,
    objetivo: treino.objetivo,
    dias_semana: treino.dias_semana ?? [],
  };

  console.log('📤 PAYLOAD FINAL:', payload);

  const { data, error } = await supabase
    .from('treinos')
    .insert(payload)
    .select()
    .single();

  if (error) {
    console.error('❌ Erro ao salvar treino:', error);
    throw error;
  }

  return data;
}

/* =========================
   ADICIONAR EXERCICIO
========================= */
export async function adicionarExercicioAoTreino(
  treinoId: string,
  exercicio: Exercicio
) {
  const { data, error } = await supabase
    .from('exercicios')
    .insert([
      {
        treino_id: treinoId,
        nome: exercicio.nome,
        grupo_muscular: exercicio.grupoMuscular,
        series: exercicio.series,
        repeticoes: exercicio.repeticoes,
        descanso_segundos: exercicio.descansoSegundos,
      },
    ])
    .select()
    .single();

  if (error) {
    console.log('❌ ERRO AO INSERIR EXERCÍCIO:', error);
    throw error;
  }

  return data;
}


export async function buscarTreinosRecentes(limit = 5) {
  const { data, error } = await supabase
    .from('treinos')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Erro ao buscar treinos recentes:', error);
    return [];
  }

  return data ?? [];
}

export async function removerExercicioDoTreino(
  treinoId: string,
  exercicioId: string
) {
  const { error } = await supabase
    .from('exercicios')
    .delete()
    .eq('id', exercicioId)
    .eq('treino_id', treinoId);

  if (error) {
    console.log('❌ ERRO AO REMOVER EXERCÍCIO:', error);
    throw error;
  }

  return true;
}

export async function removerTreino(treinoId: string) {
  // 1. remove exercícios ligados ao treino
  const { error: errorExercicios } = await supabase
    .from('exercicios')
    .delete()
    .eq('treino_id', treinoId);

  if (errorExercicios) {
    console.log('Erro ao remover exercícios:', errorExercicios);
    throw errorExercicios;
  }

  // 2. remove o treino
  const { error: errorTreino } = await supabase
    .from('treinos')
    .delete()
    .eq('id', treinoId);

  if (errorTreino) {
    console.log('Erro ao remover treino:', errorTreino);
    throw errorTreino;
  }

  return true;
}

export async function atualizarExercicio(exercicioId: string, dados: any) {
  const { data, error } = await supabase
    .from('exercicios')
    .update(dados)
    .eq('id', exercicioId)
    .select()
    .single();

  if (error) throw error;

  return data;
}