import { Badge } from "@/components/ui/badge";
import type { CourierStatus } from "@/types";

export function StatusBadge({ status }: { status: CourierStatus }) {
  const config = {
    PENDING: {
      label: "Pending",
      className: "border-amber-200 bg-amber-50 text-amber-700",
    },

    APPROVED: {
      label: "Approved",
      className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    },

    REJECTED: {
      label: "Rejected",
      className: "border-red-200 bg-red-50 text-red-700",
    },
  };

  const current = config[status];

  return (
    <Badge variant="outline" className={current.className}>
      {current.label}
    </Badge>
  );
}
