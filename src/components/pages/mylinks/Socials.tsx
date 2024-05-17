import { useState } from "preact/hooks";

import type { Socials } from "@/db/types/aggregator.types";

export default function Socials(
  { socials, onSave }: 
  { socials: Socials, onSave: (socials: Partial<Socials>) => void}
) {

  const [mode, setMode] = useState<"view" | "edit">("view");

  const switchMode = () => {
    setMode("edit");
  }

  const save = (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const inputs = form.querySelectorAll("input");
    
    const data = Array.from(inputs)
      .reduce((acc, input) => {
        const key = input.name as keyof Socials
        const value = input.value

        return {
          ...acc,
          [key]: value
        }
      }, {});

    onSave(data);
    setMode("view");
  }

  return (
    <form onSubmit={save}>
      <ul class="flex flex-col gap-1.5 pl-2.5">
        {
          Object.entries(socials).map(([key, value]) => {
            return (
              <li key={key}>
                <label class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  {key}
                </label>
                <input 
                  type="text" 
                  name={key}
                  onKeyPress={switchMode}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="Your social username..." 
                  value={value}
                />
              </li>
            )
          })
        }
      </ul>
      {
        mode === "edit" && 
        <button 
          type="submit"
          class="mt-4 text-sm h-fit w-full font-semibold p-2 rounded-md bg-gray-500/20 dark:bg-gray-400/20"
        >
          Save
        </button>
      }
    </form>
  )
}