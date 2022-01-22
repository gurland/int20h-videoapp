import React from 'react';
import { Box } from '@mui/material';
import { ChatMessage } from '../types/ChatMessage';
import MessageBubble from './MessageBubble';

interface MessageListProps {
    messages: ChatMessage[];
}

function MessageList({ messages }: MessageListProps) {
    return (
        <Box height="85%" overflow="auto">
            {messages.map(({ id, date, text, author }, index) => (
                <MessageBubble
                    key={id}
                    author={author}
                    text={text}
                    date={date}
                    position={index % 2 === 0 ? 'right' : 'left'}
                />
            ))}
        </Box>
    );
}

export default MessageList;
