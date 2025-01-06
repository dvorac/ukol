import { useQuery } from '@tanstack/react-query';
import { createContext, FC, PropsWithChildren, useContext } from 'react';

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

  const getConfig = async () => {
    const response = await fetch(`${window.location.origin}/config`);
    return await response.json();
  }

  const { error, data, isFetching } = useQuery<Config>({
    queryKey: ['config'],
    queryFn: getConfig
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