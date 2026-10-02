import { ContactForm } from "./sw-contact-form";

export type SwContactProps = {
  submitLabel?: string;
};

export const swContactBlock = {
  label: "Contact form",
  fields: {
    submitLabel: { type: "text" as const, label: "Button label" },
  },
  defaultProps: {
    submitLabel: "Send message",
  },
  render: ({ submitLabel }: SwContactProps) => (
    <section className="sw-section sw-section--body">
      <div className="sw-container">
        <ContactForm submitLabel={submitLabel} />
      </div>
    </section>
  ),
};
