import { useState } from "preact/hooks"

export default function Bio(
  {current, onUpdate}:
  {current: string | undefined, onUpdate: (value: string) => void}
) {
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
        class="block p-2.5 w-full text-sm resize-none text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        placeholder="Your description or bio..."
      >
        {bio}
      </textarea>
      {
        bio !== current && 
        <button 
          type="submit"
          class="mt-2 text-sm h-fit w-full font-semibold p-2 rounded-md bg-gray-500/20 dark:bg-gray-400/20"
        >
          Save
        </button>
      }
  </form>
  )
}