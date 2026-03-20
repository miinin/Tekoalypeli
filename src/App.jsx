import React, { useState } from 'react';
import { Zap, Store, MonitorPlay, Trophy } from 'lucide-react';

// TUODAAN FIREBASE-TYÖKALUT:
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

// Tuodaan meidän uudet, omat komponentit käyttöön:
import { Login } from './components/Login';
import { Lobby } from './components/Lobby';
import { Quiz } from './components/Quiz';
import { Shop } from './components/Shop';
import { TechLab } from './components/TechLab';

export default function App() {
  const [currentView, setCurrentView] = useState('login');
  const [activeCategory, setActiveCategory] = useState(null);
  const [user, setUser] = useState(null);

  // MUUTETTU: handleLogin tallentaa pelaajan Firebaseen
  const handleLogin = async (nickname, classCode) => {
    // Luodaan uniikki ID (esim. KoodiKettu99_1710501234)
    const userId = nickname.replace(/\s+/g, '') + '_' + Date.now();
    
    const newUser = { 
      nickname, 
      classCode, 
      bytes: 0, 
      inventory: [], 
      uid: userId 
    };
    
    setUser(newUser);
    setCurrentView('lobby');

    try {
      await setDoc(doc(db, "users", userId), newUser);
    } catch (error) {
      console.error("Virhe pelaajan tallentamisessa:", error);
    }
  };

  const handleLogout = () => { 
    setUser(null); 
    setCurrentView('login'); 
  };
  
  const startQuiz = (categoryId) => { 
    setActiveCategory(categoryId); 
    setCurrentView('quiz'); 
  };
  
  // MUUTETTU: handleQuizFinish tallentaa uudet pisteet Firebaseen
  const handleQuizFinish = async (earnedBytes) => {
    const newBytes = user.bytes + earnedBytes;
    
    setUser(prev => ({ ...prev, bytes: newBytes }));
    setCurrentView('lobby');
    setActiveCategory(null);

    if (user && user.uid) {
      try {
        await updateDoc(doc(db, "users", user.uid), {
          bytes: newBytes
        });
      } catch (error) {
        console.error("Virhe pisteiden päivityksessä:", error);
      }
    }
  };

  // MUUTETTU: handleBuyItem tallentaa ostokset Firebaseen
  const handleBuyItem = async (item) => {
    if (user.bytes >= item.price && !user.inventory.includes(item.id)) {
      const newBytes = user.bytes - item.price;
      const newInventory = [...user.inventory, item.id];
      
      setUser(prev => ({
        ...prev, 
        bytes: newBytes, 
        inventory: newInventory
      }));

      if (user && user.uid) {
        try {
          await updateDoc(doc(db, "users", user.uid), {
            bytes: newBytes,
            inventory: newInventory
          });
        } catch (error) {
          console.error("Virhe oston tallennuksessa:", error);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-roboto selection:bg-green-500 selection:text-white">
      {user && (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-800 font-bebas text-4xl tracking-wide cursor-pointer pt-2" onClick={() => setCurrentView('lobby')}>
              <Zap className="text-green-500 fill-green-500" size={28} />
              Tekoäly<span className="text-green-500">Peli</span>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4 font-roboto">
              <button 
                onClick={() => setCurrentView('shop')} 
                className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg transition-colors ${currentView === 'shop' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500 hover:text-indigo-600 hover:bg-indigo-50'}`}
              >
                <Store size={20} />
                <span className="text-[10px] mt-1 font-bold uppercase tracking-wider">Kauppa</span>
              </button>
              
              <button 
                onClick={() => setCurrentView('lab')} 
                className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg transition-colors ${currentView === 'lab' ? 'text-emerald-600 bg-emerald-50' : 'text-gray-500 hover:text-emerald-600 hover:bg-emerald-50'}`}
              >
                <MonitorPlay size={20} />
                <span className="text-[10px] mt-1 font-bold uppercase tracking-wider">Luola</span>
              </button>
              
              <button 
                onClick={() => alert("Leaderboard lisätään myöhemmin!")} 
                className="flex flex-col items-center justify-center w-12 h-12 rounded-lg text-gray-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
              >
                <Trophy size={20} />
                <span className="text-[10px] mt-1 font-bold uppercase tracking-wider">Top</span>
              </button>
              
              <div className="w-px h-8 bg-gray-200 mx-2"></div>
              
              <button 
                onClick={handleLogout} 
                className="text-xs font-bold text-gray-400 hover:text-red-500 uppercase tracking-wider transition-colors"
              >
                Poistu
              </button>
            </div>
          </div>
        </nav>
      )}

      <main>
        {currentView === 'login' && <Login onLogin={handleLogin} />}
        {currentView === 'lobby' && user && <Lobby user={user} onSelectCategory={startQuiz} />}
        {currentView === 'quiz' && user && <Quiz categoryId={activeCategory} onFinish={handleQuizFinish} />}
        {currentView === 'shop' && user && <Shop user={user} onBuy={handleBuyItem} />}
        {currentView === 'lab' && user && <TechLab user={user} />}
      </main>
    </div>
  );
}