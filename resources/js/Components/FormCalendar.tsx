import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { Calendar } from "@/Components/ui/calendar";
import { Input } from "@/Components/ui/input";
import { format } from "date-fns";

interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  label?: string;
  autoOpen?: boolean;
  tanggalSelanjutnya?: boolean | false;
}

export default function FormCalendar({ value, onChange, label,autoOpen,tanggalSelanjutnya }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (autoOpen) {
      setOpen(true);
    }
  }, [autoOpen]);
  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Input
              id="nama"
              name="nama"
              type="text"
              value={value ? format(value, "dd-MM-yyyy") : ""}
              placeholder="Pilih tanggal"
              readOnly
              required
              className="cursor-pointer"
          />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date:any) => {
              onChange(date);
              setOpen(false);
            }}
            disabled={tanggalSelanjutnya ? false : (date) => date > new Date()}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
