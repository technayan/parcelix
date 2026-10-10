"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useGetPricings } from "@/hooks";
import { Banknote, MapPin, Package, RefreshCw } from "lucide-react";

const formatBDT = (amount: string) =>
  `৳${Number(amount).toLocaleString("en-BD")}`;

export default function PricingList() {
  const { data: response, isPending, isError, refetch } = useGetPricings();

  if (isPending) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <Spinner />
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
          Try Again
        </Button>
      </div>
    );
  }

  const pricings = response.data ?? [];

  return (
    <div>
      {pricings.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center">
          <Package className="mx-auto mb-3 size-8 text-slate-400" />
          <p className="font-medium text-slate-900">No pricing plans found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Pricing information will appear here when available.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 mt-6">
          {pricings.map((pricing) => (
            <Card
              key={pricing.id}
              className="overflow-hidden border-slate-200 shadow-sm"
            >
              <CardHeader className="border-b bg-slate-50/70 pb-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-orange-100 p-3">
                      <MapPin className="size-5 text-orange-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-slate-900">
                        {pricing.name}
                      </CardTitle>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {pricing.insideDhaka
                          ? "Delivery within Dhaka"
                          : "Delivery outside Dhaka"}
                      </p>
                    </div>
                  </div>

                  <Badge
                    variant="outline"
                    className="border-emerald-200 bg-emerald-50 text-emerald-700"
                  >
                    Active
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-5 p-5">
                <div className="rounded-xl bg-orange-50 p-4">
                  <p className="text-sm font-medium text-orange-800">
                    Base delivery fee
                  </p>
                  <p className="mt-1 text-3xl font-bold text-slate-900">
                    {formatBDT(pricing.base)}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    For the first 1 kg
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-slate-100 p-2">
                        <Package className="size-4 text-slate-600" />
                      </div>
                      <span className="text-sm text-slate-600">
                        Additional per kg
                      </span>
                    </div>
                    <span className="font-semibold text-slate-900">
                      {formatBDT(pricing.additionalPerKg)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 border-t pt-4 text-xs text-muted-foreground">
                  <Banknote className="size-4" />
                  All prices are in Bangladeshi taka (BDT).
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
