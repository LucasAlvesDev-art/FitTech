import { StyleSheet } from 'react-native';
import { themas } from '../../../global/themes';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themas.colors.bgScreen,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
    },
    headerTitle: {
        color: themas.colors.text,
        fontSize: 20,
        fontWeight: 'bold',
    },
    headerPlaceholder: {
        width: 24,
    },
    backButton: {
        padding: 5,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    card: {
        backgroundColor: themas.colors.surface,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    cardFinished: {
        borderColor: themas.colors.primary,
    },
    exerciseName: {
        color: themas.colors.text,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    cardDetailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12, // Space before progress bar
    },
    detailColumn: {
        alignItems: 'center',
    },
    detailLabel: {
        color: themas.colors.textSecondary,
        fontSize: 12,
        marginBottom: 4,
    },
    detailValue: {
        color: themas.colors.text,
        fontSize: 14,
        fontWeight: 'bold',
    },
    playIcon: {
        marginLeft: 10,
    },
    cardFooterProgress: {
        height: 4,
        backgroundColor: themas.colors.bgScreen, // Darker than surface
        borderRadius: 2,
        overflow: 'hidden',
    },
    cardFooterProgressFill: {
        height: '100%',
        backgroundColor: themas.colors.primary,
    },
    finishButton: {
        backgroundColor: themas.colors.primary,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    finishButtonText: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 16,
    },
    listContentEmpty: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
    },
    emptyTitle: {
        color: themas.colors.textSecondary,
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
    },
    emptyText: {
        color: themas.colors.gray,
        fontSize: 14,
        textAlign: 'center',
        marginTop: 8,
        lineHeight: 20,
        paddingHorizontal: 20,
    },
});