"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { ctaHref, site } from "@/content/site";
import Link from "next/link";
import {
  AUTOMATABLE_SHARE,
  contactStep as contactCopy,
  errors as errorCopy,
  flow,
  payoffCopy,
  questions,
  result as resultCopy,
  type QuestionId,
} from "@/content/ai-readiness";
import { scoreAnswers, type Answers, type PayoffResult } from "@/lib/readiness";
import { MAX_LINE, STRICT_EMAIL_RE } from "@/lib/input";

const inputClass =
  "w-full rounded-[2px] border border-ink/25 bg-white px-4 py-3.5 font-sans text-ink placeholder:text-ink/35";

const buttonClass =
  "label-mono inline-flex items-center gap-2.5 rounded-[2px] bg-ink px-6 py-4 text-paper transition-colors duration-200 hover:bg-blue hover:text-white disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-ink disabled:hover:text-paper";

const CONTACT_FIELDS = ["name", "email", "company"] as const;
type ContactField = (typeof CONTACT_FIELDS)[number];
type Contact = Record<ContactField | "detail" | "website", string>;
type SaveState = "pending" | "saved" | "failed";

const TOTAL = questions.length;

function Arrow() {
  return (
    <span aria-hidden="true" className="font-sans text-[1.1em] leading-none">
      &#8599;
    </span>
  );
}

