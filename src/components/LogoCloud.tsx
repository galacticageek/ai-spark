import React from 'react';
import { InfiniteSlider } from './InfiniteSlider';

const companies = [
  { name: 'TechFlow', color: '#1A1A1A' },
  { name: 'Synapse', color: '#8E9AAF' },
  { name: 'Quantum Leap', color: '#A3B18A' },
  { name: 'Nexus Data', color: '#C06C4C' },
  { name: 'Aero Dynamics', color: '#1A1A1A' },
  { name: 'Vanguard', color: '#8C8C88' },
  { name: 'Stellar Tech', color: '#A3B18A' },
  { name: 'Pioneer', color: '#1A1A1A' },
];

export const LogoCloud = () => {
  return (
    <section className="bg-white py-12 md:py-20 border-b border-[#E5E5E0] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center md:flex-row">
          <div className="mb-8 md:mb-0 md:mr-8 md:pr-8 md:border-r border-[#E5E5E0] shrink-0 text-center md:text-right">
            <p className="text-xs font-bold uppercase tracking-widest text-[#8C8C88]">Trusted by</p>
            <p className="text-[#1A1A1A] font-semibold text-sm mt-1">Industry Leaders</p>
          </div>
          
          <div className="relative w-full">
            {/* Edge fade masks */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
            
            <InfiniteSlider speed={35} gap={64} className="py-2">
              {companies.map((company, idx) => (
                <div key={idx} className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity whitespace-nowrap">
                  <span 
                    className="font-bold text-xl md:text-2xl tracking-tighter mix-blend-multiply" 
                    style={{ color: company.color }}
                  >
                    {company.name}
                  </span>
                </div>
              ))}
            </InfiniteSlider>
          </div>
        </div>
      </div>
    </section>
  );
};
