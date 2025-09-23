// STEMAvatarCreator: Culturally sensitive avatar customization
// Integrates with gamification-manager.js and offline.js

class STEMAvatarCreator {
    customizeAppearance(options) {
        if (options.skin) this.model.skin = options.skin;
        if (options.hair) this.model.hair = options.hair;
        if (options.hairColor) this.model.hairColor = options.hairColor;
        this.render();
    }
        async loadAvatarConfig() {
            if (window.Offline && typeof window.Offline.get === 'function') {
                return new Promise(resolve => {
                    window.Offline.get('avatarConfig', null, result => {
                        if (result && result.data) {
                            this.model = result.data;
                            this.render();
                        }
                        resolve();
                    });
                });
            }
        }

        async saveAvatarConfiguration() {
            if (window.Offline && typeof window.Offline.store === 'function') {
                window.Offline.store('avatarConfig', null, this.model);
            }
            // Debounce: only save if not recently saved
            clearTimeout(this._saveTimeout);
            this._saveTimeout = setTimeout(() => {
                if (window.Offline && typeof window.Offline.store === 'function') {
                    window.Offline.store('avatarConfig', null, this.model);
                }
            }, 1000);
            alert('Avatar saved!');
        }

        exportAvatarImage(format='png') {
            const canvas = document.getElementById(this.canvasId);
            if (!canvas) return null;
            if (format==='png') {
                const url = canvas.toDataURL('image/png');
                const a = document.createElement('a');
                a.href = url;
                a.download = 'avatar.png';
                a.click();
                alert('Avatar exported!');
                return url;
            }
            return null;
        }

    static init() {
        const canvas = document.getElementById('avatar-canvas');
        if (!canvas) return;
        const creator = new STEMAvatarCreator('avatar-canvas');
        creator.render();
        creator.bindUI();
        window._avatarCreator = creator;
    }

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.avatar = this.defaultAvatar();
        this.unlockedItems = [];
        this.loadUnlockedItems();
        this.loadAvatar();
    }

    defaultAvatar() {
        return {
            skin: '#f5d6c6',
            hair: 'short',
            hairColor: '#2c1b0c',
            face: 'smile',
            body: 'average',
            cultural: [],
            stem: []
        };
    }

    static async init() {
        const container = document.getElementById('avatar-creator');
        if (!container || container.dataset.initialized) return;
        container.dataset.initialized = '1';
        container.innerHTML = `
            <canvas id="avatar-canvas" width="320" height="320" aria-label="Avatar preview" style="border-radius:12px;border:1px solid #ccc;margin-bottom:8px;"></canvas>
            <div class="avatar-controls mb-2">
                <label>Skin Tone <input type="color" id="avatar-skin" value="#f5d6c6"></label>
                <label>Hair Style <select id="avatar-hair"><option value="short">Short</option><option value="long">Long</option></select></label>
                <label>Hair Color <input type="color" id="avatar-hair-color" value="#2c1b0c"></label>
            </div>
            <div class="avatar-actions mb-2">
                <button id="avatar-save">Save</button>
                <button id="avatar-reset">Reset</button>
                <button id="avatar-export">Export</button>
            </div>
        `;
        const creator = new STEMAvatarCreator('avatar-canvas');
        await creator.loadAvatarConfig();
        creator.render();
        document.getElementById('avatar-skin').oninput = e => creator.customizeAppearance({ skin: e.target.value });
        document.getElementById('avatar-hair').onchange = e => creator.customizeAppearance({ hair: e.target.value });
        document.getElementById('avatar-hair-color').oninput = e => creator.customizeAppearance({ hairColor: e.target.value });
        document.getElementById('avatar-save').onclick = () => creator.saveAvatarConfiguration();
        document.getElementById('avatar-reset').onclick = () => { creator.model = creator.defaultModel(); creator.render(); };
        document.getElementById('avatar-export').onclick = () => creator.exportAvatarImage('png');
        window._avatarCreator = creator;
    }
}

window.STEMAvatarCreator = STEMAvatarCreator;
window.StemAvatarCreator = STEMAvatarCreator; // alias for compatibility
