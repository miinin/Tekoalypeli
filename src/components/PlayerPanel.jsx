import React from 'react';
import { User, Zap } from 'lucide-react';

export const PlayerPanel = ({ user }) => (
  <div className="bg-white rounded-2xl p-6 mb-8 flex flex-col sm:flex-row justify-between items-center border border-gray-200 shadow-sm">
    <div className="flex items-center gap-4 mb-4 sm:mb-0">
      <div className="bg-green-50 p-3 rounded-full">
        <User className="text-green-600" size={32} />
      </div>
      <div>
        <h2 className="text-3xl font-bebas text-gray-800">{user.nickname}</h2>
        {user.classCode && (
          <span className="text-sm text-green-700 bg-green-100 px-2 py-1 rounded-md font-medium">Luokka: {user.classCode}</span>
        )}
      </div>
    </div>
    <div className="flex gap-4">
      <div className="bg-gray-50 border border-gray-200 px-6 py-3 rounded-xl flex items-center gap-3">
        <Zap className="text-green-500" size={24} />
        <div className="text-right">
          <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Tavuja</div>
          <div className="text-3xl font-bebas text-gray-800 leading-none mt-1">{user.bytes}</div>
        </div>
      </div>
    </div>
  </div>
);
