import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Courier } from "@/types/courier.type";
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
    <div className="overflow-x-auto rounded-md border border-foreground/20">
      <Table>
        <TableHeader>
          <TableRow className="border-foreground/20">
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
                <TableRow key={index} className="border-foreground/20">
                  <TableCell colSpan={5}>
                    <div className="h-10 animate-pulse rounded bg-muted" />
                  </TableCell>
                </TableRow>
              ))
            : couriers.map((courier) => (
                <TableRow key={courier.id} className="border-foreground/20">
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
                      className="flex items-centers ml-auto hover:bg-primary hover:text-white cursor-pointer"
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
