import { createClient } from "@/lib/supabase"
import type { Addons, AggregatorData, Link } from "@/lib/types/aggregator.types"
import type { Token } from "@/lib/types/supabase.types"

import type { AstroCookies } from "astro"

export const initAggregator = async (cookies: AstroCookies) => {
	const client = createClient(cookies)
	return await client.from("aggregator").insert([{ status: true }])
}

export const getAggregator = async (cookies: AstroCookies, username: string) => {
	const client = createClient(cookies)
	return await client
		.from("public_aggregator")
		.select("*")
		.eq("user_name", username)
		.single<AggregatorData>()
}

export const updateAggregatorLinks = async (cookies: AstroCookies, links: Link[], token: Token) => {
	const client = createClient(cookies)

	const {
		data: { user },
	} = await client.auth.getUser(token.access_token)
	const response = await client.from("aggregator").update({ links }).eq("user_id", user?.id)

	return response
}

export const updateAggregatorAddons = async (
	cookies: AstroCookies,
	addons: Addons,
	token: Token
) => {
	const client = createClient(cookies)

	const {
		data: { user },
	} = await client.auth.getUser(token.access_token)
	const response = await client.from("aggregator").update({ addons }).eq("user_id", user?.id)

	return response
}
