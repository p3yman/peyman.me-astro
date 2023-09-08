import type { APIRoute } from "astro";
import { z } from "astro/zod";
import { Resend } from 'resend';
import {ContactEmailTemplate} from "@/components/react/ContactEmailTemplate";

const baseFrom = import.meta.env.VERCEL_URL
  ? `https://${import.meta.env.VERCEL_URL}`
  : 'Acme <onboarding@resend.dev>';

export const POST: APIRoute = async ({ request }) => {
  const schema = z.object({
    name: z.string().nonempty().max(50),
    email: z.string().email().trim().toLowerCase(),
    message: z.string().nonempty().max(500),
  });

  try {
    const body = await request.json();
    const validated = schema.parse(body);
    const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);
  
    const data = await resend.sendEmail({
      from: baseFrom,
      to: 'peyman.eskandari@gmail.com',
      subject: `Message from ${validated.name} <${validated.email}>`,
      react: ContactEmailTemplate({
        name: validated.name,
        email: validated.email,
        message: validated.message,
      }),
    });

    if (data.id) {
      return new Response(JSON.stringify({
        success: true,
      }));
    }  
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({
        success: false,
        errors: error.issues.map((issue) => ({
          path: issue.path,
          message: issue.message,
        })),
      }));
    }

    return new Response(JSON.stringify({
      success: false,
    }));
  }

  return new Response(JSON.stringify({
    success: false,
  }));
}