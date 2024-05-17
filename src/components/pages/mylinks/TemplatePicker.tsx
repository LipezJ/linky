import { useState } from "preact/hooks"

import { Templates } from "@/lib/template"

export default function TemplatePicker({
	current,
	user,
	onUpdate,
}: {
	current: string | undefined
	user: string
	onUpdate: (value: string) => void
}) {
	const templates = Object.keys(Templates.list)
	const [template, setTemplate] = useState(current)

	const select = (e: Event) => {
		const target = e.target as HTMLSelectElement
		setTemplate(target.value)
	}

	const submit = (e: Event) => {
		e.preventDefault()
		if (template) {
			onUpdate(template)
		}
	}

	return (
		<form class="pl-2" onSubmit={submit}>
			<label for="countries" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
				Select an template
			</label>
			<div class="flex items-center justify-center gap-2">
				<select
					id="countries"
					onChange={select}
					class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
				>
					<option selected>
						{current && templates.includes(current) ? current : "Select a template"}
					</option>
					{Templates.list &&
						templates.map((template, index) => {
							if (template === current) return null
							return (
								<option key={index} value={template}>
									{template}
								</option>
							)
						})}
				</select>
				<a
					href={`/ag/${user}?tmpl=${template}`}
					target="_blank"
					class="w-fit rounded-lg bg-blue-700 px-1.5 py-2 text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
				>
					Preview
				</a>
			</div>
			{template !== current && (
				<button
					type="submit"
					class="mt-2 h-fit w-full rounded-md bg-gray-500/20 p-2 text-sm font-semibold dark:bg-gray-400/20"
				>
					Save
				</button>
			)}
		</form>
	)
}
