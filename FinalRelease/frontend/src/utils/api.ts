export const apiToString = (id: number) => {
    switch (id) {
        case 1:
            return "claude-instant-1.2";
        case 2:
            return "llama3-70b-8192";
        case 3:
            return "moonshot-v1-8k";
        default:
            return "gpt-3.5-turbo";
    }
}

export const stringToApi = (api: string) => {
    switch (api) {
        case "claude-instant-1.2":
            return 1;
        case "llama3-70b-8192":
            return 2;
        case "moonshot-v1-8k":
            return 3;
        default:
            return 0;
    }
}