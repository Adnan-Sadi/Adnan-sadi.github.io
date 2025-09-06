import PublicationCard from "../components/PublicationCard";
import { getPublications } from "../lib/Publications";

const pubs = getPublications();

export default function Publications() {
  // group by year, newest first
  const groups = pubs
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .reduce<Record<number, typeof pubs>>((acc, p) => {
      acc[p.year] ||= [];
      acc[p.year].push(p);
      return acc;
    }, {});

  const years = Object.keys(groups)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Publications</h1>
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
