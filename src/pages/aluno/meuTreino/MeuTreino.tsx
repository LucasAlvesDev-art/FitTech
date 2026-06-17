import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './MeuTreino.styles';
import { themas } from '../../../global/themes';
import { supabase } from '../../../services/supabase';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';



export interface Exercise {
    id: string;
    nome: string;
    seriesTotais: number;
    reps: string;
    peso: string;
    descansoSegundos: number;
    seriesConcluidas: number;
    isFinished: boolean;
    dias_semana?: string[];
}

// dias bonitos
const DIAS_MAP: Record<string, string> = {
  SEG: 'Seg',
  TER: 'Ter',
  QUA: 'Qua',
  QUI: 'Qui',
  SEX: 'Sex',
  SAB: 'Sáb',
  DOM: 'Dom',
};

export default function MeuTreino() {
    const route = useRoute<any>();
    const treinoId = route.params?.treinoId;
    const diaSelecionado = route.params?.dia;
    const navigation = useNavigation<NavigationProp<any>>();
    const [exercises, setExercises] = useState<any[]>([]);

    async function loadExercises() {
        if (!treinoId) return;

        const { data, error } = await supabase
            .from('exercicios')
            .select('*')
            .eq('treino_id', treinoId);

        if (error) {
            console.log(error);
            return;
        }

        const formatted = (data ?? []).map((ex: any) => {
            const seriesTotais = ex.series ?? 0;
            const seriesConcluidas = ex.series_concluidas ?? 0;

            return {
                id: ex.id,
                nome: ex.nome,
                seriesTotais,
                reps: String(ex.repeticoes),
                peso: '—',
                descansoSegundos: ex.descansoSegundos ?? 60,

                // 🔥 FORÇA LIMITE (EVITA 10/10 BUG)
                seriesConcluidas: Math.min(seriesConcluidas, seriesTotais),

                isFinished: seriesConcluidas >= seriesTotais,
            };
        });

        setExercises(formatted);
    }

    useFocusEffect(
        useCallback(() => {
            loadExercises();
        }, [])
    );

    const handleOpenExercise = (exercise: Exercise) => {
        navigation.navigate('ExercicioTreino', { exercise });
    };

    const renderItem = ({ item }: { item: Exercise }) => {
        const progressPercentage =
            item.seriesTotais > 0
                ? (item.seriesConcluidas / item.seriesTotais) * 100
                : 0;

        return (
            <TouchableOpacity
                style={[styles.card, item.isFinished && styles.cardFinished]}
                activeOpacity={0.7}
                onPress={() => handleOpenExercise(item)}
            >
                <Text style={styles.exerciseName}>{item.nome}</Text>

                {/* DIAS DA SEMANA */}
                {Array.isArray(item.dias_semana) && item.dias_semana.length > 0 && (
                <Text
                    style={{
                    color: themas.colors.primary,
                    fontSize: 12,
                    marginTop: 4,
                    marginBottom: 6,
                    }}
                >
                    {item.dias_semana
                    .map((d: string) => DIAS_MAP[d] || d)
                    .join(' • ')}
                </Text>
                )}

                <View style={styles.cardDetailsRow}>
                    <View style={styles.detailColumn}>
                        <Text style={styles.detailLabel}>Séries</Text>
                        <Text style={styles.detailValue}>
                            {item.seriesConcluidas}/{item.seriesTotais}
                        </Text>
                    </View>

                    <View style={styles.detailColumn}>
                        <Text style={styles.detailLabel}>Reps</Text>
                        <Text style={styles.detailValue}>{item.reps}</Text>
                    </View>

                    <View style={styles.detailColumn}>
                        <Text style={styles.detailLabel}>Peso</Text>
                        <Text style={styles.detailValue}>{item.peso}</Text>
                    </View>

                    <View style={styles.detailColumn}>
                        <Text style={styles.detailLabel}>Rest</Text>
                        <Text style={styles.detailValue}>
                            {item.descansoSegundos}s
                        </Text>
                    </View>

                    {item.isFinished ? (
                        <MaterialIcons
                            name="check-circle"
                            size={28}
                            color={themas.colors.primary}
                            style={styles.playIcon}
                        />
                    ) : (
                        <MaterialIcons
                            name="play-circle-outline"
                            size={28}
                            color={themas.colors.primary}
                            style={styles.playIcon}
                        />
                    )}
                </View>

                <View style={styles.cardFooterProgress}>
                    <View
                        style={[
                            styles.cardFooterProgressFill,
                            { width: `${progressPercentage}%` },
                        ]}
                    />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={themas.colors.bgScreen}
            />

            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <MaterialIcons
                        name="arrow-back-ios"
                        size={24}
                        color={themas.colors.text}
                    />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Meu Treino</Text>

                <View style={styles.headerPlaceholder} />
            </View>

            <FlatList
                data={exercises}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                
                contentContainerStyle={[
                    styles.listContent,
                    exercises.length === 0 && styles.listContentEmpty,
                ]}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <MaterialIcons
                            name="fitness-center"
                            size={64}
                            color={themas.colors.surface}
                        />
                        <Text style={styles.emptyTitle}>
                            Nenhum exercício
                        </Text>
                        <Text style={styles.emptyText}>
                            Seu treino ainda não possui exercícios cadastrados.
                        </Text>
                    </View>
                }
            />
        </View>
    );
}