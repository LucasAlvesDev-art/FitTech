import { StyleSheet } from 'react-native';
import { themas } from '../../global/themes';

export const styles = StyleSheet.create({
    card: {
        width: 280,
        backgroundColor: themas.colors.cardBackground,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: themas.colors.cardBorder,
        padding: 20,
        marginHorizontal: 10,
    },
    cardActive: {
        borderColor: themas.colors.primaryGreen,
        borderWidth: 1.5,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: themas.colors.textPrimary,
        marginLeft: 10,
    },
    goalContainer: {
        marginBottom: 12,
    },
    goalLabel: {
        fontSize: 11,
        color: themas.colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 2,
    },
    goalValue: {
        fontSize: 14,
        color: themas.colors.textSecondary,
    },
    divider: {
        height: 1,
        backgroundColor: themas.colors.cardBorder,
        marginVertical: 12,
    },
    routinesContainer: {
        gap: 6,
    },
    routinesLabel: {
        fontSize: 12,
        color: themas.colors.textMuted,
        marginBottom: 4,
    },
    routineItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    routineBullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: themas.colors.primaryGreen,
        marginRight: 10,
    },
    routineText: {
        fontSize: 14,
        color: themas.colors.textSecondary,
    },
});
