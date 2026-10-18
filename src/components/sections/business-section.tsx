import {
  ArrowUpRight,
  ChartNoAxesCombined,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";

const items = [
  {
    icon: ClipboardList,
    title: "One shipment workspace",
    copy: "Keep parcel information, assignment, delivery status, invoice, and exceptions organized in one flow.",
    link: "See the shipments",
    href: "/dashboard/shipments",
  },
  {
    icon: ShieldCheck,
    title: "Operational control",
    copy: "Support role-based access for customers, couriers, and administrators without cluttering the experience.",
    link: "Access you dashboard",
    href: "/dashboard",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Clear delivery records",
    copy: "Track shipment progress and keep useful records for follow-ups, reports, and service improvements.",
    link: "Shipment records",
    href: "/dashboard/shipments",
  },
];

export function BusinessSection() {
  return (
    <section className="py-16 sm:py-20" id="business">
      <div className="mx-auto w-[min(1160px,calc(100%-32px))]">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[1.5px] text-primary">
            Made for growing teams
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            Less delivery admin.
            <br />
            More room to grow.
          </h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            A practical foundation for merchants and operations teams that need
            repeatable shipping workflows.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {items.map(({ icon: Icon, title, copy, link, href }) => (
            <article
              className="rounded-xl border border-border bg-card p-6 transition duration-200 hover:-translate-y-1 hover:border-orange-500/50"
              key={title}
            >
              <div className="mb-5 grid size-12 place-items-center rounded-md bg-orange-500/10 text-primary">
                <Icon size={24} />
              </div>
              <h3 className="text-lg font-extrabold">{title}</h3>
              <p className="mb-5 mt-2 text-[15px] leading-7 text-muted-foreground">
                {copy}
              </p>
              <a
                className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 duration-300"
                href={href}
              >
                {link}
                <ArrowUpRight size={15} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
