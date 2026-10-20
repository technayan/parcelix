import { ChartNoAxesCombined, ClipboardList, ShieldCheck } from "lucide-react";
import ArticleBox from "../shared/article-box";

const items = [
  {
    icon: ClipboardList,
    title: "One shipment workspace",
    description:
      "Keep parcel information, assignment, delivery status, invoice, and exceptions organized in one flow.",
    link: "See the shipments",
    href: "/dashboard/shipments",
  },
  {
    icon: ShieldCheck,
    title: "Operational control",
    description:
      "Support role-based access for customers, couriers, and administrators without cluttering the experience.",
    link: "Access you dashboard",
    href: "/dashboard",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Clear delivery records",
    description:
      "Track shipment progress and keep useful records for follow-ups, reports, and service improvements.",
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
          {items.map(({ icon: Icon, title, description, link, href }) => (
            <ArticleBox
              key={title}
              title={title}
              Icon={Icon}
              description={description}
              href={href}
              link={link}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
