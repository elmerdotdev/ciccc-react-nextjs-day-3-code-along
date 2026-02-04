import Link from 'next/link';
import { getTodos, addTodo, toggleComplete, deleteTodo } from '../actions';

const page = async () => {
  const todos = await getTodos();

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>To Dos</h1>

      <form action={addTodo} className="flex flex-col gap-1 my-2">
        <input
          type="text"
          name="task"
          className="bg-white text-black p-1"
          placeholder="Enter task..."
          required
        />
        <button className="bg-blue-500 hover:bg-blue-400 transition-colors px-2 cursor-pointer rounded-sm shadow-sm">
          Add Task
        </button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo._id}
            className={`flex gap-3 my-1 ${todo.completed ? 'line-through' : ''}`}
          >
            <form action={toggleComplete.bind(null, todo._id)}>
              <button className="cursor-pointer">
                {todo.completed ? '✅' : '⬜️'}
              </button>
            </form>

            <Link
              href={`/todos/${todo._id}`}
              className="hover:text-blue-400 transition-colors"
            >
              {todo.task}
            </Link>

            <form action={deleteTodo.bind(null, todo._id)}>
              <button className="cursor-pointer">❌</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default page;
