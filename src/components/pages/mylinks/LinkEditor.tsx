import type { Link } from "@/db/types/aggregator.types";

export default function LinkEditor(
  { link, onSave, onCancel }: 
  { link: Link | undefined, onSave: (link: Link) => void, onCancel: () => void }
) {

  const save = (e: Event) => {
    e.preventDefault()
    const formEl = e.target as HTMLFormElement

    if (!formEl) return

    const form = new FormData(formEl)
    const link = {
      text: form.get("text") as string,
      link: form.get("link") as string
    }

    formEl.reset()
    onSave(link)
  }

  return (
    <section className="flex justify-center w-full">
      <form 
        onSubmit={save} 
        className="flex items-center justify-between gap-2 w-full py-2 px-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="flex gap-2 w-full mb-0.5">
          <label class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Name
            <input 
              type="text" 
              name="text"
              class="bg-gray-50 font-normal border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Your social username..." 
              defaultValue={link?.text || ""}
            />
          </label>
          <label class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Link
            <input 
              type="text" 
              name="link"
              class="bg-gray-50 font-normal border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Your social username..." 
              defaultValue={link?.link || ""}
            />
          </label>
        </div>
        <div className="flex justify-end gap-2 text-white font-medium w-fit">
          <button type="submit" className="text-sm font-semibold p-2 rounded-md bg-gray-500/20 dark:bg-gray-400/20">
            <svg className="size-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5"/>
            </svg>
          </button>
          <button 
            type="button"
            onClick={onCancel}
            className="text-sm font-semibold p-2 rounded-md bg-gray-500/20 dark:bg-gray-400/20"
          >
            <svg className="size-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
            </svg>
          </button>
        </div>
      </form>
    </section>
  )
}