import { supabase } from './supabase';
import { Exercicio, Treino } from '../types/treino';

/* =========================
   BUSCAR TREINOS
========================= */
export async function buscarTreinos(): Promise<Treino[]> {
  const { data, error } = await supabase
    .from('treinos')
    .select('*');

  if (error) {
    console.error('Erro ao buscar treinos:', error);
    return [];
  }

  return (data ?? []) as Treino[];
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
    dias_semana: Array.isArray(treino.dias)
      ? treino.dias
      : [],
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
): Promise<Treino | undefined> {

  const { data: treino, error: fetchError } = await supabase
    .from('treinos')
    .select('*')
    .eq('id', treinoId)
    .single();

  if (fetchError || !treino) {
    console.error('Erro ao buscar treino:', fetchError);
    return undefined;
  }

  const exerciciosAtualizados = [
    ...(treino.exercicios ?? []),
    exercicio,
  ];

  const { data, error } = await supabase
    .from('treinos')
    .update({ exercicios: exerciciosAtualizados })
    .eq('id', treinoId)
    .select()
    .single();

  if (error) {
    console.error('Erro ao adicionar exercicio:', error);
    return undefined;
  }

  return data as Treino;
}