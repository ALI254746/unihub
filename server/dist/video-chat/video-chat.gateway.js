"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let VideoChatGateway = class VideoChatGateway {
    constructor() {
        this.waitingQueue = [];
        this.activeChats = new Map();
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
        this.waitingQueue = this.waitingQueue.filter(id => id !== client.id);
        const roomId = this.activeChats.get(client.id);
        if (roomId) {
            this.server.to(roomId).emit('partner-disconnected');
            this.activeChats.delete(client.id);
        }
    }
    handleJoinQueue(client) {
        console.log(`Client joined queue: ${client.id}`);
        if (this.waitingQueue.includes(client.id))
            return;
        this.waitingQueue.push(client.id);
        if (this.waitingQueue.length >= 2) {
            const user1 = this.waitingQueue.shift();
            const user2 = this.waitingQueue.shift();
            const roomId = `${user1}#${user2}`;
            this.server.in(user1).socketsJoin(roomId);
            this.server.in(user2).socketsJoin(roomId);
            this.activeChats.set(user1, roomId);
            this.activeChats.set(user2, roomId);
            this.server.to(user1).emit('matched', { roomId, initiator: true });
            this.server.to(user2).emit('matched', { roomId, initiator: false });
            console.log(`Matched: ${user1} and ${user2}`);
        }
    }
    handleLeaveQueue(client) {
        this.waitingQueue = this.waitingQueue.filter(id => id !== client.id);
        console.log(`Client left queue: ${client.id}`);
    }
    handleSignal(data, client) {
        console.log(`[Signaling] Relay from ${client.id} to room ${data.roomId}`);
        client.to(data.roomId).emit('signal', data.signal);
    }
};
exports.VideoChatGateway = VideoChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], VideoChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('join-queue'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], VideoChatGateway.prototype, "handleJoinQueue", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leave-queue'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], VideoChatGateway.prototype, "handleLeaveQueue", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('signal'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], VideoChatGateway.prototype, "handleSignal", null);
exports.VideoChatGateway = VideoChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    })
], VideoChatGateway);
//# sourceMappingURL=video-chat.gateway.js.map