'use server'; // will run on server

import { connectDB } from '@/lib/mongodb';
import { revalidatePath } from 'next/cache';
import { Todo } from '@/models/Todo';

export async function getTodos() {
  await connectDB();

  const todos = await Todo.find();
  return todos.map((todo) => ({
    _id: todo._id.toString(),
    task: todo.task,
    completed: todo.completed,
  }));
}

export async function getTodoById(id: string) {
  await connectDB();

  const todo = await Todo.findById(id);
  if (!todo) return;

  return {
    _id: todo._id.toString(),
    task: todo.task,
    completed: todo.completed,
  };
}

export async function addTodo(formData: FormData) {
  const task = formData.get('task') as string;

  await connectDB(); // connect to the db
  await Todo.create({ task }); // create new document in mongodb

  revalidatePath('/todos'); // force clear cache of todos
  //redirect("/thank-you") // if you want to redirect them
}

export async function toggleComplete(id: string) {
  await connectDB();

  const todo = await Todo.findById(id);
  if (!todo) return;

  todo.completed = !todo.completed;
  await todo.save();

  revalidatePath('/todos');
}

export async function deleteTodo(id: string) {
  await connectDB();
  await Todo.findByIdAndDelete(id);
  revalidatePath('/todos');
}
