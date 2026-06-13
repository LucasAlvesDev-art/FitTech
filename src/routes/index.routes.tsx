import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';

import Login from '../pages/login';
import Cadastro from '../pages/cadastro';

import BottomAlunos from './bottom.Alunos';
import BottomInstrutor from './bottom.Instrutores';

import { useAuth } from '../context/AuthContext';
import { themas } from '../global/themes';

export default function Routes() {
  const Stack = createStackNavigator();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={themas.colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
        </>
      ) : user.role === 'instrutor' ? (
        <Stack.Screen name="BottomInstrutor" component={BottomInstrutor} />
      ) : (
        <Stack.Screen name="BottomAlunos" component={BottomAlunos} />
      )}
    </Stack.Navigator>
  );
}