import { Card, CardContent } from "@/components/ui/card";

export function SummaryCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <Card className="p-4">
      <CardContent className="flex flex-row justify-center items-center">
        <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
          {icon}
        </div>
        <div>
          <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
          <p className="text-sm text-slate-500">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
}
