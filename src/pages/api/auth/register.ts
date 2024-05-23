import { createClient } from "@/lib/supabase"

import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
	const formData = await request.formData()
	const email = formData.get("email")?.toString()
	const password = formData.get("password")?.toString()
	const user_name = formData.get("username")?.toString()

	if (!email || !password) {
		return new Response("Email and password are required", { status: 400 })
	}
	const client = createClient(cookies)
	const { error } = await client.auth.signUp({
		email,
		password,
		options: {
			data: {
				user_name,
			},
		},
	})

	if (error) {
		return new Response(error.message, { status: 500 })
	}

	return redirect("/signin")
}
