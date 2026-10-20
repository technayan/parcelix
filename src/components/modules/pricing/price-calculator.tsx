"use client";

import { Button } from "@/components/ui/button";
import { useGetPricings } from "@/hooks";
import type { IPricing } from "@/types/pricing.type";
import { calculatorSchema } from "@/validation/price-calculator.validation";
import { useForm } from "@tanstack/react-form";
import { ArrowRight, Check, MapPin, Package, RefreshCw } from "lucide-react";
import Link from "next/link";
import type z from "zod";

type CalculatorValues = z.infer<typeof calculatorSchema>;

const defaultValues: CalculatorValues = {
  area: "inside",
  weight: 1,
};

function calculatePrice(pricing: IPricing, weight: number): number {
  const base = Number(pricing.base);
  const additionalPerKg = Number(pricing.additionalPerKg);

  if (
    !Number.isFinite(base) ||
    !Number.isFinite(additionalPerKg) ||
    base < 0 ||
    additionalPerKg < 0
  ) {
    return 0;
  }

  // The first kilogram is included.
  // Every started kilogram above 1 kg is charged as an additional kg.
  const additionalKg = Math.max(0, Math.ceil(weight - 1));

  return base + additionalKg * additionalPerKg;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
  }).format(amount);
}

export default function PriceCalculator() {
  const form = useForm({
    defaultValues,
    validators: {
      onChange: calculatorSchema,
    },
    onSubmit: async ({ value }) => {
      // This form is a live estimator; no API submission is needed.
      calculatorSchema.parse(value);
    },
  });

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
    <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/3 dark:border-slate-800 dark:bg-[#121C2E] lg:grid-cols-[1.05fr_0.95fr]">
      {/* Form */}
      <div className="p-6 sm:p-9 lg:p-10">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-orange-50 text-orange-500 dark:bg-orange-500/10">
            <Package size={22} />
          </div>
          <div>
            <h3 className="text-lg font-extrabold">Calculate your rate</h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              All fields update your estimate automatically.
            </p>
          </div>
        </div>

        <form
          className="mt-8 space-y-7"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <form.Field
            name="area"
            validators={{
              onChange: ({ value }) => {
                const result = calculatorSchema.shape.area.safeParse(value);
                return result.success
                  ? undefined
                  : result.error.issues[0]?.message;
              },
            }}
          >
            {(field) => (
              <fieldset>
                <legend className="text-sm font-bold">
                  Where are you sending your parcel?
                </legend>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      value: "inside" as const,
                      title: "Inside Dhaka",
                      description: "Local delivery",
                      pricing: insidePricing,
                    },
                    {
                      value: "outside" as const,
                      title: "Outside Dhaka",
                      description: "Outside the Dhaka area",
                      pricing: outsidePricing,
                    },
                  ].map((option) => {
                    const selected = field.state.value === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => field.handleChange(option.value)}
                        className={`rounded-lg border p-4 text-left transition ${
                          selected
                            ? "border-orange-400 bg-orange-50 ring-2 ring-orange-500/10 dark:border-orange-500 dark:bg-orange-500/10"
                            : "border-slate-200 bg-white hover:border-orange-200 dark:border-slate-700 dark:bg-[#0F172A]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span
                            className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                              selected
                                ? "bg-orange-500 text-white"
                                : "bg-slate-100 text-slate-500 dark:bg-slate-800"
                            }`}
                          >
                            <MapPin size={17} />
                          </span>
                          {selected && (
                            <Check size={17} className="text-orange-500" />
                          )}
                        </div>

                        <p className="mt-4 text-sm font-extrabold">
                          {option.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          {option.description}
                        </p>
                        <p className="mt-3 text-sm font-black text-orange-600 dark:text-orange-400">
                          {option.pricing
                            ? formatCurrency(Number(option.pricing.base))
                            : "Rate unavailable"}
                          <span className="ml-1 text-[10px] font-medium text-slate-500">
                            / first kg
                          </span>
                        </p>
                      </button>
                    );
                  })}
                </div>

                {field.state.meta.errors.length > 0 && (
                  <p className="mt-2 text-xs text-red-500">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
              </fieldset>
            )}
          </form.Field>

          <form.Field
            name="weight"
            validators={{
              onChange: ({ value }) => {
                const result = calculatorSchema.shape.weight.safeParse(value);
                return result.success
                  ? undefined
                  : result.error.issues[0]?.message;
              },
            }}
          >
            {(field) => (
              <div>
                <div className="flex items-center justify-between gap-3">
                  <label htmlFor={field.name} className="text-sm font-bold">
                    Parcel weight
                  </label>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Kilograms (kg)
                  </span>
                </div>

                <div className="relative mt-3">
                  <input
                    id={field.name}
                    name={field.name}
                    type="number"
                    min="0.1"
                    max="100"
                    step="0.1"
                    inputMode="decimal"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => {
                      const raw = event.target.value;
                      field.handleChange(
                        raw === "" ? (Number.NaN as number) : Number(raw),
                      );
                    }}
                    aria-invalid={!field.state.meta.isValid}
                    className="h-14 w-full rounded-md border border-slate-200 bg-slate-50 px-4 pr-16 text-lg font-bold outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 dark:border-slate-700 dark:bg-[#0F172A]"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                    kg
                  </span>
                </div>

                {field.state.meta.errors.length > 0 && (
                  <p className="mt-2 text-xs text-red-500">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}

                <div className="mt-3 flex flex-wrap gap-2">
                  {[0.5, 1, 2, 3, 5, 10].map((weight) => (
                    <button
                      key={weight}
                      type="button"
                      onClick={() => field.handleChange(weight)}
                      className={`rounded-md cursor-pointer border px-3 py-2 text-xs font-bold transition ${
                        field.state.value === weight
                          ? "border-orange-400 bg-orange-50 text-orange-600 dark:border-orange-500 dark:bg-orange-500/10 dark:text-orange-400"
                          : "border-slate-200 text-slate-500 hover:border-orange-300 dark:border-slate-700 dark:text-slate-400"
                      }`}
                    >
                      {weight} kg
                    </button>
                  ))}
                </div>
              </div>
            )}
          </form.Field>
        </form>
      </div>

      {/* Live result */}
      <div className="relative flex flex-col justify-between overflow-hidden bg-[#0F172A] p-6 text-white sm:p-9 lg:p-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-slate-400">
              Estimated delivery fee
            </p>
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1.5 text-[10px] font-bold text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Live estimate
            </span>
          </div>

          <form.Subscribe
            selector={(state) => ({
              area: state.values.area,
              weight: state.values.weight,
              isValid: state.isValid,
            })}
          >
            {(values) => {
              const selectedPricing =
                values.area === "inside" ? insidePricing : outsidePricing;

              const valid =
                values.isValid &&
                Number.isFinite(values.weight) &&
                values.weight >= 0.1 &&
                values.weight <= 100 &&
                Boolean(selectedPricing) &&
                Number.isFinite(Number(selectedPricing?.base)) &&
                Number.isFinite(Number(selectedPricing?.additionalPerKg));

              const estimate =
                valid && selectedPricing
                  ? calculatePrice(selectedPricing, values.weight)
                  : null;

              const additionalKg = valid
                ? Math.max(0, Math.ceil(values.weight - 1))
                : 0;

              return (
                <>
                  <div className="mt-8">
                    <p className="text-sm text-slate-400">
                      {values.area === "inside"
                        ? "Inside Dhaka"
                        : "Outside Dhaka"}
                      {valid ? ` · ${values.weight} kg` : ""}
                    </p>

                    <p className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-6xl">
                      {estimate === null ? "—" : formatCurrency(estimate)}
                    </p>
                    <p className="mt-3 text-xs text-slate-400">
                      {valid
                        ? "Estimated price based on the current rate table."
                        : "Enter a valid weight to calculate your price."}
                    </p>
                  </div>

                  <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-slate-400">
                        Base rate (first kg)
                      </span>
                      <span className="font-bold">
                        {valid && selectedPricing
                          ? formatCurrency(Number(selectedPricing.base))
                          : "—"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-slate-400">Additional weight</span>
                      <span className="font-bold">
                        {valid && selectedPricing
                          ? `${additionalKg} kg × ${formatCurrency(Number(selectedPricing.additionalPerKg))}`
                          : "—"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4">
                      <span className="text-sm font-bold">Estimated total</span>
                      <span className="text-lg font-black text-orange-400">
                        {estimate === null ? "—" : formatCurrency(estimate)}
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/shipment"
                    className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md px-4 h-10 text-sm font-medium transition ${
                      valid
                        ? "bg-orange-500 text-white hover:bg-orange-600"
                        : "pointer-events-none bg-slate-700 text-slate-400"
                    }`}
                    aria-disabled={!valid}
                    tabIndex={valid ? 0 : -1}
                  >
                    Continue to shipment <ArrowRight size={16} />
                  </Link>
                </>
              );
            }}
          </form.Subscribe>
        </div>
      </div>
    </div>
  );
}
