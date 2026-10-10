"use client";

import { UpdateProfileDialog } from "@/components/modules/profile/update-profile-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { toast } from "@/components/ui/toast";
import { useChangePassword, useGetMe, useUpdateProfilePhoto } from "@/hooks";
import type { UserInfo, UserRole } from "@/types/user.type";
import {
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
  Upload,
  UserRound,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

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
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

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

  const { mutate: changePassword } = useChangePassword();

  const handleChangePassword = () => {
    changePassword({
      email: user.email,
    });
    const params = new URLSearchParams({ email: user.email });
    router.push(`/reset-password?${params.toString()}`);
  };

  const { mutate: updateProfilePhoto, isPending } = useUpdateProfilePhoto();

  const handleFileSelect = (file?: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.add({
        title: "Invalid Image File",
        description: "Please select a valid image file (.jpg, .jpeg, or .png)",
        type: "error",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.add({
        title: "Large Image File",
        description: "Image size must be less than 5 MB.",
        type: "error",
      });
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setUploadDialogOpen(true);
  };

  const handleUploadPhoto = () => {
    if (!selectedFile) {
      toast.add({
        title: "No Image File Detected",
        description: "Please select an image first.",
        type: "error",
      });
      return;
    }

    updateProfilePhoto(selectedFile, {
      onSuccess: () => {
        toast.add({
          title: "Profile Photo Uploaded Successfully",
          description: "You have successfully uploaded your profile photo.",
          type: "success",
        });

        setUploadDialogOpen(false);
        setSelectedFile(null);

        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl(null);
        }
      },
    });
  };

  const handleCloseUploadDialog = (open: boolean) => {
    setUploadDialogOpen(open);

    if (!open) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      setSelectedFile(null);
      setPreviewUrl(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative size-20 shrink-0">
                <Avatar className="size-20">
                  <AvatarImage
                    src={user.profilePhoto || undefined}
                    alt={user.name}
                  />

                  <AvatarFallback className="bg-primary text-lg font-semibold text-primary-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isPending}
                  aria-label="Change profile picture"
                  title="Change profile picture"
                  className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full border-2 border-background bg-orange-500 text-white shadow-sm transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Pencil className="size-3.5" />
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    handleFileSelect(event.target.files?.[0]);
                  }}
                />
              </div>

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

            <Button variant="outline" onClick={handleChangePassword}>
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Profile Photo Upload Dialog */}

      <Dialog open={uploadDialogOpen} onOpenChange={handleCloseUploadDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Profile Picture</DialogTitle>
            <DialogDescription>
              Preview your new profile picture before uploading it. JPG, PNG, or
              WebP images up to 5 MB are supported.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center gap-4 py-4">
            <Avatar className="size-32 border">
              <AvatarImage
                src={previewUrl || undefined}
                alt="Profile picture preview"
                className="object-cover"
              />
              <AvatarFallback>
                <UserRound className="size-12 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>

            {selectedFile && (
              <p className="max-w-full truncate text-sm text-muted-foreground">
                {selectedFile.name}
              </p>
            )}
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleCloseUploadDialog(false)}
              disabled={isPending}
            >
              <X className="mr-2 size-4" />
              Cancel
            </Button>

            <Button
              type="button"
              onClick={handleUploadPhoto}
              disabled={!selectedFile || isPending}
              className="bg-orange-500 text-white hover:bg-orange-600"
            >
              {isPending ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : (
                <Upload className="mr-2 size-4" />
              )}
              {isPending ? "Uploading..." : "Upload Photo"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
