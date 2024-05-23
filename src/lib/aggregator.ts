import {
	getAggregator,
	initAggregator,
	updateAggregatorAddons,
	updateAggregatorLinks,
} from "@/db/aggregator"
import type { Addons, Link } from "@/lib/types/aggregator.types"

import type { AstroCookies } from "astro"

export class Aggregator {
	static async init(cookies: AstroCookies) {
		const { error, status } = await initAggregator(cookies)

		if (error) {
			throw new Error()
		}
		return status
	}

	static async get(userName: string | undefined, cookies: AstroCookies) {
		let aggregator = null

		if (userName) {
			const { data, error } = await getAggregator(cookies, userName)
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

		const { error, status } = await updateAggregatorLinks(cookies, links, token)

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

		const { error, status } = await updateAggregatorAddons(cookies, addons, token)

		if (error) {
			throw new Error()
		}
		return status
	}
}
