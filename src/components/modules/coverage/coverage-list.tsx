"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useGetHubs, useGetZones } from "@/hooks";
import {
  Building2,
  ChevronDown,
  MapPin,
  MapPinned,
  RefreshCw,
  Search,
  Warehouse,
} from "lucide-react";
import { useState } from "react";

export default function CoverageList() {
  const [expandedZones, setExpandedZones] = useState<string[]>([]);
  const zonesQuery = useGetZones({ sortOrder: "desc" });
  const hubsQuery = useGetHubs({ sortOrder: "desc" });

  const zones = zonesQuery.data?.data ?? [];
  const hubs = hubsQuery.data?.data ?? [];

  const isLoading = zonesQuery.isPending || hubsQuery.isPending;
  const isError = zonesQuery.isError || hubsQuery.isError;

  const toggleZone = (zoneId: string) => {
    setExpandedZones((current) =>
      current.includes(zoneId)
        ? current.filter((id) => id !== zoneId)
        : [...current, zoneId],
    );
  };

  const handleRetry = () => {
    void zonesQuery.refetch();
    void hubsQuery.refetch();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
          <p className="text-sm text-muted-foreground">
            Unable to load zones and hubs. Please try again.
          </p>
          <Button variant="outline" onClick={handleRetry}>
            <RefreshCw className="mr-2 size-4" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {zones.length > 0 ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {zones.map((zone) => {
            const zoneHubs = hubs.filter((hub) => hub.zoneId === zone.id);
            const isExpanded = expandedZones.includes(zone.id);

            return (
              <article
                key={zone.id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-orange-200 hover:shadow-xl hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-[#121C2E] dark:hover:border-orange-500/30 dark:hover:shadow-black/20"
              >
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-orange-50 text-orange-500 dark:bg-orange-500/10">
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
                      {zoneHubs.length} {zoneHubs.length === 1 ? "hub" : "hubs"}
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
                            className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-[#0F172A]"
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white text-orange-500 dark:bg-slate-800">
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
              </article>
            );
          })}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center dark:border-slate-700 dark:bg-[#121C2E]">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500 dark:bg-orange-500/10">
            <Search size={22} />
          </div>
          <h3 className="mt-4 text-base font-extrabold">No zone found</h3>
        </div>
      )}
    </>
  );
}
