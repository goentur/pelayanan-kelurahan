import FormCalendar from "@/Components/FormCalendar";
import SelectPopover from "@/Components/SelectPopover";
import axios from "axios";
import { Check, DatabaseBackup, Loader2, X } from 'lucide-react';
import { useEffect, useState } from "react";

type DataTableProps = {
    gate: {
        create: boolean;
        update: boolean;
    };
    dataTable: any[];
    dataInfo: number;
    dataPenyampaianKeterangan: any[];
};

export default function DataTable({ gate, dataTable, dataPenyampaianKeterangan }: DataTableProps) {
    const [loadingState, setLoadingState] = useState<{ [key: string]: boolean }>({});
    const [selectedItemTabel, setSelectedItemTabel] = useState<{ [key: string]: boolean }>({});
    const [editedData, setEditedData] = useState<{ [key: string]: { ya?: any; tidak?: string } }>({});
    const [tipe, setTipe] = useState<{ [key: string]: { type: boolean; message: string } | null }>({});
    const [messages, setMessages] = useState<{ [key: string]: { type: boolean; message: string } | null }>({});

    const handleSelectItem = (index: string, isYes: boolean) => {
        setSelectedItemTabel((prev) => ({ ...prev, [index]: isYes }));
    };

    const handleChange = async (id: string, type: "ya" | "tidak", value: any,nominal: string) => {
        setLoadingState((prev) => ({ ...prev, [id]: true }));
        try {
            const response = await axios.post(route('transaksi.penyampaian.store'), {
                id: id,
                type: type,
                nominal: nominal,
                value: value,
            });
            setEditedData((prev) => ({
                ...prev,
                [id]: {
                    ya: type === "ya" ? value : null,
                    tidak: type === "tidak" ? value : null,
                },
            }));
            setTipe((prev) => ({
                ...prev,
                [id]: { type: response.data?.tipe.status, message: response.data?.tipe.value},
            }));
            setMessages((prev) => ({
                ...prev,
                [id]: { type: response.data?.status, message: response.data?.message},
            }));
        } catch (error:any) {
            setMessages((prev) => ({
                ...prev,
                [id]: { type: false, message: "GAGAL"},
            }));
        } finally {
            setLoadingState((prev) => ({ ...prev, [id]: false }));
        }
    };
    useEffect(() => {
        dataTable.forEach((value: any) => {
            if(value.penyampaian){
                setTipe((prev) => ({
                    ...prev,
                    [value.id]: { type: value.penyampaian.tipe.status, message: value.penyampaian.tipe.label},
                }));
                if (value.penyampaian.status.status) {
                    setSelectedItemTabel((prev) => ({ ...prev, [value.id]: value.penyampaian.tipe.status }));
                    setEditedData((prev) => ({
                        ...prev,
                        [value.id]: {
                            ya: value.penyampaian.tipe.status ? new Date(value.penyampaian.tipe.value) : null,
                            tidak: value.penyampaian.tipe.status ? null : value.penyampaian.tipe.value,
                        },
                    }));
                }
                setMessages((prev) => ({
                    ...prev,
                    [value.id]: { type: value.penyampaian.status.status, message: value.penyampaian.status.value},
                }));
            }
        });
    }, [dataTable]);
    return (
        <div>
            <ul className="mb-2 list-disc list-inside bg-blue-200 p-2 text-black rounded">
                <li>Pilih data yang ingin diperbarui.</li>
                <li>
                    Tentukan status penyampaian dengan memilih <button className="p-0 bg-green-500 text-white m-0 rounded hover:bg-green-600"><Check size={18} /></button> atau <button className="p-0 bg-red-500 text-white m-0 rounded hover:bg-red-600"><X size={18} /></button>:
                    <ul className="ml-4 list-disc list-inside">
                        <li>Jika memilih <button className="p-0 bg-green-500 text-white m-0 rounded hover:bg-green-600"><Check size={18} /></button>, pilih tanggal penyampaian pada kolom keterangan.</li>
                        <li>Jika memilih <button className="p-0 bg-red-500 text-white m-0 rounded hover:bg-red-600"><X size={18} /></button>, pilih alasan yang sesuai pada kolom keterangan.</li>
                    </ul>
                </li>
            </ul>
        <table className="w-full text-left border-collapse border">
            <thead className="text-center text-sm">
            <tr className="uppercase leading-normal">
                <th rowSpan={2} colSpan={3} className="px-2 border w-1">NOP</th>
                <th rowSpan={2} className="px-2 border w-1/6">Nama</th>
                <th rowSpan={2} className="px-2 border w-1/5">Alamat</th>
                <th rowSpan={2} className="px-2 border w-1">Pajak</th>
                <th rowSpan={2} className="px-2 border w-1">Tipe</th>
                <th colSpan={2} className="px-2 border text-center">TERSAMPAIKAN</th>
                <th rowSpan={2} className="px-2 border">Keterangan</th>
                <th rowSpan={2} className="px-2 border w-1">Status</th>
            </tr>
            <tr className="uppercase leading-normal">
                <th className="px-2 border w-1 text-center">Y</th>
                <th className="px-2 border w-1 text-center">T</th>
            </tr>
            </thead>
            <tbody className="font-light text-xs">
            {dataTable.length > 0 ? (
                dataTable.map((value: any, index: number) => (
                <tr key={index} className="hover:bg-gray-100 dark:hover:bg-slate-900">
                    <td className="px-2 py-1 border w-1">{value.blok}</td>
                    <td className="px-2 py-1 border w-1">{value.no}</td>
                    <td className="px-2 py-1 border w-1">{value.jenis}</td>
                    <td className="px-2 py-1 border">{value.nama}</td>
                    <td className="px-2 py-1 border">{value.alamat}</td>
                    <td className="px-2 py-1 border text-end">{value.pajak}</td>
                    <td className="px-2 py-1 border text-center">
                        {tipe[value.id] && tipe[value.id]?.type!=null && (
                            <span className={`px-1 rounded text-white ${tipe[value.id]?.type ? "bg-green-500" : "bg-red-500"}`}>
                                {tipe[value.id]?.message}
                            </span>
                        )}
                    </td>
                    <td className="px-2 py-1 border text-center">
                        { gate.create && gate.update && value.penyampaian && !value.penyampaian.status.status ? null : 
                            <button
                                onClick={() => handleSelectItem(value.id, true)}
                                className="p-0 bg-green-500 text-white m-0 rounded hover:bg-green-600"
                                disabled={loadingState[value.id]}
                            >
                                {loadingState[value.id] ? <Loader2 className="animate-spin p-1" size={20} /> : <Check size={20} />}
                            </button>
                        }
                    </td>

                    <td className="px-2 py-1 border text-center">
                        { gate.create && gate.update && value.penyampaian && !value.penyampaian.status.status ? null : 
                            <button
                                onClick={() => handleSelectItem(value.id, false)}
                                className="p-0 bg-red-500 text-white m-0 rounded hover:bg-red-600"
                                disabled={loadingState[value.id]}
                            >
                                {loadingState[value.id] ? <Loader2 className="animate-spin p-1" size={20} /> : <X size={20} />}
                            </button>
                        }
                    </td>
                    <td className="px-1 py-1 border">
                        {selectedItemTabel[value.id] === true ? (
                            <FormCalendar
                                value={editedData[value.id]?.ya || null}
                                onChange={(v) => handleChange(value.id, "ya", v, value.pajak)}
                                autoOpen={true}
                            />
                        ) : selectedItemTabel[value.id] === false ? (
                            <SelectPopover
                                label=""
                                selectedValue={editedData[value.id]?.tidak || ""}
                                options={dataPenyampaianKeterangan}
                                onSelect={(v) => handleChange(value.id, "tidak", v, value.pajak)}
                                error={""}
                                autoOpen={true}
                            />
                        ) : value.penyampaian?.tipe.value}
                    </td>
                    <td className="px-2 py-1 border text-center">
                        {messages[value.id] && (
                            <span className={`px-1 rounded text-white ${messages[value.id]?.type ? "bg-green-500" : "bg-red-500"}`}>
                                {messages[value.id]?.message}
                            </span>
                        )}
                    </td>
                </tr>
                ))
            ) : (
                <tr>
                <td colSpan={11}>
                    <div className="flex items-center justify-center">
                    <DatabaseBackup size={18} className="me-2" /> Data tidak ditemukan
                    </div>
                </td>
                </tr>
            )}
            </tbody>
        </table>
        </div>
    );
}
