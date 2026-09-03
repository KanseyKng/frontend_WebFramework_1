// services/api.ts
export const API_BASE_URL = 'https://dummyjson.com';

export class ApiError extends Error {
  status: number;
  statusText: string;

  constructor(message: string, status: number, statusText: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
  }
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // Pastikan endpoint diawali dengan '/' jika belum
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${normalizedEndpoint}`;

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      next: { revalidate: 60 }, // cache revalidation untuk Next.js
    });

    if (!response.ok) {
      throw new ApiError(
        `HTTP Error: Gagal memuat data dari ${endpoint} (${response.status}) ${response.statusText}`,
        response.status,
        response.statusText
      );
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error(
      `Network Error: Tidak dapat terhubung ke server API (${(error as Error).message})`
    );
  }
}