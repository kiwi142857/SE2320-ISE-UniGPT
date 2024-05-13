// 聊天类
export type BotChat = {
    id: string;
    historyId: number;  // 聊天对应的历史记录id
    name: string;
    avatar: string;
    content: string;
}
// 聊天记录类
export type BotChatHistory = {
    id: number; // 聊天历史记录id，聊天生成时的UNIX时间戳
    title: string; // 侧边栏的历史标题
    message: string; // 侧边栏的历史信息
}

// data
const botChatHistoryList: BotChatHistory[] = [
    {
        id: 1,
        title: 'Python实现冒泡排序',
        message: '这段代码首先定义了...',
    },
    {
        id: 2,
        title: '石榴可乐鸡尾酒名字',
        message: '当然可以！这里有...',
    },
    {
        id: 3,
        title: '城市设计',
        message: '当涉及城市设计时，...',
    },
    {
        id: 4,
        title: '解释期权交易',
        message: '期权交易是一种金融衍生品交易...',
    },
];

const botChatList: BotChat[] = [
    {
        id: '1',
        historyId: 1,
        name: '你',
        avatar:'/assets/user-default.png',
        content: '如何用Python实现冒泡排序',
    },
    {
        id: '2',
        historyId: 1,
        name: 'Programming Debug Assistant',
        avatar: '/assets/bot-default.png',
        content: '以下是使用Python实现冒泡排序的示例代码：\n' +
            '\n' +
            '```python\n' +
            'def bubble_sort(arr):\n' +
            '    n = len(arr)\n' +
            '    # 遍历数组元素\n' +
            '    for i in range(n):\n' +
            '        # 最后i个元素已经排好序了，不需要再次比较\n' +
            '        for j in range(0, n-i-1):\n' +
            '            # 通过比较相邻元素，如果顺序不对，则交换它们\n' +
            '            if arr[j] > arr[j+1]:\n' +
            '                arr[j], arr[j+1] = arr[j+1], arr[j]\n' +
            '\n' +
            '# 测试\n' +
            'arr = [64, 34, 25, 12, 22, 11, 90]\n' +
            'bubble_sort(arr)\n' +
            'print("排序后的数组:", arr)\n' +
            '```\n' +
            '\n' +
            '这段代码首先定义了一个名为 `bubble_sort` 的函数，接受一个数组作为参数。在该函数中，通过嵌套的循环遍历数组元素，并比较相邻元素的大小，如果顺序不对，则交换它们的位置。外层循环控制排序的轮数，内层循环负责比较和交换元素。'
    },
    {
        id: '10',
        historyId: 1,
        name: '你',
        avatar:'/assets/user-default.png',
        content: '谢谢！',
    },
    {
        id: '11',
        historyId: 1,
        name: 'Programming Debug Assistant',
        avatar: '/assets/bot-default.png',
        content: '不客气，这里是Programming Debug Assistant，欢迎您下次使用~',
    },
    {
        id: '3',
        historyId: 2,
        name: '你',
        avatar:'/assets/user-default.png',
        content: '你能为一款含有可乐和石榴糖浆的无酒精鸡尾酒（mocktail）想出一些名字吗？',
    },
    {
        id: '4',
        historyId: 2,
        name: 'Design Assistant',
        avatar: '/assets/bot-default.png',
        content: '当然可以！这里有一些含有可乐和石榴糖浆的无酒精鸡尾酒的可能名字：\n' +
            '\n' +
            '1. 石榴泡泡（Pomegranate Fizz）\n' +
            '2. 可乐石榴之吻（Cola Pomegranate Kiss）\n' +
            '3. 沉睡的石榴（Sleeping Pomegranate）\n' +
            '4. 石榴梦幻（Pomegranate Dream）\n' +
            '5. 可口的可乐石榴（Tasty Cola Pomegranate）\n' +
            '6. 石榴乐园（Pomegranate Paradise）\n' +
            '7. 舞动的石榴（Dancing Pomegranate）\n' +
            '8. 可乐石榴宝藏（Cola Pomegranate Treasure）\n' +
            '9. 石榴之谜（Mystery of Pomegranate）\n' +
            '10. 心动石榴（Heartbeat Pomegranate）\n' +
            '\n' +
            '希望这些名字能够激发灵感，让您的鸡尾酒更加引人注目！',
    },
    {
        id: '5',
        historyId: 3,
        name:'你',
        avatar:'/assets/user-default.png',
        content: '为我关于城市设计的新播客构思5个节目主题。',
    },
    {
        id: '6',
        historyId: 3,
        name:'Design Assistant',
        avatar: '/assets/bot-default.png',
        content: '当涉及城市设计时，有很多激动人心的话题可以探讨。以下是五个可以作为新播客节目主题的构思：\n' +
            '\n' +
            '1. **未来之城：**\n' +
            '   探讨未来城市的设计理念、可持续性发展、智能科技应用以及对人类生活的影响。此主题可以包括专家访谈、未来技术趋势分析以及对未来城市模型的虚拟展示。\n' +
            '\n' +
            '2. **社区共建：**\n' +
            '   探讨如何通过社区参与和合作来设计城市，以创造更具包容性和互助性的城市环境。这个主题可以包括社区倡导者的采访、基层项目案例分析以及社区规划的最佳实践分享。\n' +
            '\n' +
            '3. **城市更新与再生：**\n' +
            '   着眼于城市更新项目，探讨如何通过重新利用空地、改造旧建筑和提升公共空间来改善城市生活质量。节目内容可包括城市更新策略、案例研究和社区反馈。\n' +
            '\n' +
            '4. **人性化设计：**\n' +
            '   探讨如何通过设计来创造更人性化的城市环境，促进人与人之间的互动和联系。这个主题可以涵盖城市人性化设计的原则、成功案例分享以及对城市居民生活质量的影响。\n' +
            '\n' +
            '5. **城市绿化与生态保护：**\n' +
            '   探讨城市绿化的重要性以及如何通过城市绿化和生态保护来改善城市环境、促进健康和增强社区凝聚力。这个主题可以包括城市绿化项目介绍、生态保护策略讨论和专家意见交流。\n' +
            '\n' +
            '以上节目主题涵盖了城市设计的多个方面，从未来发展到社区建设、城市更新、人性化设计以及生态保护，能够吸引听众对城市设计和发展的关注并提供有价值的信息和见解。',
    },
    {
        id: '7',
        historyId: 4,
        name:'你',
        avatar: '/assets/user-default.png',
        content: '如果我熟悉买卖股票，那么请用简单的术语解释期权交易。',
    },
    {
        id: '8',
        historyId: 4,
        name:'Finance Assistant',
        avatar: '/assets/bot-default.png',
        content: '期权交易是一种金融衍生品交易，允许买方在未来某个特定时间内，以事先约定的价格购买或出售某个资产（通常是股票）的权利，而不是必须在该时间购买或出售。期权交易中的买方支付给卖方一笔费用（称为期权费），以获得这种权利。买方在购买期权时，称为持有期权。而卖方则在出售期权时，承诺在期权到期时按约定的价格出售或购买资产。期权交易可以用来对冲投资组合的风险、进行投机，或者作为一种策略来获利。',
    },
];
export async function getBotChatHistoryList() {
    return botChatHistoryList;
}
export async function getBotChatList(historyId: number) {
    return botChatList.filter((botChat: BotChat) => botChat.historyId === historyId);
}
