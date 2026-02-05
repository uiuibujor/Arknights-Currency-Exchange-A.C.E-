
import React from 'react';
import { SYSTEM_VERSION, DEPT_CODE } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen ak-grid-bg relative overflow-hidden flex flex-col p-4 md:p-8">
      {/* 背景扫描线特效 */}
      <div className="ak-scanline pointer-events-none" />
      
      {/* 顶部页眉 */}
      <header className="flex justify-between items-start mb-10 z-20">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <div className="bg-black p-1 rounded-sm">
                <div className="w-8 h-8 bg-white flex items-center justify-center font-bold text-lg text-black">RI</div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-widest text-gray-900 uppercase italic">罗德岛</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="ak-bg-yellow text-black text-[10px] px-1 font-bold">后勤部</span>
                <span className="text-[10px] text-gray-400 font-mono tracking-tighter">终端.PRTS.{SYSTEM_VERSION}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex flex-col items-end text-[10px] text-gray-400 font-mono leading-none">
          <div className="ak-yellow mb-1 font-bold italic">状态: 链路稳健</div>
          <div>区域: {DEPT_CODE}</div>
          <div>安全等级: 04 级访问权限</div>
        </div>
      </header>

      {/* 主内容区域 */}
      <main className="flex-1 flex flex-col max-w-5xl mx-auto w-full z-10">
        {children}
      </main>

      {/* 装饰边角 */}
      <div className="fixed top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-black/5 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-black/5 pointer-events-none" />
      
      <footer className="mt-8 flex justify-between items-end text-[10px] text-gray-400 font-mono">
        <div>© 1097 罗德岛制药有限公司</div>
        <div className="flex gap-4">
          <span className="ak-cyan font-bold">高精度监控已开启</span>
          <span className="hidden sm:inline">DATA_STREAM_OK</span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
