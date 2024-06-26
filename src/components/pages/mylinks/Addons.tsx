import { useAddons } from "@/hooks/aggregator"
import type { Addons } from "@/lib/types/aggregator.types"

import Bio from "./Bio"
import Socials from "./Socials"
import TemplatePicker from "./TemplatePicker"

export default function AddonsForm(props: { addons: Addons; user: string; templates: string[] }) {
	const { addons, updateBio, updateSocials, updateTemplate } = useAddons(props.addons)

	return (
		<section class="flex flex-col gap-4">
			<div>
				<h2 class="mb-2 text-xl font-semibold text-black dark:text-gray-400">Bio</h2>
				<Bio current={addons.bio} onUpdate={updateBio} />
			</div>
			<div class="w-full">
				<h2 class="mb-2 text-xl font-semibold text-black dark:text-gray-400">Templates</h2>
				<TemplatePicker
					templates={props.templates}
					current={addons.template}
					user={props.user}
					onUpdate={updateTemplate}
				/>
			</div>
			<div class="w-full">
				<h2 class="mb-2 text-xl font-semibold text-black dark:text-gray-400">Socials</h2>
				<Socials socials={addons.socials} onSave={updateSocials} />
			</div>
		</section>
	)
}
