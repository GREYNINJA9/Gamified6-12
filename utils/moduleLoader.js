// Utility for loading legacy JS modules in Next.js
const ModuleLoader = {
  loadedModules: new Set(),
  
  async loadModule(moduleName, dependencies = []) {
    if (typeof window === 'undefined') return null;
    if (this.loadedModules.has(moduleName)) return window[moduleName];
    
    // Load dependencies first
    for (const dep of dependencies) {
      await this.loadModule(dep);
    }
    
    try {
      await import(`../js/${moduleName}.js`);
      this.loadedModules.add(moduleName);
      return window[moduleName];
    } catch (error) {
      console.error(`Failed to load module ${moduleName}:`, error);
      return null;
    }
  },
  
  async initializeCore() {
    // Load core modules in correct order
    await this.loadModule('offline');
    await this.loadModule('i18n');
    await this.loadModule('gamification-manager', ['offline']);
    await this.loadModule('voice-navigation-system', ['i18n']);
    
    // Initialize modules
    if (window.Offline) window.Offline.init();
    if (window.i18n) window.i18n.init();
    if (window.VoiceNavigationSystem) window.VoiceNavigationSystem.init();
  }
};

export default ModuleLoader;
