'use client'
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  MagnifyingGlassIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { MapPinHouseIcon } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"


const addressKey = [
  "nutan nagar", 'korrha', 'lakhe', 'zabara', 'devangana', 'krishnpath', 'lochan path', 'suresh colony', 'prem nagar', 'bundel nagar', 'krishnapuri', 'babugaon', 'dipugarha'
]

export function Commandbox() {
  const router = useRouter();

  const [inputValue, setInputValue] = useState('')
  const handleInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const value = target.value; // Access the input value

    console.log(event.key)
    setInputValue(value);
    if (event.key == 'Enter') {
      // router.push(`/lodge/?search=${value}`)
      window.location.href = `/lodge/?search=${value}`;
    }
    // if()
  };
  return (
    <Command className="rounded-lg border shadow-md md:min-w-[450px]">
      <CommandInput placeholder="Type a command or search..." onKeyUp={handleInput} />
      <CommandList>
        {/* <CommandEmpty>No results found. <br /> <span className="text-xs font-light">Click on Search from more result.</span></CommandEmpty> */}
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <FaceIcon className="mr-2 h-4 w-4" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem disabled>
            <RocketIcon className="mr-2 h-4 w-4" />
            <span>Launch</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <PersonIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
            <span>Mail</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <GearIcon className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Address">
          {
            addressKey.map((key) => (

              <CommandItem key={key}>
                <MapPinHouseIcon className="mr-2 h-4 w-4" />
                <span className="capitalize">{key}</span>
              </CommandItem>
            ))
          }
        </CommandGroup>
        <a href={`/lodge?search=${inputValue}`} className="flex  items-center py-1.5 my-1 px-2 cursor-pointer dark:bg-zinc-800 bg-zinc-300 mx-1 text-sm font-semibold rounded-md">
          <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
          <span className="capitalize">Search for '{inputValue}'</span>
        </a>

      </CommandList>
    </Command>
  )
}
