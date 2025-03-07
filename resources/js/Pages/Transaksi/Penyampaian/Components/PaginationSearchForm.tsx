import FormInput from '@/Components/FormInput';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Plus } from 'lucide-react';

type PaginationSearchFormProps = {
    gate: {
        create : boolean,
        update : boolean,
        delete : boolean,
    };  
    setDataInfo: React.Dispatch<React.SetStateAction<any>>;
    setForm: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
    reset: () => void;
};

export default function PaginationSearchForm({setDataInfo} : PaginationSearchFormProps) {
    return (
        <div className="mb-4">
            <div className="grid gap-4 lg:grid-cols-2">
                <div>
                    <Select onValueChange={(e) =>  setDataInfo((prev:any) => ({ ...prev, perPage: Number(e), currentPage: 1 }))}>
                        <SelectTrigger className="w-1/2">
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
                    <FormInput
                        id={'kd_blok'}
                        name={'kd_blok'}
                        label={'KD blok'}
                        value={data[id]}
                        placeholder={`Masukkan kd`}
                        optionalProps={optionalProps}
                        error={errors[id]}
                        formRefs={formRefs}
                        setData={setData}
                    />
                </div>
            </div>
        </div>
    );
}
