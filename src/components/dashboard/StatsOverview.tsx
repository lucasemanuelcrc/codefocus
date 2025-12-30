import { Icons } from "@/components/ui/Icons";

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  colorClass: string;
}

function StatCard({ label, value, icon, colorClass }: StatCardProps) {
  return (
    <div className="bg-[#0B1121]/80 backdrop-blur-sm border border-slate-800 p-4 rounded-xl flex items-center justify-between hover:border-slate-700 transition-colors">
      <div>
        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">{label}</p>
        <p className="text-2xl font-mono font-semibold text-white">{value}</p>
      </div>
      <div className={`p-2 rounded-lg ${colorClass}`}>{icon}</div>
    </div>
  );
}

interface StatsOverviewProps {
  total: number;
  bugs: number;
  solved: number;
}

export function StatsOverview({ total, bugs, solved }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <StatCard label="Total de Registros" value={total} icon={Icons.Zap} colorClass="bg-blue-500/20 text-blue-400" />
      <StatCard label="Bugs Ativos" value={bugs} icon={Icons.AlertCircle} colorClass="bg-red-500/20 text-red-400" />
      <StatCard label="Solucionados" value={solved} icon={Icons.CheckCircle} colorClass="bg-emerald-500/20 text-emerald-400" />
    </div>
  );
}