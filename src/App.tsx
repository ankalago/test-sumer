import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'
import { PlusSmIcon as PlusSmIconOutline } from '@heroicons/react/outline'
import { XIcon as XIconSolid } from '@heroicons/react/solid'
import './App.scss';
import Modal from './Modal';

export class Todo {
  id: number;
  name: string;
  status: boolean;

  constructor(id: number, name: string, status: boolean = false) {
    this.id = id;
    this.name = name;
    this.status = status;
  }
}

export const KEYS = {
  DIGIT: 'Digit',
  BACKSPACE: 'Backspace',
  ENTER: 'Enter',
};

const App = (): JSX.Element => {

  const [selectedTodo, setSelectedTodo] = useState<Todo>()
  const [modal, setModal] = useState<boolean>(false)
  const [todo, setTodo] = useState<string>('')
  const [showError, setShowError] = useState<boolean>(false)
  const [itemsTodo, setItemsTodo] = useState<Todo[]>([])

  const toggleStatus = (id: number, status: boolean) => {
    const itemsMapped = itemsTodo.map((i => ({ ...i, status: i.id === id ? status : i.status })))
    setItemsTodo(itemsMapped)
  }

  const addTodo = () => {
    const maxId = itemsTodo.length ? Math.max(...itemsTodo.map(i => i.id)) : 1
    !!todo && setItemsTodo(items => [...items, new Todo(maxId + 1, todo)])
    setTodo('')
    setShowError(true)
  }

  const removeTodo = (id: number) => {
    const todoSelected = itemsTodo.find(i => i.id === id)
    setSelectedTodo(todoSelected)
    setModal(true)
  }

  const onRemoveConfirmation = () => {
    const itemsMapped = itemsTodo.filter(i => i.id !== selectedTodo?.id)
    setItemsTodo(itemsMapped)
    setModal(false)
  }

  const onCancelConformation = () => {
    setModal(false)
  }

  const handleTodo = (todo: ChangeEvent<HTMLInputElement>) => {
    setTodo(todo.target.value)
  }

  const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ')
  }

  const handleKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === KEYS.ENTER) {
        addTodo()
      }
    },
    [addTodo]
  );

  useEffect(() => {
    setShowError(false)
  }, [todo])

  useEffect(() => {
    document.addEventListener('keyup', handleKey);
    return () => {
      document.removeEventListener('keyup', handleKey);
    };
  }, [handleKey]);

  return (
    <>
      <Modal isOpen={modal} onOkAction={onRemoveConfirmation} onCancelAction={onCancelConformation}/>
      <div className="bg-gray-100 py-8 h-screen">
        <div className="max-w-xl mx-auto px-4">
          <div className="flex mb-4 gap-2">
            <input
              type="text"
              name="name"
              id="name"
              className={classNames(
                showError && !todo ? 'border-rose-500' : 'border-gray-100',
                "border shadow-sm focus:ring-indigo-500 focus:border-blue-400 block w-full sm:text-sm border-blue-300 p-3 rounded-full"
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
            {itemsTodo.map((item) => (
              <li key={item.id}
                  className="bg-white shadow overflow-hidden rounded-md px-6 py-4 flex justify-between gap-2">
                <div className="flex items-center">
                  <Switch
                    checked={item.status}
                    onChange={(checked) => toggleStatus(item.id, checked)}
                    className={classNames(
                      item.status ? 'bg-green-400' : 'bg-gray-200',
                      'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                    )}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      className={classNames(
                        item.status ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                      )}
                    >
                    <span
                      className={classNames(
                        item.status ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200',
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
                        item.status ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100',
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
                  item.status ? 'line-through text-green-400' : '',
                  "flex items-center w-full text-gray-500"
                )}>{item.name}</div>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-gray-200 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={() => removeTodo(item.id)}
                  >
                    <XIconSolid className="h-3 w-3" aria-hidden="true"/>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
