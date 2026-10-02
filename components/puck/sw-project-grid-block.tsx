import projects from "../../content/projects.json";
import shots from "../../content/shots.json";
import { ProjectCard, type ProjectItem } from "./sw-project-card";

export type SwProjectGridProps = {
  projects?: ProjectItem[];
};

export const swProjectGridBlock = {
  label: "Project grid",
  fields: {
    projects: {
      type: "array" as const,
      label: "Projects",
      getItemSummary: (item: ProjectItem) => item.title || "Project",
      arrayFields: {
        title: { type: "text" as const, label: "Title" },
        url: { type: "text" as const, label: "URL" },
        description: { type: "textarea" as const, label: "Description" },
        tags: { type: "text" as const, label: "Tags (comma separated)" },
        slug: { type: "text" as const, label: "Screenshot slug (public/shots/<slug>.jpg)" },
        image: { type: "text" as const, label: "Image override (URL or /path)" },
      },
      defaultItemProps: { title: "New project", url: "https://", description: "", tags: "", slug: "" },
    },
  },
  defaultProps: {
    // Seeded from content/projects.json, the same file scripts/screenshots.ts reads, so the
    // cards and their screenshots can't drift apart. Once on a P1 page these are plain content.
    projects: projects.map((p) => ({ ...p, tags: p.tags.join(", ") })),
  },
  render: ({ projects: items }: SwProjectGridProps) => (
    <section className="sw-section sw-section--body">
      <div className="sw-container">
        <div className="sw-grid">
          {(items ?? []).map((p, i) => (
            <ProjectCard
              key={`${p.slug ?? p.url}-${i}`}
              // An editor-set image wins; otherwise only a generated shot that actually exists.
              project={{ ...p, image: p.image || (p.slug ? (shots as Record<string, string>)[p.slug] : undefined) }}
            />
          ))}
        </div>
      </div>
    </section>
  ),
};
