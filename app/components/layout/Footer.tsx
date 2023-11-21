import { Box, SxProps, Typography } from "@mui/material";
import { Container } from "@mui/system";

/**
 * Component with a footer.
 */
export default function Footer(props: { sx?: SxProps }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ...props.sx,
      }}
    >
      <Container maxWidth="md" sx={{ my: 4, ...props.sx }}>
        <Typography color="text.secondary" variant="body2" textAlign="center">
          dLinkedIn © 2023
        </Typography>
      </Container>
    </Box>
  );
}
