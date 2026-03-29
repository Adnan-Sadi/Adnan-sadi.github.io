import PublicationCard from "../components/PublicationCard";
import { getPublications, getScholarStats } from "../lib/Publications";

const pubs = getPublications();
const stats = getScholarStats();

const statConfig = [
  {
    label: "Citations",
    value: stats.totalCitations,
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
  },
  {
    label: "h-index",
    value: stats.hIndex,
    iconColor: "text-violet-500",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/20",
  },
  {
    label: "i10-index",
    value: stats.i10Index,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
];

function StatCard({
  label,
  value,
  iconColor,
  bgColor,
  borderColor,
}: {
  label: string;
  value: number;
  iconColor: string;
  bgColor: string;
  borderColor: string;
}) {
  return (
    <div className={`flex flex-col items-center rounded-lg border ${borderColor} ${bgColor} px-6 py-4 text-center`}>
      <span className={`text-2xl font-bold ${iconColor}`}>{value}</span>
      <span className="text-sm text-muted mt-0.5">{label}</span>
    </div>
  );
}

export default function Publications() {
  // group by year, newest first
  const groups = pubs
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .reduce<Record<number, typeof pubs>>((acc, p) => {
      acc[p.year] ||= [];
      acc[p.year].push(p);
      return acc;
    }, {});

  const years = Object.keys(groups).map(Number).sort((a, b) => b - a);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Publications</h1>

      {/* Scholar stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {statConfig.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="space-y-8">
        {years.map((y) => (
          <section key={y}>
            <h2 className="text-xl font-semibold mb-3">{y}</h2>
            <div className="grid gap-4">
              {groups[y].map((p) => (
                <PublicationCard key={p.id} pub={p} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}