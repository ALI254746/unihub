import { OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class VideoChatGateway implements OnGatewayDisconnect {
    server: Server;
    private waitingQueue;
    private activeChats;
    handleDisconnect(client: Socket): void;
    handleJoinQueue(client: Socket): void;
    handleLeaveQueue(client: Socket): void;
    handleSignal(data: {
        roomId: string;
        signal: any;
    }, client: Socket): void;
}
