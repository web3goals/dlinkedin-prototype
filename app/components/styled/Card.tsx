import { Box, BoxProps, styled } from "@mui/material";

export const CardBox = styled(Box)<BoxProps>(({ theme }) => ({
  width: "100%",
  background: "white",
  border: "solid",
  borderColor: theme.palette.divider,
  borderWidth: "1px",
  borderRadius: "10px",
  padding: "18px 24px",
}));
