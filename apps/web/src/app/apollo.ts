import { ApolloClient, InMemoryCache} from '@apollo/client';
import { environment } from '../environments/environment';

const apollo = new ApolloClient({
  uri: environment.api,
  cache: new InMemoryCache(),
});

export default apollo;