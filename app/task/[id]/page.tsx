import React from 'react';
import { getTodoDetail } from '@/lib/todos';
import TaskNotFound from './components/TaskNotFound';
import TaskDetailCard from './components/TaskDetailCard';

type DetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TodoDetailPage({ params }: DetailPageProps) {
  const { id } = await params;
  console.log('ID dari params:', id);
  const todo = await getTodoDetail(id);
  console.log('Todo ditemukan:', todo);

  if (!todo) {
    return <TaskNotFound id={id} />;
  }

  return <TaskDetailCard todo={todo} />;
}