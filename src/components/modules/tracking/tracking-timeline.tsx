"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useGetTracking } from "@/hooks/tracking.hook";
import type { ITrackingEvent } from "@/types/tracking.type";
import {
  Check,
  CheckCircle2,
  Circle,
  CircleAlert,
  CircleX,
  Clock3,
  CreditCard,
  MapPin,
  Package,
  PackageCheck,
  RotateCcw,
  Search,
  Truck,
  Warehouse,
} from "lucide-react";
import { type FormEvent, useState } from "react";

function formatStatus(status: string) {
  return status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Dhaka",
  }).format(date);
}

function getStatusDescription(status: string) {
  const descriptions: Record<string, string> = {
    PAID: "Payment has been received successfully.",
    PICKUP_REQUESTED: "A pickup request has been submitted.",
    COURIER_ASSIGNED: "A courier has been assigned to your shipment.",
    PICKED_UP: "The courier has picked up your parcel.",
    AT_ORIGIN_HUB: "Your parcel has arrived at the origin hub.",
    IN_TRANSIT: "Your parcel is on its way to the destination.",
    HUB_TRANSFER: "Your parcel is being transferred between hubs.",
    AT_DESTINATION_HUB: "Your parcel has arrived at the destination hub.",
    OUT_FOR_DELIVERY: "Your parcel is out for delivery.",
    DELIVERED: "Your parcel has been delivered successfully.",
    DELIVERY_FAILED: "Delivery could not be completed.",
    RETURNED: "Your parcel has been returned to the sender.",
    CANCELLED: "This shipment has been cancelled.",
    PENDING_PAYMENT: "Waiting for payment confirmation.",
  };

  return descriptions[status] ?? "Your shipment status has been updated.";
}

function getStatusIcon(status: string) {
  switch (status) {
    case "PAID":
    case "PENDING_PAYMENT":
      return CreditCard;
    case "PICKUP_REQUESTED":
    case "COURIER_ASSIGNED":
      return Clock3;
    case "PICKED_UP":
    case "OUT_FOR_DELIVERY":
      return Truck;
    case "AT_ORIGIN_HUB":
    case "AT_DESTINATION_HUB":
    case "HUB_TRANSFER":
      return Warehouse;
    case "IN_TRANSIT":
      return MapPin;
    case "DELIVERED":
      return PackageCheck;
    case "DELIVERY_FAILED":
      return CircleAlert;
    case "CANCELLED":
      return CircleX;
    case "RETURNED":
      return RotateCcw;
    default:
      return Package;
  }
}

function getStatusStyle(status: string) {
  switch (status) {
    case "DELIVERED":
      return {
        icon: "border-emerald-200 bg-emerald-50 text-emerald-600",
        badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
      };
    case "DELIVERY_FAILED":
    case "CANCELLED":
      return {
        icon: "border-red-200 bg-red-50 text-red-600",
        badge: "border-red-200 bg-red-50 text-red-700",
      };
    case "RETURNED":
      return {
        icon: "border-slate-300 bg-slate-100 text-slate-600",
        badge: "border-slate-200 bg-slate-100 text-slate-700",
      };
    default:
      return {
        icon: "border-orange-200 bg-orange-50 text-orange-600",
        badge: "border-orange-200 bg-orange-50 text-orange-700",
      };
  }
}

function getOverallStatus(events: ITrackingEvent[]) {
  return events[events.length - 1]?.status ?? "";
}

