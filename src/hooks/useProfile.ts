/**
 * src/hooks/useProfile.ts — Hook Customizado de Gerenciamento de Perfil
 *
 * Hook que gerencia o estado e as operações do perfil do usuário.
 * Segue o mesmo padrão arquitetural de `useTasks`, mas adaptado para
 * um REGISTRO ÚNICO em vez de uma lista.
 */

import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import * as ProfileRepository from '../database/profileRepository';
import { UserProfile, SaveProfileInput } from '../types/profile';

// =============================================================================
// TIPO DE RETORNO DO HOOK
// =============================================================================

interface UseProfileReturn {
  /** Perfil do usuário ou `null` se ainda não foi criado */
  profile: UserProfile | null;
  /** Indica se os dados estão sendo carregados do banco */
  loading: boolean;
  /** Salva (cria ou atualiza) o perfil no banco de dados */
  saveProfile: (input: SaveProfileInput) => Promise<void>;
}

// =============================================================================
// O HOOK
// =============================================================================

export function useProfile(): UseProfileReturn {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);
      const data = await ProfileRepository.getProfile();
      setProfile(data);
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [loadProfile]),
  );

  const handleSave = useCallback(
    async (input: SaveProfileInput) => {
      try {
        await ProfileRepository.saveProfile(input);
        await loadProfile();
      } catch (error) {
        console.error('Erro ao salvar perfil:', error);
        throw error;
      }
    },
    [loadProfile],
  );

  return {
    profile,
    loading,
    saveProfile: handleSave,
  };
}

export default useProfile;
