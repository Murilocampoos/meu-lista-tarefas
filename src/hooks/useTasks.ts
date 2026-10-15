import { useState, useCallback, useMemo } from 'react';
import { useFocusEffect } from 'expo-router';
import * as TaskRepository from '../database/taskRepository';
import { Task, TaskFilter } from '../types/task';

export interface TaskCounters {
  total: number;
  pending: number;
  completed: number;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [loading, setLoading] = useState<boolean>(true);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await TaskRepository.getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [loadTasks])
  );

  const toggleTask = useCallback(
    async (id: number, currentCompleted?: number) => {
      try {
        await TaskRepository.toggleTaskComplete(
          id,
          currentCompleted !== undefined ? (currentCompleted === 1 ? 0 : 1) : undefined
        );
        await loadTasks();
      } catch (error) {
        console.error('Erro ao alternar status da tarefa:', error);
      }
    },
    [loadTasks]
  );

  const removeTask = useCallback(
    async (id: number) => {
      try {
        await TaskRepository.deleteTask(id);
        await loadTasks();
      } catch (error) {
        console.error('Erro ao remover tarefa:', error);
      }
    },
    [loadTasks]
  );

  const filteredTasks = useMemo(() => {
    if (filter === 'pending') {
      return tasks.filter((task) => task.completed === 0);
    }
    if (filter === 'completed') {
      return tasks.filter((task) => task.completed === 1);
    }
    return tasks;
  }, [tasks, filter]);

  const counters: TaskCounters = useMemo(() => {
    const total = tasks.length;
    const pending = tasks.filter((t) => t.completed === 0).length;
    const completed = tasks.filter((t) => t.completed === 1).length;
    return { total, pending, completed };
  }, [tasks]);

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    filter,
    setFilter,
    loading,
    loadTasks,
    toggleTask,
    removeTask,
    counters,
    allTasksCount: counters.total,
    pendingCount: counters.pending,
    completedCount: counters.completed,
  };
}

export default useTasks;
