import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/auth/login';
import Cadastro from '../pages/auth/cadastro';


import BottomAlunos from './bottom.Alunos';
import BottomInstrutores from './bottom.Instrutores';
import {useAuth} from '../context/AuthContext';


export default function Routes() {
    const Stack = createStackNavigator();

    const { user } = useAuth();

    return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
        </>
      ) : user.role === 'aluno' ? (
        <Stack.Screen name="BottomAlunos" component={BottomAlunos} />
      ) : (
        <Stack.Screen name="BottomInstrutores" component={BottomInstrutores} />
      )}
    </Stack.Navigator>
  );
}