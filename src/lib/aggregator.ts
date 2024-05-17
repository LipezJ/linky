import {
	getAggregator,
	initAggregator,
	updateAggregatorAddons,
	updateAggregatorLinks,
} from "@/db/aggregator"
import type { Addons, Link } from "@/lib/types/aggregator.types"

import type { AstroCookies } from "astro"

export class Aggregator {
	static async init() {
		const { error, status } = await initAggregator()

		if (error) {
			throw new Error()
		}
		return status
	}

	static async get(userName: string | undefined) {
		let aggregator = null

		if (userName) {
			const { data, error } = await getAggregator(userName)
			if (!error) {
				aggregator = data
			}
		}
		return aggregator
	}

	static async updateLinks(links: Link[], cookies: AstroCookies) {
		const token = {
			access_token: cookies.get("sb-access-token")?.value as string,
			refresh_token: cookies.get("sb-refresh-token")?.value as string,
		}

		const { error, status } = await updateAggregatorLinks(links, token)

		if (error) {
			throw new Error()
		}
		return status
	}

	static async updateAddons(addons: Addons, cookies: AstroCookies) {
		const token = {
			access_token: cookies.get("sb-access-token")?.value as string,
			refresh_token: cookies.get("sb-refresh-token")?.value as string,
		}

		const { error, status } = await updateAggregatorAddons(addons, token)

		if (error) {
			throw new Error()
		}
		return status
	}
}
