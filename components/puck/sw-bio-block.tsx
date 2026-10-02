export type SwBioProps = {
  body?: string;
  image?: string;
  imageAlt?: string;
};

/** Photo + bio text. Put a Section heading above it for the title. Paragraphs are separated by a blank line in the textarea; no HTML is accepted or rendered. */
export const swBioBlock = {
  label: "Bio",
  fields: {
    body: { type: "textarea" as const, label: "Bio (blank line between paragraphs)" },
    // Named `image` on purpose: P1's media picker attaches to fields by name (image, logo,
    // thumbnail, ...), so this gets the media library picker rather than a bare text box.
    image: { type: "text" as const, label: "Photo" },
    imageAlt: { type: "text" as const, label: "Photo alt text" },
  },
  defaultProps: {
    image: "",
    imageAlt: "Chris Reynolds",
    body: [
      "I'm a Senior Developer Advocate at Pantheon, which means I spend my days helping people build, deploy, and run sites on the web without losing their minds.",
      "I came up through WordPress and I still love it, but I'll happily work in whatever stack gets the job done: Next.js, Astro, a pile of shell scripts.",
      "Outside of work I make music, run tabletop games, host the Community + Code podcast, and build tools for all of it.",
    ].join("\n\n"),
  },
  render: ({ body, image, imageAlt }: SwBioProps) => {
    const paragraphs = (body ?? "")
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean);
    return (
      <section className="sw-section sw-section--body">
        <div className={image ? "sw-container sw-bio" : "sw-container sw-bio sw-bio--no-photo"}>
          {image ? (
            <figure className="sw-bio__photo">
              <img src={image} alt={imageAlt || ""} loading="lazy" decoding="async" />
            </figure>
          ) : null}
          <div className="sw-bio__body">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>
    );
  },
};
