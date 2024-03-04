import type { APIRoute } from "astro";

import { createLink } from "../../db/links";

export const POST: APIRoute = async ({ request, redirect }) => {

  const form = await request.formData();
  const link = form.get("link")?.toString();

  if (!link) {
    return new Response("Link is required", { status: 400 });
  }
  
  const new_link_code = await createLink(link);
  const new_link = `${import.meta.env.PUBLIC_URL}/lk/${new_link_code}`;

  return redirect("/short?" + new URLSearchParams({
    new_link: new_link,
    link: link
  }));
}