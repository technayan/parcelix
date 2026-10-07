"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useGetCouriers, useReviewCourier } from "@/hooks/courier.hook";
import useDebounce from "@/hooks/debounce.hook";
import type { Courier, CourierStatus } from "@/types";
import { Check, Eye, FileText, Search, X } from "lucide-react";
import { useState } from "react";
import { CourierTable } from "./courier-table";
import { StatusBadge } from "./status-badge";

// Replace these with your actual hooks.

// interface Courier {
//   id: string;
//   name: string;
//   email: string;
//   phone?: string | null;
//   address?: string | null;
//   resume?: string | null;
//   verificationStatus: CourierStatus;
//   createdAt: string;
// }

const PAGE_SIZE = 10;

export default function CourierManagement() {
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCourier, setSelectedCourier] = useState<Courier | null>(null);

  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);

  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);

  const [rejectionReason, setRejectionReason] = useState("");

  const [rejectionError, setRejectionError] = useState(false);

  const verificationStatus =
    activeTab === "all"
      ? undefined
      : (activeTab.toUpperCase() as CourierStatus);

  const debouncedSearch = useDebounce(searchTerm);

  const { data, isLoading } = useGetCouriers({
    page,
    limit: PAGE_SIZE,
    searchTerm: debouncedSearch,
    verificationStatus,
  });

  const { mutate: reviewCourier, isPending: reviewPending } =
    useReviewCourier();

  const couriers: Courier[] = data?.data || [];

  const pagination = data?.meta || {
    page: 1,
    limit: PAGE_SIZE,
    total: 0,
    totalPages: 1,
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const openReview = (courier: Courier) => {
    setSelectedCourier(courier);
    setReviewDialogOpen(true);
  };

  const handleApprove = () => {
    if (!selectedCourier) return;

    reviewCourier(
      {
        courierId: selectedCourier.id,
        verificationStatus: "APPROVED",
      },
      {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Approval Failed",
              description:
                res.message || "Unable to approve courier application.",
              type: "error",
            });

            return;
          }

          toast.add({
            title: "Courier Approved",
            description:
              "The courier application has been approved successfully.",
            type: "success",
          });

          setReviewDialogOpen(false);
          setSelectedCourier(null);
        },

        onError: (error) => {
          toast.add({
            title: "Approval Failed",
            description:
              error.message || "Something went wrong. Please try again.",
            type: "error",
          });
        },
      },
    );
  };

  const openRejectDialog = () => {
    setRejectionReason("");
    setRejectionError(false);
    setRejectDialogOpen(true);
  };

  const handleReject = () => {
    if (!selectedCourier) return;

    const reason = rejectionReason.trim();

    if (!reason) {
      setRejectionError(true);
      return;
    }

    reviewCourier(
      {
        courierId: selectedCourier.id,
        verificationStatus: "REJECTED",
        rejectionReason: reason,
      },
      {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Rejection Failed",
              description:
                res.message || "Unable to reject courier application.",
              type: "error",
            });

            return;
          }

          toast.add({
            title: "Courier Rejected",
            description: "The courier application has been rejected.",
            type: "success",
          });

          setRejectDialogOpen(false);
          setReviewDialogOpen(false);
          setSelectedCourier(null);
          setRejectionReason("");
        },

        onError: (error) => {
          toast.add({
            title: "Rejection Failed",
            description:
              error.message || "Something went wrong. Please try again.",
            type: "error",
          });
        },
      },
    );
  };

  return (
    <div>
      {/* Main Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle>Couriers</CardTitle>

            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search by name or email..."
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            {/* Status Tabs */}
            <TabsList className="mb-6">
              <TabsTrigger value="all">All</TabsTrigger>

              <TabsTrigger value="pending">Pending</TabsTrigger>

              <TabsTrigger value="approved">Approved</TabsTrigger>

              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>

            {/* All tabs use the same table */}
            {["all", "pending", "approved", "rejected"].map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-0">
                <CourierTable
                  couriers={couriers}
                  loading={isLoading}
                  onReview={openReview}
                />
              </TabsContent>
            ))}

            {/* Pagination */}
            {!isLoading && pagination.total > 0 && (
              <div className="mt-6 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                  {Math.min(
                    pagination.page * pagination.limit,
                    pagination.total,
                  )}{" "}
                  of {pagination.total} couriers
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={pagination.page <= 1}
                    onClick={() => setPage((prev) => prev - 1)}
                  >
                    Previous
                  </Button>

                  <span className="min-w-20 text-center text-sm">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={pagination.page >= pagination.totalPages}
                    onClick={() => setPage((prev) => prev + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {!isLoading && pagination.total === 0 && (
              <div className="py-12 text-center">
                <p className="text-sm text-muted-foreground">
                  No couriers found.
                </p>
              </div>
            )}
          </Tabs>
        </CardContent>
      </Card>

      {/* Review Courier Dialog */}
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Review Courier Application</DialogTitle>

            <DialogDescription>
              Review the applicant's information before approving or rejecting
              the application.
            </DialogDescription>
          </DialogHeader>

          {selectedCourier && (
            <div className="space-y-5">
              {/* Applicant Information */}
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoItem label="Full Name" value={selectedCourier.user.name} />

                <InfoItem label="Email" value={selectedCourier.user.email} />

                <InfoItem
                  label="Phone"
                  value={selectedCourier.user.phone || "Not provided"}
                />

                <InfoItem
                  label="Address"
                  value={selectedCourier.address || "Not provided"}
                />
              </div>

              {/* Resume */}
              {selectedCourier.resume && (
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-md bg-muted p-2">
                        <FileText className="size-5" />
                      </div>

                      <div>
                        <p className="font-medium">Resume</p>

                        <p className="text-xs text-muted-foreground">
                          Courier application document
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-secondary hover:text-white"
                    >
                      <a
                        href={selectedCourier.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <Eye className="size-4" />
                        View
                      </a>
                    </Button>
                  </div>
                </div>
              )}

              {/* Status */}
              <div className="rounded-lg bg-muted/50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Current Status
                  </span>

                  <StatusBadge status={selectedCourier.verificationStatus} />
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Button
              variant="outline"
              onClick={() => setReviewDialogOpen(false)}
            >
              Cancel
            </Button>

            {selectedCourier?.verificationStatus === "PENDING" && (
              <>
                <Button
                  variant="destructive"
                  onClick={openRejectDialog}
                  disabled={reviewPending}
                >
                  <X className="size-4" />
                  Reject
                </Button>

                <Button
                  onClick={handleApprove}
                  disabled={reviewPending}
                  className="hover:bg-secondary"
                >
                  <Check className="size-4" />
                  {reviewPending ? "Processing..." : "Approve"}
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reject Courier Application</DialogTitle>

            <DialogDescription>
              Please provide a reason for rejecting this courier application.
              The reason will be sent to the applicant.
            </DialogDescription>
          </DialogHeader>

          <Field data-invalid={rejectionError}>
            <FieldLabel htmlFor="rejectionReason">Rejection Reason</FieldLabel>

            <Textarea
              id="rejectionReason"
              placeholder="Enter the reason for rejection..."
              value={rejectionReason}
              onChange={(e) => {
                setRejectionReason(e.target.value);

                if (rejectionError) {
                  setRejectionError(false);
                }
              }}
              rows={5}
              aria-invalid={rejectionError}
            />

            {rejectionError && (
              <FieldError
                errors={[
                  {
                    message: "Rejection reason is required.",
                  },
                ]}
              />
            )}
          </Field>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRejectDialogOpen(false)}
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={reviewPending}
            >
              {reviewPending ? "Rejecting..." : "Reject Application"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Info Item                                                                  */
/* -------------------------------------------------------------------------- */

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground">{label}</p>

      <p className="text-sm font-medium wrap-break-word">{value}</p>
    </div>
  );
}
