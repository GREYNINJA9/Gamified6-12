
window.ChemistryGames = {
  /**
   * Molecule Builder: 3D molecular visualization
   */
  moleculeBuilder: {
    play(canvasId) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return alert('Game canvas not found!');
      // ...molecular visualization, drag-and-drop atoms...
      canvas.getContext('2d').fillText('Molecule Builder: Build molecules!', 20, 40);
      if (window.GamificationManager) GamificationManager.awardGameRewards('chemistry', 10, 'intermediate', 120);
    }
  },
  /**
   * Reaction Lab: Chemical reaction simulation
   */
  reactionLab: {
    play(canvasId) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return alert('Game canvas not found!');
      // ...reaction simulation, stoichiometry...
      canvas.getContext('2d').fillText('Reaction Lab: Simulate reactions!', 20, 40);
      if (window.GamificationManager) GamificationManager.awardGameRewards('chemistry', 8, 'beginner', 90);
    }
  },
  /**
   * Periodic Table Explorer: Interactive element discovery
   */
  periodicTableExplorer: {
    play(canvasId) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return alert('Game canvas not found!');
      // ...periodic table logic...
      canvas.getContext('2d').fillText('Periodic Table Explorer: Discover elements!', 20, 40);
      if (window.GamificationManager) GamificationManager.awardGameRewards('chemistry', 9, 'intermediate', 100);
    }
  },
  /**
   * Crystallography Puzzle: Crystal structure building
   */
  crystallographyPuzzle: {
    play(canvasId) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return alert('Game canvas not found!');
      // ...crystal structure logic...
      canvas.getContext('2d').fillText('Crystallography Puzzle: Build crystals!', 20, 40);
      if (window.GamificationManager) GamificationManager.awardGameRewards('chemistry', 10, 'advanced', 120);
    }
  },
  /**
   * Biochemistry Simulator: Enzyme kinetics
   */
  biochemistrySimulator: {
    play(canvasId) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return alert('Game canvas not found!');
      // ...enzyme kinetics logic...
      canvas.getContext('2d').fillText('Biochemistry Simulator: Explore enzymes!', 20, 40);
      if (window.GamificationManager) GamificationManager.awardGameRewards('chemistry', 11, 'advanced', 130);
    }
  },
  /**
   * Environmental Chemistry: Pollution analysis
   */
  environmentalChemistry: {
    play(canvasId) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return alert('Game canvas not found!');
      // ...pollution analysis logic...
      canvas.getContext('2d').fillText('Environmental Chemistry: Analyze pollution!', 20, 40);
      if (window.GamificationManager) GamificationManager.awardGameRewards('chemistry', 12, 'advanced', 140);
    }
  }
};
