import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeAluno from '../pages/aluno/home';
//import PerfilAluno from '../pages/aluno/perfil';
import CustomTabBar from '../components/CustomTabBar';



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
                name="Home" 
                component={HomeAluno} 
            />

            {/*
            <Tab.Screen 
            name="Perfil" 
            component={PerfilAluno} 
            />
            */}
        </Tab.Navigator>
    );
}