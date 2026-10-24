import React, { useState, useRef, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { ChevronDown, Check, Sparkles, X } from 'lucide-react';

/**
 * SuggestiveInput:
 * An input field that allows both free-form custom user typing
 * AND selecting from a comprehensive list of suggested USIM options.
 * Users are not obligated to select from the dropdown.
 */
export default function SuggestiveInput({
  name,
  control,
  options = [],
  placeholder = '',
  rules = {},
  className = '',
  categoryName = 'USIM'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        const val = field.value ?? '';
        const searchVal = String(val).toLowerCase().trim();

        // Filter options based on typed input
        const filtered = searchVal
          ? options.filter((item) => item.toLowerCase().includes(searchVal))
          : options;

        const isCustomValue = val && !options.includes(val);

        const handleSelect = (option) => {
          field.onChange(option);
          setIsOpen(false);
          if (inputRef.current) {
            inputRef.current.focus();
          }
        };

        const handleClear = (e) => {
          e.stopPropagation();
          field.onChange('');
          if (inputRef.current) {
            inputRef.current.focus();
          }
        };

        return (
          <div ref={containerRef} className="relative w-full">
            <div className="relative flex items-center">
              <input
                ref={(e) => {
                  field.ref(e);
                  inputRef.current = e;
                }}
                type="text"
                value={val}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  if (!isOpen) setIsOpen(true);
                }}
                onFocus={() => {
                  // User can focus without auto-opening, but chevron will open
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setIsOpen(false);
                  }
                }}
                placeholder={placeholder}
                className={`${className} pr-16 ${error ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                autoComplete="off"
              />

              {/* Action buttons on the right inside input */}
              <div className="absolute right-1.5 flex items-center gap-0.5">
                {val ? (
                  <button
                    type="button"
                    onClick={handleClear}
                    title="Kosongkan"
                    className="p-1 text-gray-400 hover:text-gray-600 rounded transition"
                  >
                    <X size={15} />
                  </button>
                ) : null}

                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setIsOpen((prev) => !prev)}
                  title={`Pilihan ${categoryName} (Boleh pilih atau taip sendiri)`}
                  className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded transition"
                >
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180 text-purple-600' : ''}`}
                  />
                </button>
              </div>
            </div>

            {/* Custom floating dropdown */}
            {isOpen && (
              <div
                onMouseDown={(e) => e.preventDefault()} // Prevents premature blur on the input
                className="absolute z-50 left-0 right-0 mt-1 max-h-64 overflow-y-auto bg-white rounded-lg shadow-xl border border-gray-200 py-1 text-sm animate-in fade-in slide-in-from-top-1 duration-150"
              >
                {/* Dropdown Header Notice */}
                <div className="px-3 py-1.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1 font-medium text-purple-700">
                    <Sparkles size={13} /> Senarai {categoryName}
                  </span>
                  <span className="text-[11px] text-gray-400">Pilih atau taip sendiri</span>
                </div>

                {/* Indication of Custom Input */}
                {isCustomValue && (
                  <div className="px-3 py-1.5 bg-purple-50/60 border-b border-purple-100 text-xs text-purple-800 flex items-center justify-between">
                    <span>
                      ✍️ Input tersuai: <strong>"{val}"</strong>
                    </span>
                    <span className="text-[11px] text-green-600 font-semibold">✓ Sah</span>
                  </div>
                )}

                {/* Filtered Option Items */}
                {filtered.length > 0 ? (
                  <div className="divide-y divide-gray-50">
                    {filtered.map((opt, idx) => {
                      const isSelected = val === opt;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelect(opt)}
                          className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-purple-50/80 transition-colors ${
                            isSelected ? 'bg-purple-50 font-semibold text-purple-900' : 'text-gray-700'
                          }`}
                        >
                          <span className="truncate pr-2">{opt}</span>
                          {isSelected && <Check size={14} className="text-purple-600 flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-3 text-center text-xs text-gray-500">
                    <p className="mb-1 text-gray-700 font-medium">Tiada padanan tepat dalam senarai.</p>
                    <p className="text-gray-400">Pilihan input anda akan digunakan secara automatik.</p>
                    <button
                      type="button"
                      onClick={() => handleSelect(val)}
                      className="mt-2 text-xs text-purple-600 hover:text-purple-800 font-medium underline"
                    >
                      Gunakan "{val}"
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      }}
    />
  );
}
