import { supabase } from './supabase'

export async function getTreinos() {
  const { data, error } = await supabase
    .from('treinos')
    .select('*')

  if (error) {
    console.error('Erro ao buscar treinos:', error)
    return null
  }

  return data
}

export async function getTreinoById(id: string) {
  const { data, error } = await supabase
    .from('treinos')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Erro ao buscar treino:', error)
    return null
  }

  return data
}