import { ApolloClient, InMemoryCache} from '@apollo/client';
import { environment } from '../environments/environment';

const apollo = new ApolloClient({
  uri: environment.graphql,
  cache: new InMemoryCache(),
});

export default apollo;