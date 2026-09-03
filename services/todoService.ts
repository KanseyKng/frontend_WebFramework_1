// services/todos.ts
import { apiClient } from '@/services/api';
import { ApiTodo, TodosApiResponse } from '@/Types/api-todo';

export interface FetchTodosParams {
  limit?: number;
  skip?: number;
}

export interface CreateTodoInput {
  todo: string;
  completed: boolean;
  userId: number;
}

export const todosService = {
  /**
   * Mengambil daftar todos dari API
   * @param params - { limit, skip } untuk pagination
   * @returns Promise<TodosApiResponse>
   */
  async fetchTodos(params: FetchTodosParams = { limit: 15, skip: 0 }): Promise<TodosApiResponse> {
    const { limit = 15, skip = 0 } = params;
    return apiClient<TodosApiResponse>(`/todos?limit=${limit}&skip=${skip}`);
  },

  /**
   * Mengambil detail satu todo berdasarkan ID
   * @param id - ID todo (number atau string)
   * @returns Promise<ApiTodo>
   */
  async fetchTodoById(id: number | string): Promise<ApiTodo> {
    return apiClient<ApiTodo>(`/todos/${id}`);
  },

  /**
   * Membuat todo baru
   * @param payload - { todo, completed, userId }
   * @returns Promise<ApiTodo>
   */
  async createTodo(payload: CreateTodoInput): Promise<ApiTodo> {
    return apiClient<ApiTodo>(`/todos/add`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  /**
   * Mengupdate status completed dari todo
   * @param id - ID todo
   * @param completed - status baru (true/false)
   * @returns Promise<ApiTodo>
   */
  async updateTodoStatus(id: number | string, completed: boolean): Promise<ApiTodo> {
    return apiClient<ApiTodo>(`/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ completed }),
    });
  },

  /**
   * Menghapus todo berdasarkan ID
   * @param id - ID todo
   * @returns Promise<{ id, isDeleted, deletedOn }>
   */
  async deleteTodo(id: number | string): Promise<{ id: number; isDeleted: boolean; deletedOn: string }> {
    return apiClient<{ id: number; isDeleted: boolean; deletedOn: string }>(`/todos/${id}`, {
      method: 'DELETE',
    });
  },
};