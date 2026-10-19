"use client";

import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  ChevronDown,
  MapPin,
  MapPinned,
  Package,
  Search,
  ShieldCheck,
  Truck,
  Warehouse,
  X,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

type Zone = {
  id: string;
  name: string;
  area: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
};

type Hub = {
  id: string;
  name: string;
  location: string;
  zoneId: string;
  status: "ACTIVE" | "INACTIVE";
  isInDhaka: boolean;
  createdAt: string;
  updatedAt: string;
};

// Replace these sample constants with data returned by your API.
const zones: Zone[] = [
  {
    id: "f9d13a1c-ad97-411c-8b41-8b904414c711",
    name: "Dhanmondi",
    area: "Dhanmondi, Kalabagan, Jigatola",
    status: "ACTIVE",
    createdAt: "2026-09-23T09:40:42.004Z",
    updatedAt: "2026-09-23T09:49:53.230Z",
  },
  {
    id: "51487e18-9b34-4239-9d71-cb9abf7665cf",
    name: "Gazipur",
    area: "Tongi, Joydebpur, Board Bazar",
    status: "ACTIVE",
    createdAt: "2026-09-20T21:07:07.343Z",
    updatedAt: "2026-09-20T21:07:07.343Z",
  },
  {
    id: "b12aa28e-9ffd-422d-aedb-b9572434fc5f",
    name: "Dhaka Central",
    area: "Motijheel, Paltan, Wari",
    status: "ACTIVE",
    createdAt: "2026-09-20T21:05:08.874Z",
    updatedAt: "2026-09-20T21:05:08.874Z",
  },
  {
    id: "e2d24d37-fb00-4a6b-97e6-d60b00c14d74",
    name: "Dhaka North",
    area: "Mirpur, Mohammadpur, Uttara",
    status: "ACTIVE",
    createdAt: "2026-09-20T21:00:18.962Z",
    updatedAt: "2026-09-20T21:00:18.962Z",
  },
];

const hubs: Hub[] = [
  {
    id: "433322e6-8c34-4291-bb26-b5b0bb2c9221",
    name: "Dhanmondi Hub",
    location: "House 45, Road 9A, Dhanmondi",
    zoneId: "f9d13a1c-ad97-411c-8b41-8b904414c711",
    status: "ACTIVE",
    isInDhaka: true,
    createdAt: "2026-09-23T10:06:47.111Z",
    updatedAt: "2026-09-23T10:15:56.341Z",
  },
  {
    id: "5676b00b-ea80-4b0f-bcf2-7fe558a47e26",
    name: "Board Bazar Hub",
    location: "Board Bazar, Gazipur",
    zoneId: "51487e18-9b34-4239-9d71-cb9abf7665cf",
    status: "ACTIVE",
    isInDhaka: false,
    createdAt: "2026-09-20T21:10:39.796Z",
    updatedAt: "2026-09-20T21:10:39.796Z",
  },
  {
    id: "a9ee5dad-7215-482b-8a49-0da655dced28",
    name: "Motijheel Hub",
    location: "Motijheel, Dhaka",
    zoneId: "b12aa28e-9ffd-422d-aedb-b9572434fc5f",
    status: "ACTIVE",
    isInDhaka: true,
    createdAt: "2026-09-20T21:07:55.540Z",
    updatedAt: "2026-09-20T21:07:55.540Z",
  },
  {
    id: "3204c602-daa8-4f8b-8a54-282fa0f3c37e",
    name: "Uttara Hub",
    location: "Uttara Sector 7, Dhaka",
    zoneId: "e2d24d37-fb00-4a6b-97e6-d60b00c14d74",
    status: "ACTIVE",
    isInDhaka: true,
    createdAt: "2026-09-20T21:02:11.829Z",
    updatedAt: "2026-09-20T21:02:11.829Z",
  },
];

type Filter = "ALL" | "DHAKA" | "OUTSIDE_DHAKA";

