import React from 'react';
import { Text, View } from 'react-native';

export default function ListaAlunos() {
  const alunos = [
    'João Silva',
    'Maria Souza',
    'Pedro Santos',
    'Lucas Lima',
  ];

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20,
        }}
      >
        Lista de Alunos
      </Text>

      {alunos.map((aluno, index) => (
        <View
          key={index}
          style={{
            backgroundColor: '#4CAF50',
            padding: 15,
            marginBottom: 10,
            borderRadius: 10,
          }}
        >
          <Text>{aluno}</Text>
        </View>
      ))}
    </View>
  );
}
