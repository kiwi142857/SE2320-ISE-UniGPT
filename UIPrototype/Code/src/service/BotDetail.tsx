
export async function getBotDetail(id: string) {

    let botDetail = {
        id: '1',
        name: 'Programming Debug Assistant',
        author: 'UniGPT official',
        avatar: '/assets/bot-default.png',
        description: "The robot can help you debug your code. It can help you find the bug in your code and give you some suggestions.",
        detail: '还在为代码bug重重而烦恼吗？还在与AI反复拉扯？编程调试助手【Programming Debug Assistant】助你快速debug。只需要在表单内粘贴入你的报错代码、报错信息（非必填），填写代码本应当发挥的作用（非必填）、你的debug猜想（非必填）、debug要求（非必填），一键提交，AI会帮你快速定位问题所在，给出解决方案。除了填写表单之外也可以和AI自由交流。祝各位day day bug-free！',
        photos: ['/assets/bot-detail-1.png', '/assets/bot-detail-2.png', '/assets/bot-detail-3.png', '/assets/bot-detail-4.png'],
        like: 100,
        collect: 100
    }

    // const res = await get(`/bot/${id}`);

    return botDetail;
}

export async function getBotComments(id: string) {
    let comments = {
        total: 3,
        items: [
            {
                id: '1',
                name: '古金鱼单推人',
                avatar: '/assets/user-1.png',
                content: '非常好机器人，使我的数据结构课程满绩。',
            },
            {
                id: '5',
                name: '坩埚今天吃什么',
                avatar: '/assets/user-2.png',
                content: '借楼吐槽自动化系大三某门编程课，每次上这门课鼠鼠都感到莫大的头痛。每节课信息量极大，还没有教材，参考资料就是课件。老师上课讲的内容往往从脑子里滑过去就什么痕迹都没有留下。所以不得不课后看回放补笔记。然而面对大作业和平时的课后作业时，还是要翻阅百来页的ppt查找遗漏的细节，而且很大概率无济于事，最终还是得转向csdn求助。代码是一点也不会然后bug一堆，还得靠AI。',
            },
            {
                id: '2',
                name: '三三得九',
                avatar: '/assets/user-1.png',
                content: '要debug最好还是先不打扰助教，先自己搜索或者来问机器人',
            },
            {
                id: '3',
                name: '考不进复旦不改名',
                avatar: '/assets/user-3.png',
                content: '好好好，和直接问助教一样及时',
            },
            
            {
                id: '4',
                name: '楼上是我大哥',
                avatar: '/assets/user-2.png',
                content: '提交表单里能不能加一项“debug要求”？',
            },
        ]
    }

    // const res = await get(`/bot/${id}/comments`);

    return comments;
}
