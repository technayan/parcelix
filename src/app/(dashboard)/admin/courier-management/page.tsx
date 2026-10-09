import CourierManagement from "@/components/modules/courier-approval/courier-management";

export default function page() {
  return (
    <section className="p-5">
      <div className="container mx-auto space-y-6 px-4 py-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Courier Management
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Review courier applications and manage courier verification status.
          </p>
        </div>
        <CourierManagement />
      </div>
    </section>
  );
}
