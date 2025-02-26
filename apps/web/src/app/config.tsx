import { useQuery } from '@tanstack/react-query';
import { createContext, FC, PropsWithChildren, useContext } from 'react';
import { environment } from '../environments/environment';

export interface Config {
  API: string;
  GQL: string;
}

export const ConfigContext = createContext<Config | null>(null);

export interface ConfigProviderProps {
  unused?: string;
}

export const useConfig = () => useContext(ConfigContext);

export const ConfigProvider: FC<PropsWithChildren<ConfigProviderProps>> = ({ children, ...props }) => {

  const { error, data, isFetching } = useQuery<Config>({
    queryKey: ['config'],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await fetch(environment.config);
      return await response.json();
    }
  });

  if (isFetching) {
    return <div>Loading config...</div>
  }

  if (error) {
    return <div>Failed to load config!</div>
  }

  return (
    <ConfigContext.Provider value={data || null}>
      {children}
      <ul>
        { Object.entries(data ?? {}).map(([k, v]) => (
          <li key={k}>{k}: {v}</li>
        ))
        }
      </ul>
    </ConfigContext.Provider>
  )
}