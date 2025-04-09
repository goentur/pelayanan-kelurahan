import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { alertApp } from '@/utils';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { DatabaseBackup, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Index() {
    const judul = "Realisasi"
        const [loading, setLoading] = useState(false);
        const [dataTable, setDataTable] = useState<[]>([]);
    
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setLoading(true);
        try {
            const response = await axios.post(route('dashboard.realisasi.data'));
            setDataTable(response.data);
        } catch (error:any) {
            alertApp(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };
    console.log(dataTable)
    return (
        <AuthenticatedLayout header={judul}>
            <Head title={judul} />
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Realisasi</CardTitle>
                </CardHeader>
                <CardContent>
                    <table className="w-full text-left border-collapse border">
                        <thead className='text-center'>
                            <tr className="uppercase text-sm leading-normal">
                                <th className="p-2 border w-1" rowSpan={2}>BUKU</th>
                                <th className="p-2 border" colSpan={2}>BAKU AWAL</th>
                                <th className="p-2 border" colSpan={2}>BAKU JALAN</th>
                                <th className="p-2 border" colSpan={2}>REALISASI PENYAMPAIAN</th>
                                <th className="p-2 border" colSpan={2}>REALISASI PEMBAYARAN</th>
                            </tr>
                            <tr className="uppercase text-sm leading-normal">
                                <th className="p-2 border">OBJEK PAJAK</th>
                                <th className="p-2 border w-1">KETETAPAN</th>
                                <th className="p-2 border">OBJEK PAJAK</th>
                                <th className="p-2 border w-1">KETETAPAN</th>
                                <th className="p-2 border">OBJEK PAJAK</th>
                                <th className="p-2 border w-1">KETETAPAN</th>
                                <th className="p-2 border">OBJEK PAJAK</th>
                                <th className="p-2 border w-1">KETETAPAN</th>
                            </tr>
                        </thead>
                        <tbody className="font-light">
                            {loading && 
                                <tr>
                                    <td colSpan={9}>
                                        <div className="flex items-center justify-center">
                                            <Loader2 className="animate-spin me-2" size={18} />Mohon Tunggu...
                                        </div>
                                    </td>
                                </tr>
                            }
                            {Object.entries(dataTable).length > 0 ? Object.entries(dataTable).map(([key, value]:any, index) => (
                            <tr key={key} className="hover:bg-gray-100 dark:hover:bg-slate-900">
                                <td className="px-2 py-1 border text-center">{key}</td>
                                <td className="px-2 py-1 border text-end">{value.bakuAwal?.sppt}</td>
                                <td className="px-2 py-1 border text-end">{value.bakuAwal?.jumlah}</td>
                                <td className="px-2 py-1 border text-end">{value.sppt?.sppt}</td>
                                <td className="px-2 py-1 border text-end">{value.sppt?.jumlah}</td>
                                <td className="px-2 py-1 border text-end">{value.penyampaian?.sppt}</td>
                                <td className="px-2 py-1 border text-end">{value.penyampaian?.jumlah}</td>
                                <td className="px-2 py-1 border text-end">{value.pembayaran?.sppt}</td>
                                <td className="px-2 py-1 border text-end">{value.pembayaran?.jumlah}</td>
                            </tr>
                            )):
                                <tr>
                                    <td colSpan={9}>
                                        <div className="flex items-center justify-center">
                                            <DatabaseBackup size={18} className='me-2'/> Data tidak ditemukan
                                        </div>
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
