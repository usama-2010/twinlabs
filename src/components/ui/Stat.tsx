interface StatProps {
  value: string;
  label: string;
  light?: boolean;
}

export function Stat({ value, label, light = false }: StatProps) {
  return (
    <div>
      <p
        className={`text-3xl font-bold tabular-nums tracking-tight md:text-4xl ${
          light ? "text-white" : "text-foreground"
        }`}
      >
        {value}
      </p>
      <p
        className={`mt-1 text-sm ${light ? "text-navy-muted" : "text-muted"}`}
      >
        {label}
      </p>
    </div>
  );
}
