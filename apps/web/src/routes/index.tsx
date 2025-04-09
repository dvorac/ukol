import { createFileRoute } from '@tanstack/react-router'
import { Home } from '../app/home/home'

export const Route = createFileRoute('/')({
  component: Home,
})
