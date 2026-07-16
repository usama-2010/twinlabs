import { Reveal } from "@/components/ui/Reveal";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  titleEm?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  titleEm,
  subtitle,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl";

  return (
    <Reveal className={`${alignClass} ${className}`.trim()}>
      {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
      <h2 className="section-title mt-3">
        {title}
        {titleEm ? (
          <>
            <br />
            <span className="font-display italic">{titleEm}</span>
          </>
        ) : null}
      </h2>
      {subtitle ? <p className="lede mt-4">{subtitle}</p> : null}
    </Reveal>
  );
}
