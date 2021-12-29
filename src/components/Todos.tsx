import { PlusSmIcon as PlusSmIconOutline } from '@heroicons/react/outline';
import { ChangeEvent, useEffect, useState } from 'react';
import useStore from '../hooks/hookStore';
import { Todo } from '../entities/Todo';
import { useUtils } from '../hooks/hookUtils';
import { classNames } from '../utils/utils';
import TodoItem from './TodoItem';

const Todos = (): JSX.Element => {

  const { todos, setTodos } = useStore();
  const [todo, setTodo] = useState<string>('')
  const [showError, setShowError] = useState<boolean>(false)

  const addTodo = () => {
    const maxId = todos.length ? Math.max(...todos.map(i => i.id)) : 1
    const itemsMapped = [...todos, new Todo(maxId + 1, todo)]
    !!todo && setTodos(itemsMapped)
    setTodo('')
    setShowError(true)
  }

  useUtils(addTodo)

  const handleTodo = (todo: ChangeEvent<HTMLInputElement>) => {
    setTodo(todo.target.value)
  }

  useEffect(() => {
    setShowError(false)
  }, [todo])

  return (
    <div className="bg-gray-100 py-8 h-screen">
      <div className="max-w-xl mx-auto px-4">
        <div className="flex mb-4 gap-2">
          <input
            type="text"
            name="name"
            id="name"
            className={classNames(
              showError && !todo ? 'border-rose-500' : 'border-gray-100',
              "border-2 shadow-sm focus:ring-indigo-500 focus:border-blue-400 block w-full sm:text-sm p-3 rounded-full"
            )}
            placeholder="todo"
            onChange={(e) => handleTodo(e)}
            value={todo}
          />
          <button
            type="button"
            className="inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-gray-300 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 border border-gray-100"
            onClick={addTodo}
          >
            <PlusSmIconOutline className="h-6 w-6" aria-hidden="true"/>
          </button>
        </div>
        <ul role="list" className="divide-y divide-gray-200 space-y-3">
          {todos.map((item) => (
            <TodoItem todoItem={item} key={item.id} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todos;
