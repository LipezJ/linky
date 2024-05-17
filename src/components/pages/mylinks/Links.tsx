import { useState } from "preact/hooks"

import { useLinks } from "@/hooks/aggregator"
import type { Link } from "@/lib/types/aggregator.types"

import LinkAggCard from "./LinkAggCard"
import LinkEditor from "./LinkEditor"

export default function Links(props: { links: Link[] }) {
	const [mode, setMode] = useState<"add" | "view">("view")
	const { links, addLink, updateLink, removeLink } = useLinks(props.links)

	const switchMode = () => {
		setMode((prev) => (prev === "add" ? "view" : "add"))
	}

	return (
		<>
			<ul class="flex flex-col gap-2">
				{links.map((link, index) => {
					return <LinkAggCard key={index} link={link} onDelete={removeLink} onEdit={updateLink} />
				})}
			</ul>
			{mode === "view" ? (
				<div class="mt-4 flex justify-center rounded-md border-2 border-dashed p-5 text-black dark:text-gray-400 md:mx-6">
					<button
						onClick={switchMode}
						type="button"
						className="w-fit rounded-lg bg-blue-700 px-5 py-2 text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
					>
						<svg
							className="size-6"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								fill-rule="evenodd"
								d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>
				</div>
			) : (
				<div className="mt-4 px-1 md:px-6">
					<LinkEditor link={undefined} onSave={addLink} onCancel={switchMode} />
				</div>
			)}
		</>
	)
}
