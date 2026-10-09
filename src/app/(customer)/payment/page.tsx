import PaymentMessage from "@/components/payment/payment-message";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default function PaymentPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 mt-16">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        {/* Static brand header */}
        <div className="mb-8 text-center">
          <a
            href="/"
            className="text-2xl font-bold tracking-tight text-slate-900"
          >
            parcel<span className="text-orange-500">ix</span>
          </a>
        </div>

        <Suspense
          fallback={
            <div className="flex min-h-64 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
            </div>
          }
        >
          <PaymentMessage />
        </Suspense>

        <p className="mt-8 text-center text-xs leading-5 text-slate-400">
          Need help? Please contact the Parcelix support team.
        </p>
      </div>
    </main>
  );
}
