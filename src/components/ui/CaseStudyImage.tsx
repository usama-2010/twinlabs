import Image from "next/image";
import { caseStudyImageSrc } from "@/lib/content/case-studies";
import type { CaseStudy } from "@/types";

type CaseStudyImageProps = {
  study: Pick<CaseStudy, "image" | "imageAlt" | "imagePosition">;
  sizes: string;
  className?: string;
  priority?: boolean;
};

export function CaseStudyImage({
  study,
  sizes,
  className = "object-cover",
  priority = false,
}: CaseStudyImageProps) {
  return (
    <Image
      src={caseStudyImageSrc(study.image)}
      alt={study.imageAlt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
      style={{ objectPosition: study.imagePosition ?? "50% 50%" }}
    />
  );
}
