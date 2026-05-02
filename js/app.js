// ==========================================================================
// P2P2P Project - Main Application Entry
// ==========================================================================

import TabManager from './tabs.js';
import AnimationManager from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize managers
    new TabManager();
    new AnimationManager();

    console.log('🚀 P2P2P Project architecture initialized successfully!');
});
