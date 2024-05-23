import { Aggregator } from "@/lib/aggregator"

import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ cookies }) => {
	try {
		const status = await Aggregator.init(cookies)

		return new Response(status.toString(), { status: 200 })
	} catch (error) {
		return new Response("", { status: 500 })
	}
}
