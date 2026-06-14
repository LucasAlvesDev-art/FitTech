import React, { useState } from 'react';
import { 
    View, Text, TouchableOpacity, StatusBar, ScrollView, 
    Image, Alert, Modal, TextInput, KeyboardAvoidingView, Platform 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './PerfilAluno.styles';
import { themas } from '../../../global/themes';
import { useAuth } from '../../../context/AuthContext';

export default function PerfilAluno() {
    const { logout } = useAuth();
    
    // Estados do Perfil
    const [image, setImage] = useState<string | null>(null);
    const [pesos, setPesos] = useState({ inicial: '70', atual: '75', meta: '80' });
    
    // Estados para controlar os Modais (Janelas)
    const [isPesoModalVisible, setPesoModalVisible] = useState(false);
    const [isConfigModalVisible, setConfigModalVisible] = useState(false);
    
    // Estado temporário para o input do modal de pesos
    const [tempPesos, setTempPesos] = useState(pesos);

    const handleLogout = async () => {
        await logout();
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Ops!', 'Precisamos de permissão para acessar suas fotos.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const salvarPesos = () => {
        setPesos(tempPesos);
        setPesoModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={themas.colors.bgScreen} />
            
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                {/* Cabeçalho */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={pickImage} activeOpacity={0.8} style={styles.avatarContainer}>
                        {image ? (
                            <Image source={{ uri: image }} style={styles.avatarImage} />
                        ) : (
                            <MaterialIcons name="account-circle" size={100} color={themas.colors.textSecondary} />
                        )}
                        <View style={styles.editPhotoIcon}>
                            <MaterialIcons name="camera-alt" size={16} color="#FFF" />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.userName}>Pedro Lima</Text>
                    <Text style={styles.userEmail}>pedro@email.com</Text>
                </View>

                {/* Estatísticas Corporais */}
                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statLabel}>Inicial</Text>
                        <Text style={styles.statValue}>{pesos.inicial} kg</Text>
                    </View>
                    
                    <TouchableOpacity 
                        style={[styles.statBox, styles.statBoxDestaque]} 
                        onPress={() => { setTempPesos(pesos); setPesoModalVisible(true); }} 
                        activeOpacity={0.7}
                    >
                        <View style={styles.pesoAtualHeader}>
                            <Text style={styles.statLabelDestaque}>Atual</Text>
                            <MaterialIcons name="edit" size={14} color={themas.colors.primaryGreen} />
                        </View>
                        <Text style={styles.statValueDestaque}>{pesos.atual} kg</Text>
                    </TouchableOpacity>

                    <View style={styles.statBox}>
                        <Text style={styles.statLabel}>Meta</Text>
                        <Text style={styles.statValue}>{pesos.meta} kg</Text>
                    </View>
                </View>

                {/* Menu */}
                <View style={styles.menuContainer}>
                    <TouchableOpacity 
                        style={styles.menuItem} 
                        activeOpacity={0.7} 
                        onPress={() => Alert.alert('Histórico', 'Aqui abriremos um calendário mostrando os dias que você treinou!')}
                    >
                        <View style={styles.menuItemLeft}>
                            <MaterialIcons name="history" size={24} color={themas.colors.primaryGreen} />
                            <Text style={styles.menuItemText}>Histórico de Treinos</Text>
                        </View>
                        <MaterialIcons name="chevron-right" size={24} color={themas.colors.textSecondary} />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.menuItem} 
                        activeOpacity={0.7} 
                        onPress={() => setConfigModalVisible(true)}
                    >
                        <View style={styles.menuItemLeft}>
                            <MaterialIcons name="settings" size={24} color={themas.colors.primaryGreen} />
                            <Text style={styles.menuItemText}>Configurações</Text>
                        </View>
                        <MaterialIcons name="chevron-right" size={24} color={themas.colors.textSecondary} />
                    </TouchableOpacity>
                </View>

                {/* Botão de Sair */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.7}>
                    <MaterialIcons name="logout" size={24} color={themas.colors.danger || '#ef4444'} />
                    <Text style={styles.logoutText}>Sair da Conta</Text>
                </TouchableOpacity>

            </ScrollView>

            {/* MODAL 1: EDITAR PESOS */}
            <Modal visible={isPesoModalVisible} transparent animationType="fade">
                <KeyboardAvoidingView 
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
                    style={styles.modalOverlay}
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Atualizar Pesos (kg)</Text>
                        
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Peso Inicial</Text>
                            <TextInput 
                                style={styles.input} keyboardType="numeric" maxLength={3}
                                value={tempPesos.inicial}
                                onChangeText={(val) => setTempPesos({...tempPesos, inicial: val})}
                            />
                        </View>
                        
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Peso Atual</Text>
                            <TextInput 
                                style={styles.input} keyboardType="numeric" maxLength={3}
                                value={tempPesos.atual}
                                onChangeText={(val) => setTempPesos({...tempPesos, atual: val})}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Meta de Peso</Text>
                            <TextInput 
                                style={styles.input} keyboardType="numeric" maxLength={3}
                                value={tempPesos.meta}
                                onChangeText={(val) => setTempPesos({...tempPesos, meta: val})}
                            />
                        </View>

                        <View style={styles.modalActions}>
                            <TouchableOpacity style={styles.btnCancel} onPress={() => setPesoModalVisible(false)}>
                                <Text style={styles.btnCancelText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnSave} onPress={salvarPesos}>
                                <Text style={styles.btnSaveText}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>

            {/* MODAL 2: CONFIGURAÇÕES */}
            <Modal visible={isConfigModalVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Configurações</Text>
                        
                        <TouchableOpacity style={styles.configOption} onPress={() => Alert.alert('Notificações', 'As notificações de treino foram ativadas.')}>
                            <Text style={styles.configOptionText}>Ativar Notificações</Text>
                            <MaterialIcons name="notifications-active" size={24} color={themas.colors.primaryGreen} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.configOption} onPress={() => Alert.alert('Senha', 'Enviamos um link de redefinição para o seu email.')}>
                            <Text style={styles.configOptionText}>Alterar Senha</Text>
                            <MaterialIcons name="lock-outline" size={24} color={themas.colors.primaryGreen} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnCancel} onPress={() => setConfigModalVisible(false)}>
                            <Text style={styles.btnCancelText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    );
}