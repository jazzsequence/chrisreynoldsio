"use client";

import { useState } from "react";
import { slugify } from "../../lib/slugify";

export type ProjectItem = {
  slug?: string;
  title?: string;
  url?: string;
  description?: string;
  tags?: string[] | string;
  image?: string;
};

/**
 * Client component only because it needs onError: a missing screenshot should fall back to the
 * gradient tile + title instead of showing a broken-image icon.
 */
export function ProjectCard({ project }: { project: ProjectItem }) {
  const [broken, setBroken] = useState(false);
  const src = project.image || "";
  const tags = (Array.isArray(project.tags) ? project.tags : (project.tags ?? "").split(","))
    .map((t) => t.trim())
    .filter(Boolean);

  let host = "";
  try {
    host = project.url ? new URL(project.url).hostname.replace(/^www\./, "") : "";
  } catch {
    /* leave host empty for a malformed URL entered in the editor */
  }

  return (
    <article className="sw-card">
      <div className="sw-card__media">
        {src && !broken ? (
          // Plain <img>: these are pre-optimized static screenshots, so next/image adds nothing.
          // alt="" because the card title and link already name the project.
          <img src={src} alt="" loading="lazy" width={960} height={600} onError={() => setBroken(true)} />
        ) : (
          <div className="sw-card__fallback" aria-hidden="true">
            {project.title}
          </div>
        )}
      </div>
      <div className="sw-card__body">
        <h3 className="sw-card__title" id={slugify(project.title)}>
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            {project.title}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </h3>
        {project.description ? <p className="sw-card__desc">{project.description}</p> : null}
        {tags.length ? (
          <ul className="sw-tags">
            {tags.map((t) => (
              <li className="sw-tag" key={t}>
                {t}
              </li>
            ))}
          </ul>
        ) : null}
        {host ? <span className="sw-card__host">{host}</span> : null}
      </div>
    </article>
  );
}
