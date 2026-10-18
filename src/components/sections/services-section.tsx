import { ArrowUpRight, Building2, House, Package } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: House,
    title: "Doorstep Pickup",
    copy: "Request for pickup after payment. Our courier network gets your parcel moving without the extra trip.",
    link: "Request pickup",
    href: "/dashboard/shipments",
  },
  {
    icon: Package,
    title: "Parcel Delivery",
    copy: "Local and nationwide delivery with clear shipment statuses from collection through final handoff.",
    link: "Explore coverage",
    href: "/coverage",
  },
  {
    icon: Building2,
    title: "Business Shipping",
    copy: "Keep orders organized with shipment management, delivery visibility, and a workflow that can scale.",
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
          {services.map(({ icon: Icon, title, copy, link, href }) => (
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
              <Link
                className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 duration-300"
                href={href}
              >
                {link}
                <ArrowUpRight size={15} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
