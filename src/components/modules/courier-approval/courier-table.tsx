import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Courier } from "@/types";
import { Eye } from "lucide-react";
import { StatusBadge } from "./status-badge";

interface CourierTableProps {
  couriers: Courier[];
  loading: boolean;
  onReview: (courier: Courier) => void;
}

export function CourierTable({
  couriers,
  loading,
  onReview,
}: CourierTableProps) {
  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Courier</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Applied On</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={5}>
                    <div className="h-10 animate-pulse rounded bg-muted" />
                  </TableCell>
                </TableRow>
              ))
            : couriers.map((courier) => (
                <TableRow key={courier.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{courier.user.name}</p>

                      <p className="text-xs text-muted-foreground">
                        {courier.user.email}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>{courier.user.phone || "—"}</TableCell>

                  <TableCell>
                    <StatusBadge status={courier.verificationStatus} />
                  </TableCell>

                  <TableCell>
                    {new Date(courier.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-centers"
                      onClick={() => onReview(courier)}
                    >
                      <Eye className="size-4" />
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
