import Image from "next/image";
import Link from "next/link";

const logos = {
  horizontal: {
    src: "/brand/logo-horizontal.png",
    alt: "TwinLabs",
    width: 790,
    height: 128,
    className: "h-7 w-auto sm:h-8 lg:h-9",
  },
  stacked: {
    src: "/brand/logo-stacked.png",
    alt: "TwinLabs — Web Development, Automation, Digital Solutions",
    width: 664,
    height: 438,
    className: "h-20 w-auto sm:h-24 md:h-28 lg:h-32",
  },
} as const;

type LogoProps = {
  layout?: keyof typeof logos;
  href?: string;
  linked?: boolean;
  className?: string;
  priority?: boolean;
};

export function Logo({
  layout = "horizontal",
  href = "/",
  linked = true,
  className = "",
  priority = false,
}: LogoProps) {
  const logo = logos[layout];

  const content = (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      priority={priority}
      className={`${logo.className} ${className}`.trim()}
    />
  );

  if (linked) {
    return (
      <Link href={href} className="inline-flex shrink-0 transition-opacity hover:opacity-85">
        {content}
      </Link>
    );
  }

  return <div className="inline-flex">{content}</div>;
}
