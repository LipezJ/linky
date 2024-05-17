import { useAddons } from "@/hooks/aggregator"

import Socials from "./Socials"
import TemplatePicker from "./TemplatePicker"
import Bio from "./Bio"

import type { Addons } from "@/db/types/aggregator.types"

export default function Addons(props: { addons: Addons, user: string}) {

  const { 
    addons, 
    updateBio, 
    updateSocials, 
    updateTemplate 
  } = useAddons(props.addons);

  return (
    <section class="flex flex-col gap-4">
      <div>
        <h2 class="text-xl mb-2 font-semibold text-black dark:text-gray-400">
          Bio
        </h2>
        <Bio current={addons.bio} onUpdate={updateBio} />
      </div>
      <div class="w-full">
        <h2 class="text-xl mb-2 font-semibold text-black dark:text-gray-400">
          Templates
        </h2>
        <TemplatePicker 
          current={addons.template} 
          user={props.user} 
          onUpdate={updateTemplate}
        />
      </div>
      <div class="w-full">
        <h2 class="text-xl mb-2 font-semibold text-black dark:text-gray-400">
          Socials
        </h2>
        <Socials socials={addons.socials} onSave={updateSocials} />
      </div>
    </section>
  )
}