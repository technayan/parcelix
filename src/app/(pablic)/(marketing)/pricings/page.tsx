import PriceCalculator from "@/components/modules/pricing/price-calculator";
import PricingCard from "@/components/modules/pricing/pricing-card";
import { CtaSection } from "@/components/sections/cta-section";
import { Package, ShieldCheck, Wallet } from "lucide-react";

export default function page() {
  return (
    <>
      {/* Price Card Section */}
      <section id="pricing-plans" className="py-16 sm:py-20">
        <div className="mx-auto w-[min(1160px,calc(100%-32px))]">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-orange-500">
              Delivery rates
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Two simple pricing plans.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
              Your delivery rate depends on the destination area and parcel
              weight. Choose the relevant rate below.
            </p>
          </div>

          <PricingCard />
        </div>
      </section>

      {/* Price Calculator Section */}
      <section
        id="price-calculator"
        className="px-5 py-20 sm:px-8 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-orange-500">
              Live price calculator
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Your delivery cost, in seconds.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
              Select your delivery area and enter the parcel weight. The
              estimate updates instantly as you change the form.
            </p>
          </div>

          <PriceCalculator />
        </div>
      </section>

      {/* Pricing information Section */}
      <section className="border-y border-slate-100 bg-white px-5 py-16 dark:border-slate-800 dark:bg-[#0D1526] sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          {[
            {
              icon: Wallet,
              title: "Transparent rates",
              description:
                "See the base rate and additional weight charge before you start your shipment.",
            },
            {
              icon: Package,
              title: "Weight-based pricing",
              description:
                "Your estimate is calculated from the selected area and parcel weight.",
            },
            {
              icon: ShieldCheck,
              title: "Clear expectations",
              description:
                "Use the calculator as a guide, then review the final amount during shipment creation.",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-orange-50 text-orange-500 dark:bg-orange-500/10">
                  <Icon size={21} />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection />
    </>
  );
}
