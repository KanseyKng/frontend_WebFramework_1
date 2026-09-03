'use client';

import React from 'react';
import Link from 'next/link';
import { Todo } from '@/Types/todo';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete?: (id: number) => void;
};

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li
      className={`p-4 rounded-xl border flex items-center justify-between gap-3 transition-all duration-200 ${
        todo.completed
          ? 'bg-green-50 border-green-200'
          : 'bg-white border-gray-200 hover:border-blue-400'
      }`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <input
          id={`todo-${todo.id}`}
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
        />
        <label htmlFor={`todo-${todo.id}`} className="flex-1 cursor-pointer">
          <span
            className={`text-base font-medium truncate transition-all ${
              todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
            }`}
          >
            {todo.title}
          </span>
        </label>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Link
          href={`/task/${todo.id}`}
          className="text-xs font-semibold px-2.5 py-1.5 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
        >
          Detail →
        </Link>
        {onDelete && (
          <button
            onClick={() => onDelete(todo.id)}
            className="px-2.5 py-1.5 bg-red-600 text-white text-xs rounded-md hover:bg-red-700 transition-colors"
          >
            Hapus
          </button>
        )}
      </div>
    </li>
  );
}