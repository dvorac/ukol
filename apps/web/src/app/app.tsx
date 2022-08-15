import styled from 'styled-components';
import apollo from './apollo';
import { Home } from './home';
import { ApolloProvider } from '@apollo/client';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <ApolloProvider client={apollo}>
      <StyledApp>
        <Home />
      </StyledApp>
    </ApolloProvider>
  );
}

export default App;
