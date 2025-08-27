// main.js
document.addEventListener('DOMContentLoaded', () => {
    const appState = {
        currentView: 'category',
        currentCategoryId: null,
        currentSceneId: null
    };

    const views = {
        category: document.getElementById('category-view'),
        persona: document.getElementById('persona-grid-view'),
        dossier: document.getElementById('dossier-view'),
        proposal: document.getElementById('proposal-view')
    };

    function navigateTo(viewName) {
        appState.currentView = viewName;
        Object.entries(views).forEach(([name, element]) => {
            if (name === viewName) {
                element.classList.remove('hiding');
                element.classList.add('active');
            } else if (element.classList.contains('active')) {
                element.classList.add('hiding');
                element.classList.remove('active');
            }
        });
    }

    const eventBus = {
        subscribe(event, callback) { document.addEventListener(event, (e) => callback(e.detail)); },
        publish(event, data) { document.dispatchEvent(new CustomEvent(event, { detail: data })); }
    };
    
    function init() {
        particlesJS('particles-js', {"particles":{"number":{"value":80,"density":{"enable":true,"value_area":800}},"color":{"value":"#cccccc"},"shape":{"type":"circle"},"opacity":{"value":0.5,"random":false},"size":{"value":3,"random":true},"line_linked":{"enable":true,"distance":150,"color":"#cccccc","opacity":0.4,"width":1},"move":{"enable":true,"speed":2,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":false},"onclick":{"enable":false},"resize":true}},"retina_detect":true});

        // Setup navigation
        eventBus.subscribe('category:selected', (categoryId) => {
            appState.currentCategoryId = categoryId;
            renderPersonaView(categoryId);
            navigateTo('persona');
        });
        eventBus.subscribe('scene:selected', (sceneId) => {
            appState.currentSceneId = sceneId;
            renderDossierView(appState.currentCategoryId, sceneId);
            navigateTo('dossier');
        });
        eventBus.subscribe('proposal:launch', () => {
            renderProposalView(appState.currentCategoryId, appState.currentSceneId);
            navigateTo('proposal');
        });
        
        // Setup back buttons
        document.querySelector('#persona-grid-view .back-button').addEventListener('click', () => navigateTo('category'));
        document.querySelector('#dossier-view .back-button').addEventListener('click', () => navigateTo('persona'));
        document.querySelector('#proposal-view .back-button').addEventListener('click', () => navigateTo('dossier'));
        
        // Initial Render
        renderCategoryView(platformData.categoryPool);
        navigateTo('category');
    }

    init();
});
