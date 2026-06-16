import React, { useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  View,
} from 'react-native';

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';

import { Screen } from '../../../components/Screen';
import { themas } from '../../../global/themes';
import { adicionarExercicioAoTreino } from '../../../services/treinosServices';
import { supabase } from '../../../services/supabase';


import { styles } from './AdicionarExercicio.styles';

type RouteParams = {
  AdicionarExercicio: {
    treinoId: string;
    mode?: 'edit' | 'add';
    exercicio?: any;
  };
};

export default function AdicionarExercicio() {
  const route = useRoute<RouteProp<RouteParams, 'AdicionarExercicio'>>();
  const navigation = useNavigation<any>();

  const treinoId = route.params?.treinoId;
  const mode = route.params?.mode;
  const exercicioEdit = route.params?.exercicio;

  const [nome, setNome] = useState('');
  const [grupoMuscular, setGrupoMuscular] = useState('');
  const [series, setSeries] = useState('');
  const [repeticoes, setRepeticoes] = useState('');
  const [loading, setLoading] = useState(false);

  // =========================
  // PREENCHE NO EDIT
  // =========================
  useEffect(() => {
    if (mode === 'edit' && exercicioEdit) {
      setNome(exercicioEdit.nome ?? '');
      setGrupoMuscular(exercicioEdit.grupo_muscular ?? '');
      setSeries(String(exercicioEdit.series ?? ''));
      setRepeticoes(String(exercicioEdit.repeticoes ?? ''));
    }
  }, [mode, exercicioEdit]);


  async function handleSalvar() {
    if (loading) return;

    if (!treinoId) {
      Alert.alert('Erro', 'Treino não encontrado');
      return;
    }

    if (!nome || !series || !repeticoes) {
      Alert.alert('Atenção', 'Preencha todos os campos');
      return;
    }

    const seriesNum = Number(series);
    const repsNum = Number(repeticoes);

    if (isNaN(seriesNum) || isNaN(repsNum)) {
      Alert.alert('Erro', 'Séries e repetições devem ser números válidos');
      return;
    }

    try {
      setLoading(true);

      // =========================
      // EDITAR
      // =========================
      if (mode === 'edit' && exercicioEdit?.id) {
        const { error } = await supabase
          .from('exercicios')
          .update({
            nome,
            grupo_muscular: grupoMuscular || 'geral',
            series: seriesNum,
            repeticoes: repsNum,
          })
          .eq('id', exercicioEdit.id);

        if (error) throw error;

        Alert.alert('Sucesso', 'Exercício atualizado!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);

        return;
      }

      // =========================
      // ADICIONAR
      // =========================
      await adicionarExercicioAoTreino(treinoId, {
        id: String(Date.now()),
        nome,
        grupoMuscular: grupoMuscular || 'geral',
        series: seriesNum,
        repeticoes: repsNum,
        descansoSegundos: 60,
      });

      Alert.alert('Sucesso', 'Exercício adicionado!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);

      setNome('');
      setGrupoMuscular('');
      setSeries('');
      setRepeticoes('');

    } catch (error) {
      console.log('ERRO:', error);
      Alert.alert('Erro', 'Não foi possível salvar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>

      {/* =========================
         HEADER COM VOLTAR
      ========================= */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.title}>
          {mode === 'edit' ? 'Editar Exercício' : 'Adicionar Exercício'}
        </Text>
      </View>

      {/* =========================
         CAMPOS
      ========================= */}
      <TextInput
        placeholder="Nome do exercício"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
        placeholderTextColor={themas.colors.textSecondary}
      />

      <TextInput
        placeholder="Grupo muscular"
        value={grupoMuscular}
        onChangeText={setGrupoMuscular}
        style={styles.input}
        placeholderTextColor={themas.colors.textSecondary}
      />

      <TextInput
        placeholder="Séries"
        value={series}
        onChangeText={setSeries}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor={themas.colors.textSecondary}
      />

      <TextInput
        placeholder="Repetições"
        value={repeticoes}
        onChangeText={setRepeticoes}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor={themas.colors.textSecondary}
      />

      {/* =========================
         BOTÃO SALVAR
      ========================= */}
      <TouchableOpacity
        style={[
          styles.button,
        ]}
        onPress={handleSalvar}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {mode === 'edit'
            ? (loading ? 'Salvando...' : 'Salvar alterações')
            : (loading ? 'Adicionando...' : 'Adicionar Exercício')}
        </Text>
      </TouchableOpacity>

    </Screen>
  );
}