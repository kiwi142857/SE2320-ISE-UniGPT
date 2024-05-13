import { PREFIX, getJson, post } from './common';

// 聊天类
export type BotChat = {
    id: number;
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

export interface BotBriefInfo {
    id: string;
    name: string;
    description: string;
    avatar: string;
    asCreator: boolean;
}

export interface Prompt {
    promptKey: string;
    promptValue: string;
}

export async function getBotBrief(botID: string | undefined): Promise<BotBriefInfo | null> {
    if (botID === undefined) return null;

    const url = `${PREFIX}/bots/${botID}?info=brief`;
    let res;
    try {
        res = await getJson(url);
        console.log(url);
        console.log(res);
    } catch (e) {
        console.error(e);
        res = null;
    }
    return res;
}

export async function getBotChatHistoryList(botID: string | undefined, page: number, pagesize: number): Promise<BotChatHistory[] | null> {
    const url = `${PREFIX}/bots/${botID}/histories?page=${page}&pagesize=${pagesize}`;

    let res;

    try {
        res = await getJson(url);
        console.log(res);
    }
    catch (e) {
        console.error(e);
        res = null;
    }
    return res["histories"];
}

export async function getEmptyPromptList(botID: string | undefined): Promise<Prompt[]> {
    if (botID === undefined) return [];

    const url = `${PREFIX}/bots/${botID}?info=detail`;
    let res;

    try {
        res = await getJson(url);
    } catch (e) {
        console.error(e);
        res = null;
    }

    //create a Prompt[] based on the promptKeys
    let promptList: Prompt[] = [];
    for (let i = 0; i < res.promptKeys.length; i++) {
        promptList.push({ promptKey: res.promptKeys[i], promptValue: "" });
    }

    console.log("getEmptyPromptList: ", promptList);

    return promptList;
}

export async function getPromptList(historyId: number): Promise<Prompt[]> {
    const url = `${PREFIX}/histories/${historyId}/promptlist`;
    let res;

    try {
        res = await getJson(url);
        console.log(res);
    }
    catch (e) {
        console.error(e);
        res = null;
    }
    if (res === null) return [];
    return res;
}

export async function getBotChatList(historyId: number): Promise<BotChat[]> {
    const url = `${PREFIX}/histories/${historyId}/chats`;

    try {
        let res = await getJson(url);
        console.log(res);
        
        return res['chats'] as BotChat[];
    }
    catch (e) {
        return [];
    }
}

export async function createHistory(botID: string, promptList: Prompt[]): Promise<number> {

    const url = `${PREFIX}/bots/${botID}/histories`

    let res;

    try {
        res = await post(url, promptList);
        console.log("In createHistory: POST GET", res);
    }
    catch (e) {
        console.error(e);
        res = null;
    }
    if (res === null) return 0;
    return res.historyid;
}