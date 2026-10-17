import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export function VisibilitySection() {
  const features = [
    "Shipment status timeline from pickup to delivery",
    "Clear tracking IDs and shipment details",
    "Delivery exceptions and return workflows",
  ];
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto grid w-[min(1160px,calc(100%-32px))] items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="order-2 min-h-80 rounded-3xl bg-[#0F172A] p-6 text-slate-50 sm:p-8 lg:order-1">
          <h3 className="text-2xl font-extrabold">Shipment overview</h3>
          <p className="mb-6 mt-2 text-sm leading-7 text-slate-400">
            A clear, at-a-glance view of a parcel&apos;s journey.
          </p>
          <div className="mb-3 rounded-2xl border border-white/10 bg-[#1c2940] p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-bold">
              <span>Shipment TRK-7H6MXUR6-PFTHZW5U</span>
              <span className="text-orange-300">In transit</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-300">
              <i className="size-2 rounded-full bg-primary" />
              <span>Dhaka Hub</span>
              <span className="h-px flex-1 border-t border-dashed border-slate-500" />
              <i className="size-2 rounded-full bg-primary" />
              <span>Chattogram</span>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#1c2940] p-4">
            <div className="flex items-center justify-between gap-2 text-sm font-bold">
              <span>Pickup confirmed</span>
              <span className="text-slate-400">09:30 AM</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-300">
              <i className="size-2 rounded-full bg-primary" />
              <span>Courier assigned</span>
              <span className="h-px flex-1 border-t border-dashed border-slate-500" />
              <i className="size-2 rounded-full bg-primary" />
              <span>Parcel collected</span>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <p className="text-xs font-extrabold uppercase tracking-[1.5px] text-primary">
            Visibility, built in
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            Know where it is.
            <br />
            Know what happens next.
          </h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            No guessing, no confusing handoffs. A useful tracking timeline gives
            customers a clearer experience and helps operations teams spot
            delays earlier.
          </p>
          <div className="my-6 grid gap-3">
            {features.map((item) => (
              <div
                className="flex items-start gap-3 text-[15px] font-semibold"
                key={item}
              >
                <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-orange-500/10 text-primary">
                  <Check size={15} />
                </span>
                {item}
              </div>
            ))}
          </div>
          <Link
            className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-5 font-medium text-white transition hover:bg-orange-600 hover:-translate-y-0.5"
            href="/tracking"
          >
            Try shipment tracking <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
