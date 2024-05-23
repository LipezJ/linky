import { createLink, getLink } from "@/db/links"

import type { AstroCookies } from "astro"

export class Link {
	static async createLink(link: string, cookies: AstroCookies) {
		const linkInfo = {
			_link: link,
			_link_short_code: crypto.randomUUID().split("-")[0],
		}

		const { error } = await createLink(cookies, linkInfo)

		if (error) {
			throw new Error()
		}
		return linkInfo._link_short_code
	}

	static async getLink(code: string, cookies: AstroCookies) {
		const res = await getLink(cookies, code)

		if (res.error) {
			throw new Error()
		}
		return res.data as string
	}
}
