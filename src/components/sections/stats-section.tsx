const stats = [
  ["24", "/7", "Shipment visibility"],
  ["3", "+", "Clear user roles"],
  ["1", " place", "To manage the journey"],
  ["100", "%", "Workflow focused"],
];

export function StatsSection() {
  return (
    <section className="border-y border-orange-500/15 bg-orange-500/6 py-9">
      <div className="mx-auto grid w-[min(1160px,calc(100%-32px))] grid-cols-2 gap-7 text-center lg:grid-cols-4">
        {stats.map(([number, suffix, label]) => (
          <div key={label}>
            <strong className="block text-3xl font-extrabold tracking-tight sm:text-4xl">
              {number}
              <span className="text-primary">{suffix}</span>
            </strong>
            <span className="text-sm text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
