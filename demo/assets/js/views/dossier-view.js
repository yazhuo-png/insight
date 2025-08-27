// dossier-view.js

function renderDossierView(categoryId, sceneId) {
    const dossierData = platformData.categoryData[categoryId].dossiers[sceneId];
    const insightData = platformData.categoryData[categoryId].insights[sceneId];
    const dossierScrollContainer = document.getElementById('dossier-scroll-container');
    const dossierTitleHeader = document.getElementById('dossier-title-header');

    if (!dossierData || !insightData) {
        dossierScrollContainer.innerHTML = '<p style="text-align:center; padding: 50px;">未找到该场景的深度尽调档案。</p>';
        return;
    }
    
    dossierTitleHeader.textContent = `场景深度尽调档案: ${sceneId} - ${insightData.scenario}`;

    const painPointsHTML = dossierData.pain_points.map(p => `<li><strong>${p.title} (提及率 ${p.mention_rate}):</strong><p class="quote">${p.quotes[0]}</p></li>`).join('');
    const competitionHTML = dossierData.competition.map(c => `<tr><td>${c.type}</td><td>${c.strategy}</td><td>${c.issue}</td><td style="color:${c.gap < -50 ? 'var(--danger-color)' : 'var(--warning-color)'}; font-weight:bold;">${c.gap}%</td></tr>`).join('');
    const reportsHTML = dossierData.external_trends.reports.map(r => `<li>${r}</li>`).join('');

    dossierScrollContainer.innerHTML = `
        <div class="dossier-wrapper">
            <div class="dossier-header">
                <h3>场景深度尽调档案: ${sceneId} - ${insightData.scenario}</h3>
                <span class="priority" style="color:var(${insightData.priority === 'P0' ? '--danger-color' : insightData.priority === 'P1' ? '--warning-color' : '--success-color'});">${insightData.priority}</span>
            </div>
            <div class="dossier-content">
                <div class="dossier-section">
                    <h4>第一章: 内源性痛点剖析</h4>
                    <p class="agent-source">分析来源: 洞察分析师</p>
                    <ul>${painPointsHTML}</ul>
                </div>
                <div class="dossier-section">
                    <h4>第二章: 外源性趋势验证</h4>
                    <p class="agent-source">分析来源: 市场战略师</p>
                    <p><strong>搜索趋势分析:</strong></p>
                    <div class="trend-chart">${dossierData.external_trends.search_summary}</div>
                    ${reportsHTML ? `<p style="margin-top: 15px;"><strong>行业报告摘要:</strong></p><ul>${reportsHTML}</ul>` : ''}
                </div>
                <div class="dossier-section">
                    <h4>第三章: 市场格局与竞品分析</h4>
                    <p class="agent-source">分析来源: 竞品分析师</p>
                    <table>
                        <thead><tr><th>竞品类型</th><th>差异化策略</th><th>主要问题</th><th>满意度-期望差距*</th></tr></thead>
                        <tbody>${competitionHTML}</tbody>
                    </table>
                    <p style="font-size:0.8em; color:#6b7280;">* 负值越大，表示产品越不能满足用户核心期望。</p>
                </div>
                <div class="dossier-section">
                    <h4>第四章: 综合战略机遇评估</h4>
                    <p class="agent-source">分析来源: 首席协调官</p>
                    <div class="swot-grid">
                        <div class="swot-box"><h5>优势 (S)</h5><p>${dossierData.swot.s}</p></div>
                        <div class="swot-box"><h5>劣势 (W)</h5><p>${dossierData.swot.w}</p></div>
                        <div class="swot-box"><h5>机会 (O)</h5><p>${dossierData.swot.o}</p></div>
                        <div class="swot-box"><h5>威胁 (T)</h5><p>${dossierData.swot.t}</p></div>
                    </div>
                    <div class="final-recommendation" style="margin-top:20px;">
                        <h5>最终行动建议</h5>
                        <p>${dossierData.recommendation}</p>
                        <button id="launch-proposal-btn" data-scene-id="${sceneId}">启动“产品战略提案”生成</button>
                    </div>
                </div>
            </div>
        </div>`;

    document.getElementById('launch-proposal-btn').addEventListener('click', () => {
        const eventBus = { publish(event, data) { document.dispatchEvent(new CustomEvent(event, { detail: data })); } };
        eventBus.publish('proposal:launch');
    });
}
