import { Link } from "@/lib/link"

import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request, redirect }) => {
	const form = await request.formData()
	const link = form.get("link")?.toString()

	if (!link) {
		return new Response("Link is required", { status: 400 })
	}

	try {
		const new_link_code = await Link.createLink(link)
		const new_link = `${import.meta.env.PUBLIC_URL}/lk/${new_link_code}`

		return redirect(`/short?${new URLSearchParams({ new_link, link }).toString()}`)
	} catch (_) {
		return new Response("Failed to create link", { status: 500 })
	}
}
