import PaginationControls from '@/Components/PaginationControls';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Checkbox } from '@/Components/ui/checkbox';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { alertApp } from '@/utils';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { Loader2, Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import DataTable from './Components/DataTable';

type dataProps = {
    jenisLapor : any
};

export default function Data({jenisLapor}:dataProps) {
    const judul = 'Laporan '+jenisLapor.nama;
    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingKirimData, setLoadingKirimData] = useState(false);
    const [dataTable, setDataTable] = useState<[]>([]);
    const [linksPagination, setLinksPagination] = useState([]);
    const [dataInfo, setDataInfo] = useState({
        currentPage: 1,
        from: 0,
        to: 0,
        totalRecords: 0,
        perPage: 25,
        search: null
    });
        
    useEffect(() => {
        getData();
    }, [dataInfo.currentPage, dataInfo.perPage]);
    const getData = async () => {
        setLoading(true);
        try {
            const response = await axios.post(route('transaksi.laporan-penyampaian.data'), {
                page: dataInfo.currentPage,
                perPage: dataInfo.perPage,
                jenis: jenisLapor.jenis,
            });
            setDataTable(response.data.data);
            setLinksPagination(response.data.links);
            setDataInfo((prev) => ({
                ...prev,
                currentPage: response.data.current_page,
                from: response.data.from,
                to: response.data.to,
                totalRecords: response.data.total,
                perPage: response.data.per_page,
            }));
        } catch (error:any) {
            alertApp(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dataInfo.currentPage = 1
        getData()
    };
    const handleKirimData = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingKirimData(true);
        try {
            const response = await axios.post(route('transaksi.laporan-penyampaian.simpan'), {
                id: jenisLapor.id,
                jenis: jenisLapor.jenis,
            });
            if (response.data.status) {
                setDataTable([]);
                setIsChecked(false);
                setDataInfo((prev) => ({
                    ...prev,
                    currentPage: 1,
                    from: 0,
                    to: 0,
                    totalRecords: 0,
                    perPage: 25,
                }));
                setLinksPagination([]);
                alertApp(response.data.message);
            } else {
                alertApp(response.data.message, 'error');
            }
        } catch (error:any) {
            alertApp(error.message, 'error');
        } finally {
            setLoadingKirimData(false);
        }
    };
    return (
        <AuthenticatedLayout header={judul}>
            <Head title={judul} />
            <Card>
                <CardHeader className='text-center'>
                    <CardTitle className="text-xl uppercase">{judul}</CardTitle>
                    <CardTitle className="text-sm text-green-500">{jenisLapor.tanggal_awal} S.D. {jenisLapor.tanggal_akhir}</CardTitle>
                    <hr className='mt-3 mb-3' />
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="mb-4 mx-auto">
                        <div className="grid gap-4">
                            <div className='grid gap-2 w-1/4'>
                                <Label htmlFor='kelurahan'>Jumlah Perhalaman</Label>
                                <Select onValueChange={(e) => setDataInfo((prev:any) => ({ ...prev, perPage: Number(e), currentPage:1}))}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Jumlah per halaman" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="25">25</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                        <SelectItem value="75">75</SelectItem>
                                        <SelectItem value="100">100</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </form>
                    <DataTable dataTable={dataTable} loading={loading} />
                    <PaginationControls dataInfo={dataInfo} setDataInfo={setDataInfo} linksPagination={linksPagination} />
                </CardContent>
                <CardFooter>
                    <form onSubmit={handleKirimData} className='grid gap-2'>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="persetujuan" checked={isChecked} onCheckedChange={(checked: boolean) => setIsChecked(checked)} required disabled={dataTable.length==0} />
                            <label
                                htmlFor="persetujuan"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Silakan centang kotak di samping untuk mengonfirmasi bahwa data yang dikirim sudah benar dan sesuai.
                            </label>
                        </div>
                        <div>
                            <Button type="submit" disabled={loadingKirimData || dataTable.length==0}>
                                {loadingKirimData ? <Loader2 className="animate-spin" /> : <Send/>} Kirim Data
                            </Button>
                        </div>
                    </form>
                </CardFooter>
            </Card>
        </AuthenticatedLayout>
    );
}
