import React from 'react'
import { Box,Typography,Stack } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingComponent() {
  return (
    <>
      <Box >
        {/* <Stack>Loading...</Stack> */}
        <Stack sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <CircularProgress />
        </Stack>
      </Box>
    </>
  )
}
