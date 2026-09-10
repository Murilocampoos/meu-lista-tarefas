import { useState, useCallback, useMemo } from 'react';
import { useFocusEffect } from 'expo-router';
import {
  getTasks,
  createTask as repositoryCreateTask,
  updateTask as repositoryUpdateTask,
  toggleTaskComplete as repositoryToggleTaskComplete,
  deleteTask as repositoryDeleteTask,
} from '../database/taskRepository';
import { Task, TaskFilter, CreateTaskInput, UpdateTaskInput } from '../types/task';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [loading, setLoading] = useState<boolean>(true);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleTask = useCallback(
    async (id: number, completed?: boolean | number) => {
      try {
        await repositoryToggleTaskComplete(id, completed);
        await loadTasks();
      } catch (error) {
        console.error('Error toggling task:', error);
      }
    },
    [loadTasks]
  );

  const removeTask = useCallback(
    async (id: number) => {
      try {
        await repositoryDeleteTask(id);
        await loadTasks();
      } catch (error) {
        console.error('Error removing task:', error);
      }
    },
    [loadTasks]
  );

  const addTask = useCallback(
    async (input: CreateTaskInput) => {
      try {
        const newTask = await repositoryCreateTask(input);
        await loadTasks();
        return newTask;
      } catch (error) {
        console.error('Error adding task:', error);
        throw error;
      }
    },
    [loadTasks]
  );

  const updateTask = useCallback(
    async (input: UpdateTaskInput) => {
      try {
        const updated = await repositoryUpdateTask(input);
        await loadTasks();
        return updated;
      } catch (error) {
        console.error('Error updating task:', error);
        throw error;
      }
    },
    [loadTasks]
  );

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [loadTasks])
  );

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'pending':
        return tasks.filter((t) => t.completed === 0);
      case 'completed':
        return tasks.filter((t) => t.completed === 1);
      case 'all':
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const counters = useMemo(() => {
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
    deleteTask: removeTask,
    addTask,
    createTask: addTask,
    updateTask,
    counters,
    totalCount: counters.total,
    pendingCount: counters.pending,
    completedCount: counters.completed,
  };
}

export default useTasks;
