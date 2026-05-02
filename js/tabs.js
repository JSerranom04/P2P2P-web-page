// ==========================================================================
// P2P2P Project - Tabs Logic
// ==========================================================================

class TabManager {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.tabContents = document.querySelectorAll('.tab-content');
        this.init();
    }

    init() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-target');
                if (targetId) {
                    this.switchTab(targetId);
                }
            });
        });

        // Open default tab or hash tab
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            this.switchTab(hash);
        } else {
            this.switchTab('intro');
        }
    }

    switchTab(tabId) {
        // Remove active class from all links and contents
        this.navLinks.forEach(link => link.classList.remove('active'));
        this.tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to target
        const targetLink = document.querySelector(`.nav-link[data-target="${tabId}"]`);
        const targetContent = document.getElementById(tabId);

        if (targetLink) targetLink.classList.add('active');
        if (targetContent) {
            targetContent.classList.add('active');
            window.location.hash = tabId;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
}

export default TabManager;
