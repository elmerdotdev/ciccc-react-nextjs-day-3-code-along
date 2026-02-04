export const revalidate = 120;

import { connectDB } from '@/lib/mongodb';
import { Todo } from '@/models/Todo';
import { NextResponse } from 'next/server';

// Get All Todos
export async function GET() {
  await connectDB();

  const todos = await Todo.find();
  return NextResponse.json(
    todos.map((todo) => ({
      _id: todo._id.toString(),
      task: todo.task,
      completed: todo.completed,
    })),
  );
}

// Add Todo
export async function POST(req: Request) {
  const { task } = await req.json();
  if (!task)
    return NextResponse.json(
      {
        error: 'Missing task',
      },
      {
        status: 400,
      },
    );

  await connectDB();
  const todo = await Todo.create({ task });

  return NextResponse.json(todo);
}
