import { useState, useEffect } from 'react';

export default function useGamification() {
  const [state, setState] = useState({ coins: 0, badges: 0, streak: 0 });
  useEffect(() => {
    import('../js/gamification-manager.js').then(mod => {
      const gm = new (mod.default || mod.GamificationManager)();
      setState({
        coins: gm.getCoins(),
        badges: gm.getBadges(),
        streak: gm.getStreak(),
      });
    });
  }, []);
  const earnCoins = (amount) => {
    import('../js/gamification-manager.js').then(mod => {
      const gm = new (mod.default || mod.GamificationManager)();
      gm.earnCoins(amount);
      setState(s => ({ ...s, coins: gm.getCoins() }));
    });
  };
  const unlockBadge = (badge) => {
    import('../js/gamification-manager.js').then(mod => {
      const gm = new (mod.default || mod.GamificationManager)();
      gm.unlockBadge(badge);
      setState(s => ({ ...s, badges: gm.getBadges() }));
    });
  };
  const updateStreak = () => {
    import('../js/gamification-manager.js').then(mod => {
      const gm = new (mod.default || mod.GamificationManager)();
      gm.updateStreak();
      setState(s => ({ ...s, streak: gm.getStreak() }));
    });
  };
  return { ...state, earnCoins, unlockBadge, updateStreak };
}
