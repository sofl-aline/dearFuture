import { useState } from 'react';
import { Box, TextField } from '@mui/material';

export default function CapsuleForm() {

    const [title, setTitle] = useState('')

    return (
        <Box component="form">
            <TextField
            label="Título"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            fullWidth
            />
        </Box>
    )
}