"use client";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useLogout } from "@/hooks";
import type { UserRole } from "@/types/user.type";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { Button } from "../ui/button";
import { toast } from "../ui/toast";
import { DashboardSidebar } from "./dashboard-sidebar";

export default function DashboardShell({
  children,
  role,
}: {
  children: ReactNode;
  role: UserRole;
}) {
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const queryClient = useQueryClient();

  const router = useRouter();

  const handleLogout = () => {
    const toastId = toast.add({
      title: "Logging out",
      description: "Ending your session, please wait",
      type: "loading",
    });

    logout(undefined, {
      onSuccess: () => {
        toast.update(toastId, {
          title: "Logged out",
          description: "You have been signed out successfully",
          type: "success",
        });
        queryClient.removeQueries({ queryKey: ["user"] });
        router.push("/login");
      },
      onError: (error) => {
        toast.update(toastId, {
          title: "Logout failed",
          description:
            error.message || "Something went wrong. Please, try again",
          type: "error",
        });
      },
    });
  };

  return (
    <SidebarProvider>
      <DashboardSidebar role={role} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
          <SidebarTrigger className="-ml-1" />
          <Button
            onClick={handleLogout}
            disabled={isLoggingOut}
            variant="destructive"
          >
            Logout
          </Button>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
