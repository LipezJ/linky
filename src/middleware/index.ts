import { defineMiddleware } from "astro:middleware"

import { Auth } from "@/lib/auth"
import { PRIVATE_ROUTES } from "@/lib/const"

export const onRequest = defineMiddleware(async (context, next) => {
	if (PRIVATE_ROUTES.includes(context.url.pathname)) {
		const user = await Auth.getUserData(context.cookies)

		if (user) {
			context.locals.user = user.user
		}
	}

	return next()
})
