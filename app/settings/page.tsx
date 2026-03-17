"use client";

import { useEffect, useMemo, useState } from "react";

import { OfficeShell, SurfaceCard } from "@/src/components/office/OfficeShell";
import { api, getStoredAuth } from "@/src/services/api/client";

type SettingsData = {
  companyName?: string;
  companyEmail?: string;
  companyPhone?: string;
  leavePolicy?: {
    maxLeavesPerDay: number;
    allowAdminOverride: boolean;
  };
  rolePermissions?: {
    adminCanManageSettings: boolean;
    employeeCanEditProfile: boolean;
  };
  notifications?: {
    emailEnabled: boolean;
    pushEnabled?: boolean;
  };
  employeePreferences?: {
    theme: "dark" | "light";
    emailNotifications: boolean;
  };
};

export default function SettingsPage() {
  const auth = useMemo(() => getStoredAuth(), []);
  const isAdmin = auth?.user?.role === "admin";
  const [settings, setSettings] = useState<SettingsData>({
    companyName: "StaffHub",
    companyEmail: "",
    companyPhone: "",
    leavePolicy: { maxLeavesPerDay: 2, allowAdminOverride: true },
    rolePermissions: { adminCanManageSettings: true, employeeCanEditProfile: true },
    notifications: { emailEnabled: true, pushEnabled: false },
    employeePreferences: { theme: "dark", emailNotifications: true }
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await api<{ data: SettingsData }>("/settings");
        setSettings((current) => ({ ...current, ...response.data }));
      } catch {
        // Keep defaults if request fails.
      }
    };

    void loadSettings();
  }, []);

  const saveSettings = async () => {
    try {
      const response = await api<{ message: string }>("/settings", {
        method: "PUT",
        body: JSON.stringify(settings)
      });
      alert(response.message);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Settings update failed");
    }
  };

  return (
    <OfficeShell
      title="Settings"
      subtitle={isAdmin ? "Admin settings cover company details, leave policy, permissions, and notification behavior across StaffHub." : "Personal settings let employees manage notification preferences and theme choices without exposing admin controls."}
    >
      <div className="grid gap-6 xl:grid-cols-2">
        {isAdmin ? (
          <>
            <SurfaceCard>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-300/80">Company</p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <input value={settings.companyName || ""} onChange={(event) => setSettings({ ...settings, companyName: event.target.value })} placeholder="Company name" className="h-12 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-white" />
                <input value={settings.companyEmail || ""} onChange={(event) => setSettings({ ...settings, companyEmail: event.target.value })} placeholder="Company email" className="h-12 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-white" />
                <input value={settings.companyPhone || ""} onChange={(event) => setSettings({ ...settings, companyPhone: event.target.value })} placeholder="Company phone" className="h-12 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-white md:col-span-2" />
              </div>
            </SurfaceCard>

            <SurfaceCard>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-300/80">Leave Policy</p>
              <div className="mt-5 grid gap-4">
                <input type="number" value={settings.leavePolicy?.maxLeavesPerDay || 1} onChange={(event) => setSettings({ ...settings, leavePolicy: { ...settings.leavePolicy!, maxLeavesPerDay: Number(event.target.value) } })} className="h-12 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-white" />
                <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300">
                  <input type="checkbox" checked={!!settings.leavePolicy?.allowAdminOverride} onChange={(event) => setSettings({ ...settings, leavePolicy: { ...settings.leavePolicy!, allowAdminOverride: event.target.checked } })} />
                  Allow admin override for leave conflicts
                </label>
              </div>
            </SurfaceCard>

            <SurfaceCard>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-300/80">Permissions</p>
              <div className="mt-5 space-y-4 text-sm text-slate-300">
                <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                  <input type="checkbox" checked={!!settings.rolePermissions?.adminCanManageSettings} onChange={(event) => setSettings({ ...settings, rolePermissions: { ...settings.rolePermissions!, adminCanManageSettings: event.target.checked } })} />
                  Admin can manage system settings
                </label>
                <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                  <input type="checkbox" checked={!!settings.rolePermissions?.employeeCanEditProfile} onChange={(event) => setSettings({ ...settings, rolePermissions: { ...settings.rolePermissions!, employeeCanEditProfile: event.target.checked } })} />
                  Employees can edit their profile
                </label>
              </div>
            </SurfaceCard>
          </>
        ) : null}

        <SurfaceCard>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-300/80">Preferences</p>
          <div className="mt-5 space-y-4 text-sm text-slate-300">
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <input type="checkbox" checked={!!settings.notifications?.emailEnabled} onChange={(event) => setSettings({ ...settings, notifications: { ...settings.notifications!, emailEnabled: event.target.checked } })} />
              Email notifications enabled
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <input type="checkbox" checked={!!settings.employeePreferences?.emailNotifications} onChange={(event) => setSettings({ ...settings, employeePreferences: { ...settings.employeePreferences!, emailNotifications: event.target.checked } })} />
              Personal notification preference
            </label>
            <select value={settings.employeePreferences?.theme || "dark"} onChange={(event) => setSettings({ ...settings, employeePreferences: { ...settings.employeePreferences!, theme: event.target.value as "dark" | "light" } })} className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-white">
              <option className="bg-slate-950" value="dark">Dark mode</option>
              <option className="bg-slate-950" value="light">Light mode</option>
            </select>
          </div>
        </SurfaceCard>
      </div>

      <div>
        <button onClick={saveSettings} className="rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(124,58,237,0.35)] hover:-translate-y-0.5">
          {isAdmin ? "Save Settings" : "Save Preferences"}
        </button>
      </div>
    </OfficeShell>
  );
}
