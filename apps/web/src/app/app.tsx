import { PropsWithChildren } from 'react';
import { Apollo } from './apollo';
import { ConfigProvider } from './config';
import { Query } from './query';

export const App: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Query>
      <ConfigProvider>
        <Apollo>
          {children}
        </Apollo>
      </ConfigProvider>
    </Query>
  );
}

export default App;
