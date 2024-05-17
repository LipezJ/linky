import { Aggregator } from "@/lib/aggregator"
import type { Link } from "@/lib/types/aggregator.types"

import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request, cookies }) => {
	const body = (await request.json()) as Link[]

	try {
		const status = await Aggregator.updateLinks(body, cookies)

		return new Response(status.toString(), { status: 200 })
	} catch (error) {
		return new Response("", { status: 500 })
	}
}
