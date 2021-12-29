import { Switch } from '@headlessui/react';
import { XIcon as XIconSolid } from '@heroicons/react/solid';
import useStore from '../hooks/hookStore';
import { classNames } from '../utils/utils';
import { IResponse, ITodoItem } from '../interfaces/components';
import { updateTodo } from '../services/services';
import { useCustomMutation } from '../hooks/hookCustomQuery';
import { Todo } from '../entities/Todo';

const TodoItem = ({ todoItem }: ITodoItem): JSX.Element => {

  const { todos, setTodos, setUi, setSelectedTodo } = useStore();
  const userMutation = useCustomMutation<IResponse<Todo>, Partial<Todo>>('updateComplete', updateTodo);

  const toggleStatus = (id: number, status: boolean) => {
    userMutation.mutate({
      _id: id,
      completed: status
    }, {
      onSuccess: (data) => {
        if (data.success) {
          const itemsMapped = todos.map((i => ({ ...i, completed: i._id === id ? status : i.completed })))
          setTodos(itemsMapped)
        }
      }
    })
  }

  const removeTodo = (id: number) => {
    const todoSelected = todos.find(i => i._id === id)
    setSelectedTodo(todoSelected?._id ?? 0)
    setUi({ modal: { show: true } })
  }

  return (
    <li className="bg-white shadow overflow-hidden rounded-md px-6 py-4 flex justify-between gap-2">
      <div className="flex items-center">
        <Switch
          checked={todoItem.completed}
          onChange={(checked) => toggleStatus(todoItem._id, checked)}
          className={classNames(
            todoItem.completed ? 'bg-green-400' : 'bg-gray-200',
            'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
          )}
        >
          <span className="sr-only">Use setting</span>
          <span
            className={classNames(
              todoItem.completed ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
            )}
          >
                    <span
                      className={classNames(
                        todoItem.completed ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200',
                        'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
                      )}
                      aria-hidden="true"
                    >
                      <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                        <path
                          d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span
                      className={classNames(
                        todoItem.completed ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100',
                        'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
                      )}
                      aria-hidden="true"
                    >
                      <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 12 12">
                        <path
                          d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"/>
                      </svg>
                    </span>
                  </span>
        </Switch>
      </div>
      <div className={classNames(
        todoItem.completed ? 'line-through text-green-400' : 'text-gray-500',
        "flex items-center w-full transition-all"
      )}>{todoItem.description}</div>
      <div className="flex items-center">
        <button
          type="button"
          className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-gray-200 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          onClick={() => removeTodo(todoItem._id)}
        >
          <XIconSolid className="h-3 w-3" aria-hidden="true"/>
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
