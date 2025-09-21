import React, { useEffect, useState } from 'react';

export default function GamificationWidgets() {
  const [gm, setGm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [coinBalance, setCoinBalance] = useState(0);
  const [badges, setBadges] = useState(0);
  const [streak, setStreak] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    (async () => {
      try {
        const { default: GamificationManager } = await import('../js/gamification-manager');
        const manager = new GamificationManager();
        setGm(manager);
        setCoinBalance(manager.getCoinBalance ? manager.getCoinBalance() : 0);
        setBadges(manager.getBadgeList ? manager.getBadgeList().length : 0);
        setStreak(manager.getStreak ? manager.getStreak('daily') : 0);
      } catch (err) {
        setError('Failed to load GamificationManager');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="p-4">Loading gamification...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="flex gap-6 items-center p-4 bg-white rounded shadow">
      <div className="flex flex-col items-center">
        <span className="text-lg font-bold">Coins</span>
        <span className="text-yellow-500" data-feather="award">{coinBalance}</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-lg font-bold">Badges</span>
        <span className="text-blue-500" data-feather="star">{badges}</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-lg font-bold">Streak</span>
        <span className="text-green-500" data-feather="activity">{streak}</span>
      </div>
    </div>
  );
}
