import AuthGuard from "@/components/auth/auth-guard";
import RoleGuard from "@/components/auth/role-guard";
import Footer from "@/components/layout/public/footer";
import Header from "@/components/layout/public/header";
import type { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthGuard>
        <RoleGuard roles={["CUSTOMER"]}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </RoleGuard>
      </AuthGuard>
    </div>
  );
}
