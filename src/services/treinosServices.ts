import { supabase } from './supabase'
import { Exercicio, Treino } from '../types/treino'

export async function buscarTreinos(): Promise<Treino[]> {
  const { data, error } = await supabase
    .from('treinos')
    .select('*')

  if (error) {
    console.error('Erro ao buscar treinos:', error)
    return []
  }

  return data as Treino[]
}

export async function buscarTreinoPorId(id: string): Promise<Treino | undefined> {
  const { data, error } = await supabase
    .from('treinos')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Erro ao buscar treino:', error)
    return undefined
  }

  return data as Treino
}

export async function buscarTreinosPorAluno(alunoId: string): Promise<Treino[]> {
  const { data, error } = await supabase
    .from('treinos')
    .select('*')
    .eq('alunoId', alunoId)

  if (error) {
    console.error('Erro ao buscar treinos do aluno:', error)
    return []
  }

  return data as Treino[]
}

export async function salvarTreino(treino: Omit<Treino, 'id' | 'criadoEm'>): Promise<Treino> {
  const { data, error } = await supabase
    .from('treinos')
    .insert(treino)
    .select()
    .single()

  if (error) {
    console.error('Erro ao salvar treino:', error)
    throw error
  }

  return data as Treino
}

export async function adicionarExercicioAoTreino(
  treinoId: string,
  exercicio: Exercicio
): Promise<Treino | undefined> {
  const { data: treino } = await supabase
    .from('treinos')
    .select('*')
    .eq('id', treinoId)
    .single()

  if (!treino) return undefined

  const exerciciosAtualizados = [...treino.exercicios, exercicio]

  const { data, error } = await supabase
    .from('treinos')
    .update({ exercicios: exerciciosAtualizados })
    .eq('id', treinoId)
    .select()
    .single()

  if (error) {
    console.error('Erro ao adicionar exercicio:', error)
    return undefined
  }

  return data as Treino
}