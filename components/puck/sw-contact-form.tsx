"use client";

import { useState, type FormEvent } from "react";

type State = { kind: "idle" | "sending" | "ok" | "error"; message: string };

export function ContactForm({ submitLabel }: { submitLabel?: string }) {
  const [state, setState] = useState<State>({ kind: "idle", message: "" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setState({ kind: "sending", message: "Sending…" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          website: data.get("website"), // honeypot; real users leave it empty
        }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error || "Something went wrong. Please try again.");
      form.reset();
      setState({ kind: "ok", message: "Message sent. Thanks, I'll get back to you." });
    } catch (err) {
      setState({
        kind: "error",
        message: err instanceof Error ? err.message : "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <form className="sw-form" onSubmit={onSubmit} noValidate={false}>
      <div className="sw-field">
        <label className="sw-label" htmlFor="cf-name">Name</label>
        <input className="sw-input" id="cf-name" name="name" type="text" autoComplete="name" required maxLength={100} />
      </div>
      <div className="sw-field">
        <label className="sw-label" htmlFor="cf-email">Email</label>
        <input className="sw-input" id="cf-email" name="email" type="email" autoComplete="email" required maxLength={254} />
      </div>
      <div className="sw-field">
        <label className="sw-label" htmlFor="cf-message">Message</label>
        <textarea className="sw-input" id="cf-message" name="message" required minLength={10} maxLength={5000} />
      </div>
      <div className="sw-hp" aria-hidden="true">
        <label>
          Leave this field empty
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div>
        <button className="sw-btn sw-btn--primary" type="submit" disabled={state.kind === "sending"}>
          {state.kind === "sending" ? "Sending…" : submitLabel || "Send message"}
        </button>
      </div>
      {/* role=status announces success/failure to screen readers without moving focus */}
      <p className="sw-form__status" role="status" data-state={state.kind === "ok" || state.kind === "error" ? state.kind : undefined}>
        {state.kind === "sending" ? "" : state.message}
      </p>
    </form>
  );
}
