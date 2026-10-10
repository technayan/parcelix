import PricingList from "@/components/modules/pricing/pricing-list";

export default function page() {
  return (
    <main className="p-4 sm:p-6 lg:p-8 mt-16">
      <section className="space-y-6">
        <div className="container mx-auto  px-4 py-4 lg:px-8 max-w-7xl">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Delivery Pricing
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            View delivery charges and courier earnings for each delivery area.
          </p>
          <PricingList />
        </div>
      </section>
    </main>
  );
}
