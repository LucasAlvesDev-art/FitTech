import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/login';
import Cadastro from '../pages/auth/cadastro';
// import BottomRoutes from './bottom.routes';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#fff' }
            }}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
            {/* <Stack.Screen name="BottomRoutes" component={BottomRoutes} /> */}
        </Stack.Navigator>
    );
}