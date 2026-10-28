/**
 * src/components/CameraCapture.tsx — Componente de Captura de Foto com Câmera
 *
 * Componente que encapsula toda a lógica de acesso à câmera do dispositivo,
 * incluindo solicitação de permissões, preview e captura de foto.
 */

import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

// =============================================================================
// TIPOS DAS PROPS
// =============================================================================

interface CameraCaptureProps {
  /**
   * Callback chamado quando uma foto é capturada.
   * Recebe o URI local da foto (caminho temporário no dispositivo).
   */
  onCapture: (uri: string) => void;

  /** Callback chamado quando o usuário fecha a câmera sem capturar */
  onClose: () => void;
}

// =============================================================================
// COMPONENTE
// =============================================================================

export function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [capturing, setCapturing] = useState(false);
  const [facing, setFacing] = useState<CameraType>('back');

  const toggleFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const handleCapture = async () => {
    if (!cameraRef.current || capturing) return;

    try {
      setCapturing(true);

      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
        base64: false,
        exif: false,
      });

      if (photo?.uri) {
        onCapture(photo.uri);
      }
    } catch (error) {
      console.error('Erro ao capturar foto:', error);
    } finally {
      setCapturing(false);
    }
  };

  const handleOpenSettings = () => {
    Linking.openSettings();
  };

  // ESTADO 1: Verificando permissões
  if (!permission) {
    return (
      <View style={styles.container}>
        <Text className="text-white text-lg">Verificando permissões...</Text>
      </View>
    );
  }

  // ESTADO 2: Permissão não concedida
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <View className="bg-white rounded-2xl p-6 mx-6 items-center">
          <Text className="text-5xl mb-4">📷</Text>
          <Text className="text-xl font-bold text-gray-800 text-center mb-2">
            Acesso à Câmera
          </Text>
          <Text className="text-sm text-gray-600 text-center mb-6">
            Precisamos de permissão para acessar sua câmera e capturar a foto de
            perfil. Seus dados permanecem armazenados apenas no seu dispositivo.
          </Text>

          {/* Botão para solicitar permissão */}
          <TouchableOpacity
            onPress={requestPermission}
            className="bg-indigo-600 px-6 py-3 rounded-xl mb-3 w-full"
          >
            <Text className="text-white text-center font-semibold">
              Conceder Permissão
            </Text>
          </TouchableOpacity>

          {/* Botão para abrir Configurações (caso tenha negado antes) */}
          {!permission.canAskAgain && (
            <TouchableOpacity
              onPress={handleOpenSettings}
              className="bg-gray-200 px-6 py-3 rounded-xl mb-3 w-full"
            >
              <Text className="text-gray-700 text-center font-semibold">
                Abrir Configurações
              </Text>
            </TouchableOpacity>
          )}

          {/* Botão para fechar sem conceder */}
          <TouchableOpacity onPress={onClose}>
            <Text className="text-gray-500 text-sm">Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ESTADO 3: Permissão concedida
  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
      >
        <View style={styles.controls}>
          {/* Barra superior de controles */}
          <View className="flex-row justify-between items-center p-6 pt-12">
            {/* Botão superior de alternar câmera */}
            <TouchableOpacity
              onPress={toggleFacing}
              className="bg-black/50 px-4 py-2.5 rounded-full flex-row items-center justify-center border border-white/20"
              activeOpacity={0.7}
              accessibilityLabel="Trocar câmera"
            >
              <Text className="text-white text-base mr-1.5">🔄</Text>
              <Text className="text-white text-sm font-semibold">
                {facing === 'back' ? 'Traseira' : 'Frontal'}
              </Text>
            </TouchableOpacity>

            {/* Botão de fechar */}
            <TouchableOpacity
              onPress={onClose}
              className="bg-black/50 w-11 h-11 rounded-full items-center justify-center border border-white/20"
              activeOpacity={0.7}
              accessibilityLabel="Fechar câmera"
            >
              <Text className="text-white text-xl font-bold">✕</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-1" />

          {/* Botão de captura na parte inferior com alternador rápido */}
          <View className="flex-row items-center justify-around pb-12 px-8">
            {/* Espaçador para manter o disparador perfeitamente centralizado */}
            <View className="w-12 h-12" />

            {/* Botão de Captura */}
            <View className="items-center">
              <TouchableOpacity
                onPress={handleCapture}
                disabled={capturing}
                className="w-20 h-20 rounded-full bg-white border-4 border-gray-300 items-center justify-center shadow-lg"
                style={{ opacity: capturing ? 0.5 : 1 }}
                activeOpacity={0.8}
              >
                <View className="w-16 h-16 rounded-full bg-white" />
              </TouchableOpacity>

              {capturing && (
                <Text className="text-white text-sm mt-2">Capturando...</Text>
              )}
            </View>

            {/* Botão circular de alternar câmera próximo ao disparador */}
            <TouchableOpacity
              onPress={toggleFacing}
              className="w-12 h-12 rounded-full bg-black/50 items-center justify-center border border-white/20"
              activeOpacity={0.7}
              accessibilityLabel="Trocar câmera"
            >
              <Text className="text-2xl">🔄</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  controls: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default CameraCapture;
