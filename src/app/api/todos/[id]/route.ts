import { connectDB } from '@/lib/mongodb';
import { Todo } from '@/models/Todo';
import { NextResponse } from 'next/server';

// Get Todo by ID
export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();

  const { id } = await params;
  const todo = await Todo.findById(id);
  if (!todo)
    return NextResponse.json(
      {
        error: 'Todo not found!',
      },
      {
        status: 404,
      },
    );

  return NextResponse.json(todo);
}

// Update Todo by ID
export async function PUT(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();

  const { id } = await params;
  const todo = await Todo.findById(id);
  if (!todo)
    return NextResponse.json(
      {
        error: 'Todo not found!',
      },
      {
        status: 404,
      },
    );
  todo.completed = !todo.completed;
  await todo.save();

  return NextResponse.json(todo);
}

// Delete Todo by ID
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();

  const { id } = await params;
  await Todo.findByIdAndDelete(id);
  return NextResponse.json({
    success: true,
  });
}
