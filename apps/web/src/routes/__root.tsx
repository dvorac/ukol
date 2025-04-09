import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import App from '../app/app'

export const Route = createRootRoute({
  component: () => (
    <>
      <App>
        <Outlet />
      </App>
      <TanStackRouterDevtools />
    </>
  ),
})
