import profile from "../data/profile.json";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import news from "../data/news.json";
import { Link } from "react-router-dom";
import PublicationCard from "../components/PublicationCard";
import { getPublications } from "../lib/Publications";
import { parseLocalDate, formatDateString } from "../lib/News";

const publications = getPublications();

export default function Home() {
  const selected = publications.filter((p) => p.selected).slice(0, 4);
  const max_recent_news = 7;

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[260px,1fr]">
      {/* ——— Left: headshot + socials ——— */}
      <aside className="md:sticky md:top-20">
        <div className="rounded-2xl border bg-card p-4">
          <img
            src={profile.headshot}
            alt={`${profile.name} headshot`}
            className="h-52 w-52 rounded-xl border object-cover mx-auto"
          />

          <div className="mt-4 space-y-1 text-sm text-center">
            <div className="text-base font-semibold">{profile.name}</div>
            <div className="text-muted">{profile.title}</div>
            <div className="text-muted">{profile.affiliation}</div>
            <div className="text-muted">{profile.location}</div>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <a
              href={profile.email}
              aria-label="Email"
              className="rounded-full border px-3 py-1 text-xs no-underline hover:bg-foreground/5"
            >
              Email
            </a>
            <a
              href={profile.social.scholar}
              target="_blank"
              className="rounded-full border px-3 py-1 text-xs no-underline hover:bg-foreground/5"
            >
              Google Scholar
            </a>
            <a
              href={profile.social.linkedin}
              target="_blank"
              className="rounded-full border px-3 py-1 text-xs no-underline hover:bg-foreground/5"
            >
              LinkedIn
            </a>
            <a
              href={profile.social.researchgate}
              target="_blank"
              className="rounded-full border px-3 py-1 text-xs no-underline hover:bg-foreground/5"
            >
              ResearchGate
            </a>
            <a
              href={profile.social.orcid}
              target="_blank"
              className="rounded-full border px-3 py-1 text-xs no-underline hover:bg-foreground/5"
            >
              ORCID
            </a>
            <a
              href={profile.social.github}
              target="_blank"
              className="rounded-full border px-3 py-1 text-xs no-underline hover:bg-foreground/5"
            >
              GitHub
            </a>
          </div>
        </div>
      </aside>

      {/* ——— Right: intro + news + selected pubs ——— */}
      <section className="space-y-8">
        {/* About */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">About</h1>
          <p className="leading-relaxed">
            Hi! I am Abu Adnan Sadi. I’m a Ph.D. student at DePaul
            University advised by{" "}
            <a
              href="https://www.caseybennett.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground"
            >
              Dr. Casey Bennett
            </a>
            . I completed my B.Sc. in computer science and engineering from
            North South University. My research interest is primarily in areas
            related to natural language processing (NLP), deep learning, and
            computer vision. I have a particular interest in the AI for healthcare
            domain. My current research is in conversational AI and its application in the healthcare domain.
          </p>
        </div>

        {/* Recent updates */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">
              Recent updates
            </h2>
            <Link
              to="/news"
              className="text-sm no-underline text-muted hover:text-foreground"
            >
              View all →
            </Link>
          </div>

          <ul className="rounded-xl border divide-y">
            {[...news]
              .sort((a, b) => +parseLocalDate(b.date) - +parseLocalDate(a.date))
              .slice(0, max_recent_news)
              .map((n) => {
                const d = parseLocalDate(n.date);
                return (
                  <li
                    key={n.date + n.text}
                    className="grid grid-cols-[9rem,1fr] gap-6 px-4 py-3"
                  >
                    <span className="text-xs md:text-sm font-semibold text-foreground">
                      {formatDateString(d)}
                    </span>
                    <div className="text-sm leading-relaxed text-muted">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          a: ({ ...props }) => (
                            <a
                              {...props}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline underline-offset-2 text-sky-600 dark:text-sky-400 hover:opacity-90"
                            />
                          ),
                          p: ({ ...props }) => <p {...props} className="m-0" />,
                        }}
                      >
                        {n.text}
                      </ReactMarkdown>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>

        {/* Selected publications */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">
              Selected publications
            </h2>
            <Link
              to="/publications"
              className="text-sm no-underline text-muted hover:text-foreground"
            >
              View all →
            </Link>
          </div>

          <div className="grid gap-4">
            {selected.map((p) => (
              <PublicationCard key={p.id} pub={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
