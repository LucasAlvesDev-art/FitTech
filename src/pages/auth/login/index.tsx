import React from 'react';

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { styles } from './styles';
import Logo from '../../../assets/logofit.png';
import { themas } from '../../../global/themes';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { Input } from '../../../components/input';
import { Button } from '../../../components/Button';

import { useAuth } from '../../../context/AuthContext';
import { Screen } from '../../../components/Screen';


export default function Login() {

  const { login, loading } = useAuth();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(true);
  const [role, setRole] = React.useState<'aluno' | 'instrutor'>('aluno');

  async function getLogin() {
    if (!email || !password) {
      Alert.alert('Atenção', 'Informe os campos obrigatórios');
      return;
    }

    const success = await login(email, password);

    if (!success) {
      Alert.alert('Erro', 'Credenciais inválidas');
    }
  }

  return ( 
    <Screen>
      <View style={styles.container}>

        <View style={styles.boxTop}>
          <Image source={Logo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.text}>Bem vindo de volta!</Text>
        </View>

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
            IconRightName={showPassword ? "eye-closed" : "eye"}
            secureTextEntry={showPassword}
            onIconRightPress={() => setShowPassword(!showPassword)}
          />

        </View>
        
        <View style={styles.boxBottom}>
          <Button
            text="Entrar"
            loading={loading}
            onPress={getLogin}
          />
        </View>

        <Text style={styles.textBottom}>
          Não tem uma conta? <Text style={{ color: themas.colors.primary }}>Crie agora</Text>
        </Text>

      </View>
    </Screen>
  );
}