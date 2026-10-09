import ShipmentManagement from "@/components/modules/assign-courier/assign-courier";

export default function page() {
  return (
    <section className="p-5">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0f172a]">
            Shipment Management
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track shipments and assign available couriers.
          </p>
        </div>

        <ShipmentManagement />
      </div>
    </section>
  );
}
