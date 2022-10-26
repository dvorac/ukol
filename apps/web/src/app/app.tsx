import styled from 'styled-components';
import apollo from './apollo';
import { Home } from './home';
import { ApolloProvider } from '@apollo/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const StyledApp = styled.div`
  // Your style here
`;

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={apollo}>
        <StyledApp>
          <Home thing={undefined} />
        </StyledApp>
      </ApolloProvider>
    </QueryClientProvider>
  );
}

export default App;
