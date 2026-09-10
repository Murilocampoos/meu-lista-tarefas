import { getDatabase } from './database';
import { Task, CreateTaskInput, UpdateTaskInput } from '../types/task';

export async function getTasks(): Promise<Task[]> {
  const db = await getDatabase();
  const tasks = await db.getAllAsync<Task>(
    'SELECT * FROM tasks ORDER BY createdAt DESC;'
  );
  return tasks;
}

export async function getTaskById(id: number): Promise<Task | null> {
  const db = await getDatabase();
  const task = await db.getFirstAsync<Task>(
    'SELECT * FROM tasks WHERE id = ?;',
    [id]
  );
  return task ?? null;
}

export async function createTask(input: CreateTaskInput): Promise<Task> {
  const db = await getDatabase();
  const createdAt = new Date().toISOString();
  const result = await db.runAsync(
    'INSERT INTO tasks (title, description, completed, createdAt) VALUES (?, ?, 0, ?);',
    [input.title, input.description ?? null, createdAt]
  );

  return {
    id: result.lastInsertRowId,
    title: input.title,
    description: input.description ?? null,
    completed: 0,
    createdAt,
  };
}

export async function updateTask(input: UpdateTaskInput): Promise<Task | null> {
  const db = await getDatabase();
  await db.runAsync(
    'UPDATE tasks SET title = ?, description = ? WHERE id = ?;',
    [input.title, input.description ?? null, input.id]
  );
  return getTaskById(input.id);
}

export async function toggleTaskComplete(
  id: number,
  completed?: boolean | number
): Promise<void> {
  const db = await getDatabase();
  let nextCompleted: number;

  if (typeof completed === 'boolean') {
    nextCompleted = completed ? 1 : 0;
  } else if (typeof completed === 'number') {
    nextCompleted = completed > 0 ? 1 : 0;
  } else {
    const current = await getTaskById(id);
    nextCompleted = current?.completed ? 0 : 1;
  }

  await db.runAsync(
    'UPDATE tasks SET completed = ? WHERE id = ?;',
    [nextCompleted, id]
  );
}

export async function deleteTask(id: number): Promise<void> {
  const db = await getDatabase();
  await db.runAsync('DELETE FROM tasks WHERE id = ?;', [id]);
}
