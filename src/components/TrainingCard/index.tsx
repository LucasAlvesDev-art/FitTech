import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { themas } from '../../global/themes';
import { MaterialIcons } from '@expo/vector-icons';

interface Routine {
    name: string;
}

interface TrainingCardProps {
    title: string;
    goal: string;
    routines: Routine[];
    isActive?: boolean;
}

export function TrainingCard({ title, goal, routines, isActive = false }: TrainingCardProps) {
    return (
        <View style={[
            styles.card,
            isActive && styles.cardActive,
        ]}>
            <View style={styles.cardHeader}>
                <MaterialIcons
                    name="fitness-center"
                    size={20}
                    color={themas.colors.primaryGreen}
                />
                <Text style={styles.cardTitle}>{title}</Text>
            </View>

            <View style={styles.goalContainer}>
                <Text style={styles.goalLabel}>Goal</Text>
                <Text style={styles.goalValue}>{goal}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.routinesContainer}>
                <Text style={styles.routinesLabel}>Rotinas:</Text>
                {routines.map((routine, index) => (
                    <View key={index} style={styles.routineItem}>
                        <View style={styles.routineBullet} />
                        <Text style={styles.routineText}>{routine.name}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}
