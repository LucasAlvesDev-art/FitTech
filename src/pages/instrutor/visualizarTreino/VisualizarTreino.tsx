import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Screen } from '../../../components/Screen';
import { themas } from '../../../global/themes';
import {
  buscarTreinos,
  removerExercicioDoTreino,
} from '../../../services/treinosServices';
import { supabase } from '../../../services/supabase';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

import { styles } from './VisualizarTreino.styles';

export default function VisualizarTreino() {

  const [diasSelecionados, setDiasSelecionados] = useState<string[]>([]);
  const [treinoSelecionado, setTreinoSelecionado] = useState<any>(null);
  
  const [modalDiasVisible, setModalDiasVisible] = useState(false);

  const DIAS = [
    'SEG',
    'TER',
    'QUA',
    'QUI',
    'SEX',
    'SAB',
    'DOM',
  ];
  const navigation = useNavigation<any>();

  const [treinos, setTreinos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [exerciciosPorTreino, setExerciciosPorTreino] = useState<any>({});

  async function loadTreinos() {
    setLoading(true);

    try {
      const data = await buscarTreinos();

      // já carrega exercícios de todos treinos de uma vez
      const exerciciosData = await supabase.from('exercicios').select('*');

      const agrupado: any = {};

      exerciciosData.data?.forEach((ex: any) => {
        if (!agrupado[ex.treino_id]) {
          agrupado[ex.treino_id] = [];
        }
        agrupado[ex.treino_id].push(ex);
      });

      setTreinos(data);
      setExerciciosPorTreino(agrupado);

    } catch (error) {
      console.log('Erro ao buscar treinos:', error);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadTreinos();
    }, [])
  );

  function abrirEditarDias(treino: any) {
    setTreinoSelecionado(treino);
    setDiasSelecionados(treino.dias_semana || []);
    setModalDiasVisible(true);
  }

  function toggleDia(dia: string) {
    setDiasSelecionados((prev) =>
      prev.includes(dia)
        ? prev.filter((d) => d !== dia)
        : [...prev, dia]
    );
  }

  function goToAdicionarExercicio(treinoId: string) {
    navigation.navigate('AdicionarExercicio', { treinoId });
  }

  function goToEditarExercicio(exercicio: any, treinoId: string) {
  navigation.navigate('AdicionarExercicio', {
      treinoId,
      mode: 'edit',
      exercicio,
    });
  }

  async function handleDeleteExercicio(treinoId: string, exercicioId: string) {
    Alert.alert(
      'Excluir exercício',
      'Tem certeza que deseja excluir este exercício?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await removerExercicioDoTreino(treinoId, exercicioId);

              setExerciciosPorTreino((prev: any) => {
                const listaAtual = Array.isArray(prev?.[treinoId])
                  ? prev[treinoId]
                  : [];

                return {
                  ...prev,
                  [treinoId]: listaAtual.filter(
                    (ex: any) => ex.id !== exercicioId
                  ),
                };
              });

            } catch (error) {
              console.log('Erro ao excluir exercício:', error);
              Alert.alert('Erro', 'Não foi possível excluir o exercício');
            }
          },
        },
      ]
    );
  }

    async function handleDeleteTreino(treinoId: string) {
    Alert.alert(
      'Excluir treino',
      'Tem certeza que deseja excluir este treino?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              // remove exercícios primeiro
              await supabase
                .from('exercicios')
                .delete()
                .eq('treino_id', treinoId);

              // remove treino
              await supabase
                .from('treinos')
                .delete()
                .eq('id', treinoId);

              // atualiza tela
              loadTreinos();

            } catch (error) {
              console.log('Erro ao excluir treino:', error);
              Alert.alert('Erro', 'Não foi possível excluir o treino');
            }
          },
        },
      ]
    );
  }

  async function salvarDias() {
    if (!treinoSelecionado) return;

    const { error } = await supabase
      .from('treinos')
      .update({
        dias_semana: diasSelecionados,
      })
      .eq('id', treinoSelecionado.id);

    if (error) {
      Alert.alert('Erro', 'Não foi possível atualizar');
      return;
    }

    Alert.alert('Sucesso', 'Dias atualizados');

    setModalDiasVisible(false);
    loadTreinos();
  }


  

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={themas.colors.primary} />
      </View>
    );
  }

  return (
    <Screen>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.title}>
          Gerenciar Treinos
        </Text>
      </View>

      <FlatList
        data={treinos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const exercicios = exerciciosPorTreino[item.id] || [];

          return (
            <View style={styles.card}>

              {/* HEADER TREINO */}
              <Text style={styles.treinoNome}>
                {item.nome}
              </Text>

              <Text style={styles.subText}>
                Objetivo: {item.objetivo}
              </Text>

              <Text style={styles.subText}>
                Aluno: {item.aluno_nome}
              </Text>

              <Text style={styles.subText}>
                Dias: {item.dias_semana?.join(' • ')}
              </Text>

              {/* BOTÕES PRINCIPAIS */}
              <View style={styles.actionsRow}>

                <TouchableOpacity
                  onPress={() => goToAdicionarExercicio(item.id)}
                  style={[styles.button, styles.primary]}
                >
                  <Text style={styles.buttonText}>+ Exercício</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => abrirEditarDias(item)}
                  style={[styles.button, styles.warning]}
                >
                  <Text style={styles.buttonText}>
                    Editar Dias
                  </Text>
                </TouchableOpacity>

              </View>

              <TouchableOpacity
              onPress={() => handleDeleteTreino(item.id)}
              style={{
                backgroundColor: themas.colors.danger,
                padding: 10,
                borderRadius: 8,
                marginTop: 10,
              }}
            >
              <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold' }}>
                Excluir treino
              </Text>
            </TouchableOpacity>

              {/* EXERCÍCIOS */}
              <View style={styles.exercicioContainer}>

                {exercicios.length > 0 ? (
                  exercicios.map((ex: any) => (
                    <View key={ex.id} style={styles.exercicioCard}>

                      <View>
                        <Text style={styles.exercicioNome}>
                          {ex.nome}
                        </Text>

                        <Text style={styles.exercicioInfo}>
                          {ex.series}x{ex.repeticoes} • {ex.grupo_muscular}
                        </Text>
                      </View>

                      {/* BOTÃO EXCLUIR SEM ESCONDER */}
                      <TouchableOpacity
                        onPress={() =>
                          handleDeleteExercicio(item.id, ex.id)
                        }
                        style={styles.deleteBtn}
                      >
                        <Text style={styles.deleteText}>🗑</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => goToEditarExercicio(ex, item.id)}
                        style={[styles.button, styles.warning]}
                      >
                        <Text style={styles.buttonText}>Editar</Text>
                      </TouchableOpacity>
                    </View>
                  ))
                ) : (
                  <Text style={styles.empty}>
                    Nenhum exercício adicionado
                  </Text>
                )}

              </View>

            </View>
          );
        }}
      />
      <Modal
      visible={modalDiasVisible}
      transparent
      animationType="fade"
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.7)',
          justifyContent: 'center',
          padding: 20,
        }}
      >
        <View
          style={{
            backgroundColor: '#1A1A1A',
            borderRadius: 16,
            padding: 20,
          }}
        >
          <Text
            style={{
              color: '#FFF',
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 20,
            }}
          >
            Editar Dias
          </Text>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 10,
            }}
          >
            {DIAS.map((dia) => {
              const ativo = diasSelecionados.includes(dia);

              return (
                <TouchableOpacity
                  key={dia}
                  onPress={() => toggleDia(dia)}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 14,
                    borderRadius: 10,
                    backgroundColor: ativo
                      ? themas.colors.primary
                      : '#2A2A2A',
                  }}
                >
                  <Text
                    style={{
                      color: '#FFF',
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
            onPress={salvarDias}
            style={{
              marginTop: 20,
              backgroundColor: themas.colors.primary,
              padding: 14,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: '#FFF',
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              Salvar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalDiasVisible(false)}
            style={{
              marginTop: 10,
              padding: 14,
              borderRadius: 10,
              backgroundColor: '#333',
            }}
          >
            <Text
              style={{
                color: '#FFF',
                textAlign: 'center',
              }}
            >
              Cancelar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    </Screen>
  );
}