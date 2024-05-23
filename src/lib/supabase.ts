import { createServerClient } from "@supabase/ssr"

import type { AstroCookieSetOptions, AstroCookies } from "astro"

export const createClient = (cookies: AstroCookies) => {
	return createServerClient(
		import.meta.env.PUBLIC_SUPABASE_URL,
		import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
		{
			auth: {
				flowType: "pkce",
			},
			cookies: {
				get(key) {
					return cookies.get(key)?.value
				},
				set(key, value, options: AstroCookieSetOptions) {
					cookies.set(key, value, options)
				},
				remove(key, options: AstroCookieSetOptions) {
					cookies.delete(key, options)
				},
			},
		}
	)
}
