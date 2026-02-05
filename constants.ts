
import { Currency } from './types';

export const ALL_CURRENCIES: Currency[] = [
  { code: 'USD', name: '美元', symbol: '$', flag: '🇺🇸' },
  { code: 'CNY', name: '人民币', symbol: '¥', flag: '🇨🇳' },
  { code: 'JPY', name: '日元', symbol: '¥', flag: '🇯🇵' },
  { code: 'EUR', name: '欧元', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: '英镑', symbol: '£', flag: '🇬🇧' },
  { code: 'HKD', name: '港币', symbol: 'HK$', flag: '🇭🇰' },
  { code: 'TWD', name: '新台币', symbol: 'NT$', flag: '🇹🇼' },
  { code: 'KRW', name: '韩元', symbol: '₩', flag: '🇰🇷' },
  { code: 'SGD', name: '新加坡元', symbol: 'S$', flag: '🇸🇬' },
  { code: 'AUD', name: '澳元', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CAD', name: '加元', symbol: 'C$', flag: '🇨🇦' },
  { code: 'THB', name: '泰铢', symbol: '฿', flag: '🇹🇭' },
  { code: 'PHP', name: '菲律宾比索', symbol: '₱', flag: '🇵🇭' },
  { code: 'MYR', name: '马来西亚林吉特', symbol: 'RM', flag: '🇲🇾' },
];

export const INITIAL_CURRENCY_CODES = ['USD', 'CNY', 'JPY', 'EUR', 'HKD'];

export const SYSTEM_VERSION = "v3.12.04.L";
export const DEPT_CODE = "罗德岛后勤部";
