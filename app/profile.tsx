/**
 * app/profile.tsx — Tela de Perfil do Usuário
 *
 * Tela que permite ao usuário:
 * - Informar nome e email
 * - Capturar uma foto com a câmera do dispositivo
 * - Salvar os dados no SQLite (registro único)
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { File, Paths } from 'expo-file-system';

import { useProfile } from '../src/hooks/useProfile';
import { CameraCapture } from '../src/components/CameraCapture';

/**
 * Tela de perfil do usuário com captura de foto.
 */
export default function ProfileScreen() {
  const router = useRouter();

  // Hook customizado que gerencia o estado do perfil no banco de dados
  const { profile, loading, saveProfile } = useProfile();

  // ─────────────────────────────────────────────────────────────────────────
  // ESTADOS LOCAIS DO FORMULÁRIO
  // ─────────────────────────────────────────────────────────────────────────

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [saving, setSaving] = useState(false);

  // ─────────────────────────────────────────────────────────────────────────
  // EFEITOS
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
      setPhotoUri(profile.photoUri);
    }
  }, [profile]);

  // ─────────────────────────────────────────────────────────────────────────
  // HANDLERS DE CAPTURA DE FOTO
  // ─────────────────────────────────────────────────────────────────────────

  const handlePhotoCapture = async (tempUri: string) => {
    try {
      const fileName = `profile-${Date.now()}.jpg`;
      const destFile = new File(Paths.document, fileName);

      // Copia o arquivo do cache temporário para o diretório permanente
      new File(tempUri).copy(destFile);

      // Atualiza o estado local com o URI permanente
      setPhotoUri(destFile.uri);

      // Fecha a câmera
      setShowCamera(false);
    } catch (error) {
      console.error('Erro ao copiar foto:', error);
      Alert.alert(
        'Erro',
        'Não foi possível salvar a foto. Por favor, tente novamente.',
      );
    }
  };

  const handleOpenCamera = () => {
    setShowCamera(true);
  };

  const handleCloseCamera = () => {
    setShowCamera(false);
  };

  // ─────────────────────────────────────────────────────────────────────────
  // HANDLER DE SALVAR
  // ─────────────────────────────────────────────────────────────────────────

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveProfile({
        name: name.trim(),
        email: email.trim(),
        photoUri,
      });

      Alert.alert('Sucesso', 'Perfil salvo com sucesso!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      Alert.alert(
        'Erro',
        'Não foi possível salvar o perfil. Por favor, tente novamente.',
      );
    } finally {
      setSaving(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // ESTADO DE CARREGAMENTO
  // ─────────────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text className="mt-3 text-gray-500 text-sm">Carregando perfil...</Text>
      </View>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDERIZAÇÃO DO FORMULÁRIO
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 bg-gray-50"
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-4 pt-6 pb-8"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ── ÁREA DE FOTO ───────────────────────────────────────── */}
          <View className="items-center mb-8">
            <TouchableOpacity
              onPress={handleOpenCamera}
              className="w-32 h-32 rounded-full bg-gray-200 items-center justify-center overflow-hidden border-4 border-white shadow-lg"
              activeOpacity={0.7}
            >
              {photoUri ? (
                <Image
                  source={{ uri: photoUri }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <View className="items-center">
                  <Text className="text-5xl mb-1">📷</Text>
                  <Text className="text-xs text-gray-500 text-center px-2">
                    Adicionar{'\n'}Foto
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            <Text className="text-xs text-gray-400 mt-2 text-center">
              Toque para {photoUri ? 'alterar' : 'capturar'} sua foto
            </Text>
          </View>

          {/* ── CAMPO DE NOME ──────────────────────────────────────── */}
          <View className="mb-5">
            <Text className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">
              Nome
            </Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Seu nome completo"
              placeholderTextColor="#9ca3af"
              className="bg-white rounded-xl px-4 py-3 text-base text-gray-800 border border-gray-200"
              maxLength={100}
              returnKeyType="next"
              autoCapitalize="words"
            />
          </View>

          {/* ── CAMPO DE EMAIL ─────────────────────────────────────── */}
          <View className="mb-8">
            <Text className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">
              Email
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="seu.email@exemplo.com"
              placeholderTextColor="#9ca3af"
              className="bg-white rounded-xl px-4 py-3 text-base text-gray-800 border border-gray-200"
              maxLength={100}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
            />
          </View>

          {/* ── BOTÃO DE SALVAR ────────────────────────────────────── */}
          <TouchableOpacity
            onPress={handleSave}
            disabled={saving}
            className={`rounded-xl py-4 items-center ${
              saving ? 'bg-indigo-300' : 'bg-indigo-600'
            }`}
            accessibilityRole="button"
            accessibilityLabel="Salvar perfil"
          >
            {saving ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text className="text-white font-bold text-base">
                💾 Salvar Perfil
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* OVERLAY DE CÂMERA */}
      {showCamera && (
        <CameraCapture
          onCapture={handlePhotoCapture}
          onClose={handleCloseCamera}
        />
      )}
    </>
  );
}
