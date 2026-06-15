import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { styles } from './styles';
import { themas } from '../../../global/themes';

import { MaterialIcons, Octicons } from '@expo/vector-icons';

import { Input } from '../../../components/input';
import { Button } from '../../../components/Button';

import { useNavigation, NavigationProp } from '@react-navigation/native';

export default function Cadastro() {
  const navigation = useNavigation<NavigationProp<any>>();

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [role, setRole] = React.useState<'aluno' | 'instrutor'>('aluno');
  const [loading, setLoading] = React.useState(false);

  async function handleRegister() {
    try {
      setLoading(true);

      if (!name || !email || !password || !confirmPassword) {
        Alert.alert('Atenção', 'Preencha todos os campos');
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert('Erro', 'As senhas não coincidem');
        return;
      }

      // SIMULAÇÃO (depois vai pro Supabase)
      console.log({
        name,
        email,
        password,
        role,
      });

      Alert.alert('Sucesso', 'Usuário criado com sucesso!');

      // volta para login
      navigation.navigate('Login');

    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível criar a conta');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Criar Conta</Text>

      <Input
        value={name}
        onChangeText={setName}
        title="NOME"
        IconRight={MaterialIcons}
        IconRightName="person"
      />

      <Input
        value={email}
        onChangeText={setEmail}
        title="EMAIL"
        IconRight={MaterialIcons}
        IconRightName="email"
      />

      <Input
        value={password}
        onChangeText={setPassword}
        title="SENHA"
        secureTextEntry
        IconRight={Octicons}
        IconRightName="lock"
      />

      <Input
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        title="CONFIRMAR SENHA"
        secureTextEntry
        IconRight={Octicons}
        IconRightName="lock"
      />

      {/* ROLE SELECT */}
      <View style={styles.roleContainer}>
        <TouchableOpacity
            style={[
            styles.roleCard,
            role === 'aluno' && styles.roleCardActive
            ]}
            onPress={() => setRole('aluno')}
        >
            <Text style={[
            styles.roleText,
            role === 'aluno' && styles.roleTextActive
            ]}>
            👤 Aluno
            </Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[
            styles.roleCard,
            role === 'instrutor' && styles.roleCardActive
            ]}
            onPress={() => setRole('instrutor')}
        >
            <Text style={[
            styles.roleText,
            role === 'instrutor' && styles.roleTextActive
            ]}>
            🏋️ Instrutor
            </Text>
        </TouchableOpacity>

      </View>

      <View style={styles.buttom}>  
        <Button
            text="Cadastrar"
            loading={loading}
            onPress={handleRegister}
        />
      </View>
      
      <Text style={{ textAlign: 'center', marginTop: 20, color: '#aaa' }}>
        Já tem conta?{' '}
        <Text
          style={{ color: themas.colors.primary }}
          onPress={() => navigation.navigate('Login')}
        >
          Entrar
        </Text>
      </Text>

    </View>
  );
}