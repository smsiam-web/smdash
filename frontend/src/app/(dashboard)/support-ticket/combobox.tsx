"use client"

import * as React from "react"

import { Button } from "../../components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover"

type Status = {
  value: string
  label: string
}

const statuses: Status[] = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "new",
    label: "New",
  },
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "closed",
    label: "Closed",
  },
]

export function ComboboxPopover() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")


  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm text-muted-foreground hidden md:flex">Short by</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
          {value
            ? statuses.find((statuse) => statuse.value === value)?.label
            : "Date Created"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={(value) => {
                      setValue(
                        value === value ? "" : value
                      )                
                      setOpen(false)
                    }}
                  >
                    {status.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
