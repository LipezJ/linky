import { useState } from "preact/hooks"

export default function Bio({
	current,
	onUpdate,
}: {
	current: string | undefined
	onUpdate: (value: string) => void
}) {
	const [bio, setBio] = useState(current)

	const change = (e: Event) => {
		const target = e.target as HTMLTextAreaElement
		setBio(target.value)
	}

	const submit = (e: Event) => {
		e.preventDefault()
		if (!bio) return
		onUpdate(bio)
	}

	return (
		<form class="flex flex-col " onSubmit={submit}>
			<textarea
				id="bio"
				value={bio}
				onKeyUp={change}
				class="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
				placeholder="Your description or bio..."
			>
				{bio}
			</textarea>
			{bio !== current && (
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
