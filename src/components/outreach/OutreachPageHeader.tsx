type OutreachPageHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export function OutreachPageHeader({
  eyebrow = "Outreach",
  title,
  subtitle,
}: OutreachPageHeaderProps) {
  return (
    <header className="outreach-page-header">
      <p className="mono-label">{eyebrow}</p>
      <h1 className="outreach-page-title">{title}</h1>
      {subtitle ? <p className="outreach-page-subtitle">{subtitle}</p> : null}
    </header>
  );
}
