import OverallStatistics from "@/components/modules/stats/overall-stats";

export default function StatisticsPage() {
  return (
    <section className="p-5">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Overall Statistics
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Get a quick overview of Parcelix performance.
          </p>
        </div>

        <OverallStatistics />
      </div>
    </section>
  );
}
