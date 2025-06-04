import Link from 'next/link'
import { deleteTodo, getTodoById, toggleComplete } from "@/app/actions"
import { redirect } from 'next/navigation'

type Props = {
  params: Promise<{ id: string }>
}

async function handleDelete(id: string) {
  "use server"
  await deleteTodo(id)
  redirect("/todos")
}

const page = async ({ params }: Props) => {
  const { id } = await params
  const todo = await getTodoById(id)

  if (!todo) return (<>To Do not found!</>)

  return (
    <div>
      <h1>ID: {todo._id}</h1>
      <h3>Task: {todo.task}</h3>
      <h4>Completed: {todo.completed ? "Yes" : "No"}</h4>

      <div className='flex gap-2 mx-2'>
        <form action={toggleComplete.bind(null, todo._id)}>
          <button className='cursor-pointer'>{todo.completed ? "✅" : "⬜️"}</button>
        </form>

        <form action={handleDelete.bind(null, todo._id)}>
          <button className='cursor-pointer'>🗑️</button>
        </form>
      </div>

      <Link href="/todos" className="underline">Back to To Do List</Link>
    </div>
  )
}

export default page