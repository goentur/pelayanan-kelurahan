import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import clsx from "clsx";

interface FormInputProps {
     id: string;
     name: string;
     label: string;
     value: string;
     placeholder: string;
     optionalProps?: any;
     error?: string;
     formRefs: React.MutableRefObject<{ [key: string]: HTMLInputElement | null }>;
     setData: React.Dispatch<React.SetStateAction<any>>;
}

const FormInput: React.FC<FormInputProps> = ({id,name,label,value,placeholder,optionalProps,error,formRefs,setData,}) => {
     return (
          <div className="grid gap-2 w-full">
               <Label htmlFor={id} className={clsx({ "text-red-500": error }, "capitalize")}>
                    {label}
               </Label>
               <Input
                    id={id}
                    name={name}
                    ref={(el) => {
                         if (formRefs.current) {
                         formRefs.current[name] = el;
                         }
                    }}
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => setData((prevData: any) => ({ ...prevData, [name]: e.target.value }))}
                    {...optionalProps}
               />
               {error && <div className="text-red-500 text-xs mt-0">{error}</div>}
          </div>
     );
};

export default FormInput;
