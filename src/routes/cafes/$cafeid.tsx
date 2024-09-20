import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cafes/$cafeid')({
  component: Cafe,
})


export default function Cafe() {
  const { cafeid } = Route.useParams()

  return <div>CafeId: {cafeid}</div>
}
