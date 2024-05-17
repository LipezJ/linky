import { useState } from "preact/hooks";

import type { Link } from "@/db/types/aggregator.types";
import LinkEditor from "./LinkEditor";

export default function LinkAggCard(
  { link, onEdit, onDelete }: 
  { link: Link, onEdit: (oldLink: Link, newLink: Link) => void, onDelete: (link: Link) => void }
) {

  const [ mode, setMode ] = useState<"edit" | "view">("view")

  const switchMode = () => {
    setMode(prev => prev === "edit" ? "view" : "edit")
  }

  const editLink = (newLink: Link) => {
    onEdit(link, newLink);
    switchMode();
  }

  const deleteLink = () => {
    onDelete(link);
  }

  return (
    <li className="flex justify-center w-full px-1 md:px-6">
      {
        mode === "view" ?
        <section 
          class="flex items-center justify-between gap-2 w-full p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <div>
            <h5 class="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              {link.text}
            </h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">
              {link.link}
            </p>
          </div>
          <form class="flex gap-2">
            <button 
              onClick={switchMode}
              type="button"
              class="text-sm font-semibold p-2 rounded-md bg-gray-500/20 text-gray-500 dark:bg-gray-400/20 dark:text-gray-400"
            >
              <svg className="size-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd"/>
                <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd"/>
              </svg>
            </button>
            <button 
              onClick={deleteLink}
              type="button"
              class="text-sm font-semibold p-2 rounded-md bg-gray-500/20 text-gray-500 dark:bg-gray-400/20 dark:text-gray-400"
            >
              <svg 
                className="size-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  fill-rule="evenodd" 
                  d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" 
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </form>
        </section>
        :
        <LinkEditor link={link} onSave={editLink} onCancel={switchMode} />
      }
    </li>
  )
}