import React from 'react';

import {
  Text,
  View,
  Image,
  Alert,
} from 'react-native';

import { styles } from './styles';
import Logo from '../../assets/logofit.png';
import { themas } from '../../global/themes';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { Input } from '../../components/input';
import { Button } from '../../components/Button';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
    const navigation = useNavigation<NavigationProp<any>>();
    const { login } = useAuth();

    const[email, setEmail] = React.useState('');
    const[password, setPassword] = React.useState('');
    const[showPassword, setShowPassword] = React.useState(true);
    const[loading, setLoading] = React.useState(false);


    async function getLogin() {
      if (!email || !password) {
        return Alert.alert('Atenção', 'Informe os campos obrigatórios');
      }

      setLoading(true);
      try {
        await login(email, password);
      } catch (error: any) {
        Alert.alert('Erro', error.message ?? 'Email ou senha incorretos');
      } finally {
        setLoading(false);
      }
    }

  return (
    <View style={styles.container}>  
        <View style={styles.boxTop}> 
          <Image 
            source={Logo}
            style={styles.logo}
            resizeMode="contain"
          />
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
         <Button text="Entrar" loading={loading} onPress={() => getLogin()} />
        </View>
        <Text style={styles.textBottom}>Não tem uma conta? <Text style={{color:themas.colors.primary}} onPress={() => navigation.navigate('Cadastro')}>Crie agora</Text></Text>
    </View>

  );
}