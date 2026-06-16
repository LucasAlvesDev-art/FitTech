import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from './CriarTreino.styles';
import { salvarTreino } from '../../../services/treinosServices';
import { ObjetivoTreino } from '../../../types/treino';

type RouteParams = {
  CriarTreino?: {
    alunoId?: string;
    alunoNome?: string;
  };
};

export default function CriarTreino() {
  const route = useRoute<RouteProp<RouteParams, 'CriarTreino'>>();

  const alunoId = route.params?.alunoId;
  const alunoNome = route.params?.alunoNome;

  const [nome, setNome] = useState('');
  const [objetivo, setObjetivo] = useState<ObjetivoTreino | ''>('');
  const [dias, setDias] = useState('');
  const [loading, setLoading] = useState(false);
  console.log('PARAMS:', route.params);

  async function handleSalvarTreino() {
    try {
      if (!alunoId || !alunoNome) {
        Alert.alert('Atenção', 'Selecione um aluno antes de criar o treino.');
        return;
      }

      if (!nome || !objetivo || !dias) {
        Alert.alert('Atenção', 'Preencha todos os campos.');
        return;
      }

      setLoading(true);

      await salvarTreino({
        alunoId: alunoId!,
        alunoNome: alunoNome!,
        nome,
        objetivo,
        dias: dias,
        exercicios: [],
      });

      Alert.alert('Sucesso', 'Treino criado com sucesso!');

      setNome('');
      setObjetivo('');
      setDias('');
    } catch (error: any) {
      console.log('❌ ERRO AO SALVAR TREINO:', error);

      Alert.alert(
        'Erro',
        'Não foi possível criar o treino. Verifique os dados e tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Criar Treino</Text>

      {alunoNome ? (
        <Text style={styles.subtitle}>Aluno: {alunoNome}</Text>
      ) : (
        <Text style={styles.warning}>Nenhum aluno selecionado</Text>
      )}

      <TextInput
        placeholder="Nome do treino"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />

      {/* 🔥 OBJETIVO MAIS CONTROLADO (EVITA ERRO) */}
      <TextInput
        placeholder="Objetivo (hipertrofia, forca, emagrecimento, resistencia)"
        value={objetivo}
        onChangeText={(text) => setObjetivo(text as ObjetivoTreino)}
        style={styles.input}
      />

      {/* 🔥 DIAS (INPUT LIVRE POR ENQUANTO) */}
      <TextInput
        placeholder="Dias da semana (ex: Seg, Qua, Sex)"
        value={dias}
        onChangeText={setDias}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSalvarTreino}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Salvando...' : 'Criar Treino'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}