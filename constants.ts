
import { Currency } from './types';

export const ALL_CURRENCIES: Currency[] = [
  { code: 'USD', name: '美元', symbol: '$', flag: '🇺🇸' },
  { code: 'CNY', name: '人民币', symbol: '¥', flag: '🇨🇳' },
  { code: 'JPY', name: '日元', symbol: '¥', flag: '🇯🇵' },
  { code: 'EUR', name: '欧元', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: '英镑', symbol: '£', flag: '🇬🇧' },
  { code: 'HKD', name: '港币', symbol: 'HK$', flag: '🇭🇰' },
  { code: 'TWD', name: '台币', symbol: 'NT$', flag: '🇹🇼' },
  { code: 'KRW', name: '韩元', symbol: '₩', flag: '🇰🇷' },
  { code: 'SGD', name: '新元', symbol: 'S$', flag: '🇸🇬' },
  { code: 'AUD', name: '澳元', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CAD', name: '加元', symbol: 'C$', flag: '🇨🇦' },
  { code: 'THB', name: '泰铢', symbol: '฿', flag: '🇹🇭' },
  { code: 'PHP', name: '比索', symbol: '₱', flag: '🇵🇭' },
  { code: 'MYR', name: '林吉特', symbol: 'RM', flag: '🇲🇾' },
];

export const REGION_NAME_BY_CURRENCY_CODE: Record<string, string> = {
  USD: '美国',
  CNY: '中国',
  JPY: '日本',
  EUR: '欧盟',
  GBP: '英国',
  HKD: '中国香港',
  TWD: '中国台湾',
  KRW: '韩国',
  SGD: '新加坡',
  AUD: '澳大利亚',
  CAD: '加拿大',
  THB: '泰国',
  PHP: '菲律宾',
  MYR: '马来西亚',
};

export const INITIAL_CURRENCY_CODES = ['USD', 'CNY', 'JPY', 'EUR', 'HKD'];

export const SYSTEM_VERSION = "v3.12.04.L";
export const DEPT_CODE = "熊猫汇率换算器";
