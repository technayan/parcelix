"use client";

import { UpdateProfileForm } from "@/components/form/update-profile-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { UpdateProfileDialogProps } from "@/types/profile.type";
import { Pencil } from "lucide-react";
import { useState } from "react";

export function UpdateProfileDialog({ user }: UpdateProfileDialogProps) {
  const [open, setOpen] = useState(false);

  const handleComplete = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600 cursor-pointer">
          <Pencil className="size-4" />
          Edit Profile
        </div>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg bg-background">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold tracking-tight">
            Edit Profile
          </DialogTitle>

          <DialogDescription>
            Update your personal information and contact details.
          </DialogDescription>
        </DialogHeader>

        <UpdateProfileForm user={user} onComplete={handleComplete} />
      </DialogContent>
    </Dialog>
  );
}
