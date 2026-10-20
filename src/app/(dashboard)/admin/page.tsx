import { ProfileInfo } from "@/components/modules/profile/profile-info";

export default function AdminDashboard() {
  return (
    <section className="p-5">
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your personal information and view your account details.
          </p>
        </div>
        <ProfileInfo />
      </div>
    </section>
  );
}
