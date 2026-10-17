import ZoneHubList from "@/components/modules/zone-hub/zone-hub-list";

export default function ZonesHubsPage() {
  return (
    <main className="p-4 sm:p-6 lg:p-8 mt-16">
      <section className="space-y-6">
        <div className="container mx-auto  px-4 py-4 lg:px-8 max-w-7xl">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Zones & Hubs
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Explore delivery zones and the hubs serving each area.
          </p>
          <ZoneHubList />
        </div>
      </section>
    </main>
  );
}
