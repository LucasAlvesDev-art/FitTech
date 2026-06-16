import { supabase } from './supabase'

export type Profile = {
  id: string
  email: string
  role: 'aluno' | 'instrutor'
}

/**
 * Buscar todos os profiles
 */
export async function getProfiles(): Promise<Profile[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, role')

  if (error) {
    console.error('❌ Erro ao buscar profiles:', error)
    return []
  }

  return data ?? []
}

/**
 * Buscar profile por ID
 */
export async function getProfileById(id: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, role')
    .eq('id', id)
    .single()

  if (error) {
    console.error('❌ Erro ao buscar profile:', error)
    return null
  }

  return data
}

/**
 * Buscar apenas alunos (FUNÇÃO PRINCIPAL DO INSTRUTOR)
 */
export async function getAlunos(): Promise<Profile[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, role')
    .eq('role', 'aluno')

  console.log('📦 ALUNOS RAW:', data)
  console.log('❌ ALUNOS ERROR:', error)

  if (error) {
    console.error('❌ erro ao buscar alunos:', error)
    return []
  }

  return data ?? []
}