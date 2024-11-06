import { Radio, RadioGroup } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function RadioGrp({ selected, setSelected, options = [] }) {
  return (
    <fieldset>
      <RadioGroup value={selected} onChange={setSelected} className='relative -space-y-px border border-purple rounded-2xl w-fit'>
        {options.map((option, optionIdx) => (
          <Radio
            key={option.name}
            value={option.name}
            aria-label={option.name}
            className={classNames(
              optionIdx === 0 ? "rounded-tl-md rounded-tr-md" : "",
              optionIdx === options.length - 1 ? "rounded-bl-md rounded-br-md" : "",
              "group relative flex cursor-pointer flex-col  p-4 focus:outline-none data-[checked]:z-10  md:grid md:grid-cols-3 md:pl-4 md:pr-6"
            )}
          >
            <span className='flex items-center text-sm'>
              <span
                aria-hidden='true'
                className='flex h-4 w-4 items-center justify-center rounded-full border border-purple group-data-[checked]:border-4 group-data-[checked]:bg-white group-data-[focus]:ring-2 group-data-[focus]:ring-purple group-data-[focus]:ring-offset-2'
              >
                <span className='h-1.5 w-1.5 rounded-full bg-dark group-data-[checked]:bg-purple' />
              </span>
              <span className='ml-3 font-medium text-gray-900 text-white'>{option.name}</span>
            </span>
          </Radio>
        ))}
      </RadioGroup>
    </fieldset>
  );
}
