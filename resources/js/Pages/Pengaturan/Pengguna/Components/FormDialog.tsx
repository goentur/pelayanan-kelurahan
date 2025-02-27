import { Button } from '@/Components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/Components/ui/dialog";
import { Input } from '@/Components/ui/input';
import { Label } from "@/Components/ui/label";
import clsx from "clsx";
import { Check, ChevronsUpDown, Loader2, Save } from 'lucide-react';

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/Components/ui/command";
import InfoPassword from '@/Components/ui/info-password';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { cn } from '@/lib/utils';
import { useState } from 'react';
type FormDialogProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    judul: string;
    data: any;
    setData: (data: any) => void;
    errors: any;
    formRefs: React.RefObject<Record<string, HTMLInputElement | null>>;
    processing: boolean;
    isEdit: boolean;
    simpanAtauUbah: (e: React.FormEvent) => void;
};
export default function FormDialog({open,setOpen,judul,data,setData,errors,formRefs,processing, isEdit,simpanAtauUbah}:FormDialogProps) {
    const [openSelectZonaWaktu, setOpenSelectZonaWaktu] = useState(false)
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <form onSubmit={simpanAtauUbah}>
                        <DialogHeader>
                            <DialogTitle>Form {judul}</DialogTitle>
                        </DialogHeader>
                        <DialogDescription className="space-y-6 mt-5">
                            <div className="flex gap-4">
                                <div className="grid gap-2 w-1/2">
                                    <Label htmlFor="email" className={clsx({ "text-red-500": errors.email }, "capitalize")}>email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        ref={(el) => {
                                            if (formRefs.current) {
                                                formRefs.current["email"] = el;
                                            }
                                        }}
                                        type="email"
                                        value={data.email}
                                        placeholder="Masukkan email"
                                        onChange={(e) => setData((prevData:any) => ({ ...prevData, email: e.target.value }))}
                                        required
                                        readOnly={isEdit}
                                    />
                                    {errors.email && <div className="text-red-500 text-xs mt-0">{errors.email}</div>}
                                </div>
                                <div className="grid gap-2 w-1/2">
                                    <Label htmlFor="nama" className={clsx({ "text-red-500": errors.nama }, "capitalize")}>Nama</Label>
                                    <Input
                                        id="nama"
                                        name="nama"
                                        ref={(el) => {
                                            if (formRefs.current) {
                                                formRefs.current["nama"] = el;
                                            }
                                        }}
                                        type="text"
                                        value={data.nama}
                                        placeholder="Masukkan nama"
                                        onChange={(e) => setData((prevData:any) => ({ ...prevData, nama: e.target.value }))}
                                        required
                                    />
                                    {errors.nama && <div className="text-red-500 text-xs mt-0">{errors.nama}</div>}
                                </div>
                            </div>
                            {!isEdit && (<>
                            <div className="flex gap-4">
                                <div className="grid gap-2 w-1/2">
                                    <Label htmlFor="password" className={clsx({ "text-red-500": errors.password }, "capitalize")}>password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        ref={(el) => {
                                            if (formRefs.current) {
                                                formRefs.current["password"] = el;
                                            }
                                        }}
                                        type="password"
                                        value={data.password}
                                        placeholder="Masukkan password"
                                        onChange={(e) => setData((prevData:any) => ({ ...prevData, password: e.target.value }))}
                                        required
                                    />
                                    {errors.password && <div className="text-red-500 text-xs mt-0">{errors.password}</div>}
                                </div>
                                <div className="grid gap-2 w-1/2">
                                    <Label htmlFor="password_confirmation" className={clsx({ "text-red-500": errors.password_confirmation }, "capitalize")}>konfirmasi password</Label>
                                    <Input
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        placeholder="Masukkan konfirmasi password"
                                        onChange={(e) => setData((prevData:any) => ({ ...prevData, password_confirmation: e.target.value }))}
                                        required
                                    />
                                </div>
                            </div>
                            <InfoPassword/>
                            </>)}
                        </DialogDescription>
                        <DialogFooter>
                            <div className="flex items-center mt-5">
                                <Button type="submit" disabled={processing}>
                                    {processing ? <Loader2 className="animate-spin" /> : <Save/>} Simpan
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
