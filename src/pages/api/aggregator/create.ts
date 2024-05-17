import { Aggregator } from "@/lib/aggregator";

import type { APIRoute } from "astro";

export const POST: APIRoute = async () => {
  try {
    const status = await Aggregator.init();

    return new Response(status.toString(), { status: 200 });
  } catch (error) {
    return new Response("", { status: 500 });
  }
}