import { createClient } from "@/lib/supabase"

import type { Provider } from "@supabase/supabase-js"
import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
	const formData = await request.formData()
	const email = formData.get("email")?.toString()
	const password = formData.get("password")?.toString()
	const provider = formData.get("provider")?.toString()

	const validProviders = ["github"]

	const client = createClient(cookies)

	if (provider && validProviders.includes(provider)) {
		const { data, error } = await client.auth.signInWithOAuth({
			provider: provider as Provider,
			options: {
				redirectTo: `${import.meta.env.PUBLIC_URL}/api/auth/callback`,
			},
		})

		if (error) {
			return new Response(error.message, { status: 500 })
		}

		return redirect(data.url)
	}

	if (!email || !password) {
		return new Response("Email and password are required", { status: 400 })
	}

	const { data, error } = await client.auth.signInWithPassword({
		email,
		password,
	})

	if (error) {
		return new Response(error.message, { status: 500 })
	}

	const { access_token, refresh_token } = data.session

	cookies.set("sb-access-token", access_token, {
		path: "/",
	})
	cookies.set("sb-refresh-token", refresh_token, {
		path: "/",
	})
	cookies.set(
		"sb-user",
		JSON.stringify({
			user_name: data.user.user_metadata.user_name as string,
			avatar_url: data.user.user_metadata.avatar_url as string | undefined,
		}),
		{
			path: "/",
		}
	)

	return redirect("/")
}
