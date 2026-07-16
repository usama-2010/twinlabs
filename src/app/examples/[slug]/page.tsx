import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const slugMap: Record<string, string> = {
  "salon-booking-platform": "london-hair-co-booking",
  "trades-job-management": "morrison-sons-job-management",
  "accountant-client-portal": "sharma-co-client-portal",
  "ecommerce-storefront": "oak-co-ecommerce",
  "dental-clinic-booking": "bridge-dental-patient-hub",
  "veterinary-practice-system": "pawpath-vet-portal",
  "restaurant-operations": "copper-pot-kitchen-ops",
};

export default async function ExamplesSlugRedirect({ params }: PageProps) {
  const { slug } = await params;
  const target = slugMap[slug] ?? slug;
  redirect(`/work/${target}`);
}
