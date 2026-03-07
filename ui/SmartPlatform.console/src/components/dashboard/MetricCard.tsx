import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Props {
  title: string
  value: string | number
}

export function MetricCard({ title, value }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-gray-500">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="text-3xl font-bold">
          {value}
        </div>
      </CardContent>
    </Card>
  )
}