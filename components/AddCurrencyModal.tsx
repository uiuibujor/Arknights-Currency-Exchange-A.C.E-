
import React, { useState } from 'react';
import { Currency } from '../types';
import { ALL_CURRENCIES } from '../constants';

interface AddCurrencyModalProps {
  onSelect: (currency: Currency) => void;
  onClose: () => void;
  excludeCodes: string[];
}

const AddCurrencyModal: React.FC<AddCurrencyModalProps> = ({ onSelect, onClose, excludeCodes }) => {
  const [search, setSearch] = useState('');
  
  const filtered = ALL_CURRENCIES.filter(c => 
    !excludeCodes.includes(c.code) && 
    (c.code.toLowerCase().includes(search.toLowerCase()) || 
     c.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-[2px]">
      <div className="bg-white w-full max-w-md ak-card-clip shadow-2xl border border-black/5 flex flex-col max-h-[80vh]">
        <div className="p-4 border-b border-black/5 flex justify-between items-center bg-gray-50">
          <h2 className="text-sm font-black tracking-widest text-gray-900 uppercase italic">/ 选择货币资产 /</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4 bg-gray-50/50">
          <input 
            type="text"
            autoFocus
            placeholder="输入代码或名称进行检索..."
            className="w-full bg-white border border-black/10 p-3 text-black outline-none focus:ring-2 ring-yellow-400/20 focus:border-yellow-400 font-mono uppercase text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
          {filtered.length > 0 ? filtered.map(currency => (
            <button
              key={currency.code}
              onClick={() => onSelect(currency)}
              className="w-full flex items-center p-3 hover:bg-yellow-400/5 border border-transparent hover:border-yellow-400/20 transition-all group rounded-sm"
            >
              <span className="text-2xl mr-4 ak-emoji leading-none">{currency.flag}</span>
              <div className="flex flex-col items-start">
                <span className="text-lg font-bold group-hover:ak-yellow transition-colors">{currency.code}</span>
                <span className="text-[10px] text-gray-500 font-bold uppercase">{currency.name}</span>
              </div>
              <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-black ak-yellow">确认选择 -></span>
              </div>
            </button>
          )) : (
            <div className="text-center py-12 text-gray-300 font-mono uppercase text-[10px] tracking-widest">
              未搜索到匹配的资产条目
            </div>
          )}
        </div>
        
        <div className="p-3 border-t border-black/5 bg-gray-50 text-[9px] text-gray-400 font-mono flex justify-between">
          <span>ACCESS: GRANTED</span>
          <span>CATALOG_SYNC: ACTIVE</span>
        </div>
      </div>
    </div>
  );
};

export default AddCurrencyModal;
