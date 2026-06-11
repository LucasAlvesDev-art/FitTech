import { supabase } from './supabase'

export async function getExercicios() {
  const { data, error } = await supabase
    .from('exercicios')
    .select('*')

  if (error) {
    console.error('Erro ao buscar exercicios:', error)
    return null
  }

  return data
}

export async function getExercicioById(id: string) {
  const { data, error } = await supabase
    .from('exercicios')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Erro ao buscar exercicio:', error)
    return null
  }

  return data
}