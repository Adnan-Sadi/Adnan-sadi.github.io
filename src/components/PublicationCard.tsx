import { useState } from "react";
import type { Pub, Btn, ToggleBtn } from "../types/publication";
import { parseLocalDate, formatDateString } from "../lib/News";

export default function PublicationCard({ pub }: { pub: Pub }) {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleBtn = (b: Btn) => {
    if (b.kind === "toggle") {
      setOpenSection(openSection === b.target ? null : b.target);
    } else if (b.kind === "asset") {
      window.open(b.path, "_blank", "noopener,noreferrer");
    } else {
      window.open(b.href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <article className="border rounded-xl overflow-hidden bg-card">
      <div className="grid grid-cols-[120px,1fr] gap-4 p-4">
        <div className="relative">
          {pub.thumbnail ? (
            <>
              <img
                src={pub.thumbnail}
                alt={`${pub.title} preview`}
                className="w-full h-24 object-cover border rounded cursor-zoom-in"
                onClick={() => setShowPreview(true)}
              />
              {showPreview && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
                  onClick={() => setShowPreview(false)}
                >
                  <img
                    src={pub.thumbnail}
                    alt={`${pub.title} full preview`}
                    className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg cursor-zoom-out"
                  />
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-24 border rounded grid place-items-center text-xs text-muted">
              No preview
            </div>
          )}
        </div>
        <div className="min-w-0">
          <h3 className="font-medium leading-snug">{pub.title}</h3>
          <div className="text-sm text-muted mt-1">
            {pub.authors.map((author, i) => {
              const isMe = author
                .toLowerCase()
                .includes("abu adnan sadi".toLowerCase());
              return (
                <span key={i}>
                  <span
                    className={
                      isMe
                        ? "font-semibold text-blue-600 dark:text-blue-400"
                        : ""
                    }
                  >
                    {author}
                  </span>
                  {i < pub.authors.length - 1 && ", "}
                </span>
              );
            })}
          </div>

          <div className="text-sm mt-1 text-muted">
            {pub.venue} · {formatDateString(parseLocalDate(pub.date))}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {pub.buttons.map((b, i) => (
              <button
                key={i}
                onClick={() => handleBtn(b)}
                className="text-xs rounded border px-2 py-1"
              >
                {b.label}
              </button>
            ))}

            {pub.scholarUrl && (
              <a
                href={pub.scholarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                <img
                  src="scholar-logo.svg"
                  alt="Scholar Icon"
                  className="inline-block w-5 h-5 mr-1"
                />
                Citations: {pub.citationCount ?? "N/A"}
              </a>
            )}
          </div>

          {/* Toggle area */}
          {openSection && (
            <div className="mt-3 rounded border bg-background p-3 text-sm whitespace-pre-wrap">
              {pub.buttons
                .filter((b) => b.kind === "toggle" && b.target === openSection)
                .map((b) => (b as ToggleBtn).content)}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
