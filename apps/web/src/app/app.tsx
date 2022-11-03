import apollo from './apollo';
import { Home } from './home';
import { ApolloProvider } from '@apollo/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={apollo}>
        <Home/>
      </ApolloProvider>
    </QueryClientProvider>
  );
}

export default App;
