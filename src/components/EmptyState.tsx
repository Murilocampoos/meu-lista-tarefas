import React from 'react';
import { View, Text } from 'react-native';
import { TaskFilter } from '../types/task';

interface EmptyStateProps {
  filter: TaskFilter;
}

export function EmptyState({ filter }: EmptyStateProps) {
  const content = {
    all: {
      emoji: '📝',
      title: 'Nenhuma tarefa encontrada',
      subtitle: 'Toque no botão "+" no canto inferior para criar sua primeira tarefa!',
    },
    pending: {
      emoji: '🎉',
      title: 'Tudo em dia!',
      subtitle: 'Você não tem nenhuma tarefa pendente no momento.',
    },
    completed: {
      emoji: '⏳',
      title: 'Nenhuma tarefa concluída',
      subtitle: 'Conclua suas tarefas pendentes para vê-las listadas aqui.',
    },
  }[filter] || {
    emoji: '📝',
    title: 'Nenhuma tarefa encontrada',
    subtitle: 'Comece adicionando uma nova tarefa!',
  };

  return (
    <View className="flex-1 items-center justify-center py-16 px-6">
      <Text className="text-6xl mb-4 text-center">{content.emoji}</Text>
      <Text className="text-lg font-bold text-slate-800 dark:text-slate-100 text-center mb-2">
        {content.title}
      </Text>
      <Text className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-xs leading-5">
        {content.subtitle}
      </Text>
    </View>
  );
}

export default EmptyState;
