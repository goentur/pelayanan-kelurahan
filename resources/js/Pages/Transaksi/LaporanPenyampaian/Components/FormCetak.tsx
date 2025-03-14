import SelectPopover from '@/Components/SelectPopover';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { alertApp } from '@/utils';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { Download, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FormCetak({dataJenisLapor}:any) {
     
     const [loadingKelurahan, setloadingKelurahan] = useState(false);
     const [loadingGabungan, setloadingGabungan] = useState(false);
     const [dataBerdasarkanUser, setDataBerdasarkanUser] = useState<[]>([]);
     const [dataKelurahan, setDataKelurahan] = useState({
          jenisLapor: '',
          kelurahan: '',
     });
     const [dataGabungan, setDataGabungan] = useState({
        jenisLapor: '',
     });
     const getDataKelurahanBerdasarkanUser = async () => {
          try {
               const response = await axios.post(route('master.satuan-kerja.data-berdasarkan-user'));
               setDataBerdasarkanUser(response.data);
          } catch (error:any) {
               alertApp(error.message, 'error');
          }
     };
     const handleSubmitKelurahan = async (e: React.FormEvent) => {
        e.preventDefault();
          try {
               const response = await axios.post(route('master.satuan-kerja.data-berdasarkan-user'));
               setDataBerdasarkanUser(response.data);
          } catch (error:any) {
               alertApp(error.message, 'error');
          }
     };
     const handleSubmitGabungan = async (e: React.FormEvent) => {
        e.preventDefault();
        setloadingGabungan(true)
        try {
            const response = await axios.get(route("laporan.download"), {
                responseType: "blob",
            });
            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "laporan.pdf");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
          } catch (error:any) {
               alertApp(error.message, 'error');
          }finally{
               setloadingGabungan(false)
          }
     };
     useEffect(() => {
          getDataKelurahanBerdasarkanUser();
     }, []);
    return (
     <div>
          <Card className='mt-5 flex'>
               <div className='w-2/3'>
                    <CardHeader>
                         <CardTitle className="text-2xl uppercase inline-flex"><Download className='me-3'/> BERDASARKAN KELURAHAN</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <form onSubmit={handleSubmitKelurahan} className="mx-auto">
                              <div className="grid gap-4 lg:grid-cols-2">
                                   <SelectPopover label="Pilih jenis laporan" selectedValue={dataKelurahan.jenisLapor} options={dataJenisLapor.map((value : any) => ({ label: value.nama, value: value.id }))} onSelect={(value) => setDataKelurahan((prevData:any) => ({ ...prevData, jenisLapor: value }))}/>
                                   <SelectPopover label="Pilih kelurahan" selectedValue={dataKelurahan.kelurahan} options={dataBerdasarkanUser} onSelect={(value) => setDataKelurahan((prevData:any) => ({ ...prevData, kelurahan: value }))}/>
                              </div>
                              <Button type="submit" className='mt-5' disabled={loadingKelurahan}>
                                   {loadingKelurahan ? <Loader2 className="animate-spin" /> : <Download/>} Unduh
                              </Button>
                         </form>
                    </CardContent>
               </div>
               <div className='w-1/3'>
                    <CardHeader>
                         <CardTitle className="text-2xl uppercase inline-flex"><Download className='me-3'/>GABUNGAN</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <form onSubmit={handleSubmitGabungan} className="mx-auto">
                              <SelectPopover label="Pilih jenis laporan" selectedValue={dataGabungan.jenisLapor} options={dataJenisLapor.map((value : any) => ({ label: value.nama, value: value.id }))} onSelect={(value) => setDataGabungan((prevData:any) => ({ ...prevData, jenisLapor: value }))}/>
                              <Button type="submit" className='mt-5' disabled={loadingGabungan}>
                                   {loadingGabungan ? <Loader2 className="animate-spin" /> : <Download/>} Unduh
                              </Button>
                         </form>
                    </CardContent>
               </div>
          </Card>
     </div>
    );
}
