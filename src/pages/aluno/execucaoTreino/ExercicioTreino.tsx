import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StatusBar, TextInput, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './ExercicioTreino.styles';
import { themas } from '../../../global/themes';
import { Exercise } from '../meuTreino/MeuTreino';

type RouteParams = {
    params: {
        exercise: Exercise;
    };
};

export default function ExercicioTreino() {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<RouteParams, 'params'>>();
    const exercise = route.params?.exercise;

    const totalSets = exercise?.seriesTotais || 0;
    
    const [completedSets, setCompletedSets] = useState(exercise?.seriesConcluidas || 0);
    const [isResting, setIsResting] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    // Estado local para armazenar o peso preenchido em cada série
    const [weights, setWeights] = useState<string[]>(Array(totalSets).fill(''));

    // Lógica do temporizador de descanso
    useEffect(() => {
        if (!isResting || timeLeft <= 0) {
            if (timeLeft === 0 && isResting) {
                setIsResting(false); // Fim do descanso
            }
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [isResting, timeLeft]);

    const handleCheckSet = (setIndex: number) => {
        // Se a série já foi concluída, não faz nada
        if (setIndex < completedSets) return;
        
        const newCompleted = completedSets + 1;
        setCompletedSets(newCompleted);

        // Se ainda não concluiu todas as séries, inicia descanso
        if (newCompleted < totalSets) {
            setTimeLeft(exercise?.descansoSegundos || 60);
            setIsResting(true);
        }
    };

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

    const progressPercentage = totalSets > 0 ? (completedSets / totalSets) * 100 : 0;

    // Gerar um array com o número de séries [0, 1, 2...]
    const setsArray = Array.from({ length: totalSets }, (_, i) => i);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={themas.colors.bgScreen} />
            
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back-ios" size={24} color={themas.colors.textSecondary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{exercise?.nome || 'Exercício'}</Text>
            </View>

            <View style={styles.content}>
                {/* Progress Bar do Exercício */}
                <View style={styles.progressContainer}>
                    <Text style={styles.progressText}>
                        Séries: {completedSets}/{totalSets} ({Math.round(progressPercentage)}%)
                    </Text>
                    <View style={styles.progressBarBackground}>
                        <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
                    </View>
                </View>

                {/* Banner de Descanso (Visível enquanto o cronômetro roda) */}
                {isResting && (
                    <View style={styles.timerBanner}>
                        <Text style={styles.timerBannerTitle}>Descanso</Text>
                        <Text style={styles.timerBannerText}>{formatTime(timeLeft)}</Text>
                        <MaterialIcons name="timer" size={28} color="#000" style={{ marginLeft: 10 }} />
                    </View>
                )}

                {/* Lista de Séries */}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {setsArray.map((index) => {
                        const isCompleted = index < completedSets;
                        const isActive = index === completedSets;
                        
                        return (
                            <View key={index} style={styles.setRow}>
                                <View style={styles.setInfo}>
                                    <Text style={styles.setLabel}>Série {index + 1}</Text>
                                    <Text style={styles.setReps}>{exercise?.reps} Reps</Text>
                                </View>

                                {/* Input Numérico de Peso */}
                                <View style={styles.weightInputContainer}>
                                    <TextInput
                                        style={styles.weightInput}
                                        placeholder="Ex: 20"
                                        placeholderTextColor={themas.colors.gray}
                                        keyboardType="numeric"
                                        value={weights[index]}
                                        onChangeText={(text) => handleWeightChange(text, index)}
                                        editable={!isCompleted} // Não edita mais depois de concluído
                                    />
                                </View>

                                <TouchableOpacity 
                                    style={[
                                        styles.checkButton, 
                                        isCompleted && styles.checkButtonActive
                                    ]}
                                    disabled={!isActive} // Evita clicar fora de ordem
                                    onPress={() => handleCheckSet(index)}
                                >
                                    {isCompleted && (
                                        <MaterialIcons name="check" size={20} color={themas.colors.bgScreen} />
                                    )}
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </ScrollView>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity 
                    style={styles.outlineButton} 
                    activeOpacity={0.7} 
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.outlineButtonText}>
                        Finalizar Exercício
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}