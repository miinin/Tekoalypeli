import React, { useState } from 'react';
import { Zap, ChevronRight } from 'lucide-react';

export const Login = ({ onLogin }) => {
  const [nickname, setNickname] = useState('');
  const [classCode, setClassCode] = useState('');

  const handleRandomName = () => {
    const adjs = ['Koodi', 'Bitti', 'Kvantti', 'Nörtti', 'Data', 'Kyborgi'];
    const nouns = ['Kettu', 'Mäyrä', 'Pöllö', 'Botti', 'Ninja', 'Velho'];
    const random = Math.floor(Math.random() * 99);
    setNickname(`${adjs[Math.floor(Math.random() * adjs.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}${random}`);
  };

  const handleStart = (e) => {
    e.preventDefault();
    if (nickname.trim().length > 2) onLogin(nickname, classCode);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <Zap size={40} className="text-green-600" />
          </div>
        </div>
        <h2 className="text-5xl font-bebas text-center text-gray-800 mb-2">Tekoälyakatemia</h2>
        <p className="text-gray-500 text-center mb-8 font-roboto">Opi tekoälystä, kerää tavuja ja rakenna oma koodiluolasi!</p>

        <form onSubmit={handleStart} className="space-y-4 font-roboto">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Nimimerkki</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="esim. KoodiKettu99"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 text-gray-800 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                required
              />
              <button type="button" onClick={handleRandomName} className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors whitespace-nowrap border border-gray-200">
                🎲 Arvo
              </button>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Luokkakoodi (Vapaaehtoinen)</label>
            <input 
              type="text" 
              value={classCode}
              onChange={(e) => setClassCode(e.target.value.toUpperCase())}
              placeholder="esim. BETA-24"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 text-gray-800 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all uppercase"
            />
          </div>
          <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-4 rounded-lg mt-6 transition-all transform hover:scale-[1.02] shadow-lg shadow-green-500/30 flex justify-center items-center gap-2 text-lg">
            Pelaamaan <ChevronRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};
