
import React from 'react';
import { Currency } from '../types';

interface CurrencyRowProps {
  currency: Currency;
  value: string;
  isBase: boolean;
  onValueChange: (val: string) => void;
  onRemove: () => void;
  disabled?: boolean;
}

const CurrencyRow: React.FC<CurrencyRowProps> = ({ 
  currency, 
  value, 
  isBase, 
  onValueChange, 
  onRemove,
  disabled 
}) => {
  return (
    <div className={`relative group mb-4 ak-card-clip ak-shadow border transition-all duration-300 ${isBase ? 'border-yellow-400 bg-white ring-2 ring-yellow-400/10' : 'border-black/5 bg-white hover:border-black/20'}`}>
      <div className="flex items-stretch h-16 md:h-20">
        {/* 国旗与代码区域 */}
        <div className="flex items-center px-4 md:px-6 bg-gray-50 border-r border-black/5 min-w-[110px] md:min-w-[160px]">
          <div className="flex items-center gap-3">
             {/* 移除 overflow-hidden 和 rounded-sm 以防某些系统裁剪 Emoji */}
             <span className="text-2xl md:text-3xl ak-emoji leading-none block">{currency.flag}</span>
             <div className="flex flex-col">
               <span className="text-lg md:text-xl font-bold leading-none tracking-wider text-black">{currency.code}</span>
               <span className="text-[9px] text-gray-400 font-bold truncate max-w-[60px] md:max-w-[80px]">{currency.name}</span>
             </div>
          </div>
        </div>

        {/* 输入与符号 */}
        <div className="flex-1 flex flex-col justify-center px-4 md:px-6">
          <div className="flex items-baseline justify-between mb-1">
             <span className="text-[10px] text-gray-400 font-mono font-bold uppercase tracking-widest">{currency.symbol} UNIT</span>
             {isBase && <span className="text-[8px] ak-yellow font-black uppercase tracking-[0.2em] bg-yellow-400/10 px-1 rounded-sm animate-pulse">核心换算基准</span>}
          </div>
          <input
            type="number"
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            disabled={disabled}
            placeholder="0.00"
            className="bg-transparent text-xl md:text-3xl font-mono text-gray-900 outline-none w-full font-semibold"
          />
        </div>

        {/* 移除按钮 */}
        {!isBase && (
          <button 
            onClick={onRemove}
            className="px-4 opacity-0 group-hover:opacity-100 transition-opacity bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center border-l border-black/5"
            title="移除此项"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
      
      {/* 侧边装饰条 */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${isBase ? 'ak-bg-yellow' : 'bg-gray-200'}`} />
    </div>
  );
};

export default CurrencyRow;
