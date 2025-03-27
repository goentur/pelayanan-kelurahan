import { Button } from "@/Components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/Components/ui/popover";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/Components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Label } from "./ui/label";

type SelectPopoverProps = {
	label: string;
	selectedValue: string;
	options: { value: string; label: string; status?:boolean }[];
	onSelect: (value: string) => void;
	error?: string;
	autoOpen?: boolean;
};

export default function SelectPopover({ label, selectedValue, options, onSelect, error,autoOpen}: SelectPopoverProps) {
	const [open, setOpen] = useState(false);
	useEffect(() => {
		if (autoOpen) {
			setOpen(true);
		}
	}, [autoOpen]);
	return (
		<div className="grid gap-2 w-full">
			{label && (<Label className={cn({ "text-red-500": error }, "capitalize")}>{label}</Label>)}
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between"
				>
					{selectedValue
					? options.find((d) => d.value === selectedValue)?.label
					: `Pilih ${label}`}
					<ChevronsUpDown className="opacity-50" />
				</Button>
				</PopoverTrigger>
				<PopoverContent className="p-0 w-[--radix-popover-trigger-width]">
				<Command className="w-full">
					<CommandInput placeholder={`Cari ${label}`} className="h-9" />
					<CommandList>
					<CommandEmpty>{label} tidak ada.</CommandEmpty>
					<CommandGroup>
						{options.map((d) => (
						<CommandItem
							key={d.value}
							value={d.value}
							disabled={d.status}
							onSelect={() => {
							onSelect(d.value);
							setOpen(false);
							}}
						>
							{d.label}
							<Check
							className={cn(
								"ml-auto",
								selectedValue === d.value ? "opacity-100" : "opacity-0"
							)}
							/>
						</CommandItem>
						))}
					</CommandGroup>
					</CommandList>
				</Command>
				</PopoverContent>
			</Popover>
			{error && <div className="text-red-500 text-xs mt-0">{error}</div>}
		</div>
	);
}
