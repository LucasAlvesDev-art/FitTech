import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Aluno from '../pages/aluno/HomeAluno';
import Instrutor from '../pages/instrutor/HomeInstrutor';
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
                name="Aluno" 
                component={Aluno} 
            />
            
            <Tab.Screen 
            name="Instrutor" 
            component={Instrutor} 
            />

    
        </Tab.Navigator>
    );
}