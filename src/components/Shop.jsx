import React from 'react';
import { Store, Zap, CheckCircle2, ShoppingCart } from 'lucide-react';
import { PlayerPanel } from './PlayerPanel';
import { SHOP_ITEMS } from '../data/shopItems';

export const Shop = ({ user, onBuy }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-roboto animate-in fade-in slide-in-from-bottom-4">
      <PlayerPanel user={user} />
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-100 p-2 rounded-lg">
          <Store className="text-indigo-600" size={28} />
        </div>
        <div>
          <h3 className="text-3xl font-bebas text-gray-800 leading-none">Laitteistokauppa</h3>
          <p className="text-gray-500 text-sm mt-1">Tuhlaa keräämäsi tavut uusiin laitteisiin!</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SHOP_ITEMS.map((item) => {
          const isOwned = user.inventory.includes(item.id);
          const canAfford = user.bytes >= item.price;

          return (
            <div key={item.id} className={`bg-white rounded-2xl p-6 border transition-all ${isOwned ? 'border-green-500 shadow-sm opacity-80' : 'border-gray-200 shadow-md hover:border-indigo-300'}`}>
              <div className="flex items-start gap-4">
                <div className={`${item.bg} ${item.color} w-16 h-16 rounded-xl flex items-center justify-center shrink-0`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-xl font-bold text-gray-800">{item.name}</h4>
                    {!isOwned && (
                      <span className={`font-bebas text-xl flex items-center gap-1 ${canAfford ? 'text-green-600' : 'text-red-400'}`}>
                        <Zap size={16} /> {item.price}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm mt-2 mb-4 leading-relaxed">{item.desc}</p>
                  {isOwned ? (
                    <div className="w-full bg-green-50 text-green-700 font-bold py-2 rounded-lg flex justify-center items-center gap-2 border border-green-200">
                      <CheckCircle2 size={18} /> Ostettu
                    </div>
                  ) : (
                    <button 
                      onClick={() => onBuy(item)}
                      disabled={!canAfford}
                      className={`w-full font-bold py-2.5 rounded-lg flex justify-center items-center gap-2 transition-all ${canAfford ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                    >
                      <ShoppingCart size={18} /> {canAfford ? 'Osta' : 'Ei tarpeeksi tavuja'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
