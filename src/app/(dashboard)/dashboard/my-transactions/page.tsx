import PaymentList from "@/components/modules/transaction/transaction-list";

export default function page() {
  return (
    <section className="p-5">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0f172a]">
            My Transactions
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Monitor all transactions.
          </p>
        </div>

        <PaymentList />
      </div>
    </section>
  );
}
