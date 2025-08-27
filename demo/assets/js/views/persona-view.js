// persona-view.js

function renderPersonaView(categoryId) {
    const data = platformData.categoryData[categoryId];
    const methodologyCardContainer = document.getElementById('methodology-card-container');
    const personaGridTbody = document.getElementById('persona-grid-tbody');
    const viewTitle = document.getElementById('view-title');
    const viewSubtitle = document.getElementById('view-subtitle');

    // --- Render Title ---
    viewTitle.textContent = `市场机会量化矩阵: ${data.name}`;
    viewSubtitle.textContent = `由'场景量化师'自动生成，已按机会优先级排序`;

    // --- Render Methodology Card ---
    const methodology = data.methodology;
    if (methodology) {
        const tiersHTML = methodology.tiers.map(tier => `<tr><td><strong>${tier.level}</strong></td><td>${tier.def}</td><td>${tier.count} 款</td><td>${tier.purpose}</td></tr>`).join('');
        const sourcesHTML = methodology.sources.map(source => `<li><strong>${source.name}:</strong> <strong>${source.count}</strong></li>`).join('');
        methodologyCardContainer.innerHTML = `
            <div class="methodology-card">
                <h2>数据来源与科学抽样方法论</h2>
                <p>为确保洞察的科学性、代表性和可信度，本次分析严格遵循平台的标准数据协议。</p>
                <div class="methodology-section">
                    <h3>1. 市场代表性商品篮子 (共计 ${methodology.total_products} 款商品)</h3>
                    <table><thead><tr><th>抽样层级</th><th>定义</th><th>样本数量</th><th>目的</th></tr></thead><tbody>${tiersHTML}</tbody></table>
                </div>
                <div class="methodology-section">
                    <h3>2. 多维数据源与体量</h3><ul>${sourcesHTML}</ul>
                </div>
                <div class="methodology-section">
                    <h3>3. 数据可信度控制</h3><p><strong>数据健康度:</strong> ${methodology.credibility}</p>
                </div>
            </div>`;
    } else {
        methodologyCardContainer.innerHTML = '';
    }

    // --- Render Persona/Scene Table ---
    personaGridTbody.innerHTML = '';
    const insights = data.insights;
    if (insights && Object.keys(insights).length > 0) {
        const sortedInsights = Object.entries(insights).map(([id, data]) => ({id, ...data}))
                                     .sort((a,b) => parseInt(a.priority.substring(1)) - parseInt(b.priority.substring(1)) || b.score - a.score);
        
        sortedInsights.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="priority-${item.priority.toLowerCase()}">${item.priority}</td>
                <td>${item.id}</td>
                <td>${item.crowd}</td>
                <td>${item.scenario}</td>
                <td>${item.growth_rate}</td>
                <td>${item.score}</td>
                <td>${item.ai_decision}</td>
                <td><button class="details-btn" data-scene-id="${item.id}">[深度分析]</button></td>`;
            personaGridTbody.appendChild(row);
        });
    } else {
        personaGridTbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 50px;">暂无该类目的人群场景洞察数据。</td></tr>';
    }

    // Add event listener to the table body for delegation
    const tableContainer = document.getElementById('persona-table-container');
    tableContainer.onclick = function(event) {
        if (event.target.classList.contains('details-btn')) {
            const sceneId = event.target.dataset.sceneId;
            const eventBus = { publish(event, data) { document.dispatchEvent(new CustomEvent(event, { detail: data })); } };
            eventBus.publish('scene:selected', sceneId);
        }
    };
}
