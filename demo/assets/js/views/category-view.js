// category-view.js

function renderHomePage(platformData) {
    renderLiveOpportunities(platformData);
    renderCategoryMatrix(platformData.categoryPool);
}

function renderLiveOpportunities(platformData) {
    const container = document.getElementById('opportunity-cards-container');
    container.innerHTML = '';

    // 1. Create the "Scene Pool"
    const allInsights = [];
    for (const categoryId in platformData.categoryData) {
        const category = platformData.categoryData[categoryId];
        if (category.insights) {
            for (const sceneId in category.insights) {
                allInsights.push({
                    ...category.insights[sceneId],
                    id: sceneId,
                    categoryId: parseInt(categoryId, 10),
                    categoryName: category.name
                });
            }
        }
    }

    // 2. Sort and get Top 5
    const sortedInsights = allInsights.sort((a,b) => parseInt(a.priority.substring(1)) - parseInt(b.priority.substring(1)) || b.score - a.score);
    const topOpportunities = sortedInsights.slice(0, 5);
    
    // 3. Render Cards
    topOpportunities.forEach(item => {
        const card = document.createElement('div');
        card.className = 'opportunity-card';
        card.dataset.categoryId = item.categoryId;
        card.dataset.sceneId = item.id;
        
        card.innerHTML = `
            <div class="card-top">
                <div class="scenario-info">
                    <h3>${item.scenario}</h3>
                    <span class="category-tag">${item.categoryName}</span>
                </div>
                <div class="priority-badge ${item.priority.toLowerCase()}">${item.priority}</div>
            </div>
            <div class="card-content">
                <p class="ai-decision">"${item.ai_decision}"</p>
            </div>
            <div class="card-bottom">
                <span class="score-label">机会分</span>
                <span class="score-value">${item.score}</span>
            </div>
        `;
        container.appendChild(card);
    });

    // 4. Add event listener for direct navigation
    container.addEventListener('click', (event) => {
        const card = event.target.closest('.opportunity-card');
        if (card) {
            const eventBus = { publish(event, data) { document.dispatchEvent(new CustomEvent(event, { detail: data })); } };
            // First, set the global state for category
            const categoryId = parseInt(card.dataset.categoryId, 10);
            const sceneId = card.dataset.sceneId;

            // Publish events to trigger navigation in main.js
            eventBus.publish('direct-to-scene', { categoryId, sceneId });
        }
    });
}

function renderCategoryMatrix(categories) {
    const container = document.getElementById('category-matrix');
    container.innerHTML = ''; 
    const header = document.createElement('div');
    header.className = 'cat-matrix-row cat-matrix-header';
    header.innerHTML = `<div>机会分</div><div>三级类目</div><div class="cat-col-value">热度</div><div>趋势</div><div class="cat-col-value">满足率</div><div>趋势</div><div class="cat-col-value">新品占比</div><div>趋势</div><div class="cat-col-value">差评率</div><div>趋势</div>`;
    container.appendChild(header);

    categories.sort((a, b) => b.opportunityScore - a.opportunityScore).forEach(cat => {
        const row = document.createElement('div');
        row.className = 'cat-matrix-row';
        row.dataset.categoryId = cat.id;
        const score = cat.opportunityScore;
        const scoreClass = 'cat-col-score ' + (score > 75 ? 'score-high' : score > 60 ? 'score-medium' : 'score-low');
        const createChartCell = (id) => `<div class="sparkline-container"><canvas id="${id}" width="100" height="30"></canvas></div>`;
        row.innerHTML = `<div class="${scoreClass}">${score.toFixed(1)}</div><div class="cat-col-name">${cat.name}</div><div class="cat-col-value">${cat.hotness_trend.at(-1).toFixed(1)}</div>${createChartCell(`hotness-chart-${cat.id}`)}<div class="cat-col-value">${cat.satisfaction_trend.at(-1).toFixed(1)}%</div>${createChartCell(`satisfaction-chart-${cat.id}`)}<div class="cat-col-value">${cat.new_product_order_share_trend.at(-1).toFixed(1)}%</div>${createChartCell(`new-prod-chart-${cat.id}`)}<div class="cat-col-value">${cat.bad_reviews_trend.at(-1).toFixed(1)}%</div>${createChartCell(`bad-review-chart-${cat.id}`)}`;
        container.appendChild(row);
    });

    // Drawing charts after they are in the DOM
    setTimeout(() => {
        categories.forEach(cat => {
            if (document.getElementById(`hotness-chart-${cat.id}`)) {
                drawSparkline(`hotness-chart-${cat.id}`, cat.hotness_trend, '#f59e0b', 'rgba(245, 158, 11, 0.2)');
                drawSparkline(`satisfaction-chart-${cat.id}`, cat.satisfaction_trend, '#16a34a', 'rgba(22, 163, 74, 0.2)');
                drawSparkline(`new-prod-chart-${cat.id}`, cat.new_product_order_share_trend, '#4f46e5', 'rgba(79, 70, 229, 0.2)');
                drawSparkline(`bad-review-chart-${cat.id}`, cat.bad_reviews_trend, '#dc2626', 'rgba(220, 38, 38, 0.2)');
            }
        });
    }, 0);

    container.addEventListener('click', (event) => {
        const row = event.target.closest('.cat-matrix-row');
        if (row && row.dataset.categoryId) {
            const eventBus = { publish(event, data) { document.dispatchEvent(new CustomEvent(event, { detail: data })); } };
            eventBus.publish('category:selected', parseInt(row.dataset.categoryId, 10));
        }
    });
}
