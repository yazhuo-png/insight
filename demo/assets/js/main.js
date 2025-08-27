// main.js
document.addEventListener('DOMContentLoaded', () => {
    const appState = {
        currentView: 'category',
        currentCategoryId: null,
        currentSceneId: null,
        history: [] // To manage back navigation correctly
    };

    const views = {
        category: document.getElementById('category-view'),
        persona: document.getElementById('persona-grid-view'),
        dossier: document.getElementById('dossier-view'),
        proposal: document.getElementById('proposal-view')
    };

    function navigateTo(viewName, direction = 'forward') {
        const oldView = appState.currentView;
        if (direction === 'forward' && oldView) {
            appState.history.push(oldView);
        }

        appState.currentView = viewName;
        Object.entries(views).forEach(([name, element]) => {
            if (name === viewName) {
                element.classList.remove('hiding');
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        });

        // Add hiding class to old view for smooth transition
        if (oldView && oldView !== viewName) {
            views[oldView].classList.add('hiding');
        }
    }

    const eventBus = {
        subscribe(event, callback) { document.addEventListener(event, (e) => callback(e.detail)); },
        publish(event, data) { document.dispatchEvent(new CustomEvent(event, { detail: data })); }
    };
    
    function init() {
        particlesJS('particles-js', {"particles":{"number":{"value":80,"density":{"enable":true,"value_area":800}},"color":{"value":"#cccccc"},"shape":{"type":"circle"},"opacity":{"value":0.5,"random":false},"size":{"value":3,"random":true},"line_linked":{"enable":true,"distance":150,"color":"#cccccc","opacity":0.4,"width":1},"move":{"enable":true,"speed":2,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":false},"onclick":{"enable":false},"resize":true}},"retina_detect":true});

        // --- Controller Functions ---
        const controllers = {
            showCategoryView: () => {
                renderHomePage(platformData);
                navigateTo('category');
            },
            showPersonaGridView: (categoryId) => {
                appState.currentCategoryId = categoryId;
                renderPersonaView(categoryId);
                navigateTo('persona');
            },
            showDossierView: (sceneId) => {
                appState.currentSceneId = sceneId;
                renderDossierView(appState.currentCategoryId, sceneId);
                navigateTo('dossier');
            },
            showProposalView: () => {
                renderProposalView(appState.currentCategoryId, appState.currentSceneId);
                navigateTo('proposal');
            },
            navigateBack: () => {
                const lastView = appState.history.pop() || 'category';
                navigateTo(lastView, 'backward');
            }
        };

        // --- Setup Event Listeners ---
        eventBus.subscribe('category:selected', (categoryId) => controllers.showPersonaGridView(categoryId));
        eventBus.subscribe('scene:selected', (sceneId) => controllers.showDossierView(sceneId));
        eventBus.subscribe('proposal:launch', () => controllers.showProposalView());
        eventBus.subscribe('direct-to-scene', ({categoryId, sceneId}) => {
            controllers.showPersonaGridView(categoryId);
            // Wait for the view transition to start before jumping to the next
            setTimeout(() => {
                controllers.showDossierView(sceneId);
            }, 50);
        });
        
        // Setup all back buttons
        Object.values(views).forEach(view => {
            const backButton = view.querySelector('.back-button');
            if (backButton) {
                backButton.addEventListener('click', controllers.navigateBack);
            }
        });

        // --- Initial Load ---
        controllers.showCategoryView();
    }

    init();
});
