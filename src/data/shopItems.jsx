import React from 'react';
import { Keyboard, Cpu, Server, Bot } from 'lucide-react';

export const SHOP_ITEMS = [
  { id: 'rgb_kb', name: 'RGB-näppäimistö', price: 50, icon: <Keyboard size={40} />, color: 'text-pink-500', bg: 'bg-pink-100', desc: 'Koodaus on nopeampaa, kun näppäimistö vilkkuu sateenkaaren väreissä!' },
  { id: 'gpu', name: 'Tehonäytönohjain', price: 150, icon: <Cpu size={40} />, color: 'text-blue-500', bg: 'bg-blue-100', desc: 'Laskee neuroverkkoja kymmenen kertaa nopeammin.' },
  { id: 'server', name: 'Pilvipalvelin', price: 500, icon: <Server size={40} />, color: 'text-indigo-500', bg: 'bg-indigo-100', desc: 'Oma palvelinkaappi suoraan autotalliin.' },
  { id: 'robot', name: 'Apulaisrobotti', price: 1000, icon: <Bot size={40} />, color: 'text-amber-500', bg: 'bg-amber-100', desc: 'Koodaa, keittää kahvia ja tekee läksyt (melkein).' }
];