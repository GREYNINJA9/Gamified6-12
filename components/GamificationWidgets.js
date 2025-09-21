import { useState, useEffect } from 'react';

export default function GamificationWidgets() {
  const [coins, setCoins] = useState(0);
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState(0);
  useEffect(() => {
    import('../js/gamification-manager.js').then(mod => {
      const gm = new (mod.default || mod.GamificationManager)();
      setCoins(gm.getCoins());
      setStreak(gm.getStreak());
      setBadges(gm.getBadges());
    });
  }, []);
  return (
    <div className="flex gap-4 items-center">
      <div className="bg-yellow-200 p-2 rounded">Coins: {coins}</div>
      <div className="bg-blue-200 p-2 rounded">Streak: {streak}</div>
      <div className="bg-green-200 p-2 rounded">Badges: {badges}</div>
    </div>
  );
}
