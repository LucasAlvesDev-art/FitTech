import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/login';
import Cadastro from '../pages/cadastro';

import BottomAlunos from './bottom.Alunos';
import BottomInstrutor from './bottom.Instrutores';
import { useAuth } from '../context/AuthContext';

export default function Routes() {
    const Stack = createStackNavigator();
    const { user } = useAuth();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: '#fff'
                }
            }}
        >
            {!user ? (
                <>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Cadastro" component={Cadastro} />
                </>
            ) : (
                <>
                    <Stack.Screen name="BottomAlunos" component={BottomAlunos} />
                    <Stack.Screen name="BottomInstrutor" component={BottomInstrutor} />
                </>
            )}
        </Stack.Navigator>
    );
}