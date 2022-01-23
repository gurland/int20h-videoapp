import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { ChatMessage } from '../../types/ChatMessage';

export function useChat(roomId: string) {
    const socketRef = useRef<Socket | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    useEffect(() => {
        socketRef.current = io('http://157.90.230.141', {
            path: '/ws/chat',
            query: {
                token: localStorage.getItem('accessToken'),
                roomId,
            },
        });

        socketRef.current?.on('message-broadcast', (data) => {
            console.log(data);
            setMessages(data);
        });

        return () => {
            socketRef.current?.disconnect();
        };
    }, [roomId]);

    const sendMessage = (message: string, senderName?: string) => {
        socketRef.current?.emit('message', { messageType: 'text', content: message, senderName });
    };

    return { socket: socketRef.current, sendMessage, messages };
}
