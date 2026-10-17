import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function CtaSection() {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto w-[min(1160px,calc(100%-32px))]">
        <div className="relative flex flex-col items-start justify-between gap-7 overflow-hidden rounded-[26px] bg-linear-[120deg] from-slate-900 to-slate-800 px-6 py-9 text-white sm:px-10 sm:py-12 lg:flex-row lg:items-center">
          <div className="pointer-events-none absolute -right-10 -top-36 size-64 rounded-full border border-white/25 shadow-[0_0_0_25px_#ffffff0d,0_0_0_55px_#ffffff0a]" />
          <div className="relative z-10">
            <h2 className="max-w-xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Ready to send something on its way?
            </h2>
            <p className="mt-3 text-base leading-7 text-orange-50">
              Create a shipment, request for pickup, and follow the journey with
              Parcelix.
            </p>
          </div>
          <Link
            className="relative z-10 inline-flex h-12 shrink-0 items-center gap-2 rounded-md bg-primary px-5 font-medium text-white transition hover:bg-orange-600 hover:-translate-y-0.5"
            href="/shipment"
          >
            Get started with Parcelix <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
