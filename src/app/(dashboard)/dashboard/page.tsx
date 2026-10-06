import { ProfileInfo } from "@/components/modules/profile/profile-info";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your personal information and view your account details.
        </p>
      </div>
      <ProfileInfo />
    </div>
  );
}
