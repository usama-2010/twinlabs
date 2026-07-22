import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  buildConfirmationEmailHtml,
  buildConfirmationEmailText,
} from "@/lib/email/confirmation-email";
import {
  buildEnquiryEmailHtml,
  buildEnquiryEmailText,
} from "@/lib/email/enquiry-email";
import { contactSchema } from "@/lib/validations/contact";
import { siteConfig } from "@/lib/content/site";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.issues },
        { status: 400 }
      );
    }

    const { name, businessName, email, phone, projectPackage, budget, description } = result.data;
    const contactEmail = process.env.CONTACT_EMAIL ?? "info@twinlabs.co.uk";
    const enquiryData = { name, businessName, email, phone, projectPackage, budget, description };
    const confirmationData = { name, businessName, description };

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const from =
        process.env.RESEND_FROM ?? "TwinLabs <info@twinlabs.co.uk>";

      const { data, error } = await resend.emails.send({
        from,
        to: contactEmail,
        replyTo: email,
        subject: `New enquiry from ${businessName}`,
        text: buildEnquiryEmailText(enquiryData),
        html: buildEnquiryEmailHtml(enquiryData),
      });

      if (error) {
        console.error("[Contact API] Resend error (enquiry):", error);
        return NextResponse.json(
          { error: error.message ?? "Failed to send message" },
          { status: 502 }
        );
      }

      console.log("[Contact API] Enquiry email sent:", data?.id);

      const { error: confirmationError } = await resend.emails.send({
        from,
        to: email,
        replyTo: contactEmail,
        subject: `We received your enquiry — ${siteConfig.name}`,
        text: buildConfirmationEmailText(confirmationData),
        html: buildConfirmationEmailHtml(confirmationData),
      });

      if (confirmationError) {
        console.error("[Contact API] Resend error (confirmation):", confirmationError);
      } else {
        console.log("[Contact API] Confirmation email sent to:", email);
      }
    } else {
      console.log("[Contact form submission]", enquiryData);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Contact API error]", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
