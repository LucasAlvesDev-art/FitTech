import { supabase } from './supabase'

export type Profile = {
  id: string
  email: string
  role: 'aluno' | 'instrutor'
  name?: string
}

/**
 * Buscar todos os profiles
 */
export async function getProfiles(): Promise<Profile[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, role, name')

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
    .select('id, email, role, name')
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
    .select('id, email, role, name')
    .eq('role', 'aluno')

  console.log('📦 ALUNOS RAW:', data)
  console.log('❌ ALUNOS ERROR:', error)

  if (error) {
    console.error('❌ erro ao buscar alunos:', error)
    return []
  }

  return data ?? []
}

/**
 * Atualizar nome do usuário
 */
export async function updateProfileName(id: string, name: string) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ name })
    .eq('id', id)

  if (error) {
    console.error('❌ Erro ao atualizar nome:', error)
    return null
  }

  return data
}