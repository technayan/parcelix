"use client";

import { Button } from "@/components/ui/button";
import { useGetPricings } from "@/hooks";
import { formatCurrency } from "@/utils/formatCurrency";
import { ArrowRight, Check, MapPin, RefreshCw, Truck } from "lucide-react";

export default function PricingCard() {
  const { data: response, isPending, isError, refetch } = useGetPricings();

  if (isPending) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="animate-pulse rounded-2xl border border-slate-200 bg-slate-50 p-7 dark:border-slate-800 dark:bg-[#121C2E]"
          >
            <div className="h-5 w-36 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="mt-6 h-12 w-44 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="mt-6 h-20 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="mt-6 h-10 rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        ))}
      </div>
    );
  }

  if (isError || !response?.success) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border p-8 text-center">
        <p className="text-sm text-muted-foreground">
          Unable to load pricing information.
        </p>
        <Button variant="outline" onClick={() => refetch()}>
          <RefreshCw className="mr-2 size-4" />
          Try Agains
        </Button>
      </div>
    );
  }

  const outsidePricing = response.data[0];
  const insidePricing = response.data[1];

  return (
    <div>
      <div className="grid items-stretch gap-6 md:grid-cols-2">
        {[
          {
            pricing: insidePricing,
            description:
              "For shipments delivered within the Dhaka service area.",
            icon: MapPin,
            featured: false,
          },
          {
            pricing: outsidePricing,
            description: "For shipments going beyond the Dhaka service area.",
            icon: Truck,
            featured: true,
          },
        ].map(({ pricing, description, icon: Icon, featured }) => (
          <article
            key={pricing.id}
            className={`relative flex flex-col overflow-hidden rounded-xl border p-7 transition hover:-translate-y-1 hover:shadow-xl sm:p-9 ${
              featured
                ? "border-orange-300 bg-white shadow-lg shadow-orange-500/5 dark:border-orange-500/40 dark:bg-[#121C2E]"
                : "border-slate-200 bg-white dark:border-slate-800 dark:bg-[#121C2E]"
            }`}
          >
            {featured && (
              <span className="absolute right-5 top-5 rounded-full bg-orange-500 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-wider text-white">
                Outside Dhaka
              </span>
            )}

            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-orange-50 text-orange-500 dark:bg-orange-500/10">
              <Icon size={23} />
            </div>

            <h3 className="mt-5 text-xl font-extrabold tracking-tight">
              {pricing.name}
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
              {description}
            </p>

            <div className="mt-7 border-b border-slate-100 pb-7 dark:border-slate-800">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Starting at
              </p>
              <p className="mt-2 text-4xl font-bold tracking-tight">
                {formatCurrency(Number(pricing.base))}
              </p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                for the first kilogram
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <Check size={12} />
                </span>
                <div>
                  <p className="text-sm font-bold">
                    {formatCurrency(Number(pricing.base))} base rate
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Includes parcels weighing up to 1 kg.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <Check size={12} />
                </span>
                <div>
                  <p className="text-sm font-bold">
                    +{formatCurrency(Number(pricing.additionalPerKg))} per
                    additional kg
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Each started kilogram above the first is charged at this
                    rate.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <Check size={12} />
                </span>
                <div>
                  <p className="text-sm font-bold">Instant price estimate</p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Use the calculator below to estimate your cost.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="#price-calculator"
              className={`mt-8 h-10 inline-flex w-full items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition ${
                featured
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : "border border-slate-200 bg-white hover:border-orange-300 hover:text-primary dark:border-slate-700 dark:bg-[#0F172A]"
              }`}
            >
              Calculate delivery fee <ArrowRight size={15} />
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
