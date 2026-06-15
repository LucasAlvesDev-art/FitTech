import React from 'react';
import { View, Text } from 'react-native';

export default function VisualizarTreino() {
  const exercicios = [
    'Supino - 4x12',
    'Agachamento - 4x10',
    'Rosca Direta - 3x12',
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
        Treino A
      </Text>

      {exercicios.map((item, index) => (
        <View
          key={index}
          style={{
            backgroundColor: '#f2f2f2',
            padding: 15,
            marginBottom: 10,
            borderRadius: 10,
          }}
        >
          <Text>{item}</Text>
        </View>
      ))}
    </View>
  );
}