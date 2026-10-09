"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/toast";
import { useCancelShipment, useGetMyShipments, usePayShipment } from "@/hooks";
import useDebounce from "@/hooks/debounce.hook";
import type { MyShipment } from "@/types";
import {
  ArrowRight,
  Ban,
  CreditCard,
  Package,
  Search,
  Truck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PAGE_SIZE = 10;

const CANCELLABLE_STATUSES = ["PENDING_PAYMENT", "PAID", "PICKUP_REQUESTED"];

function formatStatus(status: string) {
  return status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getStatusClass(status: string) {
  switch (status) {
    case "DELIVERED":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "PENDING_PAYMENT":
    case "DELIVERY_FAILED":
      return "border-amber-200 bg-amber-50 text-amber-700";
    case "CANCELLED":
    case "RETURNED":
      return "border-red-200 bg-red-50 text-red-700";
    case "IN_TRANSIT":
    case "OUT_FOR_DELIVERY":
    case "PICKED_UP":
      return "border-blue-200 bg-blue-50 text-blue-700";
    default:
      return "border-slate-200 bg-slate-50 text-slate-700";
  }
}

export default function MyShipmentsClient() {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShipment, setSelectedShipment] = useState<MyShipment | null>(
    null,
  );

  const debouncedSearch = useDebounce(searchTerm);

  const { data, isLoading, isError } = useGetMyShipments({
    page,
    limit: PAGE_SIZE,
    searchTerm: debouncedSearch,
  });

  const { mutate: cancelShipment, isPending: isCancelling } =
    useCancelShipment();

  const { mutate: payForShipment, isPending: isPaying } = usePayShipment();

  const shipments: MyShipment[] = data?.data ?? [];

  const pagination = data?.meta ?? {
    page: 1,
    limit: PAGE_SIZE,
    total: 0,
    totalPages: 1,
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleCancel = () => {
    if (!selectedShipment) return;

    cancelShipment(selectedShipment.id, {
      onSuccess: (res) => {
        if (!res.success) {
          toast.add({
            title: "Cancellation Failed",
            description: res.message || "Unable to cancel this shipment.",
            type: "error",
          });
          return;
        }

        toast.add({
          title: "Shipment Cancelled",
          description: "Your shipment has been cancelled successfully.",
          type: "success",
        });

        setSelectedShipment(null);
      },
      onError: (error) => {
        toast.add({
          title: "Cancellation Failed",
          description: error.message || "Please try again.",
          type: "error",
        });
      },
    });
  };

  const handlePay = (shipmentId: string) => {
    payForShipment(shipmentId, {
      onSuccess: (res) => {
        if (!res.success) {
          toast.add({
            title: "Payment Failed",
            description: res.message || "Unable to initiate payment.",
            type: "error",
          });
          return;
        }

        // Match this field to the payment URL returned by your API.
        const paymentUrl = res.data?.paymentUrl;

        if (!paymentUrl) {
          toast.add({
            title: "Payment Error",
            description: "The server did not return a payment URL.",
            type: "error",
          });
          return;
        }

        window.location.assign(paymentUrl);
      },
      onError: (error) => {
        toast.add({
          title: "Payment Failed",
          description: error.message || "Please try again.",
          type: "error",
        });
      },
    });
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="flex items-center gap-2">
              <Truck className="size-5" />
              Shipment History
            </CardTitle>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchTerm}
                  onChange={(event) => handleSearch(event.target.value)}
                  placeholder="Search tracking ID..."
                  className="pl-9"
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {isError ? (
            <div className="py-12 text-center">
              <p className="font-medium">Unable to load shipments</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Please try again.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => router.refresh()}
              >
                Retry
              </Button>
            </div>
          ) : (
            <>
              <div className="w-full overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Shipment</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {isLoading ? (
                      Array.from({ length: 5 }).map((_, index) => (
                        <TableRow key={index}>
                          <TableCell colSpan={4}>
                            <div className="h-10 animate-pulse rounded bg-muted" />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : shipments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="py-12 text-center">
                          <Package className="mx-auto size-9 text-muted-foreground/50" />
                          <p className="mt-3 font-medium">No shipments found</p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Try changing your search or status filter.
                          </p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      shipments.map((shipment) => {
                        const canPay = shipment.status === "PENDING_PAYMENT";

                        const canCancel = CANCELLABLE_STATUSES.includes(
                          shipment.status as (typeof CANCELLABLE_STATUSES)[number],
                        );

                        return (
                          <TableRow key={shipment.id}>
                            <TableCell className="min-w-44">
                              <p className="font-medium">
                                {shipment.trackingId || "Not assigned yet"}
                              </p>
                              <p className="mt-1 text-xs">
                                {shipment.senderName}
                              </p>
                            </TableCell>

                            <TableCell className="min-w-48">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-medium">
                                  {shipment.originZone?.name || "—"}
                                </p>
                                <div className="my-1 flex items-center gap-1 text-xs">
                                  <ArrowRight className="size-3" />
                                  <p className="text-sm font-medium">
                                    {shipment.destinationZone?.name || "—"}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <p className="text-xs text-muted-foreground">
                                  {shipment.originHub?.name ||
                                    "Hub not assigned"}
                                </p>
                                <ArrowRight className="size-3 text-muted-foreground" />
                                <p className="text-xs text-muted-foreground">
                                  {shipment.destinationHub?.name ||
                                    "Hub not assigned"}
                                </p>
                              </div>
                            </TableCell>

                            <TableCell>
                              <Badge
                                variant="outline"
                                className={getStatusClass(shipment.status)}
                              >
                                {formatStatus(shipment.status)}
                              </Badge>
                            </TableCell>

                            <TableCell>
                              <div className="flex min-w-36 flex-wrap justify-end gap-2">
                                {canPay && (
                                  <Button
                                    size="sm"
                                    disabled={isPaying}
                                    onClick={() => handlePay(shipment.id)}
                                    className="bg-orange-500 text-white hover:bg-orange-600"
                                  >
                                    <CreditCard className="mr-1 size-3.5" />
                                    Pay
                                  </Button>
                                )}

                                {canCancel && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      setSelectedShipment(shipment)
                                    }
                                  >
                                    <Ban className="mr-1 size-3.5" />
                                    Cancel
                                  </Button>
                                )}

                                {shipment.trackingId && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      router.push(
                                        `/dashboard/shipments/${shipment.id}`,
                                      )
                                    }
                                  >
                                    Details
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>

              {!isLoading && pagination.total > 0 && (
                <div className="mt-6 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                    {Math.min(
                      pagination.page * pagination.limit,
                      pagination.total,
                    )}{" "}
                    of {pagination.total} shipments
                  </p>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={pagination.page <= 1}
                      onClick={() => setPage((previous) => previous - 1)}
                    >
                      Previous
                    </Button>

                    <span className="min-w-24 text-center text-sm">
                      Page {pagination.page} of {pagination.totalPages}
                    </span>

                    <Button
                      variant="outline"
                      size="sm"
                      disabled={pagination.page >= pagination.totalPages}
                      onClick={() => setPage((previous) => previous + 1)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={!!selectedShipment}
        onOpenChange={(open) => {
          if (!open && !isCancelling) setSelectedShipment(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cancel Shipment?</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel{" "}
              <span className="font-medium text-foreground">
                {selectedShipment?.trackingId || "this shipment"}
              </span>
              ? This action may not be reversible.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              disabled={isCancelling}
              onClick={() => setSelectedShipment(null)}
            >
              Keep Shipment
            </Button>
            <Button
              variant="destructive"
              disabled={isCancelling}
              onClick={handleCancel}
            >
              {isCancelling ? "Cancelling..." : "Yes, Cancel"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
