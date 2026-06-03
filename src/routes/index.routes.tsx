import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/auth/login';


import BottomAlunos from './bottom.Alunos';
import BottomInstrutores from './bottom.Instrutores';


export default function Routes() {
    const Stack = createStackNavigator();

    // SIMULAÇÃO (depois vem do login/Supabase)
    const user = { role: 'aluno' };

    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
                cardStyle: { 
                    backgroundColor: '#fff' 
                }
            }}
        >
            <Stack.Screen 
                name="Login" 
                component={Login} 
            />

            
            {user.role === 'aluno' ? (
                <Stack.Screen 
                    name="BottomAlunos" 
                    component={BottomAlunos}
                />
            ) : (
                <Stack.Screen 
                    name="BottomInstrutores" 
                    component={BottomInstrutores}
                />
            )}

        </Stack.Navigator>
    );
}