const deliverySteps = [
  {
    number: "01",
    title: "Find your zone",
    description:
      "Search for your area and check whether it falls within an active Parcelix zone.",
    icon: MapPinned,
  },
  {
    number: "02",
    title: "Locate a hub",
    description:
      "See the available hub or hubs associated with your selected zone.",
    icon: Warehouse,
  },
  {
    number: "03",
    title: "Send your parcel",
    description:
      "Create your shipment and follow the available delivery workflow.",
    icon: Truck,
  },
];

export default function CoveragePage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("ALL");
  const [expandedZones, setExpandedZones] = useState<string[]>([]);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const activeZones = useMemo(
    () => zones.filter((zone) => zone.status === "ACTIVE"),
    [],
  );

  const activeHubs = useMemo(
    () => hubs.filter((hub) => hub.status === "ACTIVE"),
    [],
  );

  const filteredZones = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return activeZones.filter((zone) => {
      const zoneHubs = activeHubs.filter((hub) => hub.zoneId === zone.id);

      const matchesSearch =
        !normalizedSearch ||
        zone.name.toLowerCase().includes(normalizedSearch) ||
        zone.area.toLowerCase().includes(normalizedSearch) ||
        zoneHubs.some(
          (hub) =>
            hub.name.toLowerCase().includes(normalizedSearch) ||
            hub.location.toLowerCase().includes(normalizedSearch),
        );

      const matchesFilter =
        filter === "ALL" ||
        (filter === "DHAKA" && zoneHubs.some((hub) => hub.isInDhaka)) ||
        (filter === "OUTSIDE_DHAKA" && zoneHubs.some((hub) => !hub.isInDhaka));

      return matchesSearch && matchesFilter;
    });
  }, [activeZones, activeHubs, search, filter]);

  const toggleZone = (zoneId: string) => {
    setExpandedZones((current) =>
      current.includes(zoneId)
        ? current.filter((id) => id !== zoneId)
        : [...current, zoneId],
    );
  };

  const clearFilters = () => {
    setSearch("");
    setFilter("ALL");
  };

  return (
    <main className="overflow-hidden bg-[#F8FAFC] text-slate-900 dark:bg-[#0B1120] dark:text-slate-100">
      {/* 1. Hero */}
      <section className="relative">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:px-10 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider text-orange-600 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-400">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              Our coverage network
            </span>

            <h1 className="mt-6 text-5xl font-black leading-[1.03] tracking-[-0.055em] text-slate-950 dark:text-white sm:text-6xl xl:text-7xl">
              Closer to you.
              <br />
              <span className="text-orange-500">Ready to deliver.</span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base">
              Explore Parcelix coverage zones, discover your nearest listed hub,
              and find out which areas are currently served by our delivery
              network.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#coverage-directory"
                className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600"
              >
                Explore coverage <ArrowRight size={16} />
              </a>
              <Link
                href="/shipments/create"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-bold transition hover:border-orange-300 dark:border-slate-700 dark:bg-slate-900"
              >
                Create a shipment <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <Check size={14} className="text-emerald-500" />
                Active coverage zones
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check size={14} className="text-emerald-500" />
                Hub directory
              </span>
            </div>
          </div>

          {/* Abstract network illustration */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute inset-8 rounded-full bg-orange-400/10 blur-3xl" />

            <div className="relative min-h-80 overflow-hidden rounded-2xl border border-white/10 bg-[#0F172A] p-6 text-white shadow-2xl sm:min-h-97.5 sm:p-8">
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />

              <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/15" />
              <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
              <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

              <svg
                viewBox="0 0 420 300"
                className="absolute inset-0 h-full w-full"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M 65 80 C 130 30, 155 155, 220 125 S 290 60, 350 120 S 330 210, 360 230"
                  stroke="#F97316"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                />
                <path
                  d="M 220 125 C 190 180, 130 210, 90 215"
                  stroke="#F97316"
                  strokeWidth="1.5"
                  strokeDasharray="4 5"
                  opacity=".7"
                />
              </svg>

              {[
                { x: "14%", y: "20%", label: "DHAKA NORTH" },
                { x: "54%", y: "37%", label: "CENTRAL" },
                { x: "72%", y: "66%", label: "DESTINATION" },
                { x: "17%", y: "69%", label: "GAZIPUR" },
              ].map((point) => (
                <div
                  key={point.label}
                  className="absolute"
                  style={{ left: point.x, top: point.y }}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 shadow-lg shadow-orange-500/30">
                    <MapPin size={16} />
                  </div>
                  <p className="mt-2 whitespace-nowrap text-[8px] font-bold tracking-wider text-slate-300">
                    {point.label}
                  </p>
                </div>
              ))}

              <div className="absolute bottom-4 right-4 rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-xl sm:bottom-6 sm:right-6">
                <p className="flex items-center gap-2 text-xs font-extrabold">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Coverage directory
                </p>
                <p className="mt-1 text-[10px] text-slate-500">
                  Explore active zones and hubs
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage stats derived from the provided data */}
      <section className="border-y border-orange-100 bg-[#FFF7ED] px-5 py-8 dark:border-orange-500/10 dark:bg-[#1A1720] sm:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-7 text-center lg:grid-cols-4">
          {[
            {
              value: activeZones.length,
              label: "Active coverage zones",
            },
            {
              value: activeHubs.length,
              label: "Active hubs",
            },
            {
              value: activeHubs.filter((hub) => hub.isInDhaka).length,
              label: "Hubs marked in Dhaka",
            },
            {
              value: new Set(activeHubs.map((hub) => hub.zoneId)).size,
              label: "Zones with an active hub",
            },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                {stat.value}
                <span className="text-orange-500">+</span>
              </p>
              <p className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Searchable coverage directory */}
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
              Search by zone, neighborhood, or hub name to explore the active
              coverage information available in Parcelix.
            </p>
          </div>

          {/* Search and filters */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#121C2E] sm:p-5">
            <div className="flex flex-col gap-3 lg:flex-row">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search zones, areas, or hubs..."
                  aria-label="Search zones, areas, or hubs"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 dark:border-slate-700 dark:bg-[#0B1120]"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { value: "ALL", label: "All areas" },
                  { value: "DHAKA", label: "In Dhaka" },
                  { value: "OUTSIDE_DHAKA", label: "Outside Dhaka" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFilter(option.value as Filter)}
                    className={`rounded-xl px-4 py-3 text-xs font-bold transition ${
                      filter === option.value
                        ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-orange-300 dark:border-slate-700 dark:bg-[#0F172A] dark:text-slate-300"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Showing{" "}
                <span className="font-bold text-slate-900 dark:text-white">
                  {filteredZones.length}
                </span>{" "}
                {filteredZones.length === 1 ? "zone" : "zones"}
              </p>

              {(search || filter !== "ALL") && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-bold text-orange-600 hover:text-orange-700 dark:text-orange-400"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* Zone cards */}
          {filteredZones.length > 0 ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {filteredZones.map((zone) => {
                const zoneHubs = activeHubs.filter(
                  (hub) => hub.zoneId === zone.id,
                );
                const isExpanded = expandedZones.includes(zone.id);

                return (
                  <article
                    key={zone.id}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-orange-200 hover:shadow-xl hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-[#121C2E] dark:hover:border-orange-500/30 dark:hover:shadow-black/20"
                  >
                    <div className="p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex min-w-0 items-start gap-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500 dark:bg-orange-500/10">
                            <MapPinned size={22} />
                          </div>

                          <div className="min-w-0">
                            <h3 className="text-lg font-extrabold tracking-tight">
                              {zone.name}
                            </h3>
                            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                              {zone.area}
                            </p>
                          </div>
                        </div>

                        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1.5 text-[10px] font-extrabold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-[#0F172A] dark:text-slate-300">
                          <Warehouse size={14} className="text-orange-500" />
                          {zoneHubs.length}{" "}
                          {zoneHubs.length === 1 ? "hub" : "hubs"}
                        </span>

                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-[#0F172A] dark:text-slate-300">
                          <MapPin size={14} className="text-orange-500" />
                          {zoneHubs.some((hub) => hub.isInDhaka)
                            ? "Includes Dhaka hub"
                            : zoneHubs.length > 0
                              ? "Outside Dhaka"
                              : "No active hub"}
                        </span>
                      </div>

                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        onClick={() => toggleZone(zone.id)}
                        className="mt-6 flex w-full items-center justify-between border-t border-slate-100 pt-4 text-left text-xs font-extrabold text-slate-800 transition hover:text-orange-600 dark:border-slate-800 dark:text-slate-200 dark:hover:text-orange-400"
                      >
                        <span>
                          {isExpanded ? "Hide hub details" : "View hub details"}
                        </span>
                        <ChevronDown
                          size={17}
                          className={`text-orange-500 transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isExpanded && (
                        <div className="mt-4 space-y-3">
                          {zoneHubs.length > 0 ? (
                            zoneHubs.map((hub) => (
                              <div
                                key={hub.id}
                                className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-[#0F172A]"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-orange-500 dark:bg-slate-800">
                                    <Building2 size={17} />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <h4 className="text-sm font-bold">
                                        {hub.name}
                                      </h4>
                                      <span className="rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                                        Active
                                      </span>
                                    </div>
                                    <p className="mt-1 flex items-start gap-1.5 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                      <MapPin
                                        size={13}
                                        className="mt-0.5 shrink-0 text-orange-500"
                                      />
                                      {hub.location}
                                    </p>
                                    <p className="mt-2 text-[10px] font-semibold text-slate-400">
                                      {hub.isInDhaka
                                        ? "Located in Dhaka"
                                        : "Outside Dhaka"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="rounded-xl bg-slate-50 p-4 text-xs leading-6 text-slate-500 dark:bg-[#0F172A] dark:text-slate-400">
                              No active hubs are currently listed for this zone.
                              Please check again later.
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-4 dark:border-slate-800 dark:bg-[#0F172A]/60 sm:px-6">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        Zone coverage information
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedZone(zone.id);
                          document
                            .getElementById("coverage-help")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="inline-flex items-center gap-1 text-xs font-extrabold text-orange-600 hover:text-orange-700 dark:text-orange-400"
                      >
                        Check this zone <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center dark:border-slate-700 dark:bg-[#121C2E]">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500 dark:bg-orange-500/10">
                <Search size={22} />
              </div>
              <h3 className="mt-4 text-base font-extrabold">
                No matching zones found
              </h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Try another area, neighborhood, or hub name.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-lg bg-orange-500 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-orange-600"
              >
                Clear search and filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. How coverage works */}
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
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-sm font-black shadow-[0_0_0_7px_#0F172A]">
                    {step.number}
                  </div>

                  <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/4 text-orange-400">
                    <Icon size={21} />
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

      {/* 4. Helpful coverage information */}
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
              className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-orange-600 transition hover:gap-3 dark:text-orange-400"
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
                  href="/shipments/create"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-extrabold text-orange-600 dark:text-orange-400"
                >
                  Create a shipment <ArrowRight size={14} />
                </Link>
              </div>
            </article>

            {selectedZone && (
              <div className="rounded-xl border border-orange-200 bg-orange-50 p-4 dark:border-orange-500/20 dark:bg-orange-500/5">
                <p className="text-xs font-bold text-orange-700 dark:text-orange-400">
                  Selected zone:{" "}
                  {zones.find((zone) => zone.id === selectedZone)?.name}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                  Review the matching hub details in the coverage directory.
                  Shipment availability is determined by the actual shipping
                  workflow.
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedZone(null)}
                  className="mt-2 text-xs font-bold text-orange-700 underline dark:text-orange-400"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 pb-20 sm:px-8 lg:px-10 lg:pb-24">
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl bg-[#0F172A] p-7 text-white sm:p-10 lg:flex-row lg:items-center lg:p-12">
          <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full border-28 border-white/4" />

          <div className="relative">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-orange-400">
              Your next delivery starts here
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Your parcel has places to go.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
              Explore the coverage directory, prepare your shipment, and follow
              the journey with Parcelix.
            </p>
          </div>

          <Link
            href="/shipments/create"
            className="relative inline-flex shrink-0 items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
          >
            Get started <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
