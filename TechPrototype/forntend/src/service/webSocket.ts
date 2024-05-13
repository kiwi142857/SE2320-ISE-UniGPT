import { websocketUrl } from "./common";

export const createWebSocketConnection = (id: number) => {
    // Create a new WebSocket connection
    const socket = new WebSocket(websocketUrl);

    // Send a message when the connection is open
    socket.onopen = () => {
        const message = JSON.stringify({
            historyId: id.toString(),
        });
        console.log("WebSocketConnection onopen: ", message);
        socket.send(message);

    };

    return socket;
};

export const sendMessage = (socket: WebSocket | null, message: string) => {
    if (socket) {
        const sendContent = JSON.stringify({
            chatContent: message
        });
        console.log("sendMessage: ", message);
        socket.send(sendContent);
    }
}