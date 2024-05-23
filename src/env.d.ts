/// <reference path="../.astro/types.d.ts" />
/// <reference path="@/.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly PUBLIC_SUPABASE_URL: string
	readonly PUBLIC_SUPABASE_ANON_KEY: string
	readonly PUBLIC_URL: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}

declare namespace App {
	interface Locals {
		user:
			| undefined
			| {
					id: string
					user_metadata: {
						[key: string]: string
					}
			  }
	}
}
