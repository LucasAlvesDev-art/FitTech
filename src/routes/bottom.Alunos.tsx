import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from '../components/CustomTabBarAluno';
import HomeAluno from '../pages/aluno/home/HomeAluno';
import PerfilAluno from '../pages/aluno/perfil/PerfilAluno';



const Tab = createBottomTabNavigator();

export default function BottomRoutes() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
            tabBar={(props) => <CustomTabBar {...props} />}
        >

            <Tab.Screen
                name="HomeAluno"
                component={HomeAluno}
            />



            <Tab.Screen
                name="PerfilAluno"
                component={PerfilAluno}
            />


        </Tab.Navigator>
    );
}