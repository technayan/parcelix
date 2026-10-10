import AssignedShipmentManagement from "@/components/modules/assigned-shipment-management/assigned-shipment-management";

export default function page() {
  return (
    <section className="p-5">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0f172a]">
            Assigned Shipment
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage assigned shipments and update status.
          </p>
        </div>

        <AssignedShipmentManagement />
      </div>
    </section>
  );
}
