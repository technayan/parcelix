"use client";

import {
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { UpdateProfileDialog } from "@/components/modules/profile/update-profile-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetMe } from "@/hooks";
import { UserInfo, UserRole } from "@/types";

const roleLabels: Record<UserRole, string> = {
  CUSTOMER: "Customer",
  COURIER: "Courier",
  ADMIN: "Administrator",
};

const statusLabels = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  BLOCKED: "Blocked",
};

export function ProfileInfo() {
  const { data } = useGetMe();
  const user: UserInfo = data.data;

  const initials = user.name
    .split(" ")
    .map((name: string) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const isCourier = user.role === "COURIER";

  return (
    <div className="space-y-6">
      {/* Profile Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="size-20">
                <AvatarImage
                  src={user.profilePhoto || undefined}
                  alt={user.name}
                />

                <AvatarFallback className="bg-primary text-lg font-semibold text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>

                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <Badge variant="default" className="text-white">
                    {roleLabels[user.role]}
                  </Badge>

                  <Badge
                    variant={
                      user.status === "ACTIVE" ? "outline" : "destructive"
                    }
                    className="border-green-600 text-green-600"
                  >
                    <span className="mr-1 size-1.5 rounded-full bg-current" />
                    {statusLabels[user.status]}
                  </Badge>
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </div>

            <UpdateProfileDialog user={user} />
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <UserRound className="size-5" />
            Personal Information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Full Name */}
            <div className="space-y-1.5">
              <p className="text-sm text-muted-foreground">Full Name</p>

              <p className="font-medium">{user.name || "Not provided"}</p>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Mail className="size-3.5" />
                Email
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium">{user.email}</p>

                {user.emailVerified && (
                  <Badge variant="outline" className="text-emerald-600">
                    <BadgeCheck className="size-3.5" />
                    Verified
                  </Badge>
                )}
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Phone className="size-3.5" />
                Phone Number
              </p>

              <p className="font-medium">{user.phone || "Not provided"}</p>
            </div>

            {/* Address */}
            <div className="space-y-1.5">
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-3.5" />
                Address
              </p>

              <p className="font-medium">
                {user.courier?.address ||
                  user.customer?.address ||
                  "Not provided"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShieldCheck className="size-5" />
            Account Information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Role */}
            <div className="space-y-1.5">
              <p className="text-sm text-muted-foreground">Account Role</p>

              <p className="font-medium">{roleLabels[user.role]}</p>
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <p className="text-sm text-muted-foreground">Account Status</p>

              <p className="font-medium">{statusLabels[user.status]}</p>
            </div>

            {/* Member Since */}
            <div className="space-y-1.5">
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <CalendarDays className="size-3.5" />
                Member Since
              </p>

              <p className="font-medium">{memberSince}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Courier Information */}
      {isCourier && user.courier && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckCircle2 className="size-5" />
              Courier Information
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1.5">
                <p className="text-sm text-muted-foreground">Verification</p>

                <Badge
                  variant={
                    user.courier.verificationStatus === "APPROVED"
                      ? "default"
                      : "secondary"
                  }
                >
                  {user.courier.verificationStatus}
                </Badge>
              </div>

              <div className="space-y-1.5">
                <p className="text-sm text-muted-foreground">Availability</p>

                <p className="font-medium">{user.courier.availabilityStatus}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Security</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium">Password</p>

              <p className="text-sm text-muted-foreground">
                Change your account password regularly to keep your account
                secure.
              </p>
            </div>

            <Button variant="outline">Change Password</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
