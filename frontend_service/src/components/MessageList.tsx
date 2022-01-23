import React, { useContext } from 'react';
import { Box } from '@mui/material';
import { ChatMessage } from '../types/ChatMessage';
import MessageBubble from './MessageBubble';
import { store } from '../utils/store';

interface MessageListProps {
    messages: ChatMessage[];
}

function MessageList({ messages }: MessageListProps) {
    const {
        state: { user },
    } = useContext(store);

    return (
        <Box height="85%" overflow="auto">
            {messages.map(({ _id, senderName, createdAt, content, senderId }) => (
                <MessageBubble
                    key={_id}
                    author={senderName}
                    text={content}
                    date={new Date(createdAt)}
                    position={user?.id === senderId ? 'right' : 'left'}
                />
            ))}
        </Box>
    );
}

export default MessageList;
