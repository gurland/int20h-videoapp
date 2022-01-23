import React, { useContext } from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { useChat } from '../utils/hooks/useChat';
import { store } from '../utils/store';

interface RoomChatProps {
    roomId: string | undefined;
}

function RoomChat({ roomId }: RoomChatProps) {
    const {
        state: { user },
    } = useContext(store);
    const { messages, sendMessage } = useChat(roomId as string);

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
