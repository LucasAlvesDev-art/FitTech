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
            <TouchableOpacity style={styles.tabItem} onPress={() => go('List')}>
                <AntDesign 
                    name="bars"
                    style={{opacity: state.index === 0 ? 1 : 0.3, color:themas.colors.primary, fontSize:32}} 
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItemButton}>
                <View style={{width:'100%', left: 10, top:4}}>
                    <Entypo 
                        name="plus" 
                        size={40}
                        color={"#FFF"}
                    />
                </View>

                <View style={{flexDirection:'row-reverse', width:'100%', right: 10, bottom: 10}}>
                    <MaterialIcons 
                        name="edit" 
                        color={"#FFF"}
                        size={30}
                    />                
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem} onPress={() => go('User')}>
                <FontAwesome
                    name="user"
                    style={{opacity: state.index === 1 ? 1 : 0.3, color:themas.colors.primary, fontSize:32}} 
                />
            </TouchableOpacity>
        </View>
    )
}