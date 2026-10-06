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
import { UpdateProfileDialogProps } from "@/types";
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
        <div className="border border-gray-300 px-3 py-2 rounded-full flex gap-3 items-center hover:bg-primary hover:text-white duration-200">
          <Pencil className="size-4" />
          Edit Profile
        </div>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>

          <DialogDescription>
            Update your personal information and contact details.
          </DialogDescription>
        </DialogHeader>

        <UpdateProfileForm user={user} onComplete={handleComplete} />
      </DialogContent>
    </Dialog>
  );
}
