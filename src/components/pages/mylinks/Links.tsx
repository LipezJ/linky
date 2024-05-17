import { useState } from "preact/hooks";

import LinkEditor from "./LinkEditor";
import LinkAggCard from "./LinkAggCard";

import type { Link } from "@/db/types/aggregator.types";
import { useLinks } from "@/hooks/aggregator";

export default function Link(props: { links: Link[] }) {

  const [ mode, setMode ] = useState<"add" | "view">("view")
  const { links, addLink, updateLink, removeLink } = useLinks(props.links);

  const switchMode = () => {
    setMode(prev => prev === "add" ? "view" : "add")
  }

  return (
    <>
      <ul class="flex flex-col gap-2">
        {
          links.map((link, index) => {
            return <LinkAggCard 
              key={index} 
              link={link} 
              onDelete={removeLink} 
              onEdit={updateLink} 
            />
          })
        }
      </ul>
      {
        mode === "view" ?
        <div class="flex border-dashed border-2 rounded-md justify-center text-black dark:text-gray-400 mt-4 p-5 md:mx-6">
          <button 
            onClick={switchMode}
            type="button"
            className="w-fit px-5 py-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900" 
          >
            <svg className="size-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
        :
        <div className="px-1 md:px-6 mt-4">
          <LinkEditor link={undefined} onSave={addLink} onCancel={switchMode} />
        </div>
      }
    </>
  )
}