import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PaperWorkDocument from './components/PaperWorkDocument';
import { sanitizeName } from './utils/sanitize';
import { Plus, Trash2, FileDown } from 'lucide-react';

const defaultValues = {
  eventMeta: { programName: '', startDate: '', endDate: '', venue: '', organizer: '', collaborator: '' },
  proposalDetails: { purpose: '', synopsis: '', background: [''] },
  objectives: [{ giinaElement: '', description: '' }],
  committee: {
    patron: { name: '', role: 'Naib Canselor' },
    advisor: { name: '', role: 'Dekan' },
    coordinator: { name: '', role: 'Penasihat Kelab' },
    director: { name: '', matric: '' },
    secretary: { name: '', matric: '' },
    subCommittees: [{ roleName: 'AJK Publisiti', members: [{ name: '', matric: '' }] }]
  },
  itinerary: { date: '', timeRange: '', venue: '', activities: [{ time: '', activity: '' }] },
  financials: {
    income: [{ source: '', amount: 0 }],
    expenses: [{ category: 'Breakfast', item: '', calculation: '', amount: 0, fundSource: '' }]
  },
  signatures: {
    preparedBy: { name: '', role: 'Pengarah Program' },
    reviewedBy: { name: '', role: 'Penasihat Program' }
  }
};

const extractPax = (calculation) => {
  if (!calculation) return 1;
  const match = calculation.match(/(\d+)\s*(?:orang|pax|peserta|ajk|jemputan)?/i);
  return match ? parseInt(match[1], 10) : 1;
};

const validateExpenseCap = (expense) => {
  if (!expense.amount || !expense.calculation || !expense.category) return true;
  const pax = extractPax(expense.calculation);
  const costPerPax = parseFloat(expense.amount) / pax;
  
  if (expense.category.toLowerCase() === 'breakfast' && costPerPax > 4.0) {
    return 'Melebihi had RM4.00/pax untuk sarapan';
  }
  if ((expense.category.toLowerCase() === 'lunch' || expense.category.toLowerCase() === 'dinner') && costPerPax > 7.0) {
    return `Melebihi had RM7.00/pax untuk ${expense.category}`;
  }
  return true;
};