export function ReadinessCheck() {
  // step 0..TOTAL-1 are questions, TOTAL is the contact step.
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [answerError, setAnswerError] = useState(false);
  const [contact, setContact] = useState<Contact>({
    name: "",
    email: "",
    company: "",
    detail: "",
    website: "",
  });
  const [contactErrors, setContactErrors] = useState<
    Partial<Record<ContactField, string>>
  >({});
  const [result, setResult] = useState<PayoffResult | null>(null);
  const [save, setSave] = useState<SaveState>("pending");
  const [submitting, setSubmitting] = useState(false);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const renderedAtRef = useRef(0);
  const startedRef = useRef(false);
  useEffect(() => {
    renderedAtRef.current = Date.now();
  }, []);

  // Move focus to the new step's heading so screen readers announce it.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step, result]);

  function choose(id: QuestionId, optionId: string) {
    if (!startedRef.current) {
      startedRef.current = true;
      track("readiness_start");
    }
    setAnswers((prev) => ({ ...prev, [id]: optionId }));
    setAnswerError(false);
  }

  function next() {
    const q = questions[step];
    if (!answers[q.id]) {
      setAnswerError(true);
      return;
    }
    setStep((s) => s + 1);
  }

  function back() {
    setAnswerError(false);
    setStep((s) => Math.max(0, s - 1));
  }

  function validateContact() {
    const errs: Partial<Record<ContactField, string>> = {};
    if (!contact.name.trim()) errs.name = errorCopy.name;
    if (!contact.email.trim()) errs.email = errorCopy.emailMissing;
    else if (!STRICT_EMAIL_RE.test(contact.email.trim())) errs.email = errorCopy.emailInvalid;
    if (!contact.company.trim()) errs.company = errorCopy.company;
    return errs;
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validateContact();
    setContactErrors(errs);
    const first = CONTACT_FIELDS.find((f) => errs[f]);
    if (first) {
      document.getElementById(`readiness-${first}`)?.focus();
      return;
    }

    const complete = answers as Answers;
    setSubmitting(true);
    let saved: SaveState = "failed";
    try {
      const res = await fetch("/api/ai-readiness", {
        method: "POST",
        signal: AbortSignal.timeout(25_000),
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contact.name.trim(),
          email: contact.email.trim(),
          company: contact.company.trim(),
          detail: contact.detail.trim(),
          website: contact.website,
          renderedAt: renderedAtRef.current,
          answers: complete,
        }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      if (res.ok && data?.ok) saved = "saved";
    } catch {
      saved = "failed";
    }
    const scored = scoreAnswers(complete);
    track("readiness_complete", { score: scored.score, band: scored.band.id });
    setSave(saved);
    setResult(scored);
    setSubmitting(false);
  }

  function restart() {
    setAnswers({});
    setResult(null);
    setSave("pending");
    setStep(0);
    renderedAtRef.current = Date.now();
  }

  const panel = "rounded-[5px] border border-ink/15 bg-paper-2 p-6 sm:p-8";

  if (result) {
    return (
      <ResultPanel
        result={result}
        save={save}
        headingRef={headingRef}
        onRestart={restart}
      />
    );
  }

  if (step < TOTAL) {
    const q = questions[step];
    const selected = answers[q.id];
    return (
      <div className={panel}>
        <ProgressBar current={step + 1} />
        <fieldset className="mt-8" aria-labelledby={`readiness-q-${q.id}`}>
          <h2
            id={`readiness-q-${q.id}`}
            ref={headingRef}
            tabIndex={-1}
            className="font-display text-[clamp(1.5rem,3vw,2.1rem)] font-medium leading-[1.1] tracking-[-0.02em] text-balance outline-none"
          >
            {q.prompt}
          </h2>
          {q.help && <p className="body-md mt-3 text-ink/70">{q.help}</p>}
          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {q.options.map((o) => {
              const checked = selected === o.id;
              return (
                <label
                  key={o.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-[3px] border px-4 py-3.5 font-sans text-[0.98rem] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blue ${
                    checked
                      ? "border-ink bg-ink text-paper"
                      : "border-ink/20 bg-white text-ink hover:border-ink/50"
                  }`}
                >
                  <input
                    type="radio"
                    name={q.id}
                    value={o.id}
                    checked={checked}
                    onChange={() => choose(q.id, o.id)}
                    className="sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={`inline-block size-3 shrink-0 rounded-full border ${
                      checked ? "border-lime bg-lime" : "border-ink/40"
                    }`}
                  />
                  {o.label}
                </label>
              );
            })}
          </div>
        </fieldset>
        {answerError && (
          <p role="alert" className="label-mono-sm mt-4 text-blue-2">
            {errorCopy.answer}
          </p>
        )}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button type="button" onClick={next} className={buttonClass}>
            {flow.next} <Arrow />
          </button>
          {step > 0 && (
            <button
              type="button"
              onClick={back}
              className="label-mono text-ink/70 underline-offset-4 transition-colors hover:text-blue hover:underline"
            >
              {flow.back}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={panel}>
      <p className="label-mono-sm text-ink/70">{flow.contactProgress}</p>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-6 font-display text-[clamp(1.5rem,3vw,2.1rem)] font-medium leading-[1.1] tracking-[-0.02em] text-balance outline-none"
      >
        {contactCopy.title}
      </h2>
      <p className="body-md mt-3 text-ink/70">{contactCopy.body}</p>
      <form onSubmit={submit} noValidate className="relative mt-7 space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {CONTACT_FIELDS.map((field) => {
            const label = {
              name: contactCopy.nameLabel,
              email: contactCopy.emailLabel,
              company: contactCopy.companyLabel,
            }[field];
            const autoComplete = {
              name: "name",
              email: "email",
              company: "organization",
            }[field];
            const err = contactErrors[field];
            return (
              <div key={field}>
                <label
                  htmlFor={`readiness-${field}`}
                  className="label-mono-sm block text-ink/70"
                >
                  {label}
                </label>
                <input
                  id={`readiness-${field}`}
                  type={field === "email" ? "email" : "text"}
                  autoComplete={autoComplete}
                  maxLength={MAX_LINE - 1}
                  value={contact[field]}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, [field]: e.target.value }))
                  }
                  aria-required
                  aria-invalid={err ? true : undefined}
                  aria-describedby={err ? `readiness-${field}-error` : undefined}
                  className={`${inputClass} mt-2.5`}
                />
                {err && (
                  <p
                    id={`readiness-${field}-error`}
                    className="label-mono-sm mt-2 text-blue-2"
                  >
                    {err}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <div>
          <label htmlFor="readiness-detail" className="label-mono-sm block text-ink/70">
            {contactCopy.detailLabel}
          </label>
          <input
            id="readiness-detail"
            type="text"
            maxLength={1000}
            value={contact.detail}
            onChange={(e) => setContact((c) => ({ ...c, detail: e.target.value }))}
            className={`${inputClass} mt-2.5`}
          />
        </div>

        {/* Honeypot. Hidden from people, tempting to bots. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
        >
          <label htmlFor="readiness-website">Website</label>
          <input
            id="readiness-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={contact.website}
            onChange={(e) => setContact((c) => ({ ...c, website: e.target.value }))}
          />
        </div>

        <p className="body-md text-ink/60">{contactCopy.privacy}</p>

        <div className="flex flex-wrap items-center gap-4 pt-1">
          <button type="submit" disabled={submitting} className={buttonClass}>
            {submitting ? contactCopy.submitPending : contactCopy.submitIdle} <Arrow />
          </button>
          <button
            type="button"
            onClick={back}
            className="label-mono text-ink/70 underline-offset-4 transition-colors hover:text-blue hover:underline"
          >
            {flow.back}
          </button>
        </div>
      </form>
    </div>
  );
}

function Tick() {
  return (
    <span
      aria-hidden="true"
      className="inline-block size-[7px] shrink-0 translate-y-[-2px] bg-lime"
    />
  );
}

function ProgressBar({ current }: { current: number }) {
  return (
    <div>
      <p className="label-mono-sm text-ink/70">{flow.progress(current, TOTAL)}</p>
      <div
        aria-hidden="true"
        className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-ink/10"
      >
        <div
          className="h-full bg-blue transition-[width] duration-300 motion-reduce:transition-none"
          style={{ width: `${(current / TOTAL) * 100}%` }}
        />
      </div>
    </div>
  );
}

function ResultPanel({
  result,
  save,
  headingRef,
  onRestart,
}: {
  result: PayoffResult;
  save: SaveState;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  onRestart: () => void;
}) {
  const external = Boolean(site.schedulerUrl);
  const href = site.schedulerUrl || ctaHref;
  return (
    <div className="rounded-[5px] bg-ink p-7 text-paper sm:p-10">
      <p className="label-mono-sm text-lime">[ {resultCopy.label} ]</p>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2 outline-none"
      >
        <span className="font-display text-[clamp(4rem,10vw,6.5rem)] font-medium leading-none tracking-[-0.04em]">
          {result.hoursBack.toLocaleString("en-US")}
        </span>
        <span className="label-mono text-paper/60">{resultCopy.unit}</span>
      </h2>
      <p className="body-md mt-4 max-w-xl text-paper/60">
        {payoffCopy.hoursMath(result.weeklyHours, AUTOMATABLE_SHARE)}
      </p>

      <p className="label-mono-sm mt-10 text-paper/60">{resultCopy.payoffLabel}</p>
      <ul className="mt-4 border-t border-paper/15">
        <li className="flex items-baseline gap-4 border-b border-paper/15 py-4">
          <Tick />
          <span className="body-md text-paper/85">
            {payoffCopy.goal(result.goal.phrase ?? "")}
          </span>
        </li>
        <li className="flex items-baseline gap-4 border-b border-paper/15 py-4">
          <Tick />
          <span className="body-md text-paper/85">
            {result.workflow.build}{" "}
            {result.workflow.href && (
              <Link
                href={result.workflow.href}
                className="whitespace-nowrap text-lime underline underline-offset-4 hover:text-paper"
              >
                {payoffCopy.buildLink}
              </Link>
            )}
          </span>
        </li>
        <li className="flex items-baseline gap-4 border-b border-paper/15 py-4">
          <Tick />
          <span className="body-md text-paper/85">
            {resultCopy.scoreLabel} {result.score} {resultCopy.outOf}.{" "}
            {result.band.label}. {result.band.summary}
          </span>
        </li>
      </ul>

      <p className="label-mono-sm mt-10 text-paper/60">{resultCopy.nextLabel}</p>
      <p className="body-lg mt-3 max-w-xl text-paper/85">{result.band.nextStep}</p>

      <div className="mt-8 flex flex-wrap items-center gap-5">
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          onClick={() => track("cta_book_call", { from: "ai_readiness" })}
          className="label-mono inline-flex items-center gap-2.5 rounded-[2px] bg-lime px-6 py-4 text-ink transition-colors duration-200 hover:bg-paper"
        >
          {resultCopy.cta} <Arrow />
        </a>
        <button
          type="button"
          onClick={onRestart}
          className="label-mono text-paper/70 underline-offset-4 transition-colors hover:text-lime hover:underline"
        >
          {resultCopy.restart}
        </button>
      </div>

      <p className="body-md mt-8 text-paper/60">
        {save === "saved" ? (
          resultCopy.saved
        ) : (
          <>
            {resultCopy.saveFailedLead}{" "}
            <a href={`mailto:${site.email}`} className="underline underline-offset-2">
              {site.email}
            </a>{" "}
            {resultCopy.saveFailedTail}
          </>
        )}
      </p>
    </div>
  );
}
