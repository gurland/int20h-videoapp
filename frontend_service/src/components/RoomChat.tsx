import React from 'react';
import { ChatMessage } from '../types/ChatMessage';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

function RoomChat() {
    const messages: ChatMessage[] = [
        {
            id: 1,
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
            date: new Date(),
            author: 'Test test',
        },
        {
            id: 2,
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
            date: new Date(),
            author: 'Test test',
        },
        {
            id: 3,
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
            date: new Date(),
            author: 'Test test',
        },
        {
            id: 1,
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
            date: new Date(),
            author: 'Test test',
        },
        {
            id: 2,
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
            date: new Date(),
            author: 'Test test',
        },
        {
            id: 3,
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
            date: new Date(),
            author: 'Test test',
        },
        {
            id: 1,
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
            date: new Date(),
            author: 'Test test',
        },
        {
            id: 2,
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
            date: new Date(),
            author: 'Test test',
        },
        {
            id: 3,
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
            date: new Date(),
            author: 'Test test',
        },
    ];

    const handleMessageSend = (message: string) => {
        console.log(message);
    };

    return (
        <>
            <MessageList messages={messages} />
            <ChatInput onSend={handleMessageSend} />
        </>
    );
}

export default RoomChat;
