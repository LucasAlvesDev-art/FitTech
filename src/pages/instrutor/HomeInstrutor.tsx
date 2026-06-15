import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from './HomeInstrutor.styles';

type InstrutorRoute = 'CriarTreino' | 'ListaAlunos' | 'AdicionarExercicio';

type Navigation = {
  navigate: (screen: InstrutorRoute) => void;
};

export default function HomeInstrutor() {
  const navigation = useNavigation<Navigation>();

  const menuItems: Array<{ label: string; route: InstrutorRoute }> = [
    { label: 'Criar Treino', route: 'CriarTreino' },
    { label: 'Lista de Alunos', route: 'ListaAlunos' },
    { label: 'Adicionar Exercício', route: 'AdicionarExercicio' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Área do Instrutor</Text>

      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.route}
          activeOpacity={0.8}
          onPress={() => navigation.navigate(item.route)}
          style={styles.menuButton}
        >
          <Text style={styles.menuButtonText}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
