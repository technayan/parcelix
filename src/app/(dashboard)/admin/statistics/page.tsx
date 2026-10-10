import OverallStatistics from "@/components/modules/stats/overall-stats";

export default function StatisticsPage() {
  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Overall Statistics
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Get a quick overview of Parcelix performance.
        </p>
      </div>

      <OverallStatistics />
    </main>
  );
}
