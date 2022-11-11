import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema'
import { render } from '@testing-library/react';
import { addMocksToSchema } from '@graphql-tools/mock'
import { typedefs } from '@ukol/graphql'
import { buildASTSchema } from 'graphql/utilities';
import { Home } from './home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const testRender = (
  component: React.ReactElement,
  { mocks }: any = {},
) => {
  const schema = buildASTSchema(typedefs);

  const mockSchema = addMocksToSchema({
    schema,
    mocks: mocks
  });

  const client = new ApolloClient({
    link: new SchemaLink({ schema: mockSchema }),
    cache: new InMemoryCache()
  });

  const qClient = new QueryClient();

  return render(
    <QueryClientProvider client={qClient}>
      <ApolloProvider client={client}>
        {component}
      </ApolloProvider>
    </QueryClientProvider>
  )
}

describe('App', () => {

  it('should render successfully', () => {
    const component = testRender(<Home />, { mocks: {
      Person: () => ({ uuid: "1234", name: "Todd" })
    }});

    expect(component.baseElement).toBeTruthy();
  });
});
