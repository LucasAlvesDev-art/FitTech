import { StyleSheet, Platform } from 'react-native';
import { themas } from '../../../global/themes';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themas.colors.bgScreen,
        paddingTop: Platform.OS === 'ios' ? 40 : 20,
    },
    scrollContent: {
        paddingBottom: 20, // O espaço do fundo agora é gerenciado pelo botão de logout
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 0,
    },
    
    // --- ESTILOS DA FOTO DE PERFIL ---
    avatarContainer: {
        position: 'relative',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: themas.colors.primaryGreen, // Usando a cor primária para destacar
    },
    editPhotoIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: themas.colors.primaryGreen,
        padding: 6,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: themas.colors.bgScreen,
    },

    userName: {
        color: themas.colors.text,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    userEmail: {
        color: themas.colors.textSecondary,
        fontSize: 14,
    },

    // --- ESTILOS DOS PESOS ---
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginBottom: 40,
    },
    statBox: {
        alignItems: 'center',
        backgroundColor: themas.colors.surface,
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 15,
        borderRadius: 10,
    },
    statBoxDestaque: {
        borderColor: themas.colors.primaryGreen,
        borderWidth: 1,
    },
    pesoAtualHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 4,
    },
    statLabel: {
        color: themas.colors.textSecondary,
        fontSize: 12,
        marginBottom: 5,
    },
    statLabelDestaque: {
        fontSize: 12,
        color: themas.colors.primaryGreen,
        fontWeight: 'bold',
    },
    statValue: {
        color: themas.colors.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
    statValueDestaque: {
        fontSize: 18,
        fontWeight: 'bold',
        color: themas.colors.text,
    },

    // --- ESTILOS DO MENU ---
    menuContainer: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: themas.colors.surface,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItemText: {
        color: themas.colors.text,
        fontSize: 16,
        marginLeft: 15,
    },

    // --- ESTILOS DO BOTÃO DE SAIR ---
    logoutButton: {
        marginTop: 40,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 120, // Mantive os 120 para pular a barra de navegação!
    },
    logoutText: {
        color: themas.colors.danger || '#ef4444', // Fallback caso não tenha danger no thema
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    // --- ESTILOS DOS MODAIS (JANELAS FLUTUANTES) ---
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: themas.colors.surface,
        width: '100%',
        borderRadius: 15,
        padding: 24,
    },
    modalTitle: {
        color: themas.colors.text,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 15,
    },
    inputLabel: {
        color: themas.colors.textSecondary,
        fontSize: 14,
        marginBottom: 8,
    },
    input: {
        backgroundColor: themas.colors.bgScreen,
        color: themas.colors.text,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: themas.colors.surface,
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    btnCancel: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
        marginRight: 10,
        borderRadius: 8,
        backgroundColor: themas.colors.bgScreen,
    },
    btnCancelText: {
        color: themas.colors.textSecondary,
        fontWeight: 'bold',
        fontSize: 16,
    },
    btnSave: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: themas.colors.primaryGreen,
    },
    btnSaveText: {
        color: '#000', // Texto preto para contrastar com o botão verde
        fontWeight: 'bold',
        fontSize: 16,
    },
    configOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: themas.colors.bgScreen,
        marginBottom: 10,
    },
    configOptionText: {
        color: themas.colors.text,
        fontSize: 16,
    },
});