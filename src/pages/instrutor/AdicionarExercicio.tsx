import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export default function AdicionarExercicio() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20,
        }}
      >
        Adicionar Exercício
      </Text>

      <TextInput
        placeholder="Nome do exercício"
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 8,
        }}
      />

      <TextInput
        placeholder="Séries"
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 8,
        }}
      />

      <TextInput
        placeholder="Repetições"
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 20,
          borderRadius: 8,
        }}
      />

      <Button title="Adicionar" onPress={() => {}} />
    </View>
  );
}
