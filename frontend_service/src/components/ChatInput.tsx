import React, { ChangeEvent, useState } from 'react';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface ChatInputProps {
    onSend: (text: string) => void;
}

function ChatInput({ onSend }: ChatInputProps) {
    const [text, setText] = useState('');

    return (
        <Box mt={2}>
            <TextField
                fullWidth
                placeholder="Enter message..."
                value={text}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton size="large" onClick={() => onSend(text)}>
                                <SendIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
}

export default ChatInput;
