import { DUMMY_RESPONSE, PREFIX, del, getJson, post, put } from './common';

export interface botDetailInfo {
    id: string;
    name: string;
    creator: string;
    creatorId: string;
    description: string;
    detail: string;
    avatar: string;
    baseModelAPI: number;
    photos: string[] | [];
    likeNumber: number;
    starNumber: number;
    liked: boolean;
    starred: boolean;
    asCreator: boolean;
    asAdmin: boolean;
}

export interface Comment {
    id: number;
    content: string;
    time: Date;
    userId: number;
    userName: string;
    avatar: string;
    botID: number;
}

export interface CommentList {
    total: number;
    comments: Comment[];
}

export async function getBotDetail(id: string): Promise<botDetailInfo | null> {

    const url = `${PREFIX}/bots/${id}?info=detail`;
    let res;

    try {
        res = await getJson(url);
    } catch (e) {
        console.log("In getBotDetail");
        console.error(e);
        res = null;
    }

    return res;
}

export async function likeBot(id: string) {
    const url = `${PREFIX}/bots/${id}/likes`;
    let res;

    try {
        res = await put(url, {});
        console.log(res);
    } catch (e) {
        console.error(e);
        res = DUMMY_RESPONSE;
    }

    return res;
}

export async function disLikeBot(id: string) {
    const url = `${PREFIX}/bots/${id}/likes`;
    let res;

    try {
        res = await del(url, {});
        console.log(res);
    } catch (e) {
        console.error(e);
        res = DUMMY_RESPONSE;
    }

    return res;
}

export async function starBot(id: string) {
    const url = `${PREFIX}/bots/${id}/stars`;
    let res;

    try {
        res = await put(url, {});
        console.log(res);
    } catch (e) {
        console.error(e);
        res = DUMMY_RESPONSE;
    }

    return res;
}

export async function unStarBot(id: string) {
    const url = `${PREFIX}/bots/${id}/stars`;
    let res;

    try {
        res = await del(url, {});
        console.log(res);
    } catch (e) {
        console.error(e);
        res = DUMMY_RESPONSE;
    }

    return res;
}

export async function getBotComments(id: string, page: number, pageSize: number): Promise<CommentList> {
    const url = `${PREFIX}/bots/${id}/comments?page=${page}&pagesize=${pageSize}`;
    let comments: CommentList;
    try {
        let data = await getJson(url);
        comments = {
            ...data,
            comments: data.comments.map((comment: any) => ({
                ...comment,
                time: new Date(comment.time)
            }))
        };
    } catch (e) {
        console.error(e);
        comments = {
            total: 0,
            comments: []
        }
    }

    return comments;
}

export async function postComment(id: string, content: string) {
    const url = `${PREFIX}/bots/${id}/comments`;
    let res;

    try {
        res = await post(url, { content: content });
        console.log(res);
    } catch (e) {
        console.error(e);
        res = DUMMY_RESPONSE;
    }

    return res;
}
