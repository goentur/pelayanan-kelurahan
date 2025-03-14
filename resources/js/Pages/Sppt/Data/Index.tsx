import PaginationControls from '@/Components/PaginationControls';
import SelectPopover from '@/Components/SelectPopover';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { alertApp } from '@/utils';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios';
import { Loader2, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import DataTable from './Components/DataTable';

type indexProps = {
    jenisBuku : {
        value : string,
        label : string,
    }[]
};

export default function Index({jenisBuku}:indexProps) {
    const judul = "SPPT";
    const [loading, setLoading] = useState(false);
    const [dataTable, setDataTable] = useState<[]>([]);
    const [dataBerdasarkanUser, setDataBerdasarkanUser] = useState<[]>([]);
    const [linksPagination, setLinksPagination] = useState([]);
    const [dataInfo, setDataInfo] = useState({
        currentPage: 1,
        from: 0,
        to: 0,
        totalRecords: 0,
        perPage: 25,
    });
    const { data, setData, errors} = useForm({
        jenisBuku : '',
        kelurahan : '',
        kd_blok : '',
        no_urut : '',
    });

    useEffect(() => {
        getDataKelurahanBerdasarkanUser();
    }, []);
    
    useEffect(() => {
        if (data.kelurahan) {
            getData();
        }
    }, [dataInfo.currentPage, dataInfo.perPage]);

    const getData = async () => {
        if (data.kelurahan) {
            setLoading(true);
            try {
                const response = await axios.post(route('sppt.data.data'), {
                    page: dataInfo.currentPage,
                    perPage: dataInfo.perPage,
                    jenisBuku: data.jenisBuku,
                    kelurahan: data.kelurahan,
                    kd_blok: data.kd_blok,
                    no_urut: data.no_urut,
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
        }else{
            alertApp('Pilih kelurahan dulu', 'error');
        }
    };

    const getDataKelurahanBerdasarkanUser = async () => {
        try {
            const response = await axios.post(route('master.satuan-kerja.data-berdasarkan-user'));
            setDataBerdasarkanUser(response.data);
        } catch (error:any) {
            alertApp(error.message, 'error');
        }
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dataInfo.currentPage = 1
        getData()
    };
    return (
        <AuthenticatedLayout header={judul}>
            <Head title={judul} />
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">{judul}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="mb-4 mx-auto">
                        <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-3">
                            <div>
                                <div className='mb-3'>
                                    <SelectPopover label="buku" selectedValue={data.jenisBuku} options={jenisBuku} onSelect={(value) => setData((prevData:any) => ({ ...prevData, jenisBuku: value }))} error={errors.jenisBuku}/>
                                </div>
                                <div>
                                    <SelectPopover label="Pilih kelurahan" selectedValue={data.kelurahan} options={dataBerdasarkanUser} onSelect={(value) => setData((prevData:any) => ({ ...prevData, kelurahan: value }))} error={errors.kelurahan}/>
                                </div>
                            </div>
                            <div>
                                <div className="grid gap-2 mb-3">
                                    <Label htmlFor="kd_blok" className="capitalize">kd blok</Label>
                                    <Input
                                        id="kd_blok"
                                        name="kd_blok"
                                        type="text"
                                        value={data.kd_blok}
                                        placeholder="Masukkan kd blok"
                                        onChange={(e) => setData((prevData:any) => ({ ...prevData, kd_blok: e.target.value }))}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="no_urut" className="capitalize">no urut</Label>
                                    <Input
                                        id="no_urut"
                                        name="no_urut"
                                        type="text"
                                        value={data.no_urut}
                                        placeholder="Masukkan no urut"
                                        onChange={(e) => setData((prevData:any) => ({ ...prevData, no_urut: e.target.value }))}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className='mb-2'>
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
                                <div>
                                    <Label>&nbsp;</Label>
                                    <Button type="submit" className='w-full' disabled={loading}>
                                        {loading ? <Loader2 className="animate-spin" /> : <Search/>} Cari
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <DataTable dataTable={dataTable} />
                    <PaginationControls dataInfo={dataInfo} setDataInfo={setDataInfo} linksPagination={linksPagination} />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
