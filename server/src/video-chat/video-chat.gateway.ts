import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class VideoChatGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Navbatda turgan foydalanuvchilar (Socket ID lari)
  private waitingQueue: string[] = [];
  
  // Kim kim bilan gaplashayotgani (SocketID -> RoomID)
  private activeChats = new Map<string, string>();

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    
    // 1. Agar navbatda bo'lsa, olib tashlaymiz
    this.waitingQueue = this.waitingQueue.filter(id => id !== client.id);

    // 2. Agar aktiv chatda bo'lsa, sherigini ogohlantiramiz
    const roomId = this.activeChats.get(client.id);
    if (roomId) {
        this.server.to(roomId).emit('partner-disconnected');
        this.activeChats.delete(client.id);
        // Sherigini ham topib mapdan o'chirish kerak (optional but good for cleanup)
    }
  }

  @SubscribeMessage('join-queue')
  handleJoinQueue(@ConnectedSocket() client: Socket) {
    console.log(`Client joined queue: ${client.id}`);

    // Agar allaqachon navbatda bo'lsa, qaytaramiz
    if (this.waitingQueue.includes(client.id)) return;

    this.waitingQueue.push(client.id);

    // MATCHING LOGIC
    if (this.waitingQueue.length >= 2) {
        const user1 = this.waitingQueue.shift();
        const user2 = this.waitingQueue.shift();
        
        const roomId = `${user1}#${user2}`; // Unique Room ID

        // Ikkalasini xonaga qo'shamiz (Socket.io rooms)
        // Note: Socket instances serverda to'g'ridan to'g'ri mavjud emas, 
        // shuning uchun biz server.in(socketId).socketsJoin(roomId) ishlatamiz v4 da
        
        this.server.in(user1).socketsJoin(roomId);
        this.server.in(user2).socketsJoin(roomId);

        this.activeChats.set(user1, roomId);
        this.activeChats.set(user2, roomId);

        // Ikkalasiga ham xabar beramiz: "Sherik topildi, sen initiator bo'lasan (yoki yo'q)"
        this.server.to(user1).emit('matched', { roomId, initiator: true });
        this.server.to(user2).emit('matched', { roomId, initiator: false });
        
        console.log(`Matched: ${user1} and ${user2}`);
    }
  }

  @SubscribeMessage('leave-queue')
  handleLeaveQueue(@ConnectedSocket() client: Socket) {
      this.waitingQueue = this.waitingQueue.filter(id => id !== client.id);
      console.log(`Client left queue: ${client.id}`);
  }

  // WEBRTC SIGNALING (Generic Relay)
  
  @SubscribeMessage('signal')
  handleSignal(@MessageBody() data: { roomId: string, signal: any }, @ConnectedSocket() client: Socket) {
      console.log(`[Signaling] Relay from ${client.id} to room ${data.roomId}`);
      // Shunchaki xonadagi narigi odamga yuboramiz
      client.to(data.roomId).emit('signal', data.signal);
  }
}
