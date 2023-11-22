import { Box, BoxProps, styled } from "@mui/material";
import { grey } from "@mui/material/colors";

export const CardBox = styled(Box)<BoxProps>(({ theme }) => ({
  width: "100%",
  background: "white",
  border: "solid",
  borderColor: theme.palette.divider,
  borderWidth: "1px",
  borderRadius: "10px",
  padding: "18px 24px",
}));

export const ReputationBox = styled(Box)<BoxProps>(({ theme }) => ({
  background: grey[100],
  borderRadius: "10px",
  padding: "10px 16px",
}));
