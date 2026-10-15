import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import * as TaskRepository from '../src/database/taskRepository';

export default function FormScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const isEditing = Boolean(id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loadingTask, setLoadingTask] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchTask() {
      if (!id) return;
      try {
        setLoadingTask(true);
        const task = await TaskRepository.getTaskById(Number(id));
        if (task) {
          setTitle(task.title);
          setDescription(task.description ?? '');
        } else {
          Alert.alert('Erro', 'Tarefa não encontrada.');
          router.back();
        }
      } catch (error) {
        console.error('Erro ao buscar tarefa:', error);
        Alert.alert('Erro', 'Falha ao carregar os dados da tarefa.');
      } finally {
        setLoadingTask(false);
      }
    }

    if (isEditing) {
      fetchTask();
    }
  }, [id, isEditing, router]);

  const handleSave = async () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      Alert.alert('Atenção', 'O título da tarefa é obrigatório.');
      return;
    }

    try {
      setSubmitting(true);
      const trimmedDescription = description.trim() || null;

      if (isEditing && id) {
        await TaskRepository.updateTask({
          id: Number(id),
          title: trimmedTitle,
          description: trimmedDescription,
        });
      } else {
        await TaskRepository.createTask({
          title: trimmedTitle,
          description: trimmedDescription,
        });
      }

      router.back();
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
      Alert.alert('Erro', 'Não foi possível salvar a tarefa. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingTask) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50 dark:bg-slate-900">
        <ActivityIndicator size="large" color="#2563eb" />
        <Text className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Carregando dados da tarefa...
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-slate-50 dark:bg-slate-900"
    >
      <Stack.Screen
        options={{
          title: isEditing ? 'Editar Tarefa' : 'Nova Tarefa',
        }}
      />

      <ScrollView
        contentContainerClassName="p-5"
        keyboardShouldPersistTaps="handled"
        className="flex-1"
      >
        {/* Campo Título */}
        <View className="mb-5">
          <Text className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
            Título *
          </Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Ex.: Comprar leite, Estudar TypeScript..."
            placeholderTextColor="#94a3b8"
            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 text-base text-slate-800 dark:text-slate-100 shadow-sm"
            autoFocus={!isEditing}
          />
        </View>

        {/* Campo Descrição */}
        <View className="mb-6">
          <Text className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">
            Descrição (opcional)
          </Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Detalhes ou anotações extras sobre esta tarefa..."
            placeholderTextColor="#94a3b8"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-base text-slate-800 dark:text-slate-100 shadow-sm min-h-[110px]"
          />
        </View>

        {/* Botão Salvar */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleSave}
          disabled={submitting}
          className={`w-full py-4 rounded-xl items-center justify-center shadow-md ${
            submitting ? 'bg-blue-400' : 'bg-blue-600'
          }`}
        >
          {submitting ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text className="text-white text-base font-bold">
              {isEditing ? 'Salvar Alterações' : 'Criar Tarefa'}
            </Text>
          )}
        </TouchableOpacity>

        {/* Botão Cancelar */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.back()}
          disabled={submitting}
          className="w-full py-3.5 rounded-xl items-center justify-center mt-3"
        >
          <Text className="text-slate-600 dark:text-slate-400 text-sm font-semibold">
            Cancelar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
