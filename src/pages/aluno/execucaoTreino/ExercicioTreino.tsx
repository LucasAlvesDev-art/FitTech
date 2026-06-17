import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    TextInput,
    ScrollView,
    Alert,
} from 'react-native';

import { useNavigation, useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './ExercicioTreino.styles';
import { themas } from '../../../global/themes';
import { Exercise } from '../meuTreino/MeuTreino';
import { supabase } from '../../../services/supabase';

type RouteParams = {
    params: {
        exercise: Exercise;
    };
};

export default function ExercicioTreino() {
    const navigation = useNavigation<any>();
    const route = useRoute<RouteProp<RouteParams, 'params'>>();
    const exercise = route.params?.exercise;

    const totalSets = exercise?.seriesTotais || 0;

    const [completed, setCompleted] = useState<boolean[]>([]);
    const [weights, setWeights] = useState<string[]>([]);
    const [isResting, setIsResting] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    // =========================
    // CARREGAR PROGRESSO DO BANCO
    // =========================
    async function loadProgress() {
        if (!exercise?.id) return;

        const { data } = await supabase
            .from('exercicios')
            .select('series_concluidas')
            .eq('id', exercise.id)
            .single();

        const completedCount = data?.series_concluidas ?? 0;

        const newCompleted = Array(totalSets)
            .fill(false)
            .map((_, i) => i < completedCount);

        setCompleted(newCompleted);
        setWeights(Array(totalSets).fill(''));
    }

    // RECARREGA SEMPRE QUE ENTRA NA TELA
    useFocusEffect(
        React.useCallback(() => {
            loadProgress();
        }, [])
    );

    // =========================
    // TIMER
    // =========================
    useEffect(() => {
        if (!isResting || timeLeft <= 0) {
            if (timeLeft === 0 && isResting) {
                setIsResting(false);
            }
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [isResting, timeLeft]);

    // =========================
    // SALVAR NO SUPABASE
    // =========================
    async function saveProgress(value: number) {
        if (!exercise?.id) return;

        await supabase
            .from('exercicios')
            .update({
                series_concluidas: value,
                is_finished: value >= totalSets,
            })
            .eq('id', exercise.id);
    }

    // =========================
    // TOGGLE SÉRIE
    // =========================
    const handleCheckSet = async (index: number) => {
        const updated = [...completed];

        updated[index] = !updated[index];

        setCompleted(updated);

        const newCompletedSets = updated.filter(Boolean).length;

        await saveProgress(newCompletedSets);

        if (updated[index]) {
            setTimeLeft(exercise?.descansoSegundos || 60);
            setIsResting(true);
        }
    };

    // =========================
    // PESO
    // =========================
    const handleWeightChange = (text: string, index: number) => {
        const newWeights = [...weights];
        newWeights[index] = text;
        setWeights(newWeights);
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const completedSets = completed.filter(Boolean).length;

    const progressPercentage =
        totalSets > 0 ? (completedSets / totalSets) * 100 : 0;

    const setsArray = Array.from({ length: totalSets }, (_, i) => i);

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={themas.colors.bgScreen}
            />

            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <MaterialIcons
                        name="arrow-back-ios"
                        size={24}
                        color={themas.colors.textSecondary}
                    />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>
                    {exercise?.nome || 'Exercício'}
                </Text>
            </View>

            <View style={styles.content}>
                {/* PROGRESSO */}
                <View style={styles.progressContainer}>
                    <Text style={styles.progressText}>
                        Séries: {completedSets}/{totalSets} (
                        {Math.round(progressPercentage)}%)
                    </Text>

                    <View style={styles.progressBarBackground}>
                        <View
                            style={[
                                styles.progressBarFill,
                                { width: `${progressPercentage}%` },
                            ]}
                        />
                    </View>
                </View>

                {/* TIMER */}
                {isResting && (
                    <View style={styles.timerBanner}>
                        <Text style={styles.timerBannerTitle}>
                            Descanso
                        </Text>
                        <Text style={styles.timerBannerText}>
                            {formatTime(timeLeft)}
                        </Text>
                    </View>
                )}

                {/* LISTA */}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {setsArray.map((index) => {
                        const isCompleted = completed[index];

                        return (
                            <View key={index} style={styles.setRow}>
                                <View style={styles.setInfo}>
                                    <Text style={styles.setLabel}>
                                        Série {index + 1}
                                    </Text>
                                    <Text style={styles.setReps}>
                                        {exercise?.reps} Reps
                                    </Text>
                                </View>

                                <View style={styles.weightInputContainer}>
                                    <TextInput
                                        style={styles.weightInput}
                                        placeholder="Ex: 20"
                                        placeholderTextColor={themas.colors.gray}
                                        keyboardType="numeric"
                                        value={weights[index]}
                                        onChangeText={(text) =>
                                            handleWeightChange(text, index)
                                        }
                                        editable={!isCompleted}
                                    />
                                </View>

                                <TouchableOpacity
                                    style={[
                                        styles.checkButton,
                                        isCompleted && styles.checkButtonActive,
                                    ]}
                                    onPress={() => handleCheckSet(index)}
                                >
                                    {isCompleted && (
                                        <MaterialIcons
                                            name="check"
                                            size={20}
                                            color={themas.colors.bgScreen}
                                        />
                                    )}
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </ScrollView>
            </View>

            {/* FOOTER */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.outlineButton}
                    activeOpacity={0.7}
                    onPress={async () => {
                        await saveProgress(completedSets);
                        navigation.goBack();
                    }}
                >
                    <Text style={styles.outlineButtonText}>
                        Finalizar Exercicio
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}