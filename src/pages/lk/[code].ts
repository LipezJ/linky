import { Link } from "@/lib/link"

import type { APIRoute } from "astro"

export const GET: APIRoute = async ({ params, redirect, cookies }) => {
	const code = params.code

	if (!code) return redirect("/404")

	try {
		const link = await Link.getLink(code, cookies)

		if (!link) return redirect("/404")

		return redirect(link)
	} catch (_) {
		return new Response("Failed to get link", { status: 500 })
	}
}
