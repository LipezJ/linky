import { createClient } from "@/lib/supabase"

import type { AstroCookies } from "astro"

interface Link {
	_link: string
	_link_short_code: string
}

export const createLink = async (cookies: AstroCookies, link: Link) => {
	const client = createClient(cookies)
	return await client.rpc("create_short_link", link)
}

export const getLink = async (cookies: AstroCookies, code: string) => {
	const client = createClient(cookies)
	return await client.rpc("get_link_by_code", { code })
}
