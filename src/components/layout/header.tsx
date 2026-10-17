"use client";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogout } from "@/hooks";
import type { UserRole } from "@/types/user.type";
import { getNameInitials } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    { name: "About", url: "/about" },
    { name: "Services", url: "/services" },
    { name: "Coverage", url: "/coverage" },
    { name: "Pricings", url: "/pricings" },
    { name: "Tracking", url: "/tracking" },
    { name: "FAQ", url: "/faq" },
  ];

  const dashboardRoute: Record<UserRole, string> = {
    ADMIN: "/admin",
    COURIER: "/courier",
    CUSTOMER: "/dashboard",
  };

  const { data, isLoading } = useGetMe();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const queryClient = useQueryClient();

  const role = data?.data?.role as UserRole | undefined;
  const profilePhoto = data?.data?.profilePhoto;
  const nameInitials = getNameInitials(data?.data?.name) || "";
  const isLoggedIn = !isLoading && !!data;

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
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-18 w-[min(1160px,calc(100%-32px))] items-center justify-between gap-4"
        aria-label="Main navigation"
      >
        <Link
          className="flex items-center gap-2.5 text-[26px] lg:text-[30px] font-bold tracking-[-1.2px]"
          href="/"
          aria-label="Parcelix home"
        >
          <span>
            Parcel<span className="text-primary">ix</span>
          </span>
        </Link>
        <div
          className={`${isOpen ? "absolute left-0 right-0 top-18 flex border-b border-border bg-background px-6 py-6" : "hidden"} flex-col gap-5 text-base font-medium text-muted-foreground lg:static lg:flex lg:flex-row lg:items-center lg:gap-6 lg:border-0 lg:bg-transparent lg:p-0`}
        >
          {routes.map((route) => (
            <Link
              key={route.name}
              href={route.url}
              onClick={() => setIsOpen(false)}
              className="transition hover:text-primary"
            >
              {route.name}
            </Link>
          ))}

          {isLoading || isLoggingOut ? (
            <>
              <Skeleton className="block sm:hidden w-full h-9" />
              <Skeleton className="block sm:hidden w-full h-9" />
            </>
          ) : !isLoggedIn ? (
            <>
              <Link href="/login" className="block sm:hidden">
                <Button
                  variant="outline"
                  className="cursor-pointer rounded-md w-full"
                >
                  Log in
                </Button>
              </Link>
              <Link
                className="flex sm:hidden h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600"
                href="apply"
              >
                Apply as courier
              </Link>
            </>
          ) : (
            <Button
              variant="default"
              onClick={handleLogout}
              className="block cursor-pointer sm:hidden h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600"
            >
              Logout
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isLoading || isLoggingOut ? (
            <>
              <Skeleton className="hidden sm:block w-20 h-9" />
              <Skeleton className="hidden sm:block w-20 h-9" />
            </>
          ) : !isLoggedIn ? (
            <>
              <Link href="/login" className="hidden sm:inline-flex">
                <Button variant="outline" className="cursor-pointer rounded-md">
                  Log in
                </Button>
              </Link>
              <Link
                className="hidden sm:inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600"
                href="apply"
              >
                Apply as courier
              </Link>
            </>
          ) : (
            <>
              <Link
                href={`${role === "ADMIN" ? dashboardRoute.ADMIN : role === "COURIER" ? dashboardRoute.COURIER : dashboardRoute.CUSTOMER}`}
                className="inline-flex "
              >
                <Button
                  variant="outline"
                  className="cursor-pointer rounded-full border-primary p-0"
                >
                  <Avatar>
                    <AvatarImage src={profilePhoto} alt={data?.data?.name} />
                    <AvatarFallback>{nameInitials}</AvatarFallback>
                  </Avatar>
                </Button>
              </Link>
              <Button
                variant="default"
                onClick={handleLogout}
                className="hidden cursor-pointer sm:inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600"
              >
                Logout
              </Button>
            </>
          )}
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden rounded-md"
            aria-label="Toggle navigation"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>
    </header>
  );
}
