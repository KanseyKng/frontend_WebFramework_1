// lib/tasks.ts
import { todosService, FetchTodosParams } from '@/services/todoService';
import { ApiTodo, TaskItem } from '@/Types/api-todo';

/**
 * Mengonversi data dari API (ApiTodo) ke format internal (TaskItem)
 * Mapping: raw.todo -> title
 */
export function formatApiTodoToTask(raw: ApiTodo): TaskItem {
  return {
    id: raw.id,
    title: raw.todo, // Mapping properti 'todo' -> 'title'
    completed: raw.completed,
    userId: raw.userId,
    source: 'dummyjson-api',
  };
}

/**
 * Mengambil daftar tugas dari API dengan parameter pagination
 * @param params - { limit, skip } untuk pagination
 * @returns Promise<{ tasks: TaskItem[]; total: number; limit: number; skip: number }>
 */
export async function getTasks(params?: FetchTodosParams): Promise<{
  tasks: TaskItem[];
  total: number;
  limit: number;
  skip: number;
}> {
  try {
    const response = await todosService.fetchTodos(params);
    const tasks = response.todos.map(formatApiTodoToTask);

    return {
      tasks,
      total: response.total,
      limit: response.limit,
      skip: response.skip,
    };
  } catch (error) {
    console.error('[lib/tasks.ts] Error mengambil tasks dari API:', error);
    throw error;
  }
}

/**
 * Mengambil detail satu tugas berdasarkan ID
 * @param id - ID tugas (number atau string)
 * @returns Promise<TaskItem | null> - mengembalikan null jika tidak ditemukan
 */
export async function getTaskById(id: number | string): Promise<TaskItem | null> {
  try {
    const raw = await todosService.fetchTodoById(id);
    return formatApiTodoToTask(raw);
  } catch (error) {
    console.error(`[lib/tasks.ts] Error mengambil task ID ${id}:`, error);
    return null;
  }
}

/**
 * Menghitung statistik dari daftar tugas
 * @param tasks - Array TaskItem
 * @returns { total, completed, pending, completionPercentage }
 */
export function getTasksStats(tasks: TaskItem[]) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    total,
    completed,
    pending,
    completionPercentage,
  };
}