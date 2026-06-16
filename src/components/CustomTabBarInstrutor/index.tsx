import React from 'react';
import {Text, View,TouchableOpacity} from 'react-native';
import { styles } from './styles';
import { themas } from '../../global/themes';

import { AntDesign, FontAwesome, Entypo, MaterialIcons  } from '@expo/vector-icons';



interface Props {
  state: any;
  navigation: any;
}


export default function CustomTabBarInstrutores({ state, navigation }: Props) {

  const go = (screenName: string) => {
    navigation.navigate(screenName);
  };

  const currentRoute = state.routes[state.index].name;
  const isActive = (name: string) => currentRoute === name;

  return (
    <View style={styles.tabArea}>

      {/* HOME */}
      <TouchableOpacity onPress={() => go('HomeInstrutor')} style={styles.tabItem}>
        <MaterialIcons
          name="home"
          size={30}
          color={themas.colors.primary}
          style={{ opacity: isActive('HomeInstrutor') ? 1 : 0.3 }}
        />
      </TouchableOpacity>

      {/* ALUNOS */}
      <TouchableOpacity onPress={() => go('ListaAlunos')} style={styles.tabItem}>
        <MaterialIcons
          name="list-alt"
          size={30}
          color={themas.colors.primary}
          style={{ opacity: isActive('ListaAlunos') ? 1 : 0.3 }}
        />
      </TouchableOpacity>


    </View>
  );
}