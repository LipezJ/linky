import { useState } from "preact/hooks"

import type { Socials } from "@/lib/types/aggregator.types"

export default function SocialsForm({
	socials,
	onSave,
}: {
	socials: Socials
	onSave: (socials: Partial<Socials>) => void
}) {
	const [mode, setMode] = useState<"view" | "edit">("view")

	const switchMode = () => {
		setMode("edit")
	}

	const save = (e: Event) => {
		e.preventDefault()
		const form = e.target as HTMLFormElement
		const inputs = form.querySelectorAll("input")

		const data = Array.from(inputs).reduce((acc, input) => {
			const key = input.name as keyof Socials
			const value = input.value

			return {
				...acc,
				[key]: value,
			}
		}, {})

		onSave(data)
		setMode("view")
	}

	return (
		<form onSubmit={save}>
			<ul class="flex flex-col gap-1.5 pl-2.5">
				{Object.entries(socials).map(([key, value]) => {
					return (
						<li key={key}>
							<label class="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
								{key}
							</label>
							<input
								type="text"
								name={key}
								onInput={switchMode}
								class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
								placeholder="Your social username..."
								defaultValue={value as string}
							/>
						</li>
					)
				})}
			</ul>
			{mode === "edit" && (
				<button
					type="submit"
					class="mt-4 h-fit w-full rounded-md bg-gray-500/20 p-2 text-sm font-semibold dark:bg-gray-400/20"
				>
					Save
				</button>
			)}
		</form>
	)
}
