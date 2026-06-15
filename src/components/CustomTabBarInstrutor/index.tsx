import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import { themas } from '../../global/themes';
import { styles } from './styles';

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
      <TouchableOpacity onPress={() => go('HomeInstrutor')} style={styles.tabItem}>
        <MaterialIcons
          name="home"
          size={30}
          color={themas.colors.primary}
          style={{ opacity: isActive('HomeInstrutor') ? 1 : 0.3 }}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => go('ListaAlunos')} style={styles.tabItem}>
        <MaterialIcons
          name="list-alt"
          size={30}
          color={themas.colors.primary}
          style={{ opacity: isActive('ListaAlunos') ? 1 : 0.3 }}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => go('CriarTreino')} style={styles.tabItem}>
        <MaterialIcons
          name="add-box"
          size={30}
          color={themas.colors.primary}
          style={{ opacity: isActive('CriarTreino') ? 1 : 0.3 }}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => go('AdicionarExercicio')} style={styles.tabItem}>
        <AntDesign
          name="folder-add"
          size={28}
          color={themas.colors.primary}
          style={{ opacity: isActive('AdicionarExercicio') ? 1 : 0.3 }}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => go('VisualizarTreino')} style={styles.tabItem}>
        <MaterialIcons
          name="preview"
          size={28}
          color={themas.colors.primary}
          style={{ opacity: isActive('VisualizarTreino') ? 1 : 0.3 }}
        />
      </TouchableOpacity>
    </View>
  );
}
