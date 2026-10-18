"use client";

import { CtaSection } from "@/components/sections/cta-section";
import ArticleBox from "@/components/shared/article-box";
import { ChevronDown, Clock3, Eye, Rocket } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const values = [
  {
    icon: Rocket,
    title: "Our Mission",
    description:
      "To make everyday logistics simple, accessible, and reliable for both small individuals and growing businesses across the entire country.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "To build a trusted digital logistics platform that seamlessly connects diverse communities across Bangladesh for sustainable growth.",
  },
];

const faqs = [
  {
    question: "How do I track my shipment?",
    answer:
      "Use your shipment tracking ID on the tracking page to view its current status and available delivery updates.",
  },
  {
    question: "What items can I send?",
    answer:
      "You can send eligible parcels that comply with applicable laws and Parcelix shipping policies. Check the current restricted-items policy before sending unusual or sensitive goods.",
  },
  {
    question: "How can I request a pickup?",
    answer:
      "Sign in to your customer account, create a shipment, and use the pickup request option when it becomes available for that shipment.",
  },
  {
    question: "Do you offer business shipping solutions?",
    answer:
      "Parcelix is designed to support organized shipment workflows, courier assignments, and delivery tracking for business use cases.",
  },
  {
    question: "What happens if a delivery fails?",
    answer:
      "The shipment status can reflect a failed delivery. Follow the latest shipment details or contact the relevant support team for the next steps.",
  },
];

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* Mission, and Vision */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto grid w-[min(1160px,calc(100%-32px))] items-center gap-10 lg:grid-cols-[0.9fr_1.5fr] lg:gap-14">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[1.5px] text-primary">
              About us
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              More than delivery.
              <br className="hidden sm:block" /> We're a logistics partner.
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Our mission is to connect people, businesses, and opportunities
              through fast, safe, and organized logistics workflows. We believe
              delivery is about more than parcels - it&apos;s about progress.
            </p>
            <Link
              className="mt-7 inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-white transition hover:bg-orange-600 hover:-translate-y-0.5"
              href="/services"
            >
              Our services
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <ArticleBox
                  key={value.title}
                  title={value.title}
                  Icon={Icon}
                  description={value.description}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ accordion */}
      <section id="faq" className="py-16 sm:py-20 bg-card/60">
        <div className="mx-auto grid w-[min(1160px,calc(100%-32px))] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[1.5px] text-primary">
              Frequently asked questions
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              Got questions?
              <br className="hidden sm:block" /> We've got answers.
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Find quick answers about shipment tracking, pickups, and how
              Parcelix helps organize your delivery journey.
            </p>

            <div className="mt-7 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-[#121C2E]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500 dark:bg-orange-500/10">
                <Clock3 size={20} />
              </div>
              <div>
                <p className="text-sm font-extrabold">Need more help?</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Get in touch with the Parcelix team.
                </p>
              </div>
            </div>

            <Link
              className="mt-7 inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-white transition hover:bg-orange-600 hover:-translate-y-0.5"
              href="/contact"
            >
              Contact us
            </Link>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              const answerId = `faq-answer-${index}`;

              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-xl border transition ${
                    isOpen
                      ? "border-orange-300 bg-orange-50/50 dark:border-orange-500/40 dark:bg-orange-500/5"
                      : "border-slate-200 bg-white dark:border-slate-800 dark:bg-[#121C2E]"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                  >
                    <span className="font-bold text-slate-800 dark:text-slate-100">
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-orange-500 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div
                      id={answerId}
                      className="px-5 pb-5 leading-7 text-slate-500 dark:text-slate-400 transition"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection />
    </>
  );
}
