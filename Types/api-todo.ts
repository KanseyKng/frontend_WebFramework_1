

/**
 * Struktur data Todo dari API DummyJSON
 * Properti: id, todo (judul), completed, userId
 */
export interface ApiTodo {
  id: number;
  todo: string;        // judul tugas dari API
  completed: boolean;
  userId: number;
}

/**
 * Struktur respons dari endpoint GET /todos
 */
export interface TodosApiResponse {
  todos: ApiTodo[];
  total: number;
  skip: number;
  limit: number;
}

/**
 * Model internal untuk TaskItem yang digunakan di aplikasi
 * Menggunakan `title` (bukan `todo`) dan menambahkan `source`
 */
export interface TaskItem {
  id: number;
  title: string;       // sama dengan ApiTodo.todo
  completed: boolean;
  userId: number;
  source: 'dummyjson-api';  // menandakan sumber data
}

/**
 * Generic response wrapper untuk API
 * Digunakan untuk membungkus response dari server dengan format standar
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  count?: number;
  total?: number;
  timestamp: string;
  error?: string;
}

/**
 * Utility type untuk mengkonversi ApiTodo → TaskItem
 */
export function toTaskItem(apiTodo: ApiTodo): TaskItem {
  return {
    id: apiTodo.id,
    title: apiTodo.todo,
    completed: apiTodo.completed,
    userId: apiTodo.userId,
    source: 'dummyjson-api',
  };
}

/**
 * Utility type untuk mengkonversi array ApiTodo → TaskItem[]
 */
export function toTaskItems(apiTodos: ApiTodo[]): TaskItem[] {
  return apiTodos.map(toTaskItem);
}