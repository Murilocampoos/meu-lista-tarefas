import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { TaskFilter } from '../types/task';
import { TaskCounters } from '../hooks/useTasks';

interface FilterBarProps {
  currentFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  counters?: TaskCounters;
  counts?: {
    all: number;
    pending: number;
    completed: number;
  };
}

export function FilterBar({ currentFilter, onFilterChange, counters, counts }: FilterBarProps) {
  const total = counts ? counts.all : (counters?.total ?? 0);
  const pending = counts ? counts.pending : (counters?.pending ?? 0);
  const completed = counts ? counts.completed : (counters?.completed ?? 0);

  const filterOptions: { key: TaskFilter; label: string; count: number }[] = [
    { key: 'all', label: 'Todas', count: total },
    { key: 'pending', label: 'Pendentes', count: pending },
    { key: 'completed', label: 'Concluídas', count: completed },
  ];

  return (
    <View className="flex-row bg-gray-200 dark:bg-slate-800 p-1.5 rounded-2xl mx-4 my-3">
      {filterOptions.map((item) => {
        const isActive = currentFilter === item.key;
        return (
          <Pressable
            key={item.key}
            onPress={() => onFilterChange(item.key)}
            className={`flex-1 flex-row items-center justify-center py-2.5 px-2 rounded-xl ${
              isActive ? 'bg-indigo-600' : 'bg-transparent'
            }`}
          >
            <Text
              className={`text-xs font-semibold mr-1.5 ${
                isActive ? 'text-white' : 'text-gray-700 dark:text-slate-300'
              }`}
            >
              {item.label}
            </Text>
            <View
              className={`px-1.5 py-0.5 rounded-full ${
                isActive ? 'bg-indigo-700' : 'bg-gray-300 dark:bg-slate-700'
              }`}
            >
              <Text
                className={`text-[10px] font-bold ${
                  isActive ? 'text-white' : 'text-gray-700 dark:text-slate-300'
                }`}
              >
                {item.count}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

export default FilterBar;
