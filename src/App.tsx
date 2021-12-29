import Modal from './components/Modal';
import useStore from './hooks/hookStore';
import './App.scss';
import Todos from './components/Todos';
import { QueryClient, QueryClientProvider } from 'react-query';

const App = (): JSX.Element => {

  const { todos, setTodos, selectedTodo } = useStore();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const onRemoveConfirmation = () => {
    const itemsMapped = todos.filter(i => i._id !== selectedTodo)
    setTodos(itemsMapped)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Modal onOkAction={onRemoveConfirmation} />
      <Todos />
    </QueryClientProvider>
  );
}

export default App;
