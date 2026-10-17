import { ArrowRight, Check, House, Package, Play } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20" id="home">
      <div className="mx-auto grid w-[min(1160px,calc(100%-32px))] items-center gap-10 lg:grid-cols-[1.04fr_.96fr]">
        <div>
          <div className="inline-flex items-center gap-2.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold tracking-wide uppercase text-primary">
            <span className="size-2 rounded-full bg-primary shadow-[0_0_0_4px_#f9731625]" />{" "}
            Smarter delivery starts here
          </div>
          <h1 className="mt-6 text-[clamp(46px,5.4vw,70px)] font-extrabold leading-[1.04] tracking-[-3px]">
            Deliver smarter.
            <br />
            <span className="text-primary">Move faster.</span>
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-8 text-muted-foreground sm:text-lg">
            Parcelix brings shipments, couriers, hubs, payments, and real-time
            tracking together in one powerful logistics platform.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-5 font-medium text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600"
              href="/shipment"
            >
              Create a Shipment <ArrowRight size={17} />
            </Link>
            <Link
              className="inline-flex h-12 items-center gap-2 rounded-md border border-border bg-card px-5 font-medium transition hover:bg-muted"
              href="#how"
            >
              <Play size={15} /> See how it works
            </Link>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Check className="size-3.5 text-emerald-500" />
              Real-time tracking
            </span>

            <span className="flex items-center gap-1.5">
              <Check className="size-3.5 text-emerald-500" />
              Secure payments
            </span>

            <span className="flex items-center gap-1.5">
              <Check className="size-3.5 text-emerald-500" />
              Courier management
            </span>
          </div>
        </div>
        <div className="relative mx-auto grid min-h-87.5 w-full max-w-127.5 place-items-center sm:min-h-105">
          <div className="relative h-85 w-full overflow-hidden rounded-[28px] border border-white/10 bg-[#0F172A] shadow-2xl shadow-slate-900/20 sm:h-101.25">
            <div className="absolute inset-0 bg-[linear-gradient(#ffffff0a_1px,transparent_1px),linear-gradient(90deg,#ffffff0a_1px,transparent_1px)] bg-size-[34px_34px]" />
            <div className="absolute left-1/2 top-10 size-67.5 -translate-x-1/2 rounded-full border border-dashed border-white/20 sm:top-11 sm:size-77.5" />
            <div className="absolute left-1/2 top-17 size-55 -translate-x-1/2 rounded-full border border-white/10 sm:top-17.5 sm:size-67.5" />
            <div className="absolute left-[22%] top-[20%] h-[56%] w-[55%] rotate-[8deg] rounded-tr-[90px] border-r-[3px] border-t-[3px] border-dashed border-primary/90" />
            <span className="absolute left-[13%] top-[20%] grid size-10 place-items-center rounded-xl bg-primary text-white shadow-lg shadow-orange-500/40">
              <House size={18} />
            </span>
            <span className="absolute right-[13%] top-[49%] grid size-10 place-items-center rounded-xl bg-slate-50 text-slate-900">
              <Check size={19} />
            </span>
            <span className="absolute left-[8%] top-[33%] text-[10px] font-bold tracking-[1.4px] text-slate-300">
              PICKUP POINT
            </span>
            <span className="absolute right-[5%] top-[62%] text-[10px] font-bold tracking-[1.4px] text-slate-300">
              DESTINATION
            </span>
            <div className="absolute left-1/2 top-[48%] h-36.25 w-37.5 -translate-x-1/2 -translate-y-1/2 -rotate-6 drop-shadow-2xl">
              <div className="absolute inset-x-0 top-0 h-11 bg-orange-300 [clip-path:polygon(50%_0,100%_26%,50%_100%,0_26%)]" />
              <div className="absolute left-0 top-9.5 h-25 w-1/2 bg-primary [clip-path:polygon(0_0,100%_25%,100%_100%,0_70%)]" />
              <div className="absolute right-0 top-9.5 h-25 w-1/2 bg-orange-700 [clip-path:polygon(0_25%,100%_0,100%_70%,0_100%)]" />
              <div className="absolute left-[44%] top-2 h-30.5 w-5.5 bg-orange-200/80 [clip-path:polygon(0_0,100%_25%,100%_100%,0_77%)]" />
            </div>
            <div className="absolute right-3 top-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-xl sm:-right-3 sm:top-7">
              <small className="block text-[11px] text-slate-500">
                <span className="mr-1.5 inline-block size-2 rounded-full bg-primary" />{" "}
                LIVE STATUS
              </small>
              <strong className="text-sm">On the move</strong>
            </div>
            <div className="absolute bottom-4 left-3 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-xl sm:bottom-5 sm:-left-4">
              <span className="grid size-9 place-items-center rounded-xl bg-orange-50 text-primary">
                <Package size={18} />
              </span>
              <span>
                <small className="block text-[10px] text-slate-500">
                  DELIVERY EXPERIENCE
                </small>
                <strong className="text-sm">Care at every step</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
