import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { adicionarExercicioAoTreino } from '../../../services/treinosServices';
import { styles } from './AdicionarExercicio.styles';

type RouteParams = {
  AdicionarExercicio: {
    treinoId: string; // ✅ OBRIGATÓRIO
  };
};

export default function AdicionarExercicio() {
  const route = useRoute<RouteProp<RouteParams, 'AdicionarExercicio'>>();

  const { treinoId } = route.params; // ❌ sem fallback silencioso

  const [nome, setNome] = useState('');
  const [series, setSeries] = useState('');
  const [repeticoes, setRepeticoes] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleAdicionar() {
    if (!treinoId) {
      Alert.alert('Erro', 'Treino não encontrado');
      return;
    }

    if (!nome || !series || !repeticoes) {
      Alert.alert('Atenção', 'Preencha todos os campos');
      return;
    }

    setLoading(true);

    try {
      await adicionarExercicioAoTreino(treinoId, {
        id: String(Date.now()),
        nome,
        grupoMuscular: '',
        series: Number(series),
        repeticoes: Number(repeticoes),
        descansoSegundos: 60,
      });

      Alert.alert('Sucesso', 'Exercício adicionado com sucesso!');

      setNome('');
      setSeries('');
      setRepeticoes('');
    } catch (error: any) {
      console.log('❌ ERRO AO ADICIONAR EXERCÍCIO:', error);

      Alert.alert(
        'Erro',
        error?.message || 'Não foi possível adicionar o exercício'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Adicionar Exercício</Text>

      <TextInput
        placeholder="Nome do exercício"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />

      <TextInput
        placeholder="Séries"
        value={series}
        onChangeText={setSeries}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Repetições"
        value={repeticoes}
        onChangeText={setRepeticoes}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleAdicionar}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Adicionando...' : 'Adicionar'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}