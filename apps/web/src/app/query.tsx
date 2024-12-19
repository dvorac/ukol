import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, PropsWithChildren } from "react";

export interface QueryProviderProps {
  client?: QueryClient;
}

export const Query: FC<PropsWithChildren<QueryProviderProps>> = ({ children, ...props }) => {
  const client = props.client ?? new QueryClient();

  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  );
}