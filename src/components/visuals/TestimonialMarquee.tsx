"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Review } from "@/types";

type ColumnProps = {
  reviews: Review[];
  direction: "up" | "down";
  duration: number;
};

function TestimonialCard({ review }: { review: Review }) {
  return (
    <blockquote className="testimonial-marquee-card">
      <p className="text-sm leading-relaxed text-foreground/90">
        &ldquo;{review.quote}&rdquo;
      </p>
      <footer className="mt-5">
        <div className="flex items-center gap-3">
          <span className="initials-badge shrink-0">{review.initials}</span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{review.author}</p>
            <p className="truncate text-xs text-muted">
              {review.role}, {review.company}
            </p>
          </div>
        </div>
        <Link
          href={`/work/${review.caseStudySlug}`}
          className="link-arrow mt-3 inline-flex items-center gap-1 text-xs"
        >
          {review.projectLabel}
          <ArrowRight className="h-3 w-3" />
        </Link>
      </footer>
    </blockquote>
  );
}

function TestimonialColumn({ reviews, direction, duration }: ColumnProps) {
  if (reviews.length === 0) return null;

  const items = [...reviews, ...reviews];

  return (
    <div className="testimonial-marquee-col">
      <div
        className={`testimonial-marquee-track testimonial-marquee-${direction}`}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {items.map((review, i) => (
          <TestimonialCard key={`${review.id}-${i}`} review={review} />
        ))}
      </div>
    </div>
  );
}

type TestimonialMarqueeProps = {
  reviews: Review[];
};

export function TestimonialMarquee({ reviews }: TestimonialMarqueeProps) {
  const columns: { items: Review[]; direction: "up" | "down"; duration: number }[] = [
    {
      items: reviews.filter((_, i) => i % 3 === 0),
      direction: "up",
      duration: 48,
    },
    {
      items: reviews.filter((_, i) => i % 3 === 1),
      direction: "down",
      duration: 56,
    },
    {
      items: reviews.filter((_, i) => i % 3 === 2),
      direction: "up",
      duration: 52,
    },
  ];

  return (
    <div className="testimonial-marquee-root" aria-label="Client testimonials">
      {columns.map((col, i) => (
        <TestimonialColumn
          key={i}
          reviews={col.items}
          direction={col.direction}
          duration={col.duration}
        />
      ))}

      <div className="testimonial-marquee-static">
        {reviews.map((review) => (
          <TestimonialCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
