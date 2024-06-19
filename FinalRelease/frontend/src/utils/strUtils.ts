import { fewShot } from "../service/BotEdit";

// 截取字符串，如果长度大于 length 则加上省略号
export const ellipsisStr = (str: string, length: number) => {
    return str.length > length ? str.substring(0, length) + "..." : str;
};

// 从fewshot中提取promptKeys
export const getPromptKeysFromFewShot = (fewShots: fewShot[]): string[] => {
    const regex = /\+\+\{(.+?)\}/g;
        let promptKeys: string[] = [];

        if (fewShots) {
            fewShots.forEach((fewShot) => {
                const content = fewShot.content;
                let match;
                while ((match = regex.exec(content)) !== null) {
                    if (match[1] !== '' && !promptKeys.includes(match[1]))
                        promptKeys.push(match[1]);
                }
            });
        }
    return promptKeys;
};
