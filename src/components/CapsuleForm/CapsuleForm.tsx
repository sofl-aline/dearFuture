import { useState } from 'react';
import { Box, Stack, TextField } from '@mui/material';

export default function CapsuleForm() {

    const [title, setTitle] = useState('')
    const [message, setMessage] = useState ('')
    return (
        <Box component="form">
            <Stack spacing={2}>
             <TextField
              label="Título"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              fullWidth
            />

            <TextField
               label="Mensagem"
               value={message}
               onChange={(event) => setMessage(event.target.value)}
               multiline
               minRows={6}
               fullWidth 
        
        
        />    
            </Stack>
        </Box>
    )
}