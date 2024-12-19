import { ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import { environment } from '../environments/environment';
import { ComponentProps, FC, PropsWithChildren, ReactNode, useContext } from 'react';
import { ConfigContext, useConfig } from './config';
import { ApolloProviderProps } from '@apollo/client/react/context';

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