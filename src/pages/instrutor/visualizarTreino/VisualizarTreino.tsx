import React from 'react';
import {Text, View} from 'react-native';
import { Screen } from '../../../components/Screen';
import { themas } from '../../../global/themes';




export default function Instrutor() {  
    return (  
        <Screen>  
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{ color: themas.colors.text }}>
                    VISUALIZAR TREINO
                </Text>
            </View>
        </Screen>
    );
}