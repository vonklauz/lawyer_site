import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react"
import { Fragment } from "react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import styles from './Select.module.css'

interface SelectProps {
    options: { label: string; value: any }[]
    value?: any
    onChange: (value: any) => void
    placeholder?: string
    className?: string
}

export const Select = ({ options, value, onChange, placeholder = "Select option", className = "" }: SelectProps) => {
    const selectedOption = options.find(option => option.value === value)

    return (
        <Menu as="div" className={`relative inline-block text-left ${className}`}>
            <MenuButton className="inline-flex w-full items-center bg-white text-sm font-medium text-blue hover:bg-gray-50 focus:outline-none" title={placeholder}>
                <span className={`block text-left line-clamp-2 text-[16px] ${styles.companyName}`}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDownIcon
                    className="h-5 w-5 flex-shrink-0"
                    aria-hidden="true"
                />
            </MenuButton>

            <MenuItems className="absolute right-0 z-10 mt-2 w-full origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div>
                    {options.map((option) => (
                        <MenuItem key={option.value} as={Fragment}>
                            {({ active }) => (
                                <button
                                    onClick={() => onChange(option.value)}
                                    className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                        } ${value === option.value ? 'bg-gray-50' : ''
                                        } group flex w-full items-center px-4 py-2 text-sm`}
                                >
                                    {option.label}
                                </button>
                            )}
                        </MenuItem>
                    ))}
                </div>
            </MenuItems>
        </Menu>
    )
}