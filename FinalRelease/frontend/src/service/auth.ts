import { PREFIX, post } from "./common";

export interface LoginResult {
    ok: boolean;
    message: string;
    // Add other properties here if needed
}

export async function login(code: string): Promise<LoginResult> {
    const url = `${PREFIX}/auth/jaccountLogin`;
    let result: LoginResult;

    try {
        result = await post(url, { code });
    } catch (e) {
        console.log(e);
        result = {
            ok: false,
            message: "网络错误！",
        }
    }
    return result;
}

export async function logout(): Promise<LoginResult> {
    const url = `${PREFIX}/auth/logout`;
    let result: LoginResult;

    try {
        result = await post(url, {});
    } catch (e) {
        console.log(e);
        result = {
            ok: false,
            message: "网络错误！",
        }
    }
    return result;
}