import type { APIRoute } from "astro";
import { z } from "astro/zod";

export const POST: APIRoute = ({ request }) => {
  const schema = z.object({
    name: z.string().nonempty().max(50),
    email: z.string().email().trim().toLowerCase(),
    message: z.string().nonempty().max(500),
  });
  
  return new Response(JSON.stringify({
      message: "This was a POST request!"
    })
  )
}