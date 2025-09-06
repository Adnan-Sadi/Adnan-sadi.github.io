import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import news from "../data/news.json";
import { parseLocalDate, formatDateString } from "../lib/News";

export default function News() {
  // sort descending by date
  const sorted = [...news].sort(
    (a, b) => +parseLocalDate(b.date) - +parseLocalDate(a.date)
  );

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">News</h1>

      <ul className="rounded-xl border divide-y">
        {sorted.map((n) => {
          const d = parseLocalDate(n.date);
          return (
            <li
              key={n.date + n.text}
              className="grid grid-cols-[9rem,1fr] gap-6 px-4 py-4"
            >
              <span className="text-sm font-semibold text-foreground">
                {formatDateString(d)}
              </span>
              <div className="text-[15px] leading-relaxed text-muted">
                {/* Markdown body */}
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
  );
}
