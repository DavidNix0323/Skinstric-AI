'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white text-[11px] text-[#0F1011] z-50">
      <div className="flex items-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors h-9 px-4 py-2 font-bold text-[11px] mr-1 line-clamp-4 leading-[16px] text-[#0F1011] font-geist-sans"
        >
          SKINSTRIC
        </Link>
        <span className="text-[11px] text-gray-600 leading-[16px]">[ INTRO ]</span>
      </div>
      <button
        className="border border-black bg-black px-2 py-1 rounded-sm text-white text-[9px] font-semibold cursor-default leading-[16px] font-geist-sans"
      >
        ENTER CODE
      </button>
    </header>
  );
}
