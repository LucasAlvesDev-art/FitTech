import { supabase } from './supabase'

export async function getProfiles() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')

  if (error) {
    console.error('Erro ao buscar profiles:', error)
    return null
  }

  return data
}
// Buscar profile por ID
export async function getProfileById(id: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Erro ao buscar profile:', error)
    return null
  }

  return data
}