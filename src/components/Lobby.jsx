import React from 'react';
import { MonitorPlay, ChevronRight, Settings, ShieldCheck, FileText, Eye, History, Heart, Lightbulb, User, Zap } from 'lucide-react';

/**
 * PlayerPanel -komponentti on sisällytetty tähän tiedostoon esikatselun toimivuuden varmistamiseksi.
 * Paikallisessa projektissasi voit pitää tämän erillisenä tiedostona, jos niin haluat.
 */
const PlayerPanel = ({ user }) => (
  <div className="bg-white rounded-2xl p-6 mb-8 flex flex-col sm:flex-row justify-between items-center border border-gray-200 shadow-sm">
    <div className="flex items-center gap-4 mb-4 sm:mb-0">
      <div className="bg-green-50 p-3 rounded-full">
        <User className="text-green-600" size={32} />
      </div>
      <div>
        <h2 className="text-3xl font-bebas text-gray-800">{user.nickname}</h2>
        {user.classCode && (
          <span className="text-sm text-green-700 bg-green-100 px-2 py-1 rounded-md font-medium">
            Luokka: {user.classCode}
          </span>
        )}
      </div>
    </div>
    
    <div className="flex gap-4">
      <div className="bg-gray-50 border border-gray-200 px-6 py-3 rounded-xl flex items-center gap-3">
        <Zap className="text-green-500" size={24} />
        <div className="text-right">
          <div className="text-xs text-gray-500 font-bold uppercase tracking-wider font-roboto">Tavuja</div>
          <div className="text-3xl font-bebas text-gray-800 leading-none mt-1">{user.bytes}</div>
        </div>
      </div>
    </div>
  </div>
);

export const Lobby = ({ user, onSelectCategory }) => {
  // Kaikki suunnitellut 7 kategoriaa omilla ikoneillaan ja väreillään
  const categories = [
    { 
      id: 'tech', 
      name: 'Tekoälyn tekniikka', 
      icon: <Settings size={24} />, 
      color: 'bg-blue-100 text-blue-600', 
      barColor: 'bg-blue-500' 
    },
    { 
      id: 'security', 
      name: 'Digiturva ja yksityisyys', 
      icon: <ShieldCheck size={24} />, 
      color: 'bg-red-100 text-red-600', 
      barColor: 'bg-red-500' 
    },
    { 
      id: 'copyright', 
      name: 'Tekijänoikeudet', 
      icon: <FileText size={24} />, 
      color: 'bg-orange-100 text-orange-600', 
      barColor: 'bg-orange-500' 
    },
    { 
      id: 'deepfake', 
      name: 'Deepfake ja valeuutiset', 
      icon: <Eye size={24} />, 
      color: 'bg-pink-100 text-pink-600', 
      barColor: 'bg-pink-500' 
    },
    { 
      id: 'history', 
      name: 'Tekoälyn historia', 
      icon: <History size={24} />, 
      color: 'bg-amber-100 text-amber-600', 
      barColor: 'bg-amber-500' 
    },
    { 
      id: 'human', 
      name: 'Tekoäly vs. Ihminen', 
      icon: <Heart size={24} />, 
      color: 'bg-purple-100 text-purple-600', 
      barColor: 'bg-purple-500' 
    },
    { 
      id: 'utility', 
      name: 'Tekoäly hyötykäytössä', 
      icon: <Lightbulb size={24} />, 
      color: 'bg-emerald-100 text-emerald-600', 
      barColor: 'bg-emerald-500' 
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-roboto animate-in fade-in">
      {/* Käytetään yllä määriteltyä infopaneelia */}
      <PlayerPanel user={user} />
      
      <h3 className="text-2xl font-bebas text-gray-800 mb-6 flex items-center gap-2">
        <MonitorPlay className="text-green-500" /> Valitse kategoria
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {categories.map((cat) => (
          <button 
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className="group relative overflow-hidden bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl p-6 text-left transition-all hover:scale-[1.02] shadow-sm hover:shadow-md flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className={`${cat.color} w-14 h-14 flex items-center justify-center rounded-xl`}>
                {cat.icon}
              </div>
              <span className="text-2xl font-bebas text-gray-700 group-hover:text-green-600 transition-colors pt-1">
                {cat.name}
              </span>
            </div>
            <ChevronRight className="text-gray-400 group-hover:text-green-500 transition-colors" />
            
            {/* Koristeellinen edistymispalkki pohjalla */}
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-100">
              <div className={`h-full ${cat.barColor} w-1/4 opacity-80`}></div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Lobby;