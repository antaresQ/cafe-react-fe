import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cafe')({
  component: () => <div>Hello /cafe!</div>,
})
