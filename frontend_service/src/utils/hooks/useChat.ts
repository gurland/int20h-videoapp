import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { ChatMessage } from '../../types/ChatMessage';

export function useChat() {
    const socketRef = useRef<Socket | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    useEffect(() => {
        socketRef.current = io('');

        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    const sendMessage = (message: string) => {
        socketRef.current?.emit('message');
    };

    return { socket: socketRef.current, sendMessage, messages };
}
