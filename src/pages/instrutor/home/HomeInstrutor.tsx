import React, { useCallback, useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Screen } from '../../../components/Screen';
import { Button } from '../../../components/Button';

import { styles } from './HomeInstrutor.styles';

import { getAlunos } from '../../../services/profileServices';
import { buscarTreinosRecentes } from '../../../services/treinosServices';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';



export default function HomeInstrutor() {
  const { logout } = useAuth();
  const navigation = useNavigation<any>();

  const [totalAlunos, setTotalAlunos] = useState(0);
  const [treinos, setTreinos] = useState<any[]>([]);

  async function carregarDados() {
    const alunos = await getAlunos();
    const treinosRecentes = await buscarTreinosRecentes();

    setTotalAlunos(alunos?.length ?? 0);
    setTreinos(treinosRecentes);
  }

    useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [])
  );

  const handleLogout = async () => {
        await logout();
    };

  return (
    <Screen>
        <View style={styles.container}>

            <View style={styles.header}>
            <View>
                <Text style={styles.greeting}>
                Olá, Professor 👋
                </Text>

                <Text style={styles.subtitle}>
                Bem-vindo de volta!
                </Text>
            </View>

            <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.logout}>
                Sair
                </Text>
            </TouchableOpacity>
            </View>

            <View style={styles.card}>
            <Text style={styles.cardTitle}>
                👥 Alunos Cadastrados
            </Text>

            <Text style={styles.cardNumber}>
                {totalAlunos}
            </Text>
            </View>

            <Button
            text="+ Criar Novo Treino"
            onPress={() => navigation.navigate('ListaAlunos')}
            />

            <Text style={styles.recentTitle}>
            Treinos Recentes
            </Text>

            <FlatList
            data={treinos}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
                <TouchableOpacity
                style={styles.treinoCard}
                onPress={() =>
                    navigation.navigate('VisualizarTreino', {
                    treinoId: item.id,
                    })
                }
                >
                <Text style={styles.treinoNome}>
                    {item.nome}
                </Text>

                <Text style={styles.treinoObjetivo}>
                    {item.objetivo}
                </Text>

                <Text style={styles.treinoAluno}>
                    {item.aluno_nome}
                </Text>
                </TouchableOpacity>
            )}
            ListEmptyComponent={
                <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                    Nenhum treino cadastrado.
                </Text>
                </View>
            }
            />
        </View>
    </Screen>
  );
}