import React from 'react';
import {Text, View,TouchableOpacity} from 'react-native';
import { styles } from './styles';
import { themas } from '../../global/themes';

import { AntDesign, FontAwesome, Entypo, MaterialIcons  } from '@expo/vector-icons';



interface Props {
  state: any;
  navigation: any;
}


export default({state,navigation}: Props) => {

    const go = (screenName: string) => {
        navigation.navigate(screenName);
    }

    return(
        <View style={styles.tabArea}>

            <TouchableOpacity style={styles.tabItem} onPress={() => go('Aluno')}>
                <AntDesign 
                    name="bars"
                    style={{opacity: state.index === 0 ? 1 : 0.3, color:themas.colors.primary, fontSize:32}} 
                />
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabItem} onPress={() => go('Instrutor')}>
                    <Entypo 
                        name="plus" 
                        style={{opacity: state.index === 1 ? 1 : 0.3, color:themas.colors.primary, fontSize:32}} 
                    />
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabItem} onPress={() => go('Aluno')}>
                    <MaterialIcons 
                        name="edit" 
                        style={{opacity: state.index === 0 ? 2 : 0.3, color:themas.colors.primary, fontSize:32}} 
                    />                
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabItem} onPress={() => go('Instrutor')}>
                <FontAwesome
                    name="user"
                    style={{opacity: state.index === 1 ? 3 : 0.3, color:themas.colors.primary, fontSize:32}} 
                />
            </TouchableOpacity>
        </View>
    )
}