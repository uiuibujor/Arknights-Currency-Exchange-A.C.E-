
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  DropAnimation,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import Layout from './components/Layout';
import CurrencyRow from './components/CurrencyRow';
import SortableCurrencyRow from './components/SortableCurrencyRow';
import AddCurrencyModal from './components/AddCurrencyModal';
import { ExchangeService } from './services/geminiService';
import { ALL_CURRENCIES, INITIAL_CURRENCY_CODES } from './constants';
import { ExchangeRates, Currency, GroundingSource } from './types';

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};

const STORAGE_KEY_SELECTED_CODES = 'ace_selected_codes';

const App: React.FC = () => {
  const [rates, setRates] = useState<ExchangeRates>({});
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [selectedCodes, setSelectedCodes] = useState<string[]>(() => {
    if (typeof window === 'undefined') return INITIAL_CURRENCY_CODES;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY_SELECTED_CODES);
      if (!stored) return INITIAL_CURRENCY_CODES;
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) return INITIAL_CURRENCY_CODES;
      const valid = parsed.filter((c) => typeof c === 'string' && ALL_CURRENCIES.some((cur) => cur.code === c));
      return valid.length > 0 ? valid : INITIAL_CURRENCY_CODES;
    } catch {
      return INITIAL_CURRENCY_CODES;
    }
  });
  const [baseValue, setBaseValue] = useState<string>('100.00');
  const [baseCode, setBaseCode] = useState<string>('USD');
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const exchangeService = useMemo(() => new ExchangeService(), []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const result = await exchangeService.fetchLatestRates();
    setRates(result.rates);
    setSources(result.sources);
    setLastUpdate(new Date());
    setLoading(false);
  }, [exchangeService]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const calculateValue = (targetCode: string): string => {
    if (!rates[baseCode] || !rates[targetCode]) return '0.00';
    if (targetCode === baseCode) return baseValue;
    
    const baseValueNum = parseFloat(baseValue) || 0;
    const usdValue = baseValueNum / rates[baseCode];
    const targetValue = usdValue * rates[targetCode];
    
    return targetValue.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: false
    });
  };

  const handleValueChange = (code: string, val: string) => {
    setBaseCode(code);
    setBaseValue(val);
  };

  const removeCurrency = (code: string) => {
    setSelectedCodes(prev => prev.filter(c => c !== code));
  };

  const addCurrency = (currency: Currency) => {
    setSelectedCodes(prev => [...prev, currency.code]);
    setShowAddModal(false);
  };

  const selectedCurrencies = useMemo(() => {
    return selectedCodes.map(code => ALL_CURRENCIES.find(c => c.code === code)!).filter(Boolean);
  }, [selectedCodes]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(STORAGE_KEY_SELECTED_CODES, JSON.stringify(selectedCodes));
    } catch {
    }
  }, [selectedCodes]);

  const clearDragState = () => {
    setActiveId(null);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSelectedCodes((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  };

  const activeCurrency = useMemo(() => {
    if (!activeId) return null;
    return ALL_CURRENCIES.find(c => c.code === activeId);
  }, [activeId]);

  return (
    <Layout>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black tracking-widest text-gray-900 uppercase italic">资产换算 / ASSET_CONVERSION</h2>
            <div className="h-[3px] w-12 ak-bg-yellow" />
          </div>
          <p className="text-[10px] text-gray-400 font-mono mt-1 font-bold">经由 PRTS 节点同步的实时金融数据。最后同步: {lastUpdate.toLocaleTimeString()}</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={fetchData}
            disabled={loading}
            className={`ak-border bg-white shadow-sm p-3 hover:bg-gray-50 transition-all group ${loading ? 'animate-pulse' : ''}`}
            title="手动刷新数据"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-gray-600 group-hover:text-black ${loading ? 'rotate-180 transition-transform duration-1000' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-1">
        <SortableContext 
          items={selectedCodes}
          strategy={verticalListSortingStrategy}
        >
          {selectedCurrencies.map((currency) => (
            <SortableCurrencyRow
              key={currency.code}
              id={currency.code}
              currency={currency}
              value={calculateValue(currency.code)}
              isBase={currency.code === baseCode}
              onValueChange={(val) => handleValueChange(currency.code, val)}
              onRemove={() => removeCurrency(currency.code)}
              disabled={loading && Object.keys(rates).length === 0}
            />
          ))}
        </SortableContext>
      </div>

      <DragOverlay dropAnimation={dropAnimation}>
        {activeCurrency ? (
          <div className="opacity-95 scale-105 shadow-2xl cursor-grabbing">
            <CurrencyRow
              currency={activeCurrency}
              value={calculateValue(activeCurrency.code)}
              isBase={activeCurrency.code === baseCode}
              onValueChange={() => {}}
              onRemove={() => {}}
              disabled={true}
            />
          </div>
        ) : null}
      </DragOverlay>

      <div className="mt-8">
        <button 
          onClick={() => setShowAddModal(true)}
          className="w-full ak-border bg-white hover:bg-gray-50 transition-all py-5 ak-card-clip ak-shadow flex items-center justify-center gap-3 group border-dashed border-2 border-black/10 hover:border-yellow-400"
        >
          <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-yellow-400 group-hover:bg-yellow-400/10 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 group-hover:text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <span className="text-sm font-black tracking-[0.3em] uppercase italic text-gray-500 group-hover:text-black transition-colors">添加交易资产条目</span>
        </button>
      </div>

      {sources.length > 0 && (
        <div className="mt-12 p-4 bg-white ak-shadow border-l-4 border-yellow-400 ak-card-clip">
          <h3 className="text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">/ 已验证的数据源索引 /</h3>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {sources.map((source, idx) => (
              source.web && (
                <a 
                  key={idx} 
                  href={source.web.uri} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold font-mono text-cyan-600 hover:text-cyan-800 underline flex items-center gap-1"
                >
                  <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
                  {source.web.title || source.web.uri.split('/')[2]}
                </a>
              )
            ))}
          </div>
        </div>
      )}

      {showAddModal && (
        <AddCurrencyModal 
          onSelect={addCurrency} 
          onClose={() => setShowAddModal(false)}
          excludeCodes={selectedCodes}
        />
      )}

      {loading && Object.keys(rates).length === 0 && (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col items-center justify-center p-8">
           <div className="w-16 h-16 border-t-4 border-r-4 border-yellow-400 animate-spin mb-8" />
           <div className="text-black text-xl font-black tracking-[0.4em] animate-pulse uppercase italic">PRTS 初始化中...</div>
           <div className="mt-4 text-[10px] text-gray-400 font-mono text-center max-w-xs uppercase font-bold tracking-widest">
             正在通过安全协议建立链路。实时汇率数据获取中。
           </div>
        </div>
      )}
      </DndContext>
    </Layout>
  );
};

export default App;
