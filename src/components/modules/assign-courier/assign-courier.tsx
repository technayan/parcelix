"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/toast";
import { useAssignCourier, useGetAllShipments, useGetCouriers } from "@/hooks";
import useDebounce from "@/hooks/debounce.hook";
import type { Courier, Shipment } from "@/types";
import { ArrowDown, LoaderCircle, Package, Search, Truck } from "lucide-react";
import { useState } from "react";
import { ShipmentDetailsDialog } from "../shipment/shipment-details-dialog";

const PAGE_SIZE = 10;

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

    case "COURIER_ASSIGNED":
    case "PICKED_UP":
    case "IN_TRANSIT":
    case "OUT_FOR_DELIVERY":
      return "border-blue-200 bg-blue-50 text-blue-700";

    case "PICKUP_REQUESTED":
      return "border-orange-200 bg-orange-50 text-orange-700";

    default:
      return "border-slate-200 bg-slate-50 text-slate-700";
  }
}

export default function ShipmentManagement() {
  const [activeTab, setActiveTab] = useState<"all" | "pickup">("all");
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [detailsOpen, setDetailsOpen] = useState(false);

  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(
    null,
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [assigningCourierId, setAssigningCourierId] = useState<string | null>(
    null,
  );

  // Hide assigned shipments immediately; restore them if assignment fails.
  const [optimisticallyAssignedIds, setOptimisticallyAssignedIds] = useState<
    string[]
  >([]);

  const debouncedSearch = useDebounce(searchTerm);

  const shipmentStatus =
    activeTab === "pickup" ? "PICKUP_REQUESTED" : undefined;

  const { data, isLoading, isError, refetch } = useGetAllShipments({
    page,
    limit: PAGE_SIZE,
    searchTerm: debouncedSearch,
    status: shipmentStatus,
  });

  const { data: courierData, isLoading: couriersLoading } = useGetCouriers({
    page: 1,
    limit: 100,
    searchTerm: "",
    verificationStatus: "APPROVED",
    availabilityStatus: "AVAILABLE",
  });

  const { mutateAsync: assignCourier } = useAssignCourier();

  const shipments: Shipment[] = data?.data ?? [];
  const couriers: Courier[] = courierData?.data ?? [];

  const pagination = data?.meta ?? {
    page: 1,
    limit: PAGE_SIZE,
    total: 0,
    totalPages: 1,
  };

  const visibleShipments = shipments.filter(
    (shipment) => !optimisticallyAssignedIds.includes(shipment.id),
  );

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as "all" | "pickup");
    setPage(1);
  };

  const openAssignDialog = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setDialogOpen(true);
  };

  const handleAssignCourier = async (courier: Courier) => {
    if (!selectedShipment || assigningCourierId) return;

    const shipment = selectedShipment;
    const shipmentId = shipment.id;

    // Optimistically remove the shipment from the pickup list.
    setOptimisticallyAssignedIds((previous) =>
      previous.includes(shipmentId) ? previous : [...previous, shipmentId],
    );

    // Close the dialog immediately.
    setDialogOpen(false);
    setAssigningCourierId(courier.id);

    try {
      const response = await assignCourier({
        shipmentId,
        courierId: courier.id,
      });

      if (!response.success) {
        setOptimisticallyAssignedIds((previous) =>
          previous.filter((id) => id !== shipmentId),
        );

        toast.add({
          title: "Assignment Failed",
          description: response.message || "Unable to assign this courier.",
          type: "error",
        });

        return;
      }

      toast.add({
        title: "Courier Assigned",
        description: `${courier.user.name} has been assigned to ${shipment.trackingId}.`,
        type: "success",
      });

      // Refresh the server data after successful assignment.
      await refetch();

      // The refreshed API response should now contain COURIER_ASSIGNED.
      setOptimisticallyAssignedIds((previous) =>
        previous.filter((id) => id !== shipmentId),
      );
      setSelectedShipment(null);
    } catch (error) {
      setOptimisticallyAssignedIds((previous) =>
        previous.filter((id) => id !== shipmentId),
      );

      toast.add({
        title: "Assignment Failed",
        description:
          error instanceof Error ? error.message : "Please try again.",
        type: "error",
      });
    } finally {
      setAssigningCourierId(null);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="flex items-center gap-2">
              <Package className="size-5 text-[#f97316]" />
              Shipments
            </CardTitle>

            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(event) => handleSearch(event.target.value)}
                placeholder="Search tracking ID or sender..."
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Shipments</TabsTrigger>
              <TabsTrigger value="pickup">Request Pickup</TabsTrigger>
            </TabsList>

            {isError ? (
              <div className="py-12 text-center">
                <p className="font-medium">Unable to load shipments</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => refetch()}
                >
                  Try Again
                </Button>
              </div>
            ) : (
              <>
                <div className="rounded-md border w-full">
                  <Table className="overflow-x-scroll">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Shipment</TableHead>
                        <TableHead>Sender</TableHead>
                        <TableHead>Route</TableHead>
                        <TableHead>Courier</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {isLoading ? (
                        <TableRow>
                          <TableCell colSpan={6} className="py-12 text-center">
                            <LoaderCircle className="mx-auto size-5 animate-spin" />
                            <p className="mt-2 text-sm text-muted-foreground">
                              Loading shipments...
                            </p>
                          </TableCell>
                        </TableRow>
                      ) : visibleShipments.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="py-12 text-center">
                            <Package className="mx-auto size-9 text-muted-foreground/50" />
                            <p className="mt-3 font-medium">
                              {activeTab === "pickup"
                                ? "No pickup requests"
                                : "No shipments found"}
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {activeTab === "pickup"
                                ? "New pickup requests will appear here."
                                : "Try changing your search."}
                            </p>
                          </TableCell>
                        </TableRow>
                      ) : (
                        visibleShipments.map((shipment) => (
                          <TableRow key={shipment.id}>
                            <TableCell className="min-w-48">
                              <p className="font-medium">
                                {shipment.trackingId}
                              </p>
                              <p className="mt-1 text-xs text-muted-foreground">
                                {shipment.id.slice(0, 8)}
                              </p>
                            </TableCell>

                            <TableCell className="min-w-32">
                              {shipment.senderName || "—"}
                            </TableCell>

                            <TableCell className="min-w-48">
                              <div className="flex flex-col gap-2 text-sm">
                                <div>
                                  <span>{shipment.originHub?.name || "—"}</span>
                                  <ArrowDown className="size-3 shrink-0 text-muted-foreground" />
                                </div>
                                <span>
                                  {shipment.destinationHub?.name || "—"}
                                </span>
                              </div>
                            </TableCell>

                            <TableCell className="min-w-36">
                              {shipment.courier?.user?.name || (
                                <span className="text-muted-foreground">
                                  Unassigned
                                </span>
                              )}
                            </TableCell>

                            <TableCell>
                              <Badge
                                variant="outline"
                                className={getStatusClass(shipment.status)}
                              >
                                {formatStatus(shipment.status)}
                              </Badge>
                            </TableCell>

                            <TableCell className="text-right flex flex-col justify-center items-center gap-1">
                              {shipment.status === "PICKUP_REQUESTED" && (
                                <Button
                                  size="sm"
                                  className="bg-[#f97316] text-white hover:bg-primary"
                                  disabled={assigningCourierId !== null}
                                  onClick={() => openAssignDialog(shipment)}
                                >
                                  Assign Courier
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                className="hover:bg-primary hover:text-white"
                                onClick={() => {
                                  setSelectedShipment(shipment);
                                  setDetailsOpen(true);
                                }}
                              >
                                Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>

                  {/* Shipment Details Dialog */}
                  <ShipmentDetailsDialog
                    shipmentId={selectedShipment?.id || null}
                    open={detailsOpen}
                    onOpenChange={setDetailsOpen}
                  />
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
          </Tabs>
        </CardContent>
      </Card>

      {/* Available couriers dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          if (assigningCourierId === null) {
            setDialogOpen(open);

            if (!open) setSelectedShipment(null);
          }
        }}
      >
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Assign a Courier</DialogTitle>
            <DialogDescription>
              Select an approved courier for shipment{" "}
              <span className="font-medium text-foreground">
                {selectedShipment?.trackingId}
              </span>
              .
            </DialogDescription>
          </DialogHeader>

          {couriersLoading ? (
            <div className="py-10 text-center">
              <LoaderCircle className="mx-auto size-6 animate-spin" />
              <p className="mt-2 text-sm text-muted-foreground">
                Loading available couriers...
              </p>
            </div>
          ) : couriers.length === 0 ? (
            <div className="py-10 text-center">
              <Truck className="mx-auto size-9 text-muted-foreground/50" />
              <p className="mt-3 font-medium">No approved couriers found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Approve a courier application before assigning a courier.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {couriers.map((courier) => (
                <div
                  key={courier.id}
                  className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="font-medium">{courier.user.name}</p>
                    <p className="break-all text-sm text-muted-foreground">
                      {courier.user.email}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {courier.user.phone || "No phone provided"}
                    </p>
                  </div>

                  <Button
                    size="sm"
                    disabled={assigningCourierId !== null}
                    className="shrink-0 bg-secondary text-white hover:bg-primary"
                    onClick={() => handleAssignCourier(courier)}
                  >
                    {assigningCourierId === courier.id ? (
                      <>
                        <LoaderCircle className="mr-2 size-4 animate-spin" />
                        Assigning...
                      </>
                    ) : (
                      "Assign"
                    )}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
