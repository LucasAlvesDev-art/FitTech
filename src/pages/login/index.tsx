import React from 'react';

import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { styles } from './styles';
import Logo from '../../assets/logofit.png';
import { themas } from '../../global/themes';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { Input } from '../../components/input';
import { Button } from '../../components/Button';
import { useNavigation, NavigationProp } from '@react-navigation/native';




export default function Login() {
    const navigation = useNavigation<NavigationProp<any>>();


    const[email, setEmail] = React.useState('');
    const[password, setPassword] = React.useState('');
    const[showPassword, setShowPassword] = React.useState(true);
    const[loading, setLoading] = React.useState(false);


    async function getLogin(){ //Simulando uma requisição de login que aparecer no console log
      setLoading(true);
      try {

        //if(!email || !password){
        //    return Alert.alert('Atenção', 'Informe os campos obrigatórios');
        //}

        navigation.reset({routes: [{name: "BottomRoutes"}]})

        console.log('Logou');
      }catch (error) {
        console.log(error);
      }finally {
        setLoading(false);
      }
    }


    // async function getLogin(){ //Simulando uma requisição de login com delay
    //   try {
    //     setLoading(true);

    //     if(!email || !password){
    //         return Alert.alert('Atenção', 'Informe os campos obrigatórios');
    //     }
    //     navigation.navigate('BottomRoutes');



    //     setTimeout(() => {
    //             if(email == 'a' && password == 'a'){
    //                 Alert.alert('Login realizado com sucesso!');
    //             } else {
    //                 Alert.alert('Ops', 'Email ou senha incorretos');
    //             }
    //             setLoading(false);
    //     },3000)
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

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
        <Text style={styles.textBottom}>Não tem uma conta? <Text style={{color:themas.colors.primary}}>Crie agora</Text></Text>
    </View>

  );
}