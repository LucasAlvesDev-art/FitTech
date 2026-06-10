import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CriarTreino from '../pages/instrutor/CriarTreino';
import ListaAlunos from '../pages/instrutor/ListaAlunos';
import HomeInstrutor from '../pages/instrutor/HomeInstrutor';
import AdicionarExercicio from '../pages/instrutor/AdicionarExercicio';
import VisualizarTreino from '../pages/instrutor/VisualizarTreino';
import CustomTabBarInstrutores from '../components/CustomTabBarInstrutor';



const Tab = createBottomTabNavigator();

export default function BottomRoutes() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
        }}
        tabBar={(props) => <CustomTabBarInstrutores {...props} />}
        >

            <Tab.Screen
                name="HomeInstrutor"
                component={HomeInstrutor}
            />

            <Tab.Screen
                name="CriarTreino"
                component={CriarTreino}
            />

            <Tab.Screen
                name="AdicionarExercicio"
                component={AdicionarExercicio}
            />

            <Tab.Screen
                name="ListaAlunos"
                component={ListaAlunos}
            />

            <Tab.Screen
                name="VisualizarTreino"
                component={VisualizarTreino}
            />

    
        </Tab.Navigator>
    );
}