import { useState } from 'react';

export default function GameModal({ games = [], onClose }) {
  const [currentGame, setCurrentGame] = useState(null);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl">
        <button onClick={onClose} className="absolute top-2 right-2 p-2"><i data-feather="x"></i></button>
        <h2 className="text-xl font-bold mb-4">Play Game</h2>
        <select onChange={e => setCurrentGame(e.target.value)} className="mb-4">
          <option value="">Select a game</option>
          {games.map(game => <option key={game} value={game}>{game}</option>)}
        </select>
        {currentGame && <canvas id="game-canvas" className="w-full h-64 border" />}
        <div className="mt-4 flex gap-2">
          <button className="p-2 bg-blue-500 text-white rounded">Pause</button>
          <button className="p-2 bg-gray-500 text-white rounded" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
