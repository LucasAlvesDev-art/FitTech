import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from './ListaAlunos.styles';
import { getAlunos, Profile } from '../../../services/profileServices';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ListaAlunos() {
  const navigation = useNavigation<any>();

  const [alunos, setAlunos] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadAlunos() {
    try {
      setLoading(true);

      const data = await getAlunos();

      console.log('📦 ALUNOS CARREGADOS:', data);

      setAlunos(data ?? []);
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
  console.log('👆 ALUNO:', aluno);

  navigation.navigate('CriarTreino', {
    alunoId: aluno.id,
    alunoNome: aluno.email,
  });
}

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lista de Alunos</Text>

      <FlatList
        data={alunos}
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
    </SafeAreaView>
  );
}