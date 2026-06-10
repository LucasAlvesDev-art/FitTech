import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from '../components/CustomTabBarAluno';
import HomeAluno from '../pages/aluno/HomeAluno';
import MeuTreino from '../pages/aluno/MeuTreino';
import ExercicioTreino from '../pages/aluno/ExercicioTreino';
import PerfilAluno from '../pages/aluno/PerfilAluno';



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
                name="ExercicioTreino" 
                component={ExercicioTreino} 
            />

            <Tab.Screen 
                name="MeuTreino" 
                component={MeuTreino} 
            />

            <Tab.Screen 
                name="PerfilAluno" 
                component={PerfilAluno} 
            />

    
        </Tab.Navigator>
    );
}