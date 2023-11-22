import { Divider, DividerProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ThickDivider = styled(Divider)<DividerProps>(({ theme }) => ({
  width: "100%",
  borderBottomWidth: 5,
}));
