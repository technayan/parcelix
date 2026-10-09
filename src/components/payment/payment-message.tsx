"use client";

import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Ban,
  CheckCircle2,
  Home,
  LayoutDashboard,
  XCircle,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

type PaymentStatus = "success" | "failure" | "cancel" | "error";

const paymentMessages = {
  success: {
    title: "Payment Successful!",
    description:
      "Your payment has been completed successfully. You can check your shipment details from your dashboard.",
    icon: CheckCircle2,
    iconClass: "text-emerald-600",
    containerClass: "bg-emerald-50",
  },
  failure: {
    title: "Payment Failed",
    description:
      "We couldn't process your payment. Please check your payment details and try again.",
    icon: XCircle,
    iconClass: "text-red-600",
    containerClass: "bg-red-50",
  },
  cancel: {
    title: "Payment Cancelled",
    description:
      "You cancelled the payment before completing it. You can review your shipment from your dashboard.",
    icon: Ban,
    iconClass: "text-amber-600",
    containerClass: "bg-amber-50",
  },
  error: {
    title: "Something Went Wrong",
    description:
      "We encountered a problem while processing your payment. Please check your shipment status before trying again.",
    icon: AlertTriangle,
    iconClass: "text-orange-600",
    containerClass: "bg-orange-50",
  },
};

export default function PaymentMessage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const status = searchParams.get("status");
  const error = searchParams.get("error");

  let paymentStatus: PaymentStatus = "error";

  if (error === "payment-failed") {
    paymentStatus = "error";
  } else if (
    status === "success" ||
    status === "failure" ||
    status === "cancel"
  ) {
    paymentStatus = status;
  }

  const message = paymentMessages[paymentStatus];
  const StatusIcon = message.icon;

  return (
    <>
      <div className="flex justify-center">
        <div
          className={`flex h-24 w-24 items-center justify-center rounded-full ${message.containerClass}`}
        >
          <StatusIcon
            className={`h-12 w-12 ${message.iconClass}`}
            strokeWidth={1.8}
          />
        </div>
      </div>

      <div className="mt-6 space-y-3 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {message.title}
        </h1>

        <p className="mx-auto max-w-sm text-sm leading-6 text-slate-500 sm:text-base">
          {message.description}
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <Button
          onClick={() => router.push("/dashboard")}
          className="h-11 w-full bg-orange-500 font-semibold text-white hover:bg-orange-600"
        >
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Go to Dashboard
        </Button>

        <Button
          variant="outline"
          onClick={() => router.push("/")}
          className="h-11 w-full border-slate-200 font-semibold text-slate-700 hover:bg-slate-50"
        >
          <Home className="mr-2 h-4 w-4" />
          Go to Home
        </Button>
      </div>
    </>
  );
}
