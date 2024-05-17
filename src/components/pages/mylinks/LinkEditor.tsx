import type { Link } from "@/lib/types/aggregator.types"

export default function LinkEditor({
	link,
	onSave,
	onCancel,
}: {
	link: Link | undefined
	onSave: (link: Link) => void
	onCancel: () => void
}) {
	const save = (e: Event) => {
		e.preventDefault()
		const formEl = e.target as HTMLFormElement

		if (!formEl) return

		const form = new FormData(formEl)
		const link = {
			text: form.get("text") as string,
			link: form.get("link") as string,
		}

		formEl.reset()
		onSave(link)
	}

	return (
		<section className="flex w-full justify-center">
			<form
				onSubmit={save}
				className="flex w-full items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 shadow dark:border-gray-700 dark:bg-gray-800"
			>
				<div className="mb-0.5 flex w-full gap-2">
					<label class="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
						Name
						<input
							type="text"
							name="text"
							class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-normal text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
							placeholder="Your social username..."
							defaultValue={link?.text || ""}
						/>
					</label>
					<label class="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
						Link
						<input
							type="text"
							name="link"
							class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-normal text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
							placeholder="Your social username..."
							defaultValue={link?.link || ""}
						/>
					</label>
				</div>
				<div className="flex w-fit justify-end gap-2 font-medium text-white">
					<button
						type="submit"
						className="rounded-md bg-gray-500/20 p-2 text-sm font-semibold dark:bg-gray-400/20"
					>
						<svg
							className="size-5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M5 11.917 9.724 16.5 19 7.5"
							/>
						</svg>
					</button>
					<button
						type="button"
						onClick={onCancel}
						className="rounded-md bg-gray-500/20 p-2 text-sm font-semibold dark:bg-gray-400/20"
					>
						<svg
							className="size-5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18 17.94 6M18 18 6.06 6"
							/>
						</svg>
					</button>
				</div>
			</form>
		</section>
	)
}
