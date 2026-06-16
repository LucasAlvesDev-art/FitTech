import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from './CriarTreino.styles';
import { salvarTreino } from '../../../services/treinosServices';
import { ObjetivoTreino } from '../../../types/treino';
import { themas } from '../../../global/themes';

type RouteParams = {
  CriarTreino?: {
    alunoId?: string;
    alunoNome?: string;
  };
};

const DIAS = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

export default function CriarTreino() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RouteParams, 'CriarTreino'>>();

  const alunoId = route.params?.alunoId;
  const alunoNome = route.params?.alunoNome;

  const [nome, setNome] = useState('');
  const [objetivo, setObjetivo] = useState<ObjetivoTreino | ''>('');
  const [diasSelecionados, setDiasSelecionados] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  function toggleDia(dia: string) {
    setDiasSelecionados((prev) =>
      prev.includes(dia)
        ? prev.filter((d) => d !== dia)
        : [...prev, dia]
    );
  }

  async function handleSalvarTreino() {
    try {
      if (!alunoId || !alunoNome) {
        Alert.alert('Atenção', 'Selecione um aluno antes de criar o treino.');
        return;
      }

      if (!nome || !objetivo || diasSelecionados.length === 0) {
        Alert.alert('Atenção', 'Preencha todos os campos.');
        return;
      }

      if (loading) return;
      setLoading(true);

      //  cria treino
      const treinoCriado = await salvarTreino({
        alunoId,
        alunoNome,
        nome,
        objetivo,
        dias_semana: diasSelecionados,
        exercicios: [],
      });

      Alert.alert('Sucesso', 'Treino criado com sucesso!');

      //  FLUXO CORRETO: vai para visualizar treino
      navigation.navigate('VisualizarTreino');

      setNome('');
      setObjetivo('');
      setDiasSelecionados([]);

    } catch (error: any) {
      console.log('❌ ERRO:', error);

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
        <Text style={styles.subtitle}>
          Aluno: {alunoNome}
        </Text>
      ) : (
        <Text style={styles.warning}>
          Nenhum aluno selecionado
        </Text>
      )}

      <TextInput
        placeholder="Nome do treino"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
        placeholderTextColor={themas.colors.textSecondary}
      />

      <TextInput
        placeholder="Objetivo (hipertrofia, força, emagrecimento)"
        value={objetivo}
        onChangeText={(text) =>
          setObjetivo(text.toLowerCase() as ObjetivoTreino)
        }
        style={styles.input}
        placeholderTextColor={themas.colors.textSecondary}
      />

      {/* DIAS */}
      <Text style={styles.label}>Dias da semana</Text>

      <View style={styles.diasContainer}>
        {DIAS.map((dia) => {
          const ativo = diasSelecionados.includes(dia);

          return (
            <TouchableOpacity
              key={dia}
              onPress={() => toggleDia(dia)}
              style={[
                styles.diaButton,
                {
                  backgroundColor: ativo
                    ? themas.colors.primary
                    : themas.colors.surface,
                },
              ]}
            >
              <Text
                style={{
                  color: ativo ? '#000' : themas.colors.text,
                  fontWeight: 'bold',
                }}
              >
                {dia}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: themas.colors.primary,
            opacity: loading ? 0.6 : 1,
          },
        ]}
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