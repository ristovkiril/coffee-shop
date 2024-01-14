import { Box, CircularProgress } from "@mui/material"

export const LoadingScreen = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: 'center',
        justifyContent: "center"
      }}
    >
      <CircularProgress />
    </Box>
  )
}