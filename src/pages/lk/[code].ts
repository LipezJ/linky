import type { APIRoute } from "astro"

import { getLink } from "@/db/links"

export const GET: APIRoute = async ({ params, redirect }) => {
	const code = params.code

	if (!code) return redirect("/404")

	const link = await getLink(code)

	if (!link) return redirect("/404")

	return redirect(link)
}
