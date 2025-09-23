
window.PhysicsGames = {
  /**
   * Gravity Master: Full physics simulation
   */
  gravityMaster: {
    play(canvasId) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return alert('Game canvas not found!');
      // ...gravity simulation logic, drag-and-drop gravity wells, barriers...
      canvas.getContext('2d').fillText('Gravity Master: Simulate gravity wells!', 20, 40);
      if (window.GamificationManager) GamificationManager.awardGameRewards('physics', 10, 'intermediate', 120);
    }
  },
  /**
   * Collision Course: Collision physics simulation
   */
  collisionCourse: {
    play(canvasId) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return alert('Game canvas not found!');
      // ...collision simulation logic, momentum conservation...
      canvas.getContext('2d').fillText('Collision Course: Simulate collisions!', 20, 40);
      if (window.GamificationManager) GamificationManager.awardGameRewards('physics', 8, 'beginner', 90);
    }
  },
  /**
   * Wave Simulator: Interactive wave interference
   */
  waveSimulator: {
    play(canvasId) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return alert('Game canvas not found!');
      // ...wave simulation logic...
      canvas.getContext('2d').fillText('Wave Simulator: Explore waves!', 20, 40);
      if (window.GamificationManager) GamificationManager.awardGameRewards('physics', 9, 'intermediate', 100);
    }
  },
  /**
   * Optics Lab: Light ray tracing
   */
  opticsLab: {
    play(canvasId) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return alert('Game canvas not found!');
      // ...optics simulation logic...
      canvas.getContext('2d').fillText('Optics Lab: Trace light rays!', 20, 40);
      if (window.GamificationManager) GamificationManager.awardGameRewards('physics', 10, 'advanced', 120);
    }
  },
  /**
   * Electromagnetism Explorer: Electric/magnetic simulation
   */
  electromagnetismExplorer: {
    play(canvasId) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return alert('Game canvas not found!');
      // ...electromagnetism simulation logic...
      canvas.getContext('2d').fillText('Electromagnetism Explorer: Visualize fields!', 20, 40);
      if (window.GamificationManager) GamificationManager.awardGameRewards('physics', 11, 'advanced', 130);
    }
  },
  /**
   * Thermodynamics Engine: Heat transfer simulation
   */
  thermodynamicsEngine: {
    play(canvasId) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return alert('Game canvas not found!');
      // ...thermodynamics simulation logic...
      canvas.getContext('2d').fillText('Thermodynamics Engine: Simulate heat transfer!', 20, 40);
      if (window.GamificationManager) GamificationManager.awardGameRewards('physics', 12, 'advanced', 140);
    }
  }
};
