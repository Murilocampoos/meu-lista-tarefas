import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number, currentCompleted: number) => void;
  onDelete: (id: number) => void;
  onEdit: () => void;
}

export function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const isCompleted = task.completed === 1;

  function handleDelete() {
    Alert.alert('Apagar Tarefa', 'Tem certeza que deseja excluir esta tarefa?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => onDelete(task.id) },
    ]);
  }

  return (
    <View className="bg-white mx-4 mb-3 p-4 rounded-xl shadow-sm border border-gray-100 flex-row items-start">
      <TouchableOpacity
        onPress={() => onToggle(task.id, task.completed)}
        className={`w-6 h-6 mt-1 rounded-full border-2 items-center justify-center mr-3 ${
          isCompleted ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-400'
        }`}
      >
        {isCompleted && <Text className="text-white text-xs font-bold">✓</Text>}
      </TouchableOpacity>

      <View className="flex-1">
        <Text
          className={`text-base font-bold ${
            isCompleted ? 'text-gray-400 line-through' : 'text-gray-800'
          }`}
        >
          {task.title}
        </Text>
        
        {task.description && (
          <Text
            className={`text-sm mt-1 ${
              isCompleted ? 'text-gray-300' : 'text-gray-500'
            }`}
          >
            {task.description}
          </Text>
        )}

        <Text className="text-xs text-gray-400 mt-2">
          {new Date(task.createdAt).toLocaleDateString('pt-BR')}
        </Text>
      </View>

      <View className="flex-col gap-3 ml-2">
        <TouchableOpacity
          onPress={onEdit}
          className="bg-gray-100 p-2 rounded-lg items-center"
        >
          <Text className="text-gray-600 text-xs font-bold">Editar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={handleDelete}
          className="bg-red-50 p-2 rounded-lg items-center"
        >
          <Text className="text-red-500 text-xs font-bold">Apagar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default TaskItem;
