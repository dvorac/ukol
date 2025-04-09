import { createFileRoute } from '@tanstack/react-router'
import { Priorities } from '../../app/priority/priorities'

export const Route = createFileRoute('/manage/priorities')({
  component: Priorities,
})
