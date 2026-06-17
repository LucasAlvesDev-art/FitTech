import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    Image,
    Alert,
    Modal,
    TextInput,
    KeyboardAvoidingView,
    Platform
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { styles } from './PerfilAluno.styles';
import { themas } from '../../../global/themes';
import { useAuth } from '../../../context/AuthContext';

export default function PerfilAluno() {
    const { logout, user } = useAuth();

    const [image, setImage] = useState<string | null>(null);

    const [pesos, setPesos] = useState({
        inicial: '70',
        atual: '75',
        meta: '80'
    });

    const [isPesoModalVisible, setPesoModalVisible] = useState(false);
    const [isConfigModalVisible, setConfigModalVisible] = useState(false);
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
            <StatusBar
                barStyle="light-content"
                backgroundColor={themas.colors.bgScreen}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >

                {/* HEADER */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={pickImage}
                        activeOpacity={0.8}
                        style={styles.avatarContainer}
                    >
                        {image ? (
                            <Image
                                source={{ uri: image }}
                                style={styles.avatarImage}
                            />
                        ) : (
                            <MaterialIcons
                                name="account-circle"
                                size={100}
                                color={themas.colors.textSecondary}
                            />
                        )}

                        <View style={styles.editPhotoIcon}>
                            <MaterialIcons
                                name="camera-alt"
                                size={16}
                                color="#FFF"
                            />
                        </View>
                    </TouchableOpacity>

                    {/* NOME VINDO DO SUPABASE */}
                    <Text style={styles.userName}>
                        {user?.name || 'Usuário'}
                    </Text>

                    {/* EMAIL VINDO DO SUPABASE */}
                    <Text style={styles.userEmail}>
                        {user?.email || 'Carregando...'}
                    </Text>
                </View>

                {/* ESTATÍSTICAS */}
                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statLabel}>Inicial</Text>
                        <Text style={styles.statValue}>
                            {pesos.inicial} kg
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.statBox, styles.statBoxDestaque]}
                        onPress={() => {
                            setTempPesos(pesos);
                            setPesoModalVisible(true);
                        }}
                    >
                        <View style={styles.pesoAtualHeader}>
                            <Text style={styles.statLabelDestaque}>
                                Atual
                            </Text>
                        </View>

                        <Text style={styles.statValueDestaque}>
                            {pesos.atual} kg
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.statBox}>
                        <Text style={styles.statLabel}>Meta</Text>
                        <Text style={styles.statValue}>
                            {pesos.meta} kg
                        </Text>
                    </View>
                </View>

                {/* MENU */}
                <View style={styles.menuContainer}>
                    <TouchableOpacity style={styles.menuItem}>
                        <View style={styles.menuItemLeft}>
                            <MaterialIcons
                                name="history"
                                size={24}
                                color={themas.colors.primaryGreen}
                            />
                            <Text style={styles.menuItemText}>
                                Histórico de Treinos
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => setConfigModalVisible(true)}
                    >
                        <View style={styles.menuItemLeft}>
                            <MaterialIcons
                                name="settings"
                                size={24}
                                color={themas.colors.primaryGreen}
                            />
                            <Text style={styles.menuItemText}>
                                Configurações
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* LOGOUT */}
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    <MaterialIcons
                        name="logout"
                        size={24}
                        color="#ef4444"
                    />
                    <Text style={styles.logoutText}>
                        Sair da Conta
                    </Text>
                </TouchableOpacity>

            </ScrollView>

            {/* MODAL PESOS */}
            <Modal
                visible={isPesoModalVisible}
                transparent
                animationType="fade"
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.modalOverlay}
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            Atualizar Pesos
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={tempPesos.inicial}
                            onChangeText={(v) =>
                                setTempPesos({
                                    ...tempPesos,
                                    inicial: v
                                })
                            }
                        />

                        <TextInput
                            style={styles.input}
                            value={tempPesos.atual}
                            onChangeText={(v) =>
                                setTempPesos({
                                    ...tempPesos,
                                    atual: v
                                })
                            }
                        />

                        <TextInput
                            style={styles.input}
                            value={tempPesos.meta}
                            onChangeText={(v) =>
                                setTempPesos({
                                    ...tempPesos,
                                    meta: v
                                })
                            }
                        />

                        <TouchableOpacity onPress={salvarPesos}>
                            <Text>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </Modal>

        </View>
    );
}