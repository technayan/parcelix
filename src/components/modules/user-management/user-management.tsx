"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/toast";
import useDebounce from "@/hooks/debounce.hook";
import { useGetUsers, useUpdateUserStatus } from "@/hooks/user.hook";
import { Search, UserCheck, Users, UserX } from "lucide-react";
import { useState } from "react";
import { SummaryCard } from "./summary-card";

type UserStatus = "ACTIVE" | "BLOCKED" | "DELETED";

type ManagedUser = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: "CUSTOMER" | "COURIER" | "ADMIN";
  status: UserStatus | string;
  createdAt?: string;
};

type RoleFilter = "ALL" | "CUSTOMER" | "COURIER" | "ADMIN";
type StatusFilter = "ALL" | "ACTIVE" | "BLOCKED";

type Role = "CUSTOMER" | "COURIER" | "ADMIN";

const PAGE_SIZE = 10;

const statusStyles: Record<string, string> = {
  ACTIVE: "border-green-200 bg-green-50 text-green-700",
  BLOCKED: "border-red-200 bg-red-50 text-red-700",
};

export default function UserManagement() {
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("ALL");
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  // const [currentPage, setCurrentPage] = useState(1);
  // const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  const verificationStatus =
    statusFilter === "ALL"
      ? undefined
      : (statusFilter.toUpperCase() as UserStatus);

  const verificationRole =
    roleFilter === "ALL" ? undefined : (roleFilter.toUpperCase() as Role);

  const debouncedSearch = useDebounce(searchTerm);

  const { data, isLoading } = useGetUsers({
    page,
    limit: PAGE_SIZE,
    searchTerm: debouncedSearch,
    status: verificationStatus,
    role: verificationRole,
  });

  const { mutate: updateStatus, isPending: isUpdating } = useUpdateUserStatus();

  // Assumes the API response is { data: ManagedUser[] }.
  const users: ManagedUser[] = (data?.data ?? []).filter(
    (user: ManagedUser) => user.status !== "DELETED",
  );

  const activeCount = users.filter((user) => user.status === "ACTIVE").length;

  const blockedCount = users.filter((user) => user.status === "BLOCKED").length;

  const pagination = data?.meta || {
    page: 1,
    limit: PAGE_SIZE,
    total: 0,
    totalPages: 1,
  };

  const handleUpdateStatus = (userId: string, status: string) => {
    updateStatus(
      {
        userId,
        status,
      },
      {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Update Status Failed",
              description: res.message || "Unable to update user status.",
              type: "error",
            });

            return;
          }

          toast.add({
            title: "Status Updated",
            description: "The user's status updated successfully.",
            type: "success",
          });
        },

        onError: (error) => {
          toast.add({
            title: "Update Status Failed",
            description:
              error.message || "Something went wrong. Please try again.",
            type: "error",
          });
        },
      },
    );
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleRoleChange = (value: string) => {
    setRoleFilter(value as RoleFilter);
    setPage(1);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value as StatusFilter);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          title="Total Users"
          value={users.length}
          icon={<Users className="size-6" />}
        />
        <SummaryCard
          title="Active Users"
          value={activeCount}
          icon={<UserCheck className="size-6" />}
        />
        <SummaryCard
          title="Blocked Users"
          value={blockedCount}
          icon={<UserX className="size-6" />}
        />
      </div>

      {/* Main table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            Search users, filter by role or status, and manage account access.
          </CardDescription>

          {/* Search */}
          <div className="relative pt-3">
            <Search className="absolute left-3 top-6 size-4 text-slate-400" />
            <Input
              value={searchTerm}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder="Search by name, email, or phone..."
              className="pl-9"
            />
          </div>

          <div className="flex justify-between items-center">
            {/* Role tabs */}
            <div className="space-y-2 pt-4">
              <p className="text-sm font-medium text-slate-700">Role</p>
              <Tabs value={roleFilter} onValueChange={handleRoleChange}>
                <div className="">
                  <TabsList className="w-max">
                    <TabsTrigger value="ALL">All Users</TabsTrigger>
                    <TabsTrigger value="CUSTOMER">Customers</TabsTrigger>
                    <TabsTrigger value="COURIER">Couriers</TabsTrigger>
                    <TabsTrigger value="ADMIN">Admins</TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>
            </div>

            {/* Status tabs */}
            <div className="space-y-2 pt-3">
              <p className="text-sm text-end font-medium text-slate-700">
                Account Status
              </p>
              <Tabs
                value={statusFilter}
                onValueChange={handleStatusFilterChange}
              >
                <div className="">
                  <TabsList className="w-max">
                    <TabsTrigger value="ALL">All</TabsTrigger>
                    <TabsTrigger value="ACTIVE">Active</TabsTrigger>
                    <TabsTrigger value="BLOCKED">Blocked</TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
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
                ) : users.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-32 text-center text-slate-500"
                    >
                      No users found matching your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => {
                    const isBlocked = user.status === "BLOCKED";
                    // const isUpdating = updatingUserId === user.id;

                    return (
                      <TableRow key={user.id}>
                        <TableCell>
                          <p className="font-medium text-slate-900">
                            {user.name}
                          </p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </TableCell>

                        <TableCell>{user.phone || "—"}</TableCell>

                        <TableCell>
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              statusStyles[user.status] ??
                              "border-slate-200 bg-slate-50 text-slate-600"
                            }
                          >
                            {user.status}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant={"outline"}
                              className={
                                isBlocked
                                  ? "border-green-200 text-green-500 bg-green-100 hover:bg-green-500 hover:text-white"
                                  : "border-orange-200 text-orange-500 bg-orange-100 hover:bg-orange-600 hover:text-white"
                              }
                              disabled={
                                isUpdating ||
                                user.role === "ADMIN" ||
                                !["ACTIVE", "BLOCKED"].includes(user.status)
                              }
                              onClick={() =>
                                handleUpdateStatus(
                                  user.id,
                                  user.status === "ACTIVE"
                                    ? "BLOCKED"
                                    : "ACTIVE",
                                )
                              }
                            >
                              {isBlocked ? "Unblock" : "Block"}
                            </Button>
                            <Button
                              size="sm"
                              variant={"outline"}
                              disabled={isUpdating}
                              className="border-red-200 text-red-500 bg-red-100 hover:bg-red-600 hover:text-white"
                              onClick={() =>
                                handleUpdateStatus(user.id, "DELETED")
                              }
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {!isLoading && pagination.total > 0 && (
            <div className="mt-6 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
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
        </CardContent>
      </Card>
    </div>
  );
}
