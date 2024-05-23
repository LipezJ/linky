import { createClient } from "./supabase"

import type { UserInfo } from "./types/auth.types"
import type { AstroCookies } from "astro"

export class Auth {
	static async getUserData(cookies: AstroCookies) {
		const { accessToken, refreshToken } = this.getTokens(cookies)

		if (accessToken && refreshToken) {
			const client = createClient(cookies)
			const { data, error } = await client.auth.getUser(accessToken.value)

			if (error) {
				cookies.delete("sb-access-token", {
					path: "/",
				})
				cookies.delete("sb-refresh-token", {
					path: "/",
				})
				cookies.delete("sb-user", {
					path: "/",
				})
				return null
			}

			return data
		}
	}

	static getUserInfo(cookies: AstroCookies) {
		const user = cookies.get("sb-user")

		if (!user) {
			return null
		}

		return JSON.parse(user.value) as UserInfo
	}

	static isSignedIn(cookies: AstroCookies) {
		const { accessToken, refreshToken } = this.getTokens(cookies)

		return Boolean(accessToken && refreshToken)
	}

	private static getTokens(cookies: AstroCookies) {
		const accessToken = cookies.get("sb-access-token")
		const refreshToken = cookies.get("sb-refresh-token")

		return {
			accessToken,
			refreshToken,
		}
	}
}
