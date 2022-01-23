import React, { useContext } from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { store } from '../utils/store';
import { ChatMessage } from '../types/ChatMessage';

interface RoomChatProps {
    messages: ChatMessage[];
    sendMessage: (message: string, senderName?: string) => void;
}

function RoomChat({ messages, sendMessage }: RoomChatProps) {
    const {
        state: { user },
    } = useContext(store);

    const handleMessageSend = (message: string) => {
        sendMessage(message, user?.profileName);
    };
    return (
        <>
            <MessageList messages={messages} />
            <ChatInput onSend={handleMessageSend} />
        </>
    );
}

export default RoomChat;
