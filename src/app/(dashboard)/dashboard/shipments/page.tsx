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
    <section className="p-5">
      <div className="flex flex-col space-y-6  gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Shipments</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage, pay for, and track your deliveries.
          </p>
        </div>

        <Link href="/shipment">
          <Button className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600 cursor-pointer">
            <Package className="mr-2 size-4" />
            Create Shipment
          </Button>
        </Link>
      </div>

      <MyShipmentsClient />
    </section>
  );
}
