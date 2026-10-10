"use client";

import { ReceiptText, RefreshCcw } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetMyTransactions } from "@/hooks";
import type { PaymentInfo } from "@/types/payment.type";

const PAGE_SIZE = 10;

function formatAmount(amount: string | number, currency = "BDT") {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(Number(amount));
}

function formatDate(value: string | null) {
  if (!value) return "—";

  // Normalize the API timestamp, e.g. 21:02:33:729
  const normalized = value.replace(/T(\d{2}:\d{2}:\d{2}):(\d{3})/, "T$1.$2");

  const date = new Date(normalized);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

function getStatusClass(status: string) {
  switch (status) {
    case "PAID":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";

    case "REFUNDED":
      return "border-slate-200 bg-slate-100 text-slate-700";

    default:
      return "border-amber-200 bg-amber-50 text-amber-700";
  }
}

function formatStatus(status: string) {
  return status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function PaymentList() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, refetch } = useGetMyTransactions({
    page,
    limit: PAGE_SIZE,
  });

  const payments: PaymentInfo[] = data?.data ?? [];

  const pagination = data?.meta ?? {
    page: 1,
    limit: PAGE_SIZE,
    total: 0,
    totalPages: 1,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ReceiptText className="size-5" />
          Transaction History
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          View your payment transactions and refund records.
        </p>
      </CardHeader>

      <CardContent>
        {isError ? (
          <div className="py-12 text-center">
            <p className="font-medium">Unable to load transactions</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Please try again.
            </p>

            <Button
              variant="outline"
              className="mt-4"
              onClick={() => void refetch()}
            >
              <RefreshCcw className="mr-2 size-4" />
              Retry
            </Button>
          </div>
        ) : (
          <>
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Refund Details</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell colSpan={5}>
                          <div className="h-10 animate-pulse rounded bg-muted" />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : payments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="py-12 text-center">
                        <ReceiptText className="mx-auto size-9 text-muted-foreground/50" />
                        <p className="mt-3 font-medium">
                          No transactions found
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Your payment history will appear here.
                        </p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="min-w-44">
                          <p className="font-mono text-sm font-medium">
                            {payment.bkashTrxId}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            bKash
                          </p>
                        </TableCell>

                        <TableCell className="min-w-44 whitespace-nowrap">
                          <p className="text-sm">
                            {formatDate(payment.paidAt)}
                          </p>
                        </TableCell>

                        <TableCell className="whitespace-nowrap">
                          <p className="font-medium">
                            {formatAmount(
                              payment.totalAmount,
                              payment.currency,
                            )}
                          </p>
                        </TableCell>

                        <TableCell className="min-w-48">
                          {payment.refundAmount !== null ? (
                            <div className="space-y-1">
                              <p className="font-medium text-slate-700">
                                {formatAmount(
                                  Number(payment.refundAmount),
                                  payment.currency,
                                )}
                              </p>

                              {payment.refundedAt && (
                                <p className="text-xs text-muted-foreground">
                                  {formatDate(payment.refundedAt)}
                                </p>
                              )}

                              {payment.refundReason && (
                                <p className="max-w-56 text-xs text-muted-foreground">
                                  {payment.refundReason}
                                </p>
                              )}
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">
                              —
                            </span>
                          )}
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getStatusClass(payment.status)}
                          >
                            {formatStatus(payment.status)}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {!isLoading && pagination.total > 0 && (
              <div className="mt-6 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                  {Math.min(
                    pagination.page * pagination.limit,
                    pagination.total,
                  )}{" "}
                  of {pagination.total} transactions
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={pagination.page <= 1}
                    onClick={() => setPage((previous) => previous - 1)}
                  >
                    Previous
                  </Button>

                  <span className="min-w-24 text-center text-sm">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={pagination.page >= pagination.totalPages}
                    onClick={() => setPage((previous) => previous + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
