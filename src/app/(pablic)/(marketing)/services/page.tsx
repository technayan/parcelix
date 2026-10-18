import { CtaSection } from "@/components/sections/cta-section";
import { ProcessSection } from "@/components/sections/process-section";
import { StatsSection } from "@/components/sections/stats-section";
import { VisibilitySection } from "@/components/sections/visibility-section";
import ArticleBox from "@/components/shared/article-box";
import {
  CalendarClock,
  Package,
  Route,
  ShieldCheck,
  Warehouse,
  Zap,
} from "lucide-react";

const services = [
  {
    icon: Package,
    title: "Parcel Delivery",
    description:
      "Send everyday parcels with clear shipment details and status updates from pickup to final delivery.",
    href: "/shipment",
    link: "Create a shipment",
  },
  {
    icon: CalendarClock,
    title: "Doorstep Pickup",
    description:
      "Request a convenient pickup and let your parcel start its journey right from your doorstep.",
    href: "/dashboard/shipments",
    link: "Request a pickup",
  },
  {
    icon: Zap,
    title: "Express Delivery",
    description:
      "Keep time-sensitive critical shipments moving efficiently through an organized delivery workflow.",
    href: "/shipment",
    link: "Send a parcel",
  },
  {
    icon: Warehouse,
    title: "Business Shipping",
    description:
      "Manage all customer orders, shipment details, and delivery records seamlessly as your business grows.",
    href: "/shipment",
    link: "Ship with Parcelix",
  },
  {
    icon: Route,
    title: "Shipment Tracking",
    description:
      "Easily follow your parcel through pickup, hub transfers, transit, and the final delivery stages.",
    href: "/tracking",
    link: "Track a shipment",
  },
  {
    icon: ShieldCheck,
    title: "Delivery Management",
    description:
      "Keep delivery progress, shipment exceptions, and important records organized in one place.",
    href: "/dashboard/shipments",
    link: "Explore shipments",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Services */}
      <section className="py-16 sm:py-20">
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
              From a single package to daily business orders, Parcelix makes
              every delivery feel manageable.
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

      {/* Process */}
      <ProcessSection />

      {/* Tracking visibility */}
      <VisibilitySection />

      {/* Statistics */}
      <StatsSection />

      {/* Final CTA */}
      <CtaSection />
    </>
  );
}
