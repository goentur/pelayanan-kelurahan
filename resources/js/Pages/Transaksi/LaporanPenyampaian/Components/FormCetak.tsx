import SelectPopover from '@/Components/SelectPopover';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { alertApp } from '@/utils';
import axios from 'axios';
import { Download, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FormCetak({dataJenisLapor}:any) {
     const [loadingBerdasarkanKelurahan, setLoadingBerdasarkanKelurahan] = useState(false);
     const [loadingGabungan, setLoadingGabungan] = useState(false);
     const [dataBerdasarkanUser, setDataBerdasarkanUser] = useState<[]>([]);
     const [dataBerdasarkanKelurahan, setDataBerdasarkanKelurahan] = useState({
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
          setLoadingBerdasarkanKelurahan(true)
          try {
               const response = await axios.post(route("transaksi.laporan-penyampaian.berdasarkan-kelurahan"),{
                    jenisLapor : dataBerdasarkanKelurahan.jenisLapor,
                    kelurahan : dataBerdasarkanKelurahan.kelurahan
               },{
                    responseType: 'blob',
               });
               const blob = new Blob([response.data], { type: response.headers['content-type'] });
               const url = window.URL.createObjectURL(blob);
               const link = document.createElement('a');
               link.href = url;
               link.setAttribute('download', 'berdasarkan-kelurahan-'+dataBerdasarkanKelurahan.kelurahan+'.pdf');
               document.body.appendChild(link);
               link.click();
               document.body.removeChild(link);
               window.URL.revokeObjectURL(url);
          } catch (error) {
               alertApp(error, 'error');
          }finally{
               setLoadingBerdasarkanKelurahan(false)
          }
     };
     const handleSubmitGabungan = async (e: React.FormEvent) => {
          e.preventDefault();
          setLoadingGabungan(true)
          try {
               const response = await axios.post(route("transaksi.laporan-penyampaian.gabungan",dataGabungan.jenisLapor),{},{
                    responseType: 'blob',
               });
               const blob = new Blob([response.data], { type: response.headers['content-type'] });
               const url = window.URL.createObjectURL(blob);
               const link = document.createElement('a');
               link.href = url;
               link.setAttribute('download', 'gabungan.pdf');
               document.body.appendChild(link);
               link.click();
               document.body.removeChild(link);
               window.URL.revokeObjectURL(url);
          } catch (error) {
               alertApp(error, 'error');
          }finally{
               setLoadingGabungan(false)
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
                                   <SelectPopover label="Pilih jenis laporan" selectedValue={dataBerdasarkanKelurahan.jenisLapor} options={dataJenisLapor.map((value : any) => ({ label: value.nama, value: value.id, status : !value.status }))} onSelect={(value) => setDataBerdasarkanKelurahan((prevData:any) => ({ ...prevData, jenisLapor: value }))}/>
                                   <SelectPopover label="Pilih kelurahan" selectedValue={dataBerdasarkanKelurahan.kelurahan} options={dataBerdasarkanUser} onSelect={(value) => setDataBerdasarkanKelurahan((prevData:any) => ({ ...prevData, kelurahan: value }))}/>
                              </div>
                              <Button type="submit" disabled={loadingBerdasarkanKelurahan} className='mt-5'>
                                   {loadingBerdasarkanKelurahan ? <Loader2 className="animate-spin" /> : <Download/>} Unduh
                              </Button>
                         </form>
                    </CardContent>
               </div>
               <div className='w-1/3'>
                    <CardHeader>
                         <CardTitle className="text-2xl uppercase inline-flex"><Download className='me-3'/>GABUNGAN</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <form onSubmit={handleSubmitGabungan} className="mx-auto" target='_blank'>
                              <SelectPopover label="Pilih jenis laporan" selectedValue={dataGabungan.jenisLapor} options={dataJenisLapor.map((value : any) => ({ label: value.nama, value: value.id, status : !value.status }))} onSelect={(value) => setDataGabungan((prevData:any) => ({ ...prevData, jenisLapor: value }))}/>
                              <Button type="submit" disabled={loadingGabungan} className='mt-5'>
                                   {loadingGabungan ? <Loader2 className="animate-spin" /> : <Download/>} Unduh
                              </Button>
                         </form>
                    </CardContent>
               </div>
          </Card>
     </div>
    );
}
