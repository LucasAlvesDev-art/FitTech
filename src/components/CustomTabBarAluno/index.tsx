import React from 'react';
import {Text, View,TouchableOpacity} from 'react-native';
import { styles } from './styles';
import { themas } from '../../global/themes';

import { AntDesign, FontAwesome, Entypo, MaterialIcons  } from '@expo/vector-icons';



interface Props {
  state: any;
  navigation: any;
}


export default function CustomTabBarAluno({ state, navigation }: Props) {

  const go = (screenName: string) => {
    navigation.navigate(screenName);
  };

  //  pega a rota atual 
  const currentRoute = state.routes[state.index].name;

  const isActive = (name: string) => currentRoute === name;

  return (
    <View style={styles.tabArea}>

      {/* HOME */}
      <TouchableOpacity onPress={() => go('HomeAluno')} style={styles.tabItem}>
        <MaterialIcons
          name="home"
          size={30}
          color={themas.colors.primary}
          style={{ opacity: isActive('HomeAluno') ? 1 : 0.3 }}
        />
      </TouchableOpacity>

      {/* TREINO */}
      <TouchableOpacity onPress={() => go('MeuTreino')} style={styles.tabItem}>
        <MaterialIcons
          name="fitness-center"
          size={30}
          color={themas.colors.primary}
          style={{ opacity: isActive('MeuTreino') ? 1 : 0.3 }}
        />
      </TouchableOpacity>

      {/* EXERCÍCIO */}
      <TouchableOpacity onPress={() => go('ExercicioTreino')} style={styles.tabItem}>
        <MaterialIcons
          name="sports-gymnastics"
          size={30}
          color={themas.colors.primary}
          style={{ opacity: isActive('ExercicioTreino') ? 1 : 0.3 }}
        />
      </TouchableOpacity>

      {/* PERFIL */}
      <TouchableOpacity onPress={() => go('PerfilAluno')} style={styles.tabItem}>
        <Entypo
          name="user"
          size={28}
          color={themas.colors.primary}
          style={{ opacity: isActive('PerfilAluno') ? 1 : 0.3 }}
        />
      </TouchableOpacity>

    </View>
  );
}