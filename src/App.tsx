import Modal from './components/Modal';
import useStore from './hooks/hookStore';
import './App.scss';
import Todos from './components/Todos';

const App = (): JSX.Element => {

  const { todos, setTodos, selectedTodo } = useStore();

  const onRemoveConfirmation = () => {
    const itemsMapped = todos.filter(i => i.id !== selectedTodo)
    setTodos(itemsMapped)
  }

  return (
    <>
      <Modal onOkAction={onRemoveConfirmation} />
      <Todos />
    </>
  );
}

export default App;
