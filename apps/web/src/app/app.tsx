
import { Apollo } from './apollo';
import { ConfigProvider } from './config';
import { Home } from './home/home';
import { Query } from './query';


export const App = () => {
  return (
    <Query>
      <ConfigProvider>
        <Apollo>
          <Home/>
        </Apollo>
      </ConfigProvider>
    </Query>
  );
}

export default App;
