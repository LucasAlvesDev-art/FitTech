import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/login';
import Cadastro from '../pages/cadastro';
import BottomRoutes from './bottom.routes';
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
                <Stack.Screen name="BottomRoutes" component={BottomRoutes} />
            )}
        </Stack.Navigator>
    );
}