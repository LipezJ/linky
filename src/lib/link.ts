import { createLink, getLink } from "@/db/links"

export class Link {
	static async createLink(link: string) {
		const linkInfo = {
			_link: link,
			_link_short_code: crypto.randomUUID().split("-")[0],
		}

		const { error } = await createLink(linkInfo)

		if (error) {
			throw new Error()
		}
		return linkInfo._link_short_code
	}

	static async getLink(code: string) {
		const res = await getLink(code)

		if (res.error) {
			throw new Error()
		}
		return res.data as string
	}
}
