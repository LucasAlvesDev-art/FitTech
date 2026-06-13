import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { themas } from '../../../global/themes';

interface Exercise {
    id: string;
    nome: string;
    series: string;
    repeticoes: string;
    concluido: boolean;
}

const INITIAL_MOCK: Exercise[] = [
    { id: '1', nome: 'Supino Reto', series: '3', repeticoes: '10 a 12', concluido: false },
    { id: '2', nome: 'Supino Inclinado com Halteres', series: '3', repeticoes: '10 a 12', concluido: false },
    { id: '3', nome: 'Crucifixo Máquina', series: '4', repeticoes: '12 a 15', concluido: false },
    { id: '4', nome: 'Tríceps na Polia', series: '3', repeticoes: 'Até a falha', concluido: false },
];

export default function MeuTreino() {
    const navigation = useNavigation();
    const [exercises, setExercises] = useState<Exercise[]>(INITIAL_MOCK);

    const toggleExercise = (id: string) => {
        setExercises(prev => 
            prev.map(ex => ex.id === id ? { ...ex, concluido: !ex.concluido } : ex)
        );
    };

    const renderItem = ({ item }: { item: Exercise }) => (
        <View style={styles.card}>
            <View style={styles.cardInfo}>
                <Text style={styles.exerciseName}>{item.nome}</Text>
                <Text style={styles.exerciseDetails}>
                    {item.series} séries de {item.repeticoes}
                </Text>
            </View>
            <TouchableOpacity 
                style={[styles.checkbox, item.concluido && styles.checkboxChecked]} 
                onPress={() => toggleExercise(item.id)}
                activeOpacity={0.7}
            >
                {item.concluido && (
                    <MaterialIcons name="check" size={20} color={themas.colors.background} />
                )}
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={themas.colors.background} />
            
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back-ios" size={24} color={themas.colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Meu Treino</Text>
                {/* Placeholder invisível para centralizar o título */}
                <View style={styles.headerPlaceholder} />
            </View>

            {/* List */}
            <FlatList
                data={exercises}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={
                    <TouchableOpacity style={styles.finishButton} activeOpacity={0.7}>
                        <Text style={styles.finishButtonText}>FINALIZAR TREINO</Text>
                    </TouchableOpacity>
                }
            />
        </View>
    );
}