function TrackingTimeline({ events }: { events: ITrackingEvent[] }) {
  const terminalStatuses = [
    "DELIVERED",
    "DELIVERY_FAILED",
    "CANCELLED",
    "RETURNED",
  ];

  const latestStatus = getOverallStatus(events);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Package className="size-5 text-orange-500" />
              Shipment Progress
            </CardTitle>
            <CardDescription className="mt-1">
              Follow your parcel through every recorded update.
            </CardDescription>
          </div>

          <Badge
            variant="outline"
            className={getStatusStyle(latestStatus).badge}
          >
            {formatStatus(latestStatus)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-6 rounded-xl border border-orange-100 bg-orange-50/60 p-4">
          <p className="text-sm text-muted-foreground">Latest update</p>
          <p className="mt-1 font-semibold text-slate-900">
            {formatStatus(latestStatus)}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {getStatusDescription(latestStatus)}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            {formatDate(events[events.length - 1].createdAt)}
          </p>
        </div>

        <div className="relative">
          {events.map((event, index) => {
            const isLatest = index === events.length - 1;
            const Icon = getStatusIcon(event.status);
            const style = getStatusStyle(event.status);
            const isTerminal = terminalStatuses.includes(event.status);

            return (
              <div
                key={event.id}
                className="relative flex gap-4 pb-8 last:pb-0"
              >
                {/* Timeline connector */}
                {index < events.length - 1 && (
                  <div
                    className={`absolute left-4.75 top-10 h-[calc(100%-16px)] w-0.5 ${
                      isTerminal ? "bg-slate-200" : "bg-orange-200"
                    }`}
                  />
                )}

                {/* Status icon */}
                <div
                  className={`relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border ${style.icon}`}
                >
                  {isLatest ? (
                    <Icon className="size-5" />
                  ) : (
                    <Check className="size-5" />
                  )}
                </div>

                {/* Event details */}
                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <p
                      className={`font-semibold ${
                        isLatest ? "text-slate-900" : "text-slate-700"
                      }`}
                    >
                      {formatStatus(event.status)}
                    </p>

                    {isLatest && (
                      <Badge
                        variant="outline"
                        className="w-fit border-orange-200 bg-orange-50 text-orange-700"
                      >
                        Latest
                      </Badge>
                    )}
                  </div>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {getStatusDescription(event.status)}
                  </p>

                  <p className="mt-2 text-xs text-muted-foreground">
                    {formatDate(event.createdAt)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default function TrackShipment() {
  const [trackingId, setTrackingId] = useState("");
  const [searchedTrackingId, setSearchedTrackingId] = useState("");
  const [validationError, setValidationError] = useState("");

  const tracking = useGetTracking();

  const events = [...(tracking.data?.data ?? [])].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const value = trackingId.trim();

    if (!value) {
      setValidationError("Please enter a tracking ID.");
      return;
    }

    setValidationError("");
    setSearchedTrackingId(value);
    tracking.mutate(value);
  };

  const apiFailed = tracking.isSuccess && tracking.data?.success === false;

  const noEvents =
    tracking.isSuccess &&
    tracking.data?.success === true &&
    events.length === 0;

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      {/* Page heading */}
      <div className="space-y-2 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
          <Truck className="size-7" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Track Your Shipment
        </h1>

        <p className="mx-auto max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
          Enter your Parcelix tracking ID to see your parcel's journey and
          latest delivery status.
        </p>
      </div>

      {/* Tracking form */}
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-4 sm:p-6">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <div className="min-w-0 flex-1">
              <label
                htmlFor="trackingId"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Tracking ID
              </label>

              <Input
                id="trackingId"
                value={trackingId}
                onChange={(event) => {
                  setTrackingId(event.target.value);
                  setValidationError("");
                }}
                placeholder="Enter your tracking ID"
                autoComplete="off"
                aria-invalid={Boolean(validationError)}
                aria-describedby={
                  validationError ? "tracking-error" : undefined
                }
                className="h-11"
              />

              {validationError && (
                <p id="tracking-error" className="mt-1.5 text-sm text-red-600">
                  {validationError}
                </p>
              )}
            </div>

            <div className="sm:self-end">
              <Button
                type="submit"
                disabled={tracking.isPending}
                className="h-11 w-full bg-orange-500 text-white hover:bg-orange-600 sm:w-auto"
              >
                {tracking.isPending ? (
                  <>
                    <Spinner />
                    Tracking...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 size-4" />
                    Track Shipment
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Request error */}
      {tracking.isError && (
        <Card className="border-red-200">
          <CardContent className="flex flex-col items-center py-8 text-center">
            <CircleAlert className="size-10 text-red-500" />
            <h2 className="mt-3 font-semibold text-slate-900">
              Unable to track shipment
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {tracking.error instanceof Error
                ? tracking.error.message
                : "Something went wrong. Please check the tracking ID and try again."}
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => tracking.mutate(searchedTrackingId)}
              disabled={!searchedTrackingId || tracking.isPending}
            >
              Try again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Empty or unsuccessful API response */}
      {(apiFailed || noEvents) && (
        <Card className="border-amber-200">
          <CardContent className="flex flex-col items-center py-10 text-center">
            <Package className="size-10 text-amber-500" />
            <h2 className="mt-3 font-semibold text-slate-900">
              No tracking updates found
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {tracking.data?.message ||
                "Please check your tracking ID and try again."}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Tracking result */}
      {tracking.isSuccess && tracking.data?.success && events.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="size-4 text-emerald-600" />
            Tracking information for{" "}
            <span className="break-all font-semibold text-slate-900">
              {searchedTrackingId}
            </span>
          </div>

          <TrackingTimeline events={events} />
        </div>
      )}

      {/* Initial state */}
      {!tracking.isSuccess && !tracking.isError && !tracking.isPending && (
        <div className="py-6 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-slate-100">
            <Circle className="size-5 text-slate-400" />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Your shipment tracking timeline will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
