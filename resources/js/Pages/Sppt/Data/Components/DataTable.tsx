import { Button } from '@/Components/ui/button';
import { DatabaseBackup, Eye, Info, Loader2 } from 'lucide-react';

type DataTableProps = {
    loading: boolean;
    dataTable: any[];
};

export default function DataTable({ loading, dataTable }: DataTableProps) {
    return (
        <div>
            <table className="w-full text-left border-collapse border">
                <thead className="text-center text-sm">
                <tr className="uppercase leading-normal">
                    <th colSpan={3} className="px-2 border w-1">NOP</th>
                    <th className="px-2 border">Nama</th>
                    <th className="px-2 border">Alamat</th>
                    <th className="px-2 border w-1">Pajak</th>
                    <th className="px-2 border w-1">Bayar?</th>
                    <th className="px-2 border w-1">Aksi</th>
                </tr>
                </thead>
                <tbody className="font-light text-xs">
                {loading && (
                    <tr>
                        <td className='p-1' colSpan={8}>
                            <div className="flex items-center justify-center">
                                <Loader2 className="animate-spin me-2" size={18} />Mohon Tunggu...
                            </div>
                        </td>
                    </tr>
                )}
                {dataTable.length > 0 ? (
                    dataTable.map((value: any, index: number) => (
                    <tr key={index} className="hover:bg-gray-100 dark:hover:bg-slate-900">
                        <td className="px-2 py-1 border w-1">{value.blok}</td>
                        <td className="px-2 py-1 border w-1">{value.no}</td>
                        <td className="px-2 py-1 border w-1">{value.jenis}</td>
                        <td className="px-2 py-1 border">
                            <p className='font-bold'>{value.nama}</p>
                            <p className='text-[10px]'>{value.alamat_wp}</p>
                        </td>
                        <td className="px-2 py-1 border">{value.alamat_op}</td>
                        <td className="px-2 py-1 border text-end">{value.pajak}</td>
                        <td className="px-2 py-1 border">
                            <span className={`px-1 rounded text-white ${value.status.status?'bg-green-500':'bg-red-500'}`}>{value.status.text}</span> 
                        </td>
                        <td className="px-2 py-1 border">
                            <Button size="icon">
                                <Info />
                            </Button>
                        </td>
                    </tr>
                    ))
                ) : (!loading ?
                    <tr>
                        <td colSpan={8}>
                            <div className="flex items-center justify-center">
                            <DatabaseBackup size={18} className="me-2" /> Data tidak ditemukan
                            </div>
                        </td>
                    </tr>
                :null)}
                </tbody>
            </table>
        </div>
    );
}
