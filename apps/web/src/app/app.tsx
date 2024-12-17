import { environment } from '../environments/environment';
import apollo from './apollo';
import { Home } from './home/home';
import { ApolloProvider } from '@apollo/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const App = () => {

  const env = Object.entries(environment).map(([k, v]) => ({ k, v }));

  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={apollo}>
        <Home/>
        <ul>
          { env.map(e => (
            <li key={e.k}>{e.k}: {e.v}</li>
          ))}
        </ul>
      </ApolloProvider>
    </QueryClientProvider>
  );
}

export default App;
