// proposal-view.js

function renderProposalView(categoryId, sceneId) {
    const proposalScrollContainer = document.getElementById('proposal-scroll-container');
    const proposalTitleHeader = document.getElementById('proposal-title-header');

    proposalTitleHeader.textContent = `Project "Polaris" - 战略产品路径提案`;
    
    // In a real app, this data would come from platformData.categoryData[categoryId].proposals[sceneId];
    // For this demo, we'll hardcode it.
    proposalScrollContainer.innerHTML = `
        <h2>产品战略组合 (Product Strategy Portfolio)</h2>
        <p style="text-align:center; margin-top:-30px; margin-bottom:40px; color:#6b7280;">点击任意方案卡片，在新标签页中查看详细的可制造性设计提案 (DFM)。</p>
        
        <div class="portfolio-grid">
            <!-- Card 1: Polaris Shield -->
            <a href="./solutions/solution_a.html" target="_blank" class="product-card">
                <div class="card-header" style="background-color: #f0f9ff;">
                    <h3>方案A: Polaris Shield</h3>
                    <p class="tagline">性能旗舰 - 技术突击，占领专业心智</p>
                </div>
                <div class="card-body">
                    <div class="card-section"><h4>产品形态</h4><ul><li>一次性、超薄、高性能化学自热贴片</li></ul></div>
                    <div class="card-section"><h4>核心技术</h4><ul><li><strong>发热:</strong> 镁基混合催化自热技术</li><li><strong>保温:</strong> 气凝胶复合毡隔热层</li></ul></div>
                </div>
                <div class="card-footer"><strong>BOM 成本:</strong> ~ ¥3.10 / 片</div>
            </a>
            <!-- Card 2: Aegis Thermo-Case -->
            <a href="./solutions/solution_b.html" target="_blank" class="product-card">
                <div class="card-header" style="background-color: #f0fdf4;">
                    <h3>方案B: Aegis Thermo-Case</h3>
                    <p class="tagline">日常守护 - 被动防御，拓宽用户基础</p>
                </div>
                <div class="card-body">
                    <div class="card-section"><h4>产品形态</h4><ul><li>集成保温材料的日常手机保护壳</li></ul></div>
                    <div class="card-section"><h4>核心技术</h4><ul><li><strong>保温:</strong> 多层真空绝热板(VIP)或气凝胶夹层</li><li><strong>热源:</strong> 锁住手机自身运行热量</li></ul></div>
                </div>
                <div class="card-footer"><strong>BOM 成本:</strong> ~ ¥18.50 / 个</div>
            </a>
            <!-- Card 3: Magma Core Power Bank -->
            <a href="./solutions/solution_c.html" target="_blank" class="product-card">
                <div class="card-header" style="background-color: #fffbeb;">
                    <h3>方案C: Magma Core</h3>
                    <p class="tagline">能量中枢 - 主动供能，满足多重需求</p>
                </div>
                <div class="card-body">
                    <div class="card-section"><h4>产品形态</h4><ul><li>自带加热功能的磁吸充电宝</li></ul></div>
                    <div class="card-section"><h4>核心技术</h4><ul><li><strong>加热:</strong> 碳纳米管(CNT)发热膜</li><li><strong>控制:</strong> 智能BMS能量管理系统</li></ul></div>
                </div>
                <div class="card-footer"><strong>BOM 成本:</strong> ~ ¥95.00 / 个</div>
            </a>
        </div>

        <h2>战略决策建议</h2>
        <div class="strategy-recommendation">
            <p>作为您的首席产品战略顾问，我建议采取一个<strong>“组合拳 + 阶段性”</strong>的上市策略，以最大化市场影响力并控制风险：</p>
            <ol>
                <li><strong>第一阶段 (市场滩头阵地): 启动方案A - Polaris Shield。</strong><br><strong>理由:</strong> 它是解决最尖锐痛点的“银色子弹”，能以极致性能为品牌打上“专业、可靠”的烙印，快速建立品牌声誉。这是我们的“战略核武器”。</li>
                <li><strong>第二阶段 (市场扩张): 跟进方案B - Aegis Thermo-Case。</strong><br><strong>理由:</strong> 在通过方案A建立起品牌认知后，推出面向更广泛市场的方案B，利用已有的品牌势能，收割大众用户，迅速扩大市场份额和收入规模。</li>
                <li><strong>第三阶段 (生态布局): 储备方案C - Magma Core。</strong><br><strong>理由:</strong> 方案C技术和市场复杂度最高。在前两个方案成功后，再推出方案C作为产品生态的旗舰和利润顶峰，完成对整个品类的统治。</li>
            </ol>
        </div>`;
}
