export interface ChatMessage {
    _id: number;
    createdAt: string;
    updatedAt: string;
    senderId: number;
    senderName: string;
    messageType: 'text';
    content: string;
}
