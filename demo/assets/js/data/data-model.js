// data-model.js
const platformData = {
    categoryPool: [
        { id: 104, name: "保暖贴", opportunityScore: 89.5, hotness_trend: [92, 95, 93, 96, 98], satisfaction_trend: [75, 78, 76, 79, 80], new_product_order_share_trend: [10, 12, 15, 14, 16.8], bad_reviews_trend: [4.1, 4.3, 4.2, 4.5, 4.6] },
        { id: 101, name: "便携咖啡机", opportunityScore: 82.1, hotness_trend: [80, 85, 82, 90, 95], satisfaction_trend: [85, 86, 88, 87, 88], new_product_order_share_trend: [12, 14, 15, 18, 22.5], bad_reviews_trend: [2.1, 2.0, 2.2, 2.1, 2.1] },
        { id: 102, name: "除螨仪", opportunityScore: 65.7, hotness_trend: [75, 80, 88, 85, 91], satisfaction_trend: [80, 78, 75, 77, 76], new_product_order_share_trend: [8, 9, 11, 10, 13.2], bad_reviews_trend: [3.5, 3.8, 4.0, 4.5, 4.8] },
        { id: 103, name: "电动牙刷", opportunityScore: 45.3, hotness_trend: [90, 89, 88, 88, 88], satisfaction_trend: [90, 91, 91.5, 92, 92], new_product_order_share_trend: [5, 4.5, 4, 3.8, 3.5], bad_reviews_trend: [1.5, 1.4, 1.3, 1.2, 1.1] },
    ],
    categoryData: {
        104: {
            name: "保暖贴",
            methodology: {
                total_products: 45,
                tiers: [
                    {level:'头部畅销品', def:'近30天销量 Top 20', count:20, purpose:'捕捉主流市场需求'},
                    {level:'趋势飙升品', def:'近30天销量增速 Top 10', count:10, purpose:'发现新兴趋势与机会'},
                    {level:'细分利基品', def:'“设备保暖”场景销量 Top 5', count:5, purpose:'洞察特定场景创新'}
                ],
                sources:[
                    {name:'电商平台评论', count:'105,820 条'},
                    {name:'电商平台问大家(Q&A)', count:'8,500 组'},
                    {name:'社交媒体(小红书)笔记', count:'1,200 篇'}
                ],
                credibility:'88% 的评论数据来源于“已验证购买”用户。'
            },
            insights: {
                'G2': { priority:'P0', crowd:'设备使用者', scenario:'设备保暖', growth_rate:'+189.4%', score:66.6, ai_decision:'高增长蓝海, 痛点明确' },
                'E2': { priority:'P1', crowd:'普通人群', scenario:'手脚冰凉', growth_rate:'+104.0%', score:55.2, ai_decision:'红海市场, 寻求升级' },
                'A4':{ priority:'P2', crowd:'女性群体', scenario:'产后关节护理', growth_rate:'-5.2%', score:15.8, ai_decision:'需求小众, 讨论度低' }
            },
            dossiers: {
                'G2': {
                    pain_points:[
                        {title:'致命痛点 - 低温失效', mention_rate:'72%', quotes:['在哈尔滨零下20度根本不发热, 就像一块冰贴, 完全是智商税！']},
                        {title:'性能痛点 - 热度/时长不符', mention_rate:'45%', quotes:['宣传能热10小时, 实际2小时就凉了。']},
                        {title:'体验痛点 - 质量与安全', mention_rate:'25%', quotes:['撕下来在手机壳上留下一大块胶, 很难清理。']}
                    ],
                    external_trends: {
                        search_summary:'“手机保暖”、“户外防冻”等关键词搜索指数在每年11月至次年2月呈现爆发式增长，峰值是平时的10-15倍，表明存在强烈的季节性刚需。',
                        reports:['Gartner 报告指出，极限环境下的消费电子配件市场是高增长蓝海。','《户外运动者》杂志调查显示，68%的冬季户外爱好者曾因设备冻关机而困扰。']
                    },
                    competition:[
                        {type:'通用型暖宝宝', strategy:'低价 (0.5元/片)', issue:'低温无效，形态不符', gap:-85},
                        {type:'定制形状暖宝宝', strategy:'营销概念 (2元/片)', issue:'本质无变化，低温仍无效', gap:-80},
                        {type:'充电加热手机壳', strategy:'技术方案 (150元+)', issue:'笨重、昂贵、续航短', gap:-40}
                    ],
                    swot:{ s:'技术创新可建立绝对壁垒', w:'新产品需要市场教育', o:'需求已验证且无有效供给，是完美的蓝海市场', t:'警惕大品牌快速模仿跟进' },
                    recommendation: '这是一个“S-O”型 (优势-机会) 战略机会。建议采用“技术突击”策略，以解决“低温失效”核心痛点的革命性产品，快速切入市场，建立品牌心智和技术护城河，抢占市场定义权。'
                }
            },
            proposals: {
                'G2': { /* This is where the data for proposal view would go */ }
            }
        }
        // ... Other categories
    }
};
