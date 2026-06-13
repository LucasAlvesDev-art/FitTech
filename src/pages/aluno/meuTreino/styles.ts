import { StyleSheet, Platform } from 'react-native';
import { themas } from '../../../global/themes';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themas.colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: Platform.OS === 'ios' ? 60 : 40, // Espaçamento da StatusBar
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: themas.colors.textPrimary,
        textAlign: 'center',
    },
    headerPlaceholder: {
        width: 40, // Mesma largura do backButton para centralizar o título
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    card: {
        backgroundColor: '#1E1E1E', // fundo levemente mais claro que o background principal
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardInfo: {
        flex: 1,
        paddingRight: 16,
    },
    exerciseName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: themas.colors.textPrimary,
        marginBottom: 4,
    },
    exerciseDetails: {
        fontSize: 14,
        color: '#A0A0A0', // cinza suave para dar contraste
    },
    checkbox: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: themas.colors.primaryGreen,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: {
        backgroundColor: themas.colors.primaryGreen,
    },
    finishButton: {
        backgroundColor: themas.colors.primaryGreen,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    finishButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: themas.colors.background, // Texto escuro com a cor do background
        letterSpacing: 1,
    },
});
