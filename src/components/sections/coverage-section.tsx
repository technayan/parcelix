import { Check, House } from "lucide-react";

const areas = [
  "Dhaka",
  "Chattogram",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Nationwide network",
];

export function CoverageSection() {
  return (
    <section className="py-16 sm:py-20" id="coverage">
      <div className="mx-auto grid w-[min(1160px,calc(100%-32px))] items-center gap-9 lg:grid-cols-[.9fr_1.1fr] lg:gap-12">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[1.5px] text-primary">
            Connected delivery
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            From your neighborhood to the next destination.
          </h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            Designed for hub-based logistics: connect zones, coordinate
            transfers, and keep every parcel moving through a consistent
            delivery workflow.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {areas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-border bg-card px-3.5 py-2 text-sm font-bold"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
        <div className="relative grid min-h-75 place-items-center overflow-hidden rounded-3xl bg-[#0F172A] sm:min-h-82.5">
          <div className="absolute inset-[-15%] opacity-40 [background:repeating-linear-gradient(25deg,transparent_0_36px,#ffffff16_37px_39px,transparent_40px_70px),repeating-linear-gradient(115deg,transparent_0_48px,#ffffff13_49px_51px,transparent_52px_90px)]" />
          <div className="relative h-44 w-[70%] rotate-3 rounded-tr-[100px] border-r-[3px] border-t-[3px] border-dashed border-primary" />
          <span className="absolute left-[14%] top-[24%] grid size-10 place-items-center rounded-xl bg-primary text-white shadow-lg">
            <House size={18} />
          </span>
          <span className="absolute bottom-[20%] right-[12%] grid size-10 place-items-center rounded-xl bg-slate-50 text-slate-900 shadow-lg">
            <Check size={18} />
          </span>
          <span className="absolute bottom-5 left-5 text-xs tracking-wide text-slate-300">
            HUB-TO-HUB ROUTING · CONCEPT VISUAL
          </span>
        </div>
      </div>
    </section>
  );
}
