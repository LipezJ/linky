export interface Link {
	text: string
	link: string | undefined
}

export interface Socials {
	instagram: string | undefined
	linkedin: string | undefined
	facebook: string | undefined
	github: string | undefined
	tiktok: string | undefined
	x: string | undefined
}

export interface Addons {
	template: string | undefined
	bio: string
	socials: Socials
}

export interface AggregatorData {
	user_name: string
	avatar_url: string | null
	links: Link[]
	addons: Addons
}
