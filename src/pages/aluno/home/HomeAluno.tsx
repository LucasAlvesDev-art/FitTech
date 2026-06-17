import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    FlatList,
    StatusBar,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './HomeAluno.styles';
import { themas } from '../../../global/themes';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { TrainingCard } from '../../../components/TrainingCard';
import { PaginationDots } from '../../../components/PaginationDots';
import { supabase } from '../../../services/supabase';

const CARD_WIDTH = 300;

const DIAS = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

const DIAS_LABEL: Record<string, string> = {
    DOM: 'Domingo',
    SEG: 'Segunda-feira',
    TER: 'Terça-feira',
    QUA: 'Quarta-feira',
    QUI: 'Quinta-feira',
    SEX: 'Sexta-feira',
    SAB: 'Sábado',
};

export default function User() {
    const navigation = useNavigation<NavigationProp<any>>();

    const [treinos, setTreinos] = useState<any[]>([]);
    const [activeCardIndex, setActiveCardIndex] = useState(0);
    const [firstName, setFirstName] = useState('Aluno');

    const flatListRef = useRef<FlatList<any>>(null);

    const diaAtual = DIAS[new Date().getDay()];

    // =========================
    // 👤 BUSCAR USUÁRIO (PROFILES)
    // =========================
    async function loadUser() {
        const { data: authData } = await supabase.auth.getUser();

        const userId = authData?.user?.id;

        if (!userId) return;

        const { data, error } = await supabase
            .from('profiles')
            .select('name')
            .eq('id', userId)
            .single();

        if (error) {
            console.log('Erro ao buscar nome:', error);
            return;
        }

        setFirstName(data?.name || 'Aluno');
    }

    // =========================
    // TREINOS
    // =========================
    async function loadTreinos() {
        const { data, error } = await supabase
            .from('treinos')
            .select(`
                *,
                exercicios:exercicios(*)
            `);

        if (error) {
            console.log('Erro ao buscar treinos:', error);
            return;
        }

        setTreinos(data ?? []);
    }

    useEffect(() => {
        loadUser();
        loadTreinos();
    }, []);

    const treinosDoDia = treinos;

    // =========================
    // SCROLL CARROSSEL
    // =========================
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / CARD_WIDTH);
        setActiveCardIndex(index);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={themas.colors.bgScreen}
            />

            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.greeting}>
                    Olá, {firstName} 👋
                </Text>

                <TouchableOpacity style={styles.notificationButton}>
                    <MaterialIcons
                        name="notifications-none"
                        size={26}
                        color={themas.colors.primaryGreen}
                    />
                </TouchableOpacity>
            </View>

            {/* CONTENT */}
            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
            >
                {/* TITLE */}
                <View style={styles.sectionHeader}>
                    <View style={styles.sectionAccent} />
                    <Text style={styles.sectionTitle}>
                        Treinos da Semana
                    </Text>
                </View>

                {/* TREINOS */}
                {treinosDoDia.length > 0 ? (
                    <>
                        <FlatList
                            ref={flatListRef}
                            data={treinosDoDia}
                            horizontal
                            keyExtractor={(item) => item.id}
                            showsHorizontalScrollIndicator={false}
                            snapToAlignment="center"
                            snapToInterval={CARD_WIDTH}
                            decelerationRate="fast"
                            onScroll={handleScroll}
                            scrollEventThrottle={16}
                            contentContainerStyle={styles.carouselContainer}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => {
                                        setActiveCardIndex(index);
                                        flatListRef.current?.scrollToIndex({
                                            index,
                                            animated: true,
                                        });
                                    }}
                                >
                                    <TrainingCard
                                        title={item.nome}
                                        goal={item.objetivo}
                                        routines={(item.exercicios ?? []).map(
                                            (e: any) => ({
                                                name: `${e.nome} • ${e.series}x${e.repeticoes}`,
                                            })
                                        )}
                                        isActive={index === activeCardIndex}
                                    />
                                </TouchableOpacity>
                            )}
                        />

                        <PaginationDots
                            total={treinosDoDia.length}
                            activeIndex={activeCardIndex}
                        />

                        <TouchableOpacity
                            style={styles.startButton}
                            activeOpacity={0.7}
                            onPress={() =>
                                navigation.navigate('MeuTreino', {
                                    treinoId: treinosDoDia[activeCardIndex]?.id
                                })
                            }
                        >
                            <Text style={styles.startButtonText}>
                                INICIAR TREINO
                            </Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <View style={styles.emptyStateContainer}>
                        <MaterialIcons
                            name="weekend"
                            size={80}
                            color={themas.colors.primaryGreen}
                        />
                        <Text style={styles.emptyStateTitle}>
                            Nenhum treino encontrado
                        </Text>
                        <Text style={styles.emptyStateText}>
                            Seu instrutor ainda não criou treinos para você.
                        </Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}