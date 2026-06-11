import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import { Screen } from '../../components/Screen';
import { themas } from '../../global/themes';
import { useAuth } from '../../context/AuthContext';




export default function Instrutor() {  

    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    return ( 
         
        <Screen>  
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                
                <TouchableOpacity onPress={handleLogout}>
                    <Text style={{ color: 'red', fontSize: 16 }}>
                        Sair
                    </Text>
                </TouchableOpacity>

                <Text style={{ color: themas.colors.text }}>
                    ADICIONAR EXERCICIO
                </Text>

            </View>
        </Screen>
    );
}