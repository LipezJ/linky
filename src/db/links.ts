import { supabase } from "@/lib/supabase"

interface Link {
	_link: string
	_link_short_code: string
}

export const createLink = async (link: Link) => {
	return await supabase.rpc("create_short_link", link)
}

export const getLink = async (code: string) => {
	return await supabase.rpc("get_link_by_code", { code })
}