function App() {
  const { register, control, handleSubmit, watch, setValue, formState: { errors, isValid } } = useForm({
    defaultValues,
    mode: 'onChange'
  });

  const [formData, setFormData] = useState(null);

  const { fields: bgFields, append: appendBg, remove: removeBg } = useFieldArray({ control, name: "proposalDetails.background" });
  const { fields: objFields, append: appendObj, remove: removeObj } = useFieldArray({ control, name: "objectives" });
  const { fields: subCommFields, append: appendSubComm, remove: removeSubComm } = useFieldArray({ control, name: "committee.subCommittees" });
  const { fields: actFields, append: appendAct, remove: removeAct } = useFieldArray({ control, name: "itinerary.activities" });
  const { fields: incFields, append: appendInc, remove: removeInc } = useFieldArray({ control, name: "financials.income" });
  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({ control, name: "financials.expenses" });

  const onSubmit = (data) => {
    setFormData(data);
  };

  const handleNameBlur = (path, value) => {
    setValue(path, sanitizeName(value), { shouldValidate: true });
  };

  // Field styles
  const inputClass = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border";
  const labelClass = "block text-sm font-medium text-gray-700";
  const cardClass = "bg-white shadow rounded-lg p-6 mb-6 border-t-4 border-purple-500";
  const titleClass = "text-xl font-bold text-gray-900 mb-4";

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Kertas Kerja Generator</h1>
          <p className="mt-2 text-sm text-gray-600">Sistem Penjanaan Automatik Kertas Kerja Universiti</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          {/* 1. Event Meta */}
          <div className={cardClass}>
            <h2 className={titleClass}>1. Maklumat Program</h2>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={labelClass}>Nama Program</label>
                <input type="text" {...register("eventMeta.programName", { required: true })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Tarikh Mula</label>
                <input type="date" {...register("eventMeta.startDate", { required: true })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Tarikh Tamat</label>
                <input type="date" {...register("eventMeta.endDate", { required: true })} className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Tempat</label>
                <input type="text" {...register("eventMeta.venue", { required: true })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Anjuran</label>
                <input type="text" {...register("eventMeta.organizer", { required: true })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Kerjasama (Pilihan)</label>
                <input type="text" {...register("eventMeta.collaborator")} className={inputClass} />
              </div>
            </div>
          </div>

          {/* 2. Proposal Details */}
          <div className={cardClass}>
            <h2 className={titleClass}>2. Butiran Cadangan</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Tujuan</label>
                <textarea rows={3} {...register("proposalDetails.purpose", { required: true })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Pengenalan / Sinopsis</label>
                <textarea rows={3} {...register("proposalDetails.synopsis", { required: true })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Latar Belakang</label>
                {bgFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 mb-2 items-start">
                    <span className="mt-2 text-sm text-gray-500">{index + 1}.</span>
                    <textarea rows={2} {...register(`proposalDetails.background.${index}`)} className={inputClass} />
                    <button type="button" onClick={() => removeBg(index)} className="mt-2 p-2 text-red-600 hover:bg-red-50 rounded-md">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => appendBg('')} className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-purple-600 hover:bg-purple-700">
                  <Plus size={14} className="mr-1" /> Tambah Latar Belakang
                </button>
              </div>
            </div>
          </div>

          {/* 3. Objectives */}
          <div className={cardClass}>
            <h2 className={titleClass}>3. Objektif</h2>
            {objFields.map((field, index) => (
              <div key={field.id} className="flex gap-4 items-start mb-4 bg-gray-50 p-4 rounded-md">
                <div className="flex-1 space-y-4">
                  <div>
                    <label className={labelClass}>Penerangan Objektif</label>
                    <input type="text" {...register(`objectives.${index}.description`, { required: true })} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Elemen GIINA</label>
                    <input type="text" {...register(`objectives.${index}.giinaElement`, { required: true })} className={inputClass} placeholder="Contoh: Kepimpinan" />
                  </div>
                </div>
                <button type="button" onClick={() => removeObj(index)} className="mt-6 p-2 text-red-600 hover:bg-red-100 rounded-md">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => appendObj({ giinaElement: '', description: '' })} className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-purple-600 hover:bg-purple-700">
              <Plus size={14} className="mr-1" /> Tambah Objektif
            </button>
          </div>

          {/* 4. Committee */}
          <div className={cardClass}>
            <h2 className={titleClass}>4. Jawatankuasa Pelaksana</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {['patron', 'advisor', 'coordinator', 'director', 'secretary'].map((role) => (
                <div key={role} className="bg-gray-50 p-4 rounded-md border border-gray-100 shadow-sm">
                  <h3 className="font-semibold text-gray-700 capitalize mb-2">{role}</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs text-gray-500">Nama</label>
                      <input type="text" {...register(`committee.${role}.name`, { required: true })} 
                        onBlur={(e) => handleNameBlur(`committee.${role}.name`, e.target.value)}
                        className={inputClass} placeholder="Nama Penuh" />
                    </div>
                    {role === 'director' || role === 'secretary' ? (
                      <div>
                        <label className="text-xs text-gray-500">No. Matrik</label>
                        <input type="text" {...register(`committee.${role}.matric`, { required: true })} className={inputClass} />
                      </div>
                    ) : (
                      <div>
                        <label className="text-xs text-gray-500">Jawatan/Peranan</label>
                        <input type="text" {...register(`committee.${role}.role`, { required: true })} className={inputClass} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-800 mb-3">Ahli Jawatankuasa (Sub-Committees)</h3>
              {subCommFields.map((subField, subIndex) => (
                <div key={subField.id} className="mb-4 bg-gray-50 p-4 rounded-md border border-gray-200">
                  <div className="flex gap-2 items-end mb-3">
                    <div className="flex-1">
                      <label className={labelClass}>Nama Portfolio (Contoh: AJK Publisiti)</label>
                      <input type="text" {...register(`committee.subCommittees.${subIndex}.roleName`, { required: true })} className={inputClass} />
                    </div>
                    <button type="button" onClick={() => removeSubComm(subIndex)} className="mb-1 p-2 text-red-600 hover:bg-red-100 rounded-md">
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  {/* Custom Sub-Committee Members handling using watch and setValue to avoid nested useFieldArray complexity if possible, 
                      or just a simple map since it's limited */}
                  <SubCommitteeMembers 
                    subIndex={subIndex} 
                    control={control} 
                    register={register} 
                    inputClass={inputClass} 
                    handleNameBlur={handleNameBlur} 
                  />
                </div>
              ))}
              <button type="button" onClick={() => appendSubComm({ roleName: '', members: [{ name: '', matric: '' }] })} className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                <Plus size={14} className="mr-1" /> Tambah Portfolio AJK
              </button>
            </div>
          </div>

          {/* 5. Itinerary */}
          <div className={cardClass}>
            <h2 className={titleClass}>5. Tentatif Program</h2>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3 mb-6">
              <div>
                <label className={labelClass}>Tarikh</label>
                <input type="text" {...register("itinerary.date", { required: true })} className={inputClass} placeholder="cth: 12 Mac 2024" />
              </div>
              <div>
                <label className={labelClass}>Masa</label>
                <input type="text" {...register("itinerary.timeRange", { required: true })} className={inputClass} placeholder="cth: 8:00 Pagi - 5:00 Petang" />
              </div>
              <div>
                <label className={labelClass}>Tempat</label>
                <input type="text" {...register("itinerary.venue", { required: true })} className={inputClass} />
              </div>
            </div>

            <div className="space-y-3">
              {actFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-start">
                  <div className="w-1/3">
                    <input type="text" {...register(`itinerary.activities.${index}.time`, { required: true })} className={inputClass} placeholder="Masa (cth: 0800)" />
                  </div>
                  <div className="w-2/3">
                    <input type="text" {...register(`itinerary.activities.${index}.activity`, { required: true })} className={inputClass} placeholder="Aktiviti" />
                  </div>
                  <button type="button" onClick={() => removeAct(index)} className="mt-1 p-2 text-red-600 hover:bg-red-50 rounded-md">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => appendAct({ time: '', activity: '' })} className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-purple-600 hover:bg-purple-700">
                <Plus size={14} className="mr-1" /> Tambah Aktiviti
              </button>
            </div>
          </div>

          {/* 6. Financials */}
          <div className={cardClass}>
            <h2 className={titleClass}>6. Implikasi Kewangan</h2>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Pendapatan</h3>
              <div className="space-y-3">
                {incFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-start">
                    <div className="w-2/3">
                      <input type="text" {...register(`financials.income.${index}.source`, { required: true })} className={inputClass} placeholder="Sumber Pendapatan" />
                    </div>
                    <div className="w-1/3">
                      <input type="number" step="0.01" {...register(`financials.income.${index}.amount`, { required: true })} className={inputClass} placeholder="RM" />
                    </div>
                    <button type="button" onClick={() => removeInc(index)} className="mt-1 p-2 text-red-600 hover:bg-red-50 rounded-md">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => appendInc({ source: '', amount: 0 })} className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700">
                  <Plus size={14} className="mr-1" /> Tambah Pendapatan
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Perbelanjaan</h3>
              <div className="space-y-4">
                {expFields.map((field, index) => {
                  const errorMsg = errors?.financials?.expenses?.[index]?.amount?.message;
                  return (
                    <div key={field.id} className="bg-gray-50 p-4 rounded-md border border-gray-200">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
                        <div>
                          <label className="text-xs text-gray-500">Kategori</label>
                          <select {...register(`financials.expenses.${index}.category`, { required: true })} className={inputClass}>
                            <option value="Breakfast">Sarapan (Max RM4/pax)</option>
                            <option value="Lunch">Makan Tengahari (Max RM7/pax)</option>
                            <option value="Dinner">Makan Malam (Max RM7/pax)</option>
                            <option value="Logistik">Logistik</option>
                            <option value="Cenderamata">Cenderamata</option>
                            <option value="Lain-lain">Lain-lain</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs text-gray-500">Perkara</label>
                          <input type="text" {...register(`financials.expenses.${index}.item`, { required: true })} className={inputClass} placeholder="cth: Makanan Peserta" />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500">Pengiraan (Masukkan pax)</label>
                          <input type="text" {...register(`financials.expenses.${index}.calculation`, { required: true })} className={inputClass} placeholder="cth: 100 pax x RM 4" />
                        </div>
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <label className="text-xs text-gray-500">Jumlah (RM)</label>
                            <input type="number" step="0.01" 
                                   {...register(`financials.expenses.${index}.amount`, { 
                                      required: true,
                                      validate: (val, formValues) => validateExpenseCap(formValues.financials.expenses[index]) 
                                   })} 
                                   className={`${inputClass} ${errorMsg ? 'border-red-500 ring-red-500' : ''}`} />
                          </div>
                          <button type="button" onClick={() => removeExp(index)} className="mt-6 p-2 text-red-600 hover:bg-red-100 rounded-md h-fit">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      {errorMsg && <p className="mt-1 text-sm text-red-600">{errorMsg}</p>}
                    </div>
                  );
                })}
                <button type="button" onClick={() => appendExp({ category: 'Breakfast', item: '', calculation: '', amount: 0, fundSource: '' })} className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700">
                  <Plus size={14} className="mr-1" /> Tambah Perbelanjaan
                </button>
              </div>
            </div>
          </div>

          {/* 7. Signatures */}
          <div className={cardClass}>
            <h2 className={titleClass}>7. Tandatangan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-semibold text-gray-700 mb-2">Disediakan Oleh</h3>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-gray-500">Nama</label>
                    <input type="text" {...register("signatures.preparedBy.name", { required: true })} 
                      onBlur={(e) => handleNameBlur("signatures.preparedBy.name", e.target.value)}
                      className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Jawatan</label>
                    <input type="text" {...register("signatures.preparedBy.role", { required: true })} className={inputClass} />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-semibold text-gray-700 mb-2">Disemak Oleh</h3>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-gray-500">Nama</label>
                    <input type="text" {...register("signatures.reviewedBy.name", { required: true })} 
                      onBlur={(e) => handleNameBlur("signatures.reviewedBy.name", e.target.value)}
                      className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Jawatan</label>
                    <input type="text" {...register("signatures.reviewedBy.role", { required: true })} className={inputClass} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center py-6 border-t border-gray-200">
            <button type="submit" disabled={!isValid} className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
              Jana Dokumen Preview
            </button>
            
            {formData && (
              <PDFDownloadLink
                document={<PaperWorkDocument data={formData} />}
                fileName={`Kertas_Kerja_${formData.eventMeta.programName.replace(/\s+/g, '_') || 'Program'}.pdf`}
                className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {({ blob, url, loading, error }) =>
                  loading ? 'Menjana PDF...' : <><FileDown className="mr-2" /> Muat Turun PDF</>
                }
              </PDFDownloadLink>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

// Sub-component to handle nested field array for SubCommittee members
function SubCommitteeMembers({ subIndex, control, register, inputClass, handleNameBlur }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `committee.subCommittees.${subIndex}.members`
  });

  return (
    <div className="ml-4 pl-4 border-l-2 border-indigo-200 space-y-2">
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 items-start">
          <div className="w-1/2">
            <input type="text" {...register(`committee.subCommittees.${subIndex}.members.${index}.name`, { required: true })} 
              onBlur={(e) => handleNameBlur(`committee.subCommittees.${subIndex}.members.${index}.name`, e.target.value)}
              className={inputClass} placeholder="Nama AJK" />
          </div>
          <div className="w-2/5">
            <input type="text" {...register(`committee.subCommittees.${subIndex}.members.${index}.matric`, { required: true })} className={inputClass} placeholder="No. Matrik" />
          </div>
          <button type="button" onClick={() => remove(index)} className="mt-1 p-2 text-red-600 hover:bg-red-50 rounded-md">
            <Trash2 size={18} />
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({ name: '', matric: '' })} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
        + Tambah Ahli
      </button>
    </div>
  );
}

export default App;
