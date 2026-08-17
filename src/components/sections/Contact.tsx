"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { contact } from "@/lib/content/site";
import { PackageSelect } from "@/components/ui/PackageSelect";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import {
  contactSchema,
  type ContactFormData,
} from "@/lib/validations/contact";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});

    const fd = new FormData(e.currentTarget);
    const data = {
      name: fd.get("name") as string,
      businessName: fd.get("businessName") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      projectPackage: fd.get("projectPackage") as string,
      budget: fd.get("budget") as string,
      description: fd.get("description") as string,
    };

    const result = contactSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as keyof ContactFormData] = issue.message;
      });
      setErrors(fieldErrors);
      setStatus("idle");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  const input = "form-input form-input-light";

  return (
    <section id="contact" className="surface-band border-t border-border py-16 sm:py-20 md:py-28">
      <div className="container-main grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeader
            eyebrow="Contact"
            title={contact.headline}
            subtitle={contact.subtext}
          />
          <dl className="mt-10 space-y-5">
            <div>
              <dt className="mono-label">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${contact.sidebar.email}`} className="link-arrow normal-case tracking-normal">
                  {contact.sidebar.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="mono-label">Location</dt>
              <dd className="mt-1 text-sm text-muted">{contact.sidebar.location}</dd>
            </div>
            <div>
              <dt className="mono-label">Response</dt>
              <dd className="mt-1 text-sm text-muted">{contact.sidebar.response}</dd>
            </div>
          </dl>
        </div>

        <Reveal delay={0.08} className="min-w-0">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="card-surface p-8"
              >
                <p className="text-lg font-medium">Thanks — we will reply within 24 hours.</p>
                <p className="mt-2 text-sm text-muted">
                  A confirmation email is on its way to your inbox.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="link-arrow mt-4 normal-case tracking-normal"
                >
                  Send another message →
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                onSubmit={handleSubmit}
                className="card-surface min-w-0 p-4 sm:p-6 md:p-8"
                noValidate
              >
                <h3 className="text-lg font-semibold">Get in touch</h3>
                <p className="mt-2 text-sm text-muted">
                  Tell us about your project — we will come back within one working day.
                </p>

                <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
                  <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                    <label className="block text-sm">
                      <span className="mono-label">Name</span>
                      <input name="name" className={input} />
                      {errors.name ? (
                        <span className="mt-1 block text-xs text-red-600">{errors.name}</span>
                      ) : null}
                    </label>
                    <label className="block text-sm">
                      <span className="mono-label">Business</span>
                      <input name="businessName" className={input} />
                      {errors.businessName ? (
                        <span className="mt-1 block text-xs text-red-600">{errors.businessName}</span>
                      ) : null}
                    </label>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                    <label className="block text-sm">
                      <span className="mono-label">Email</span>
                      <input name="email" type="email" className={input} />
                      {errors.email ? (
                        <span className="mt-1 block text-xs text-red-600">{errors.email}</span>
                      ) : null}
                    </label>
                    <label className="block text-sm">
                      <span className="mono-label">Phone</span>
                      <input name="phone" type="tel" className={input} />
                      {errors.phone ? (
                        <span className="mt-1 block text-xs text-red-600">{errors.phone}</span>
                      ) : null}
                    </label>
                  </div>
                  <PackageSelect error={errors.projectPackage} />
                  <label className="block text-sm">
                    <span className="mono-label">Estimated budget</span>
                    <input
                      name="budget"
                      type="text"
                      inputMode="decimal"
                      className={input}
                      placeholder="e.g. £8k"
                    />
                    {errors.budget ? (
                      <span className="mt-1 block text-xs text-red-600">{errors.budget}</span>
                    ) : null}
                  </label>
                  <label className="block text-sm">
                    <span className="mono-label">What do you need?</span>
                    <textarea
                      name="description"
                      rows={4}
                      className={`${input} resize-none`}
                      placeholder="Booking system, client portal, field app — a sentence is enough."
                    />
                    {errors.description ? (
                      <span className="mt-1 block text-xs text-red-600">{errors.description}</span>
                    ) : null}
                  </label>
                </div>

                {status === "error" ? (
                  <p className="mt-4 text-sm text-red-600">Something went wrong — email us directly.</p>
                ) : null}

                <p className="mt-6 text-xs leading-relaxed text-muted">
                  By submitting this form, you agree to our{" "}
                  <Link
                    href="/privacy"
                    className="text-foreground underline decoration-border underline-offset-2 transition-colors hover:text-teal-700 hover:decoration-teal-700"
                  >
                    Privacy Policy
                  </Link>
                  . We use your details only to respond to your enquiry.
                </p>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-primary group mt-8 w-full justify-center disabled:opacity-50 sm:w-auto"
                >
                  {status === "submitting" ? "Sending…" : contact.cta}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
