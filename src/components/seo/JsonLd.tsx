type JsonLdProps = {
  data: string;
};

/** Injects Schema.org JSON-LD. `data` must be pre-serialized JSON. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: data }}
    />
  );
}
