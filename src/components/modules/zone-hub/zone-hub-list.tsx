"use client";

import { Building2, MapPin, RefreshCw, Warehouse } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetHubs, useGetZones } from "@/hooks";

export default function ZoneHubList() {
  const zonesQuery = useGetZones({ sortOrder: "desc" });
  const hubsQuery = useGetHubs({ sortOrder: "desc" });

  const zones = zonesQuery.data?.data ?? [];
  const hubs = hubsQuery.data?.data ?? [];

  const isLoading = zonesQuery.isPending || hubsQuery.isPending;
  const isError = zonesQuery.isError || hubsQuery.isError;

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
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 my-6">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="flex flex-row justify-center items-center gap-4 p-5">
            <div className="rounded-xl bg-orange-50 p-3">
              <MapPin className="size-6 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {zones.length}
              </p>
              <p className="text-sm text-muted-foreground">Total Zones</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardContent className="flex flex-row justify-center items-center gap-4 p-5">
            <div className="rounded-xl bg-orange-50 p-3">
              <Warehouse className="size-6 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{hubs.length}</p>
              <p className="text-sm text-muted-foreground">Total Hubs</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Delivery Network</CardTitle>
          <CardDescription>Each zone and its associated hubs.</CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50">
                  <TableHead className="w-[40%] min-w-56 px-6 py-4">
                    Zone
                  </TableHead>
                  <TableHead className="min-w-72 px-6 py-4">
                    Hubs in this Zone
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {zones.map((zone) => {
                  const zoneHubs = hubs.filter((hub) => hub.zoneId === zone.id);

                  return (
                    <TableRow key={zone.id} className="align-top">
                      <TableCell className="px-6 py-5 whitespace-normal">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 rounded-lg bg-orange-50 p-2">
                            <MapPin className="size-4 text-orange-500" />
                          </div>

                          <div className="space-y-2">
                            <p className="font-semibold text-slate-900">
                              {zone.name}
                            </p>

                            <p className="text-sm leading-relaxed text-muted-foreground">
                              {zone.area}
                            </p>

                            <Badge
                              variant="outline"
                              className={
                                zone.status === "ACTIVE"
                                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                  : "border-slate-200 bg-slate-100 text-slate-600"
                              }
                            >
                              {zone.status}
                            </Badge>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="px-6 py-5 whitespace-normal">
                        {zoneHubs.length > 0 ? (
                          <div className="space-y-3">
                            {zoneHubs.map((hub) => (
                              <div
                                key={hub.id}
                                className="flex items-start gap-3 rounded-lg border border-slate-200 p-3"
                              >
                                <div className="mt-0.5 rounded-md bg-slate-100 p-2">
                                  <Building2 className="size-4 text-slate-600" />
                                </div>

                                <div className="min-w-0 flex-1 space-y-1">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <p className="font-medium text-slate-900">
                                      {hub.name}
                                    </p>

                                    <Badge
                                      variant="outline"
                                      className={
                                        hub.status === "ACTIVE"
                                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                          : "border-slate-200 bg-slate-100 text-slate-600"
                                      }
                                    >
                                      {hub.status}
                                    </Badge>
                                  </div>

                                  <p className="text-sm leading-relaxed text-muted-foreground">
                                    {hub.location}
                                  </p>

                                  <p className="text-xs text-slate-500">
                                    {hub.isInDhaka
                                      ? "Inside Dhaka"
                                      : "Outside Dhaka"}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="py-2 text-sm text-muted-foreground">
                            No hubs assigned to this zone yet.
                          </p>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}

                {zones.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      className="h-32 text-center text-muted-foreground"
                    >
                      No zones found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
