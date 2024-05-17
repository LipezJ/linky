import { Templates } from "@/lib/template"
import { useState } from "preact/hooks";

export default function TemplatePicker(
  { current, user, onUpdate }: 
  { current: string | undefined, user: string, onUpdate: (value: string) => void }
) {

  const templates = Object.keys(Templates.list);
  const [ template, setTemplate ] = useState(current);

  const select = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    setTemplate(target.value);
  }

  const submit = (e: Event) => {
    e.preventDefault();
    if (template) {
      onUpdate(template);
    }
  }
  
  return (
    <form class="pl-2" onSubmit={submit}>
      <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Select an template
      </label>
      <div class="flex items-center justify-center gap-2">
        <select 
          id="countries" 
          onChange={select}
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected>
          {
            current && templates.includes(current) ?
              current :
              "Select a template"
          }
          </option>
          {
            Templates.list &&
              templates.map((template) => {
                if (template === current) return;
                return (
                  <option value={template}>{template}</option>
                )
              })
          }
        </select>
        <a 
          href={`/ag/${user}?tmpl=${template}`}
          target="_blank"
          class="w-fit px-1.5 py-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          Preview
        </a>
      </div>
      {
        template !== current && 
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