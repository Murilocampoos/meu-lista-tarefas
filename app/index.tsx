import React from 'react';
import { View, FlatList, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useTasks } from '../src/hooks/useTasks';
import { FilterBar } from '../src/components/FilterBar';
import { TaskItem } from '../src/components/TaskItem';
import { EmptyState } from '../src/components/EmptyState';

export default function HomeScreen() {
  const router = useRouter();
  const {
    tasks,
    filter,
    setFilter,
    loading,
    toggleTask,
    removeTask,
    allTasksCount,
    pendingCount,
    completedCount,
  } = useTasks();

  return (
    <View className="flex-1 bg-gray-100">
      <FilterBar
        currentFilter={filter}
        onFilterChange={setFilter}
        counts={{
          all: allTasksCount,
          pending: pendingCount,
          completed: completedCount,
        }}
      />

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#4f46e5" />
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ paddingVertical: 16, paddingBottom: 100 }}
          renderItem={({ item }) => (
             <TaskItem
               task={item}
               onToggle={toggleTask}
               onDelete={removeTask}
               onEdit={() => router.push(`/form?id=${item.id}`)} 
             />
          )}
          ListEmptyComponent={() => <EmptyState filter={filter} />}
        />
      )}

      <TouchableOpacity
        className="absolute bottom-6 right-6 w-14 h-14 bg-indigo-600 rounded-full items-center justify-center shadow-lg"
        onPress={() => router.push('/form')}
      >
        <Text className="text-white text-3xl font-light mb-1">+</Text>
      </TouchableOpacity>
    </View>
  );
}
