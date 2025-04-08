// using headlessui for select
// 'use client'

// import { useEffect, useMemo, useState } from 'react'
// import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
// import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
// import { CheckIcon } from '@heroicons/react/20/solid'
// import { categories } from '../../data'
// import { ICategory } from '../../interface'

// const SelectItem = () => {
//     const stableCategories = useMemo(() => categories, []);
//     const [selected, setSelected] = useState(stableCategories[0]);
//     const [isMounted, setIsMounted] = useState(true);

//     useEffect(() => {
//         setIsMounted(true);
//         return () => {
//             setIsMounted(false); 
//         };
//     }, []);

//     const handleChange = (newValue: ICategory) => {
//         if (!isMounted) return; 
//         if (newValue.id !== selected.id) {
//             setSelected(newValue);
//         }
//     };

//     if (!isMounted) return null;

// return (
//     <Listbox value={selected} onChange={handleChange} by="id">
//     <Label className="block text-sm font-medium text-gray-900">Category</Label>
//     <div className="relative mt-2">
//         <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm">
//         <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
//             <img alt="" src={selected.imageURL} className="w-12 h-12 shrink-0 rounded-full" />
//             <span className="block truncate">{selected.name}</span>
//         </span>
//         <ChevronUpDownIcon
//             aria-hidden="true"
//             className="col-start-1 row-start-1 w-5 h-5 self-center justify-self-end text-gray-500 sm:w-4 sm:h-4"
//         />
//         </ListboxButton>

//         <ListboxOptions
//         transition
//         className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden sm:text-sm"
//         >
//         {categories.map((category) => (
//             <ListboxOption
//                 key={category.id}
//             value={category}
//             className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none focus:bg-indigo-600 focus:text-white focus:outline-none"
//             >
//             <div className="flex items-center">
//                 <img alt="" src={category.imageURL} className="w-12 h-12 shrink-0 rounded-full" />
//                 <span className="ml-3 block truncate font-normal group-focus:font-semibold">{category.name}</span>
//             </div>

//             {selected.id === category.id && (
//                 <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-focus:text-white">
//                 <CheckIcon aria-hidden="true" className="w-5 h-5" />
//                 </span>
//             )}
//             </ListboxOption>
//         ))}
//         </ListboxOptions>
//     </div>
//     </Listbox>
// )
// }

// export default SelectItem;



// ########################################################################################################

// using react select 
'use client';


import Select from 'react-select';
import { categories } from '../../data';
import { OptionType } from '../../interface';

interface ISelect {
    selected: OptionType;
    setSelected: (category: OptionType) => void
}

const SelectItem = ({selected, setSelected}: ISelect) => {

    const handleChange = (newValue: OptionType) => {
        if (newValue && newValue.id !== selected.id) {
            setSelected(newValue);
        }
    };

    const options = categories.map((category) => ({
        id: category.id,
        value: category.id,
        name: category.name,
        imageURL: category.imageURL,
    }));

    const customOption = ({ data, innerRef, innerProps }: { data: OptionType; innerRef: React.Ref<any>; innerProps: any }) => (
        <div
            ref={innerRef}
            {...innerProps}
            className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none hover:bg-indigo-600 hover:text-white focus:bg-indigo-600 focus:text-white focus:outline-none"
        >
            <div className="flex items-center">
                <img alt="" src={data.imageURL} className="w-12 h-12 shrink-0 rounded-full" />
                <span className="ml-3 block truncate font-normal group-hover:font-semibold">
                    {data.name}
                </span>
            </div>
            {selected.id === data.id && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-hover:text-white">
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </span>
            )}
        </div>
    );

    const customSingleValue = ({ data }: {data: OptionType}) => (
        <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <img alt="" src={data.imageURL} className="w-12 h-12 shrink-0 rounded-full" />
            <span className="block truncate">{data.name}</span>
        </span>
    );
    const selectedOption = options.find((option) => option.id === selected.id);
    return (
        <div>
            <label className="block text-sm font-medium text-gray-900">Category</label>
            <div className="relative mt-2">
                <Select
                    options={options}
                    name={selectedOption ? selectedOption.name : undefined}
                    onChange={(option) => handleChange(option as OptionType)}
                    components={{ Option: customOption, SingleValue: customSingleValue }}
                    className="w-full"
                    classNamePrefix="react-select"
                    styles={{
                        control: (base) => ({
                            ...base,
                            cursor: 'default',
                            borderRadius: '0.375rem',
                            backgroundColor: 'white',
                            padding: '0.375rem 0.75rem',
                            border: '1px solid rgb(209 213 219)',
                            boxShadow: 'none',
                            '&:hover': {
                                borderColor: 'rgb(209 213 219)',
                            },
                            '&:focus': {
                                outline: '2px solid rgb(79 70 229)',
                                outlineOffset: '-2px',
                            },
                        }),
                        menu: (base) => ({
                            ...base,
                            position: 'absolute',
                            zIndex: 10,
                            marginTop: '0.25rem',
                            maxHeight: '14rem',
                            width: '100%',
                            overflow: 'auto',
                            borderRadius: '0.375rem',
                            backgroundColor: 'white',
                            padding: '0.25rem 0',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                            border: '1px solid rgba(0, 0, 0, 0.05)',
                        }),
                        menuList: (base) => ({
                            ...base,
                            padding: 0,
                        }),
                    }}
                />
            </div>
        </div>
    );
};

export default SelectItem;
