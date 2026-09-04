// app/api/todos/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getTasks } from '@/lib/tasks';
import { todosService } from '@/services/todoService';
import { ApiResponse } from '@/Types/api-todo';

/**
 * GET /api/todos
 * Query params: ?limit=10&skip=0
 * Mengambil daftar todos dari DummyJSON API
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();
  const searchParams = request.nextUrl.searchParams;
  const limitParam = searchParams.get('limit');
  const skipParam = searchParams.get('skip');

  const limit = limitParam ? parseInt(limitParam, 10) : 10;
  const skip = skipParam ? parseInt(skipParam, 10) : 0;

  try {
    const result = await getTasks({ limit, skip });
    const latencyMs = Date.now() - startTime;

    const responsePayload: ApiResponse<{
      tasks: typeof result.tasks;
      total: number;
      limit: number;
      skip: number;
      latency: string;
      sourceEndpoint: string;
    }> = {
      success: true,
      message: 'Koneksi ke DummyJSON API berhasil! Data berhasil diambil.',
      count: result.tasks.length,
      total: result.total,
      data: {
        ...result,
        latency: `${latencyMs}ms`,
        sourceEndpoint: 'https://dummyjson.com/todos',
      },
      timestamp: new Date().toISOString(),
    };
    return NextResponse.json(responsePayload, { status: 200 });
  } catch (error) {
    const latencyMs = Date.now() - startTime;
    console.error('[API Route /api/todos] Error:', error);

    const errorPayload: ApiResponse<{ latency: string }> = {
      success: false,
      message: 'Gagal terhubung ke DummyJSON API.',
      error: (error as Error).message || 'Internal Server Error',
      timestamp: new Date().toISOString(),
      data: {
        latency: `${latencyMs}ms`,
      },
    };
    return NextResponse.json(errorPayload, { status: 500 });
  }
}

/**
 * POST /api/todos
 * Body: { todo: string, completed?: boolean, userId?: number }
 * Membuat todo baru melalui DummyJSON API (simulasi)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validasi: field 'todo' wajib diisi
    if (!body.todo || typeof body.todo !== 'string') {
      return NextResponse.json(
        {
          success: false,
          message: 'Field "todo" wajib diisi dengan string.',
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    const newTodo = await todosService.createTodo({
      todo: body.todo,
      completed: Boolean(body.completed),
      userId: Number(body.userId) || 1,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Berhasil membuat todo baru melalui DummyJSON API (Simulasi)!',
        data: newTodo,
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[API Route /api/todos] POST Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Gagal membuat todo di DummyJSON API.',
        error: (error as Error).message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}