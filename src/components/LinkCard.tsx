import { useRef } from "preact/hooks";
import { Tooltip } from "flowbite";
import type { InstanceOptions, TooltipOptions } from 'flowbite';

const options: TooltipOptions = {
  placement: 'top',
  triggerType: 'click'
};

const instanceOptions: InstanceOptions = {
  id: 'tooltipContent',
  override: true
};

export default function LinkCard({ new_link }: { new_link: string }) {

  const targetElement = useRef<HTMLDivElement>(null);
  const triggerElement = useRef<HTMLButtonElement>(null);

  const copyToClipboard = () => {

    navigator.clipboard.writeText(new_link)

    const tooltip = new Tooltip(targetElement.current, triggerElement.current, options, instanceOptions);
    tooltip.show();
  }

  return (
    <div class="p-6 max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div class="flex mb-2 gap-2 items-center w-fit max-w-full break-all">
        <a href={`${new_link}`}>
          <h5 class="text-2xl font-bold tracking-tight text-blue-600 underline">
            {new_link}
          </h5>
        </a>
        <button
          ref={triggerElement}
          type="button"
          class="p-2 border-[2px] border-gray-400 dark:border-gray-200 dark:hover:border-gray-400 hover:border-gray-500 text-gray-500 dark:text-gray-200 dark:hover:text-gray-400 hover:text-gray-600 rounded"
          onClick={copyToClipboard}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="size-4">
            {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
            <path 
              d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z"
              fill="currentColor"
            />
          </svg>
        </button>
        <div
          ref={targetElement}
          role="tooltip"
          class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm border-2 dark:bg-gray-700"
        >
          Copied link!
          <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Here is your link shortener 🔗
      </p>
      <a href={`${new_link}`} target="_blank" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Test it
          <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
      </a>
    </div>
  )
}