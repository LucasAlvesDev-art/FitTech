import React from 'react';

import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';

import { styles } from './styles';
import Logo from '../../assets/logo.png';
import { themas } from '../../global/themes';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { Input } from '../../components/input';

export default function Login() {
    const[email, setEmail] = React.useState('');
    const[password, setPassword] = React.useState('');
    const[loading, setLoading] = React.useState(false);

    async function getLogin(){
      try {
        setLoading(true);

        if(!email || !password){
            return Alert.alert('Atenção', 'Informe os campos obrigatórios');
        }

        setTimeout(() => {
                if(email == 'a' && password == 'a'){
                    Alert.alert('Login realizado com sucesso!');
                } else {
                    Alert.alert('Ops', 'Email ou senha incorretos');
                }
                setLoading(false);
        },3000)



      } catch (error) {
        console.log(error);
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
          <Input />

          {/* <Text style={styles.titleInput}>ENDEREÇO DE EMAIL</Text>

          <View style={styles.BoxInput}>
              <TextInput 
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />
              <MaterialIcons 
              name="email"
              size={20}
              color={themas.colors.gray}
              />
          </View>

          <Text style={styles.titleInput}>SENHA</Text>
          <View style={styles.BoxInput}>
              <TextInput 
                style={styles.input}
                value={password}
                onChangeText={setPassword}
              />
              <MaterialIcons 
              name="remove-red-eye"
              size={20}
              color={themas.colors.gray}
              />
          </View> */}
        </View>
        <View style={styles.boxBottom}>
          <TouchableOpacity style={styles.button} onPress={() => getLogin()}>
            {

              loading ?
                <ActivityIndicator color={'#FFFF'} size={'small'}/>
              :
                <Text style={styles.textButton}>Entrar</Text>

            }
          </TouchableOpacity>
        </View>
        <Text style={styles.textBottom}>Não tem uma conta? <Text style={{color:themas.colors.primary}}>Crie agora</Text></Text>
    </View>

  );
}