import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { styles } from './ListaAlunos.styles';
import { getAlunos, Profile } from '../../../services/profileServices';
import { Screen } from '../../../components/Screen';

export default function ListaAlunos() {
  const navigation = useNavigation<any>();

  const [alunos, setAlunos] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [alunosFiltrados, setAlunosFiltrados] = useState<Profile[]>([]);

  async function loadAlunos() {
    try {
      setLoading(true);

      const data = await getAlunos();

      console.log('📦 ALUNOS CARREGADOS:', data);

      setAlunos(data ?? []);
      setAlunosFiltrados(data ?? []);
    } catch (error) {
      console.log('❌ ERRO AO CARREGAR ALUNOS:', error);
      Alert.alert('Erro', 'Não foi possível carregar os alunos');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAlunos();
  }, []);

  function handleSelectAluno(aluno: Profile) {
    navigation.navigate('CriarTreino', {
      alunoId: aluno.id,
      alunoNome: aluno.email,
    });
  }

  function handleSearch(text: string) {
    setSearch(text);

    if (text.trim() === '') {
      setAlunosFiltrados(alunos);
      return;
    }

    const filtrados = alunos.filter((aluno) =>
      aluno.email?.toLowerCase().includes(text.toLowerCase())
    );

    setAlunosFiltrados(filtrados);
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>Lista de Alunos</Text>

      {/* SEARCH CORRIGIDO */}
      <TextInput
        placeholder="Pesquisar aluno..."
        placeholderTextColor="#888"
        value={search}
        onChangeText={handleSearch}
        style={styles.searchInput}
      />

      <FlatList
        data={alunosFiltrados}   
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        onRefresh={loadAlunos}
        refreshing={loading}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => handleSelectAluno(item)}
          >
            <Text style={styles.name}>{item.email}</Text>
          </TouchableOpacity>
        )}
      />
    </Screen>
  );
}