import CoverageList from "@/components/modules/coverage/coverage-list";
import { CtaSection } from "@/components/sections/cta-section";
import { ArrowRight, MapPin, Package, ShieldCheck } from "lucide-react";
import Link from "next/link";

const deliverySteps = [
  {
    number: "01",
    title: "Find your zone",
    description:
      "Find out your area and check whether it falls within an active Parcelix zone.",
  },
  {
    number: "02",
    title: "Locate a hub",
    description:
      "See the available hub or hubs associated with your selected zone.",
  },
  {
    number: "03",
    title: "Send your parcel",
    description:
      "Create your shipment and follow the available delivery workflow.",
  },
];

export default function ZonesHubsPage() {
  return (
    <>
      {/* Coverage cards */}
      <section
        id="coverage-directory"
        className="px-5 py-20 sm:px-8 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-orange-500">
              Coverage directory
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Find your area.
              <br className="hidden sm:block" /> Find your hub.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
              Explore the active coverage information available in Parcelix.
            </p>
          </div>

          <CoverageList />
        </div>
      </section>

      {/* How coverage works */}
      <section className="bg-[#0F172A] px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-orange-400">
              Simple from the start
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              From your area to your doorstep.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              A straightforward way to explore coverage before sending your next
              parcel.
            </p>
          </div>

          <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            <div className="absolute left-[17%] right-[17%] top-6 hidden h-px bg-orange-500/40 lg:block" />

            {deliverySteps.map((step) => {
              return (
                <article
                  key={step.number}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-sm font-black shadow-[0_0_0_7px_#0F172A]">
                    {step.number}
                  </div>

                  <h3 className="mt-4 text-base font-extrabold">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-slate-400">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Helpful coverage information */}
      <section
        id="coverage-help"
        className="px-5 py-20 sm:px-8 lg:px-10 lg:py-24"
      >
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-orange-500">
              Before you ship
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              A little clarity goes a long way.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
              Coverage zones and hubs help you understand the areas listed in
              the Parcelix network. Check your destination and shipment options
              before scheduling a pickup.
            </p>

            <Link
              href="/services"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 duration-300"
            >
              Explore delivery services <ArrowRight size={16} />
            </Link>
          </div>

          <div className="space-y-4">
            <article className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#121C2E] sm:p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500 dark:bg-orange-500/10">
                <MapPin size={21} />
              </div>
              <div>
                <h3 className="text-sm font-extrabold">
                  Check the specific area
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  A zone may list multiple neighborhoods. Search the zone and
                  review the associated hub information before creating your
                  shipment.
                </p>
              </div>
            </article>

            <article className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#121C2E] sm:p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500 dark:bg-orange-500/10">
                <ShieldCheck size={21} />
              </div>
              <div>
                <h3 className="text-sm font-extrabold">
                  Look for active zones and hubs
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  This directory displays active zones and active hubs from the
                  provided data. Actual shipment availability should be
                  confirmed by the shipment workflow.
                </p>
              </div>
            </article>

            <article className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#121C2E] sm:p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500 dark:bg-orange-500/10">
                <Package size={21} />
              </div>
              <div>
                <h3 className="text-sm font-extrabold">
                  Ready to send your parcel?
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Continue to shipment creation to enter parcel details and
                  select from the available shipping options.
                </p>
                <Link
                  href="/shipment"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 duration-300"
                >
                  Create a shipment <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection />
    </>
  );
}
