import { getJson, PREFIX } from './common';

export interface Bot {
    id: number;
    name: string;
    description: string;
    avatar: string;
}

interface BotResponse {
    bots: Bot[];
    total: number;
}

export async function getSearchBotList(page: number, pageSize: number, q: string, order: string): Promise<BotResponse | null>  {
    const url = `${PREFIX}/bots?page=${page}&pagesize=${pageSize}&q=${q}&order=${order}`;
    let data = null;
    
    try{
        console.log("url", url);
        data = await getJson(url);
    }
    catch(e){
        console.log("GetSearchBotListError: ", e);
    }

    return data;
}