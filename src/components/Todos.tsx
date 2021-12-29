import { PlusSmIcon as PlusSmIconOutline } from '@heroicons/react/outline';
import { ChangeEvent, useEffect, useState } from 'react';
import useStore from '../hooks/hookStore';
import { Todo } from '../entities/Todo';
import { useUtils } from '../hooks/hookUtils';
import { classNames } from '../utils/utils';
import TodoItem from './TodoItem';
import { useCustomMutation, useCustomQuery } from '../hooks/hookCustomQuery';
import { addNewTodo, getTodos } from '../services/services';
import { IResponseGet, IResponsePostPutDelete } from '../interfaces/components';

const Todos = (): JSX.Element => {

  const { todos, setTodos, setUi } = useStore();
  const [todo, setTodo] = useState<string>('')
  const [showError, setShowError] = useState<boolean>(false)
  const queryGetTodos = useCustomQuery<IResponseGet<Todo>>('getTodos', getTodos, {
    onSuccess: ({ data }) => setTodos(data),
  });
  const useMutation = useCustomMutation<IResponsePostPutDelete<Todo>, Partial<Todo>>('addNewTodo', addNewTodo);

  const addTodo = () => {
    if(!!todo){
      setUi({ loading: true })
      useMutation.mutate({
        description: todo
      }, {
        onSuccess: (data) => {
          if(data.success){
            const itemsMapped = [...todos, new Todo(data.data._id, data.data.description)]
            setTodos(itemsMapped)
            setTodo('')
            setShowError(true)
            setUi({ loading: false })
          }
        }
      })
    }
  }

  useUtils(addTodo)

  const handleTodo = (todo: ChangeEvent<HTMLInputElement>) => {
    setTodo(todo.target.value)
  }

  useEffect(() => {
    setShowError(false)
    if(queryGetTodos.isSuccess) {
      setUi({ loading: false })
    }
  }, [todo, queryGetTodos.isSuccess])

  return (
    <div className="bg-gray-100 py-8 h-screen">
      <div className="max-w-xl mx-auto px-4">
        <div className="flex mb-4 gap-2">
          <div className="mt-1 relative flex items-center w-full">
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
            <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
              <kbd className="inline-flex items-center border border-gray-200 rounded-full px-3 text-sm font-sans font-medium text-gray-400 bg-white text-xl">
                ↵
              </kbd>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-gray-300 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 border border-gray-100"
            onClick={addTodo}
          >
            <PlusSmIconOutline className="h-6 w-6" aria-hidden="true"/>
          </button>
        </div>
        <ul role="list" className="divide-y divide-gray-200 space-y-3">
          {todos.length ? todos.map((item) => (
            <TodoItem todoItem={item} key={item._id} />
          )) : ''}
        </ul>
      </div>
    </div>
  );
}

export default Todos;
