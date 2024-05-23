import { createClient } from "@/lib/supabase"

import type { APIRoute } from "astro"

export const GET: APIRoute = async ({ cookies, redirect }) => {
	cookies.delete("sb-access-token", { path: "/" })
	cookies.delete("sb-refresh-token", { path: "/" })
	cookies.delete("sb-user", { path: "/" })

	const client = createClient(cookies)
	await client.auth.signOut()

	return redirect("/")
}
