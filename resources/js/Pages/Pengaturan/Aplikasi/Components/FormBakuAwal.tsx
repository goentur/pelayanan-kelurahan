import FormInput from '@/Components/FormInput';
import { Button } from '@/Components/ui/button';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { Loader2, Save } from 'lucide-react';
import { FormEventHandler, useRef } from 'react';

export default function FormBakuAwal() {
     const formRefs = useRef<Record<string, HTMLInputElement | null>>({});
     const tahun = new Date().getFullYear();

     const { data, setData, errors, processing, post, recentlySuccessful } = useForm<any>({
          tahun_pajak : tahun,
          kd_propinsi : 33,
          kd_dati2 : 75,
          kd_kecamatan : "",
          kd_kelurahan : "",
          kd_blok : "",
          no_urut : "",
     });

     const handleFormBakuAwal: FormEventHandler = (e) => {
          e.preventDefault();
          post(route('pengaturan.aplikasi.baku-awal'));
     };

     const f1 = [
          { id: "tahun_pajak", label: "Tahun Pajak", optionalProps : {type : "text", maxLength: 4, required : true}},
     ];
     const f2 = [
          { id: "kd_propinsi", label: "KD Propinsi", optionalProps : {type : "text", maxLength: 2, required : true}},
          { id: "kd_dati2", label: "KD Dati2", optionalProps : {type : "text", maxLength: 2, required : true}},
     ];
     const f3 = [
          { id: "kd_kecamatan", label: "KD Kecamatan", optionalProps : {type : "text", maxLength: 3, required : true, autoFocus:true}},
          { id: "kd_kelurahan", label: "KD Kelurahan", optionalProps : {type : "text", maxLength: 3}},
     ];
     const f4 = [
          { id: "kd_blok", label: "KD Blok", optionalProps : {type : "text", maxLength: 3}},
          { id: "no_urut", label: "No Urut", optionalProps : {type : "text", maxLength: 4}},
     ];

     return (
          <div className="text-lg">
               <form onSubmit={handleFormBakuAwal}>
                    <div>FORM DATA BAKU AWAL</div>
                    <div className="flex gap-4 mt-3">
                         {f1.map(({ id, label, optionalProps }) => (
                              <FormInput
                                   key={id}
                                   id={id}
                                   name={id}
                                   label={label}
                                   value={data[id]}
                                   placeholder={`Masukkan ${label.toLowerCase()}`}
                                   optionalProps={optionalProps}
                                   error={errors[id]}
                                   formRefs={formRefs}
                                   setData={setData}
                              />
                         ))}
                    </div>
                    <div className="flex gap-4 mt-3">
                         {f2.map(({ id, label, optionalProps }) => (
                              <FormInput
                                   key={id}
                                   id={id}
                                   name={id}
                                   label={label}
                                   value={data[id]}
                                   placeholder={`Masukkan ${label.toLowerCase()}`}
                                   optionalProps={optionalProps}
                                   error={errors[id]}
                                   formRefs={formRefs}
                                   setData={setData}
                              />
                         ))}
                    </div>
                    <div className="flex gap-4 mt-3">
                         {f3.map(({ id, label, optionalProps }) => (
                              <FormInput
                                   key={id}
                                   id={id}
                                   name={id}
                                   label={label}
                                   value={data[id]}
                                   placeholder={`Masukkan ${label.toLowerCase()}`}
                                   optionalProps={optionalProps}
                                   error={errors[id]}
                                   formRefs={formRefs}
                                   setData={setData}
                              />
                         ))}
                    </div>
                    <div className="flex gap-4 mt-3">
                         {f4.map(({ id, label, optionalProps }) => (
                              <FormInput
                                   key={id}
                                   id={id}
                                   name={id}
                                   label={label}
                                   value={data[id]}
                                   placeholder={`Masukkan ${label.toLowerCase()}`}
                                   optionalProps={optionalProps}
                                   error={errors[id]}
                                   formRefs={formRefs}
                                   setData={setData}
                              />
                         ))}
                    </div>
                    <div className="flex gap-4">
                         <div className="flex items-center mt-5">
                              <Button type="submit" disabled={processing}>
                                   {processing ? <Loader2 className="animate-spin" /> : <Save />} Simpan
                              </Button>
                              <Transition
                                   show={recentlySuccessful}
                                   enter="transition ease-in-out"
                                   enterFrom="opacity-0"
                                   leave="transition ease-in-out"
                                   leaveTo="opacity-0"
                              >
                                   <p className="text-sm text-green-600 dark:text-green-400 ms-5">
                                        Tersimpan
                                   </p>
                              </Transition>
                         </div>
                    </div>
               </form>
          </div>
     );
}
