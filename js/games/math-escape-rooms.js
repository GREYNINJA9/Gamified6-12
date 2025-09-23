
window.MathGames = {
  /**
   * Number Maze: Procedural math maze
   */
  numberMaze: {
    play(canvasId) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return alert('Game canvas not found!');
      // ...maze generation, math-based doors...
      canvas.getContext('2d').fillText('Number Maze: Solve math to escape!', 20, 40);
      if (window.GamificationManager) GamificationManager.awardGameRewards('math', 10, 'intermediate', 120);
    }
  },
  /**
   * Algebra Adventure: Story-driven algebra game
   */
  algebraAdventure: {
    play(canvasId) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return alert('Game canvas not found!');
      // ...equation manipulation, graphing...
      canvas.getContext('2d').fillText('Algebra Adventure: Solve equations!', 20, 40);
      if (window.GamificationManager) GamificationManager.awardGameRewards('math', 8, 'beginner', 90);
    }
  },
  /**
   * Geometry Constructor: Geometric proof construction
   */
  geometryConstructor: {
    play(canvasId) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return alert('Game canvas not found!');
      // ...geometry construction logic...
      canvas.getContext('2d').fillText('Geometry Constructor: Build proofs!', 20, 40);
      if (window.GamificationManager) GamificationManager.awardGameRewards('math', 9, 'intermediate', 100);
    }
  },
  /**
   * Statistics Detective: Data analysis game
   */
  statisticsDetective: {
    play(canvasId) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return alert('Game canvas not found!');
      // ...statistics analysis logic...
      canvas.getContext('2d').fillText('Statistics Detective: Analyze data!', 20, 40);
      if (window.GamificationManager) GamificationManager.awardGameRewards('math', 10, 'advanced', 120);
    }
  },
  /**
   * Calculus Explorer: Derivative/integral visualization
   */
  calculusExplorer: {
    play(canvasId) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return alert('Game canvas not found!');
      // ...calculus visualization logic...
      canvas.getContext('2d').fillText('Calculus Explorer: Visualize calculus!', 20, 40);
      if (window.GamificationManager) GamificationManager.awardGameRewards('math', 11, 'advanced', 130);
    }
  },
  /**
   * Number Theory Quest: Prime numbers, modular arithmetic
   */
  numberTheoryQuest: {
    play(canvasId) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return alert('Game canvas not found!');
      // ...number theory logic...
      canvas.getContext('2d').fillText('Number Theory Quest: Explore primes!', 20, 40);
      if (window.GamificationManager) GamificationManager.awardGameRewards('math', 12, 'advanced', 140);
    }
  }
};
