import { type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "ghost";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({
  children,
  href,
  variant = "solid",
  className = "",
  type = "button",
  onClick,
  disabled,
}: ButtonProps) {
  const solid =
    "bg-foreground text-surface px-6 py-3 font-medium hover:bg-foreground/90";
  const ghost =
    "text-foreground font-medium underline underline-offset-4 decoration-border hover:decoration-foreground px-0 py-0";

  const base = `inline-flex items-center justify-center gap-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground disabled:opacity-50 disabled:cursor-not-allowed ${variant === "solid" ? solid : ghost} ${className}`;

  if (href) return <a href={href} className={base}>{children}</a>;
  return (
    <button type={type} className={base} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
