"use client";

import Logo from "@/../public/Parcelix-logo.png";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogout } from "@/hooks";
import type { UserRole } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    { name: "Home", url: "/" },
    { name: "Zones", url: "/zones" },
    { name: "Hubs", url: "/hubs" },
    { name: "Pricing", url: "/pricing" },
  ];

  const dashboardRoute: Record<UserRole, string> = {
    ADMIN: "/admin",
    COURIER: "/courier",
    CUSTOMER: "/customer",
  };

  const { data, isLoading } = useGetMe();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const queryClient = useQueryClient();

  const role = data?.data?.role as UserRole | undefined;
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
    <header className="w-full h-16 border border-b fixed top-0 left-0 bg-white z-10">
      <div className="container mx-auto  px-4 py-4 lg:px-8 relative flex justify-between items-center max-w-7xl">
        <Link href="/" className="flex items-center gap-2 font-medium">
          <Image src={Logo} width={120} height={50} alt="Parcelix logo" />
        </Link>

        <nav
          className={`flex gap-5 absolute flex-col bg-white w-full p-6 border top-16 z-6 shadow-md sm:static sm:flex-row sm:justify-center sm:border-0 sm:p-0 duration-300 ${isOpen ? "left-0" : "left-full shadow-none"}`}
        >
          {routes.map((route) => (
            <Link
              key={route.url}
              href={route.url}
              className="hover:text-secondary duration-300"
            >
              {route.name}
            </Link>
          ))}

          {isLoggedIn && role && (
            <Link href={dashboardRoute[role]}>Dashboard</Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {!isLoggedIn && (
            <Button
              variant="outline"
              render={<Link href="/login">Login</Link>}
              nativeButton={false}
              className="bg-secondary text-white hover:bg-primary hover:text-white duration-300"
            >
              Login
            </Button>
          )}
          {isLoggedIn && (
            <Button
              onClick={handleLogout}
              disabled={isLoggingOut}
              variant="destructive"
            >
              Logout
            </Button>
          )}
          <Button
            variant="outline"
            className="sm:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
    </header>
  );
}
