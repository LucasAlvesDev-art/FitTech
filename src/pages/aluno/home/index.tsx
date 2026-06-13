import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    FlatList,
    StatusBar,
    NativeSyntheticEvent,
    NativeScrollEvent,
    Dimensions,
} from 'react-native';
import { styles } from './styles';
import { themas } from '../../../global/themes';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { TrainingCard } from '../../../components/TrainingCard';
import { PaginationDots } from '../../../components/PaginationDots';

interface Routine {
    name: string;
}

interface Training {
    id: string;
    title: string;
    goal: string;
    routines: Routine[];
}

const MOCK_TRAININGS: Training[] = [
    {
        id: '1',
        title: 'Treino de Peito (A)',
        goal: 'Hipertrofia',
        routines: [
            { name: 'Supino Reto' },
            { name: 'Supino Inclinado' },
        ],
    },
    {
        id: '2',
        title: 'Treino de Costas (B)',
        goal: 'Hipertrofia',
        routines: [
            { name: 'Puxada Frontal' },
            { name: 'Remada Curvada' },
        ],
    },
    {
        id: '3',
        title: 'Treino de Pernas (C)',
        goal: 'Força',
        routines: [
            { name: 'Agachamento Livre' },
            { name: 'Leg Press 45°' },
        ],
    },
];

const CARD_WIDTH = 300;

export default function User() {
    const navigation = useNavigation<NavigationProp<any>>();
    const [activeCardIndex, setActiveCardIndex] = useState(0);
    const flatListRef = useRef<FlatList<Training>>(null);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / CARD_WIDTH);
        setActiveCardIndex(index);
    };

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={themas.colors.background}
            />

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Olá, Pedro!</Text>
                </View>
                <TouchableOpacity style={styles.notificationButton}>
                    <MaterialIcons
                        name="notifications-none"
                        size={26}
                        color={themas.colors.primaryGreen}
                    />
                </TouchableOpacity>
            </View>

            {/* Content */}
            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
            >
                {/* Section Title */}
                <View style={styles.sectionHeader}>
                    <View style={styles.sectionAccent} />
                    <Text style={styles.sectionTitle}>Treino de Hoje</Text>
                </View>

                {MOCK_TRAININGS.length > 0 ? (
                    // SE TIVER TREINO: Mostra os cards e o botão
                    <>
                        {/* Training Cards Carrossel */}
                        <FlatList
                            ref={flatListRef}
                            data={MOCK_TRAININGS}
                            renderItem={({ item, index }) => (
                                <TrainingCard
                                    title={item.title}
                                    goal={item.goal}
                                    routines={item.routines}
                                    isActive={index === activeCardIndex}
                                />
                            )}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}

                            // Propriedades para o efeito de carrossel (ímã)
                            snapToAlignment="center"
                            snapToInterval={CARD_WIDTH}
                            decelerationRate="fast"

                            contentContainerStyle={styles.carouselContainer}
                            onScroll={handleScroll}
                            scrollEventThrottle={16}
                        />

                        {/* Pagination Dots */}
                        <PaginationDots
                            total={MOCK_TRAININGS.length}
                            activeIndex={activeCardIndex}
                        />

                        {/* Start Training Button */}
                        <TouchableOpacity
                            style={styles.startButton}
                            activeOpacity={0.7}
                            onPress={() => navigation.navigate('meuTreino')}
                        >
                            <Text style={styles.startButtonText}>INICIAR TREINO</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    // SE NÃO TIVER TREINO: Mostra a Cadeira de Descanso (Empty State)
                    <View style={styles.emptyStateContainer}>
                        <MaterialIcons
                            name="weekend"
                            size={80}
                            color={themas.colors.primaryGreen}
                        />
                        <Text style={styles.emptyStateTitle}>
                            Aproveite o descanso!
                        </Text>
                        <Text style={styles.emptyStateText}>
                            Seu instrutor ainda está preparando o seu treino.
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}