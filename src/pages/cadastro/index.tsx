import React from 'react';
import {
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';

import { useNavigation, NavigationProp } from '@react-navigation/native';
import { MaterialIcons, Octicons } from '@expo/vector-icons';

import { styles } from './styles';
import Logo from '../../assets/logofit.png';
import { themas } from '../../global/themes';
import { Input } from '../../components/input';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../services/auth';

export default function Cadastro() {
  const navigation = useNavigation<NavigationProp<any>>();
  const { cadastro } = useAuth();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const [showPassword, setShowPassword] = React.useState(true);
  const [showConfirm, setShowConfirm] = React.useState(true);

  const [role, setRole] = React.useState<UserRole>('aluno');
  const [loading, setLoading] = React.useState(false);

  async function handleCadastro() {
    if (!email || !password || !confirmPassword) {
      return Alert.alert('Atenção', 'Preencha todos os campos');
    }

    if (password !== confirmPassword) {
      return Alert.alert('Atenção', 'As senhas não coincidem');
    }

    if (password.length < 6) {
      return Alert.alert('Atenção', 'A senha deve ter no mínimo 6 caracteres');
    }

    setLoading(true);

    try {
      // ✔ AGORA CRIA AUTH + PROFILE
      await cadastro(email.trim(), password, role);

      Alert.alert(
        'Sucesso',
        'Conta criada com sucesso! Faça login para continuar.'
      );

      navigation.goBack();
    } catch (error: any) {
      console.log('❌ ERRO CADASTRO:', error);

      let message = 'Erro ao criar conta';

      if (error.message?.includes('already registered')) {
        message = 'Este e-mail já está cadastrado';
      }

      if (error.message?.includes('Password should be at least')) {
        message = 'A senha deve ter no mínimo 6 caracteres';
      }

      if (error.message?.includes('Invalid email')) {
        message = 'E-mail inválido';
      }

      if (error.message?.includes('duplicate key')) {
        message = 'Usuário já existe no sistema';
      }

      Alert.alert('Erro', message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      {/* TOP */}
      <View style={styles.boxTop}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.text}>Crie sua conta</Text>
      </View>

      {/* MID */}
      <View style={styles.boxMid}>
        <Input
          value={email}
          onChangeText={setEmail}
          title="ENDEREÇO DE EMAIL"
          IconRight={MaterialIcons}
          IconRightName="email"
        />

        <Input
          value={password}
          onChangeText={setPassword}
          title="SENHA"
          IconRight={Octicons}
          IconRightName={showPassword ? 'eye-closed' : 'eye'}
          secureTextEntry={showPassword}
          onIconRightPress={() => setShowPassword(!showPassword)}
        />

        <Input
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          title="CONFIRMAR SENHA"
          IconRight={Octicons}
          IconRightName={showConfirm ? 'eye-closed' : 'eye'}
          secureTextEntry={showConfirm}
          onIconRightPress={() => setShowConfirm(!showConfirm)}
        />

        {/* ROLE */}
        <Text style={styles.roleLabel}>TIPO DE USUÁRIO</Text>

        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[
              styles.roleButton,
              role === 'aluno' && styles.roleButtonActive,
            ]}
            onPress={() => setRole('aluno')}
          >
            <Text
              style={[
                styles.roleText,
                role === 'aluno' && styles.roleTextActive,
              ]}
            >
              Aluno
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.roleButton,
              role === 'instrutor' && styles.roleButtonActive,
            ]}
            onPress={() => setRole('instrutor')}
          >
            <Text
              style={[
                styles.roleText,
                role === 'instrutor' && styles.roleTextActive,
              ]}
            >
              Instrutor
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* BOTÃO */}
      <View style={styles.boxBottom}>
        <Button
          text="Cadastrar"
          loading={loading}
          onPress={handleCadastro}
        />
      </View>

      {/* LOGIN */}
      <Text style={styles.textBottom}>
        Já tem uma conta?{' '}
        <Text
          style={{ color: themas.colors.primary }}
          onPress={() => navigation.goBack()}
        >
          Entrar
        </Text>
      </Text>
    </View>
  );
}