import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function CriarTreino() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20,
        }}
      >
        Criar Treino
      </Text>

      <TextInput
        placeholder="Nome do treino"
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 8,
        }}
      />

      <TextInput
        placeholder="Objetivo"
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 8,
        }}
      />

      <TextInput
        placeholder="Dias da semana"
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 20,
          borderRadius: 8,
        }}
      />

      <Button title="Salvar Treino" onPress={() => {}} />
    </View>
  );
}