import { Building2, House, Package } from "lucide-react";
import ArticleBox from "../shared/article-box";

const services = [
  {
    icon: House,
    title: "Doorstep Pickup",
    description:
      "Request for pickup after payment. Our courier network gets your parcel moving without the extra trip.",
    link: "Request pickup",
    href: "/dashboard/shipments",
  },
  {
    icon: Package,
    title: "Parcel Delivery",
    description:
      "Local and nationwide delivery with clear shipment statuses from collection through final handoff.",
    link: "Explore coverage",
    href: "/coverage",
  },
  {
    icon: Building2,
    title: "Business Shipping",
    description:
      "Keep orders organized with shipment management, delivery visibility, and a workflow that can scale.",
    link: "Ship with Parcelix",
    href: "/shipment",
  },
];

export function ServicesSection() {
  return (
    <section className="py-16 sm:py-20" id="services">
      <div className="mx-auto w-[min(1160px,calc(100%-32px))]">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[1.5px] text-primary">
            What we deliver
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            Logistics that moves
            <br className="hidden sm:block" /> at your pace.
          </h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            From a single package to daily business orders, Parcelix makes every
            delivery feel manageable.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {services.map(({ icon: Icon, title, description, link, href }) => (
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
