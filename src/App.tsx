import Alert from './components/Alert';
import './App.scss';
import Todos from './components/Todos';
import { QueryClient, QueryClientProvider } from 'react-query';
import Loading from './components/Loading';

const App = (): JSX.Element => {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Loading />
      <Alert />
      <Todos />
    </QueryClientProvider>
  );
}

export default App;
