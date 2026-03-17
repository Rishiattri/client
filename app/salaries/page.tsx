import { OfficeShell, SurfaceCard } from "@/src/components/office/OfficeShell";

const salaryRows = [
  { name: "Operations Lead", cycle: "March 2026", status: "Processing", amount: "$5,200" },
  { name: "Design Manager", cycle: "March 2026", status: "Ready", amount: "$4,600" },
  { name: "Frontend Engineer", cycle: "March 2026", status: "Ready", amount: "$4,200" }
];

export default function SalariesPage() {
  return (
    <OfficeShell
      title="Salaries"
      subtitle="A payroll-facing page designed in the same StaffHub visual system. This version gives you a polished, professional destination for salary operations while the deeper payroll logic can be added next."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {[
          { label: "Payroll cycle", value: "March 2026" },
          { label: "Ready to process", value: "2 employees" },
          { label: "Pending review", value: "1 employee" }
        ].map((item) => (
          <SurfaceCard key={item.label}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-300/80">{item.label}</p>
            <div className="mt-4 text-3xl font-black tracking-tight text-white">{item.value}</div>
          </SurfaceCard>
        ))}
      </div>

      <SurfaceCard>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-300/80">Payroll overview</p>
            <h2 className="mt-2 text-2xl font-bold text-white">Salary preparation board</h2>
          </div>
        </div>
        <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10 text-left">
              <thead className="bg-white/[0.03] text-xs uppercase tracking-[0.22em] text-slate-400">
                <tr>
                  <th className="px-5 py-4">Employee</th>
                  <th className="px-5 py-4">Cycle</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/8 bg-slate-950/40 text-sm text-slate-200">
                {salaryRows.map((row) => (
                  <tr key={row.name} className="hover:bg-white/[0.03]">
                    <td className="px-5 py-4 font-medium text-white">{row.name}</td>
                    <td className="px-5 py-4">{row.cycle}</td>
                    <td className="px-5 py-4"><span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">{row.status}</span></td>
                    <td className="px-5 py-4 font-semibold text-emerald-300">{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SurfaceCard>
    </OfficeShell>
  );
}
