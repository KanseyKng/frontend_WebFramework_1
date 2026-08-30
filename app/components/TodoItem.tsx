'use client';

import React from 'react';
import Link from 'next/link'; // <-- TAMBAHKAN IMPOR INI
import { Todo } from '@/Types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle?: (id: number) => void;
}

export default function TodoItem({ todo, onToggle }: TodoItemProps) {
  const handleToggle = () => {
    if (onToggle) {
      onToggle(todo.id);
    }
  };

  return (
    <li
      className={`p-4 rounded-md border flex items-center justify-between gap-3 transition-colors ${
        todo.completed
          ? 'bg-green-50 border-green-200'
          : 'bg-gray-50 border-gray-200'
      }`}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="w-5 h-5 rounded text-blue-600 cursor-pointer"
        />
        <span
          className={`text-lg ${
            todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
          }`}
        >
          {todo.title}
        </span>
      </div>

      {/* 👇 TAMBAHKAN LINK "Detail" DI SINI */}
      <Link
        href={`/task/${todo.id}`}
        className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline shrink-0"
      >
        Detail
      </Link>
    </li>
  );
}