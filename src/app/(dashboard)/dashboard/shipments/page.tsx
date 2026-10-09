import MyShipmentsClient from "@/components/modules/shipment/shipment-list";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My Shipments | Parcelix",
  description: "Manage, pay for, and track your Parcelix shipments.",
};

export default function MyShipmentsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Shipments</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage, pay for, and track your deliveries.
          </p>
        </div>

        <Link href="/shipment">
          <Button className="bg-orange-500 text-white hover:bg-orange-600">
            <Package className="mr-2 size-4" />
            Create Shipment
          </Button>
        </Link>
      </div>

      <MyShipmentsClient />
    </div>
  );
}
