import React from 'react';
import { MonitorPlay } from 'lucide-react';
import { PlayerPanel } from './PlayerPanel';
import { SHOP_ITEMS } from '../data/shopItems';

export const TechLab = ({ user }) => {
  const ownedItems = SHOP_ITEMS.filter(item => user.inventory.includes(item.id));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-roboto animate-in fade-in slide-in-from-bottom-4">
      <PlayerPanel user={user} />
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-emerald-100 p-2 rounded-lg">
          <MonitorPlay className="text-emerald-600" size={28} />
        </div>
        <div>
          <h3 className="text-3xl font-bebas text-gray-800 leading-none">Oma Koodiluola</h3>
          <p className="text-gray-500 text-sm mt-1">Kaikki ostamasi laitteet löytyvät täältä.</p>
        </div>
      </div>
      <div className="bg-slate-900 rounded-3xl p-8 min-h-[400px] border-4 border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="w-full h-px bg-slate-500 mt-12 mb-24"></div>
          <div className="w-full h-px bg-slate-500 mb-24"></div>
        </div>
        {ownedItems.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 z-10">
            <MonitorPlay size={64} className="mb-4 opacity-20" />
            <h4 className="text-2xl font-bebas text-slate-400">Luola on vielä tyhjä</h4>
            <p className="text-sm mt-2">Pelaa visoja, kerää tavuja ja osta laitteita kaupasta!</p>
          </div>
        ) : (
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {ownedItems.map((item, index) => (
              <div key={item.id} className="flex flex-col items-center animate-in zoom-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className={`w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform cursor-pointer border-2 border-slate-700 bg-slate-800 ${item.color.replace('text-', 'text-')}`}>
                  {React.cloneElement(item.icon, { size: 48 })}
                </div>
                <span className="mt-3 text-slate-300 font-bold text-center text-sm">{item.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
