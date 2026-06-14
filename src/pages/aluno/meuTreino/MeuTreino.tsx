import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './MeuTreino.styles';
import { themas } from '../../../global/themes';

export interface Exercise {
    id: string;
    nome: string;
    seriesTotais: number;
    reps: string;
    peso: string; // Nova propriedade
    descansoSegundos: number;
    seriesConcluidas: number;
    isFinished: boolean;
}

// TODO: [Fase de Integração] Substituir este MOCK por uma chamada ao Supabase.
const INITIAL_MOCK: Exercise[] = [
    { id: '1', nome: 'Supino Reto', seriesTotais: 3, reps: '12', peso: '20kg', descansoSegundos: 60, seriesConcluidas: 3, isFinished: true },
    { id: '2', nome: 'Supino Inclinado', seriesTotais: 3, reps: '12', peso: '15kg', descansoSegundos: 60, seriesConcluidas: 0, isFinished: false },
    { id: '3', nome: 'Crucifixo Máquina', seriesTotais: 4, reps: '15', peso: '30kg', descansoSegundos: 45, seriesConcluidas: 0, isFinished: false },
    { id: '4', nome: 'Tríceps na Polia', seriesTotais: 3, reps: 'Falha', peso: '10kg', descansoSegundos: 45, seriesConcluidas: 0, isFinished: false },
];

export default function MeuTreino() {
    const navigation = useNavigation<NavigationProp<any>>();
    const [exercises, setExercises] = useState<Exercise[]>(INITIAL_MOCK);

    const handleOpenExercise = (exercise: Exercise) => {
        navigation.navigate('ExercicioTreino', { exercise });
    };

    const renderItem = ({ item }: { item: Exercise }) => {
        const progressPercentage = item.seriesTotais > 0 ? (item.seriesConcluidas / item.seriesTotais) * 100 : 0;

        return (
            <TouchableOpacity 
                style={[styles.card, item.isFinished && styles.cardFinished]}
                activeOpacity={0.7}
                onPress={() => handleOpenExercise(item)}
            >
                <Text style={styles.exerciseName}>{item.nome}</Text>
                
                <View style={styles.cardDetailsRow}>
                    <View style={styles.detailColumn}>
                        <Text style={styles.detailLabel}>Séries</Text>
                        <Text style={styles.detailValue}>{item.seriesConcluidas}/{item.seriesTotais}</Text>
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
                        <Text style={styles.detailValue}>{item.descansoSegundos}s</Text>
                    </View>
                    
                    {item.isFinished ? (
                        <MaterialIcons name="check-circle" size={28} color={themas.colors.primary} style={styles.playIcon} />
                    ) : (
                        <MaterialIcons name="play-circle-outline" size={28} color={themas.colors.primary} style={styles.playIcon} />
                    )}
                </View>

                {/* Mini Barra de Progresso do Card */}
                <View style={styles.cardFooterProgress}>
                    <View style={[styles.cardFooterProgressFill, { width: `${progressPercentage}%` }]} />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={themas.colors.bgScreen} />
            
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back-ios" size={24} color={themas.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Meu Treino</Text>
                <View style={styles.headerPlaceholder} />
            </View>

            {/* List */}
            <FlatList
                data={exercises}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={[
                    styles.listContent, 
                    exercises.length === 0 && styles.listContentEmpty 
                ]}
                showsVerticalScrollIndicator={false}
                
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <MaterialIcons name="fitness-center" size={64} color={themas.colors.surface} />
                        <Text style={styles.emptyTitle}>Nenhum exercício</Text>
                        <Text style={styles.emptyText}>
                            Seu treino ainda não possui exercícios cadastrados. Fale com seu instrutor!
                        </Text>
                    </View>
                }
                
                ListFooterComponent={
                    exercises.length > 0 ? (
                        <TouchableOpacity style={styles.finishButton} activeOpacity={0.7}>
                            <Text style={styles.finishButtonText}>FINALIZAR TREINO</Text>
                        </TouchableOpacity>
                    ) : null
                }
            />
        </View>
    );
}