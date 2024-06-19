import { websocketUrl } from "./common";

export const createWebSocketConnection = (id: number) => {
    return new Promise<WebSocket>((resolve, reject) => {
        // Create a new WebSocket connection
        const socket = new WebSocket(websocketUrl);

        // Send a message when the connection is open
        socket.onopen = () => {
            const message = JSON.stringify({
                historyId: id.toString(),
            });
            console.log("WebSocketConnection onopen: ", message);
            socket.send(message);

            // Resolve the promise with the socket
            resolve(socket);
        };

        // Reject the promise if there is an error
        socket.onerror = (error) => {
            reject(error);
        };
    });
};

export const sendMessage = (socket: WebSocket | null, message: string, cover: boolean = false, userAsk:boolean = false) => {
    if (socket) {
        const sendContent = JSON.stringify({
            chatContent: message,
            cover: cover,
            userAsk:userAsk
        });
        console.log("sendMessage: ", message);
        socket.send(sendContent);
    }
}