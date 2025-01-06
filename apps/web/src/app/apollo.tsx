import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { FC, PropsWithChildren } from 'react';
import { useConfig } from './config';

export interface ApolloComponentProps {
  client?: ApolloClient<any>;
}

export const Apollo: FC<PropsWithChildren<ApolloComponentProps>> = ({ children, ...props }) => {
  const { client } = props;
  const config = useConfig();

  const apollo = new ApolloClient({
    uri: config?.GQL,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client ?? apollo}>
      {children}
    </ApolloProvider>
  );
}