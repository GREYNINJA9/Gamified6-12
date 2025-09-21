import { useState } from 'react';
import Header from '../components/Header';
import GameModal from '../components/GameModal';
import GamificationWidgets from '../components/GamificationWidgets';

const gameList = ['Physics Puzzles', 'Math Escape Rooms', 'Chemistry Simulations'];

export default function Games() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="min-h-screen bg-blue-50">
      <Header role="student" />
      <div className="p-8">
        <GamificationWidgets />
        <h1 className="text-3xl font-bold mb-4">Games</h1>
        <div className="flex gap-4 mb-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setShowModal(true)}>Play Game</button>
          <input type="text" placeholder="Search games..." className="border p-2 rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gameList.map(game => (
            <div key={game} className="bg-white p-4 rounded shadow flex flex-col items-center">
              <span className="font-bold mb-2">{game}</span>
              <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => setShowModal(true)}>Play</button>
            </div>
          ))}
        </div>
        {showModal && <GameModal games={gameList} onClose={() => setShowModal(false)} />}
      </div>
    </div>
  );
}
