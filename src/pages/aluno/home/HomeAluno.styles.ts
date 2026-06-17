import { Dimensions, StyleSheet } from 'react-native';
import { themas } from '../../../global/themes';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themas.colors.bgScreen,
    },

    emptyStateContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
        paddingHorizontal: 30,
    },

    emptyStateTitle: {
        color: themas.colors.primaryGreen,
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },
    
    emptyStateText: {
        color: '#A0A0A0', // Ou a cor cinza que estiver no seu themas.colors
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center',
        lineHeight: 24,
    },  

    /* ── Header ── */
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: themas.colors.surface,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    greeting: {
        fontSize: 26,
        fontWeight: 'bold',
        color: themas.colors.text,
    },
    notificationButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: themas.colors.cardBackground,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: themas.colors.cardBorder,
    },

    /* ── Content ── */
    content: {
        flex: 1,
    },
    contentContainer: {
        paddingTop: 28,
        paddingBottom: 40,
    },

    /* ── Section Header ── */
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginBottom: 20,
    },
    sectionAccent: {
        width: 4,
        height: 22,
        backgroundColor: themas.colors.primaryGreen,
        borderRadius: 2,
        marginRight: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: themas.colors.text,
    },

    /* ── Carousel ── */
    carouselContainer: {
        paddingHorizontal: 14,
    },

    /* ── Start Button ── */
    startButton: {
        marginTop: 32,
        marginHorizontal: 24,
        height: 54,
        backgroundColor: themas.colors.primaryGreen,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: themas.colors.primaryGreen,
    },
    startButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: themas.colors.text,
        letterSpacing: 2,
    },
});
