"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useGetCourierStatistics } from "@/hooks/stats.hook";
import { Banknote, PackageCheck } from "lucide-react";

const statisticsConfig = [
  {
    title: "Total Earnings",
    key: "totalEarnings",
    icon: Banknote,
    format: (value: string | number) =>
      `৳${Number(value).toLocaleString("en-BD")}`,
  },
  {
    title: "Completed Shipments",
    key: "totalCompletedShipments",
    icon: PackageCheck,
    format: (value: string | number) => Number(value).toLocaleString("en-BD"),
  },
] as const;

export default function CourierStatistics() {
  const {
    data: response,
    isPending,
    isError,
    refetch,
  } = useGetCourierStatistics();

  if (isPending) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError || !response?.success) {
    return (
      <div className="flex flex-col items-start gap-3">
        <h5 className="tex-lg">
          Unable to load overall statistics. Please try again.
        </h5>
        <Button variant="outline" onClick={() => refetch()}>
          Try Again
        </Button>
      </div>
    );
  }

  const statistics = response.data;

  return (
    <section className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 mt-5">
        {statisticsConfig.map((item) => {
          const Icon = item.icon;
          const value = statistics[item.key];

          return (
            <Card key={item.key} className="border-slate-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  {item.title}
                </CardTitle>

                <div className="rounded-lg bg-orange-50 p-2">
                  <Icon className="size-5 text-orange-500" />
                </div>
              </CardHeader>

              <CardContent>
                <div className="text-2xl font-bold tracking-tight text-slate-900">
                  {item.format(value)}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
