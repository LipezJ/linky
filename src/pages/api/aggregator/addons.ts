import { Aggregator } from "@/lib/aggregator";

import type { APIRoute } from "astro";
import type { Addons } from "@/db/types/aggregator.types";

export const POST: APIRoute = async ({ request, cookies }) => {

  const body = await request.json() as Addons;

  try {
    const status = await Aggregator.updateAddons(body, cookies);

    return new Response(status.toString(), { status: 200 });
  } catch (error) {
    return new Response("", { status: 500 });
  }
}