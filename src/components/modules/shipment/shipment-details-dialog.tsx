"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useShipmentDetails } from "@/hooks/shipment.hook";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  FileText,
  MapPin,
  Package,
  Phone,
  RefreshCw,
  Truck,
  UserRound,
  Warehouse,
  Weight,
} from "lucide-react";

type ShipmentDetailsDialogProps = {
  shipmentId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type ShipmentDetails = {
  id: string;
  trackingId: string | null;
  senderName: string;
  senderPhone: string;
  senderAddress: string;
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  weight: string;
  description: string | null;
  deliveryFee: string;
  isFragile: boolean;
  status: string;
  pickupDate: string | null;
  deliveredAt: string | null;
  returnedAt: string | null;
  pickupInstructions: string | null;
  returnReason: string | null;
  invoiceUrl: string | null;
  createdAt: string;
  updatedAt: string;
  courier: {
    user: {
      name: string;
      email: string;
      phone: string;
    };
  } | null;
  payment: {
    bkashTrxId: string | null;
    totalAmount: string;
    status: string;
  } | null;
  originZone: { name: string } | null;
  originHub: { name: string } | null;
  destinationZone: { name: string } | null;
  destinationHub: { name: string } | null;
};

const statusLabels: Record<string, string> = {
  PENDING_PAYMENT: "Pending Payment",
  PAID: "Paid",
  PICKUP_REQUESTED: "Pickup Requested",
  COURIER_ASSIGNED: "Courier Assigned",
  PICKED_UP: "Picked Up",
  AT_ORIGIN_HUB: "At Origin Hub",
  IN_TRANSIT: "In Transit",
  AT_DESTINATION_HUB: "At Destination Hub",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
  DELIVERY_FAILED: "Delivery Failed",
  RETURNED: "Returned",
  CANCELLED: "Cancelled",
};

function formatStatus(status: string) {
  return (
    statusLabels[status] ??
    status
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase())
  );
}

function formatDate(value?: string | null) {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not available";

  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatBDT(value?: string | null) {
  if (value == null || value === "") return "Not available";

  const amount = Number(value);

  if (!Number.isFinite(amount)) return `${value} BDT`;

  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
  }).format(amount);
}

function statusClass(status: string) {
  switch (status) {
    case "DELIVERED":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "CANCELLED":
    case "RETURNED":
    case "DELIVERY_FAILED":
      return "border-red-200 bg-red-50 text-red-700";
    case "PENDING_PAYMENT":
      return "border-amber-200 bg-amber-50 text-amber-700";
    default:
      return "border-orange-200 bg-orange-50 text-orange-700";
  }
}

function SectionTitle({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <h3 className="flex items-center gap-2 font-semibold text-slate-900">
      <Icon className="size-4 text-orange-500" />
      {children}
    </h3>
  );
}

function DetailItem({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value?: string | null;
  icon?: React.ElementType;
}) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      {Icon && (
        <div className="mt-0.5 rounded-lg bg-orange-50 p-2 text-orange-600">
          <Icon className="size-4" />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="wrap-break-word text-sm font-medium text-slate-900">
          {value || "Not available"}
        </p>
      </div>
    </div>
  );
}

function PersonCard({
  title,
  name,
  phone,
  address,
}: {
  title: string;
  name: string;
  phone: string;
  address: string;
}) {
  return (
    <div className="space-y-4 rounded-xl border p-4">
      <h4 className="font-medium text-slate-900">{title}</h4>

      <DetailItem label="Name" value={name} icon={UserRound} />

      <DetailItem label="Phone" value={phone} icon={Phone} />

      <DetailItem label="Address" value={address} icon={MapPin} />
    </div>
  );
}

