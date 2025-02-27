import { Button } from '@/Components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Input } from '@/Components/ui/input';
import { Label } from "@/Components/ui/label";
import clsx from "clsx";
import { Loader2, Save } from 'lucide-react';

import SelectPopover from '@/Components/SelectPopover';
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
    dataJabatan: { value: string; label: string }[];
};
export default function FormDialog({open,setOpen,judul,data,setData,errors,formRefs,processing, isEdit,simpanAtauUbah,dataJabatan}:FormDialogProps) {
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
                                <div className="grid gap-2 w-full">
                                    <Label htmlFor="nik" className={clsx({ "text-red-500": errors.nik }, "capitalize")}>nik</Label>
                                    <Input
                                        id="nik"
                                        name="nik"
                                        ref={(el) => {
                                            if (formRefs.current) {
                                                formRefs.current["nik"] = el;
                                            }
                                        }}
                                        type="text"
                                        value={data.nik}
                                        placeholder="Masukkan nik"
                                        onChange={(e) => setData((prevData:any) => ({ ...prevData, nik: e.target.value }))}
                                        required
                                    />
                                    {errors.nik && <div className="text-red-500 text-xs mt-0">{errors.nik}</div>}
                                </div>
                                <div className="grid gap-2 w-full">
                                    <Label htmlFor="nip" className={clsx({ "text-red-500": errors.nip }, "capitalize")}>nip</Label>
                                    <Input
                                        id="nip"
                                        name="nip"
                                        ref={(el) => {
                                            if (formRefs.current) {
                                                formRefs.current["nip"] = el;
                                            }
                                        }}
                                        type="text"
                                        value={data.nip}
                                        placeholder="Masukkan nip"
                                        onChange={(e) => setData((prevData:any) => ({ ...prevData, nip: e.target.value }))}
                                    />
                                    {errors.nip && <div className="text-red-500 text-xs mt-0">{errors.nip}</div>}
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="grid gap-2 w-full">
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
                                <div className="grid gap-2 w-full">
                                    <Label htmlFor="no rekening" className={clsx({ "text-red-500": errors.no_rekening }, "capitalize")}>no rekening</Label>
                                    <Input
                                        id="no_rekening"
                                        name="no_rekening"
                                        ref={(el) => {
                                            if (formRefs.current) {
                                                formRefs.current["no_rekening"] = el;
                                            }
                                        }}
                                        type="text"
                                        value={data.no_rekening}
                                        placeholder="Masukkan no rekening"
                                        onChange={(e) => setData((prevData:any) => ({ ...prevData, no_rekening: e.target.value }))}
                                        required
                                    />
                                    {errors.no_rekening && <div className="text-red-500 text-xs mt-0">{errors.no_rekening}</div>}
                                </div>
                            </div>
                            <SelectPopover label="jabatan" selectedValue={data.jabatan} options={dataJabatan} onSelect={(value) => setData((prevData:any) => ({ ...prevData, jabatan: value }))} error={errors.jabatan}/>
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
