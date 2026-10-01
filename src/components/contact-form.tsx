"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { site } from "@/content/site";
import { form as copy, revenueOptions } from "@/content/contact-form";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const REVENUE_VALUES: readonly string[] = revenueOptions.map((o) => o.value);

const inputClass =
  "w-full rounded-[2px] border border-ink/25 bg-white px-4 py-3.5 font-sans text-ink placeholder:text-ink/35";

/** Required fields in render order, used to focus the first error. */
const FIELD_ORDER = [
  "name",
  "email",
  "company",
  "role",
  "revenue",
  "message",
] as const;

type Field = (typeof FIELD_ORDER)[number];

type FieldErrors = Partial<Record<Field, string>>;

type Status = "idle" | "pending" | "success" | "error";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="label-mono-sm mt-2 text-blue-2">
      {message}
    </p>
  );
}

function errorProps(field: Field, message?: string) {
  return {
    "aria-required": true,
    "aria-invalid": message ? true : undefined,
    "aria-describedby": message ? `contact-${field}-error` : undefined,
  } as const;
}

export function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    revenue: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  // Form-render timestamp for the server-side timing check. A ref keeps the
  // server and client renders identical, the effect stamps it after mount.
  const renderedAtRef = useRef(0);
  useEffect(() => {
    renderedAtRef.current = Date.now();
  }, []);

  function setValue(key: keyof typeof values, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!values.name.trim()) next.name = copy.errors.name;
    if (!values.email.trim()) {
      next.email = copy.errors.emailMissing;
    } else if (!EMAIL_RE.test(values.email.trim())) {
      next.email = copy.errors.emailInvalid;
    }
    if (!values.company.trim()) next.company = copy.errors.company;
    if (!values.role.trim()) next.role = copy.errors.role;
    if (!REVENUE_VALUES.includes(values.revenue)) {
      next.revenue = copy.errors.revenue;
    }
    if (!values.message.trim()) next.message = copy.errors.message;
    return next;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    const firstError = FIELD_ORDER.find((f) => nextErrors[f]);
    if (firstError) {
      formRef.current
        ?.querySelector<HTMLElement>(`#contact-${firstError}`)
        ?.focus();
      return;
    }

    setStatus("pending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          company: values.company.trim(),
          role: values.role.trim(),
          revenue: values.revenue,
          message: values.message.trim(),
          website: values.website,
          renderedAt: renderedAtRef.current,
        }),
      });
      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
      } | null;
      if (res.ok && data?.ok) {
        track("contact_form_submit");
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  function textInput(
    field: "name" | "email" | "company" | "role",
    label: string,
    type: "text" | "email",
    autoComplete: string,
  ) {
    return (
      <div>
        <label
          htmlFor={`contact-${field}`}
          className="label-mono-sm block text-ink/70"
        >
          {label}
        </label>
        <input
          id={`contact-${field}`}
          name={field}
          type={type}
          autoComplete={autoComplete}
          value={values[field]}
          onChange={(e) => setValue(field, e.target.value)}
          {...errorProps(field, errors[field])}
          className={`${inputClass} mt-2.5`}
        />
        <FieldError id={`contact-${field}-error`} message={errors[field]} />
      </div>
    );
  }

  return (
    <div className="rounded-[5px] border border-ink/15 bg-paper-2 p-6 sm:p-8">
      <div aria-live="polite">
        {status === "success" && (
          <div className="rounded-[5px] bg-ink p-8 text-paper lg:p-10">
            <span className="label-mono-sm text-lime">
              [ {copy.successLabel} ]
            </span>
            <p className="body-lg mt-5 max-w-md text-paper/85">
              {copy.success}
            </p>
          </div>
        )}
      </div>

      {status !== "success" && (
        <>
          <p className="label-mono-sm text-ink/70">{copy.panelLabel}</p>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="relative mt-7 space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {textInput("name", copy.nameLabel, "text", "name")}
              {textInput("email", copy.emailLabel, "email", "email")}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {textInput("company", copy.companyLabel, "text", "organization")}
              {textInput("role", copy.roleLabel, "text", "organization-title")}
            </div>

            <div>
              <label
                htmlFor="contact-revenue"
                className="label-mono-sm block text-ink/70"
              >
                {copy.revenueLabel}
              </label>
              <div className="relative mt-2.5">
                <select
                  id="contact-revenue"
                  name="revenue"
                  value={values.revenue}
                  onChange={(e) => setValue("revenue", e.target.value)}
                  {...errorProps("revenue", errors.revenue)}
                  className={`${
                    values.revenue
                      ? inputClass
                      : inputClass.replace("text-ink ", "text-ink/50 ")
                  } cursor-pointer appearance-none pr-11`}
                >
                  <option value="" disabled>
                    {copy.revenuePrompt}
                  </option>
                  {revenueOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="text-ink"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 12 8"
                  className="pointer-events-none absolute right-4 top-1/2 h-2 w-3 -translate-y-1/2 text-ink/60"
                >
                  <path
                    d="M1 1.5 6 6.5l5-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <FieldError id="contact-revenue-error" message={errors.revenue} />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="label-mono-sm block text-ink/70"
              >
                {copy.messageLabel}
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                value={values.message}
                onChange={(e) => setValue("message", e.target.value)}
                {...errorProps("message", errors.message)}
                className={`${inputClass} mt-2.5 resize-y`}
              />
              <FieldError id="contact-message-error" message={errors.message} />
            </div>

            {/* Honeypot. Hidden from people, tempting to bots. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
            >
              <label htmlFor="contact-website">Website</label>
              <input
                id="contact-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={(e) => setValue("website", e.target.value)}
              />
            </div>

            {/* The render timestamp travels as the hidden renderedAt field
                of the JSON payload, read from renderedAtRef on submit. */}

            {status === "error" && (
              <p
                role="alert"
                className="border-l-2 border-blue pl-4 font-sans text-[0.95rem] leading-relaxed text-ink"
              >
                {copy.failLead}{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="underline underline-offset-2 transition-colors hover:text-blue"
                >
                  {site.email}
                </a>{" "}
                {copy.failTail}
              </p>
            )}

            <div className="pt-1">
              <button
                type="submit"
                disabled={status === "pending"}
                className="label-mono inline-flex items-center gap-2.5 rounded-[2px] bg-ink px-6 py-4 text-paper transition-colors duration-200 hover:bg-blue hover:text-white disabled:cursor-wait disabled:opacity-60 disabled:hover:bg-ink disabled:hover:text-paper"
              >
                {status === "pending" ? copy.submitPending : copy.submitIdle}
                <span
                  aria-hidden="true"
                  className="font-sans text-[1.1em] leading-none"
                >
                  &#8599;
                </span>
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
