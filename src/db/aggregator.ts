import { supabase } from "@/lib/supabase"

import type { Addons, AggregatorData, Link } from "@/lib/types/aggregator.types"
import type { Token } from "@/lib/types/supabase.types"

export const initAggregator = async () => {
	return await supabase.from("aggregator").insert([{ status: true }])
}

export const getAggregator = async (username: string) => {
	return await supabase
		.from("public_aggregator")
		.select("*")
		.eq("user_name", username)
		.single<AggregatorData>()
}

export const updateAggregatorLinks = async (links: Link[], token: Token) => {
	const {
		data: { user },
	} = await supabase.auth.getUser(token.access_token)

	const response = await supabase.from("aggregator").update({ links }).eq("user_id", user?.id)

	return response
}

export const updateAggregatorAddons = async (addons: Addons, token: Token) => {
	const {
		data: { user },
	} = await supabase.auth.getUser(token.access_token)

	const response = await supabase.from("aggregator").update({ addons }).eq("user_id", user?.id)

	return response
}
