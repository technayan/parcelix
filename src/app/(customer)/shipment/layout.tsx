import AuthGuard from "@/components/auth/auth-guard";
import RoleGuard from "@/components/auth/role-guard";
import type { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <RoleGuard roles={["CUSTOMER"]}>{children}</RoleGuard>
    </AuthGuard>
  );
}
