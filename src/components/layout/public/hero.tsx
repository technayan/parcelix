"use client";

import HeroImage from "@/../public/assets/hero-img.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden mt-16">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="container mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-12 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-8">
        {/* Left Content */}
        <div>
          {/* Eyebrow */}
          <Badge
            variant="outline"
            className="rounded-full border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-600 dark:border-orange-900/50 dark:bg-orange-950/30 dark:text-orange-400"
          >
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Built for modern delivery teams
          </Badge>

          {/* Heading */}
          <h1 className="mt-6 max-w-3xl text-5xl font-extrabold leading-[1.02] tracking-[-0.04em] text-slate-900 sm:text-6xl lg:text-7xl dark:text-slate-50">
            Deliver smarter.
            <br />
            <span className="text-orange-500">Move faster.</span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-400">
            Parcelix brings shipments, couriers, hubs, payments, and real-time
            tracking together in one powerful logistics platform.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shipment" className="">
              <Button
                size="lg"
                className="bg-secondary px-5 flex items-center text-white hover:bg-primary duration-300"
              >
                Create a shipment
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>

          {/* Highlights */}
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
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

        <div className="hidden w-full justify-center md:flex lg:justify-end">
          <Image src={HeroImage} alt="Delivery" width={500} height={500} />
        </div>
      </div>
    </section>
  );
}
