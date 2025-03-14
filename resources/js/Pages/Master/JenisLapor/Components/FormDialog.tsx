import { Button } from '@/Components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Input } from '@/Components/ui/input';
import { Label } from "@/Components/ui/label";
import clsx from "clsx";
import { Loader2, Save } from 'lucide-react';

import SelectPopover from '@/Components/SelectPopover';
import FormCalendar from '@/Components/FormCalendar';
type FormDialogProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    judul: string;
    data: any;
    setData: (data: any) => void;
    errors: any;
    formRefs: React.RefObject<Record<string, HTMLInputElement | null>>;
    processing: boolean;
    simpanAtauUbah: (e: React.FormEvent) => void;
    tipePenyampaian : []
};
export default function FormDialog({open,setOpen,judul,data,setData,errors,formRefs,processing, simpanAtauUbah,tipePenyampaian}:FormDialogProps) {
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <form onSubmit={simpanAtauUbah}>
                        <DialogHeader>
                            <DialogTitle>Form {judul}</DialogTitle>
                        </DialogHeader>
                        <DialogDescription className="space-y-6 mt-5">
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
                                <Label htmlFor="no_urut" className={clsx({ "text-red-500": errors.no_urut }, "capitalize")}>no urut</Label>
                                <Input
                                    id="no_urut"
                                    name="no_urut"
                                    ref={(el) => {
                                        if (formRefs.current) {
                                            formRefs.current["no_urut"] = el;
                                        }
                                    }}
                                    type="text"
                                    value={data.no_urut}
                                    placeholder="Masukkan no urut"
                                    onChange={(e) => setData((prevData:any) => ({ ...prevData, no_urut: e.target.value }))}
                                    required
                                />
                                {errors.no_urut && <div className="text-red-500 text-xs mt-0">{errors.no_urut}</div>}
                            </div>
                            <SelectPopover label="jenis" selectedValue={data.jenis} options={tipePenyampaian} onSelect={(value) => setData((prevData:any) => ({ ...prevData, jenis: value }))} error={errors.jenis}/>
                            <div className="grid gap-2 w-full">
                                <Label htmlFor="keterangan" className={clsx({ "text-red-500": errors.keterangan }, "capitalize")}>Keterangan</Label>
                                <Input
                                    id="keterangan"
                                    name="keterangan"
                                    ref={(el) => {
                                        if (formRefs.current) {
                                            formRefs.current["keterangan"] = el;
                                        }
                                    }}
                                    type="text"
                                    value={data.keterangan}
                                    placeholder="Masukkan keterangan"
                                    onChange={(e) => setData((prevData:any) => ({ ...prevData, keterangan: e.target.value }))}
                                    required
                                />
                                {errors.keterangan && <div className="text-red-500 text-xs mt-0">{errors.keterangan}</div>}
                            </div>
                            <div className="grid gap-2 w-full">
                                <Label htmlFor="tanggal_awal" className={clsx({ "text-red-500": errors.tanggal_awal }, "capitalize")}>tanggal awal</Label>
                                <FormCalendar
                                    value={data.tanggal_awal}
                                    onChange={(e) => setData((prevData:any) => ({ ...prevData, tanggal_awal: e}))}
                                    tanggalSelanjutnya={true}
                                />
                                {errors.tanggal_awal && <div className="text-red-500 text-xs mt-0">{errors.tanggal_awal}</div>}
                            </div>
                            <div className="grid gap-2 w-full">
                                <Label htmlFor="tanggal_akhir" className={clsx({ "text-red-500": errors.tanggal_akhir }, "capitalize")}>tanggal akhir</Label>
                                <FormCalendar
                                    value={data.tanggal_akhir}
                                    onChange={(e) => setData((prevData:any) => ({ ...prevData, tanggal_akhir: e}))}
                                    tanggalSelanjutnya={true}
                                />
                                {errors.tanggal_akhir && <div className="text-red-500 text-xs mt-0">{errors.tanggal_akhir}</div>}
                            </div>
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