export function ShipmentDetailsDialog({
  shipmentId,
  open,
  onOpenChange,
}: ShipmentDetailsDialogProps) {
  const {
    data: response,
    isPending,
    isError,
    refetch,
  } = useShipmentDetails(shipmentId ?? "");

  // The API response shape is { success, message, data: shipment }.
  const shipment = response?.data as ShipmentDetails | undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Package className="size-5 text-orange-500" />
            Shipment Details
          </DialogTitle>
          <DialogDescription>
            View package, delivery, courier, and payment information.
          </DialogDescription>
        </DialogHeader>

        {isPending && (
          <div className="flex min-h-48 flex-col items-center justify-center gap-3">
            <RefreshCw className="size-7 animate-spin text-orange-500" />
            <p className="text-sm text-muted-foreground">
              Loading shipment details...
            </p>
          </div>
        )}

        {isError && (
          <div className="flex min-h-48 flex-col items-center justify-center gap-3 text-center">
            <AlertCircle className="size-8 text-red-500" />
            <p className="font-medium">Unable to load shipment details.</p>
            <p className="text-sm text-muted-foreground">
              Please check your connection and try again.
            </p>
            <Button variant="outline" onClick={() => refetch()}>
              <RefreshCw className="mr-2 size-4" />
              Try Again
            </Button>
          </div>
        )}

        {!isPending && !isError && shipment && (
          <div className="space-y-6">
            {/* Tracking overview */}
            <div className="rounded-xl border bg-slate-50 p-4">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">Tracking ID</p>
                  <p className="mt-1 break-all font-semibold text-slate-900">
                    {shipment.trackingId || "Not generated yet"}
                  </p>
                </div>

                <Badge
                  variant="outline"
                  className={statusClass(shipment.status)}
                >
                  {formatStatus(shipment.status)}
                </Badge>
              </div>

              <Separator className="my-4" />

              <div className="grid gap-4 sm:grid-cols-3">
                <DetailItem
                  label="Shipment ID"
                  value={shipment.id}
                  icon={Package}
                />
                <DetailItem
                  label="Weight"
                  value={`${shipment.weight} kg`}
                  icon={Weight}
                />
                <DetailItem
                  label="Delivery Fee"
                  value={formatBDT(shipment.deliveryFee)}
                  icon={CreditCard}
                />
              </div>
            </div>

            {/* Package information */}
            <section className="space-y-4">
              <SectionTitle icon={Package}>Package Information</SectionTitle>

              <div className="grid gap-4 sm:grid-cols-2">
                <DetailItem label="Description" value={shipment.description} />

                <div>
                  <p className="mb-2 text-sm text-muted-foreground">
                    Fragile Package
                  </p>
                  <Badge
                    variant="outline"
                    className={
                      shipment.isFragile
                        ? "border-amber-200 bg-amber-50 text-amber-700"
                        : "border-slate-200 bg-slate-50 text-slate-600"
                    }
                  >
                    {shipment.isFragile ? "Yes — Handle with care" : "No"}
                  </Badge>
                </div>
              </div>
            </section>

            <Separator />

            {/* Sender and receiver */}
            <section className="space-y-4">
              <SectionTitle icon={UserRound}>Sender & Receiver</SectionTitle>

              <div className="grid gap-4 md:grid-cols-2">
                <PersonCard
                  title="Sender"
                  name={shipment.senderName}
                  phone={shipment.senderPhone}
                  address={shipment.senderAddress}
                />

                <PersonCard
                  title="Receiver"
                  name={shipment.receiverName}
                  phone={shipment.receiverPhone}
                  address={shipment.receiverAddress}
                />
              </div>
            </section>

            <Separator />

            {/* Delivery route */}
            <section className="space-y-4">
              <SectionTitle icon={MapPin}>Delivery Route</SectionTitle>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4 rounded-xl border p-4">
                  <h4 className="flex items-center gap-2 font-medium">
                    <MapPin className="size-4 text-emerald-600" />
                    Origin
                  </h4>

                  <DetailItem
                    label="Origin Zone"
                    value={shipment.originZone?.name}
                  />
                  <DetailItem
                    label="Origin Hub"
                    value={shipment.originHub?.name}
                    icon={Warehouse}
                  />
                </div>

                <div className="space-y-4 rounded-xl border p-4">
                  <h4 className="flex items-center gap-2 font-medium">
                    <MapPin className="size-4 text-orange-500" />
                    Destination
                  </h4>

                  <DetailItem
                    label="Destination Zone"
                    value={shipment.destinationZone?.name}
                  />
                  <DetailItem
                    label="Destination Hub"
                    value={shipment.destinationHub?.name}
                    icon={Warehouse}
                  />
                </div>
              </div>
            </section>

            <Separator />

            {/* Courier */}
            <section className="space-y-4">
              <SectionTitle icon={Truck}>Courier Information</SectionTitle>

              {shipment.courier ? (
                <div className="grid gap-4 rounded-xl border p-4 sm:grid-cols-2">
                  <DetailItem
                    label="Courier Name"
                    value={shipment.courier.user.name}
                    icon={UserRound}
                  />
                  <DetailItem
                    label="Phone"
                    value={shipment.courier.user.phone}
                    icon={Phone}
                  />
                  <DetailItem
                    label="Email"
                    value={shipment.courier.user.email}
                  />
                </div>
              ) : (
                <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                  No courier has been assigned to this shipment yet.
                </p>
              )}
            </section>

            <Separator />

            {/* Payment and invoice */}
            <section className="space-y-4">
              <SectionTitle icon={CreditCard}>Payment & Invoice</SectionTitle>

              <div className="grid gap-4 rounded-xl border p-4 sm:grid-cols-2">
                <DetailItem
                  label="Payment Status"
                  value={shipment.payment?.status ?? "No payment record"}
                  icon={CreditCard}
                />
                <DetailItem
                  label="Total Amount"
                  value={
                    shipment.payment
                      ? formatBDT(shipment.payment.totalAmount)
                      : formatBDT(shipment.deliveryFee)
                  }
                />
                <DetailItem
                  label="bKash Transaction ID"
                  value={shipment.payment?.bkashTrxId}
                />
              </div>

              {shipment.invoiceUrl && (
                <Button className="bg-orange-500 hover:bg-primary">
                  <a
                    href={shipment.invoiceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <FileText className="mr-2 size-4" />
                    View Invoice
                  </a>
                </Button>
              )}
            </section>

            <Separator />

            {/* Dates and instructions */}
            <section className="space-y-4">
              <SectionTitle icon={CalendarDays}>
                Dates & Instructions
              </SectionTitle>

              <div className="grid gap-4 sm:grid-cols-2">
                <DetailItem
                  label="Created At"
                  value={formatDate(shipment.createdAt)}
                  icon={CalendarDays}
                />
                <DetailItem
                  label="Pickup Date"
                  value={formatDate(shipment.pickupDate)}
                  icon={CalendarDays}
                />
                <DetailItem
                  label="Delivered At"
                  value={formatDate(shipment.deliveredAt)}
                  icon={CheckCircle2}
                />
                <DetailItem
                  label="Returned At"
                  value={formatDate(shipment.returnedAt)}
                  icon={RefreshCw}
                />
              </div>

              {shipment.pickupInstructions && (
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-sm text-muted-foreground">
                    Pickup Instructions
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {shipment.pickupInstructions}
                  </p>
                </div>
              )}

              {shipment.returnReason && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                  <p className="text-sm font-medium text-red-700">
                    Return Reason
                  </p>
                  <p className="mt-1 text-sm text-red-700">
                    {shipment.returnReason}
                  </p>
                </div>
              )}
            </section>

            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="hover:bg-primary hover:text-white"
              >
                Close
              </Button>
            </div>
          </div>
        )}

        {!isPending && !isError && !shipment && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            No shipment details were returned.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
