import { DialogContent, DialogContentProps, styled } from "@mui/material";

export const DialogCenterContent = styled(DialogContent)<DialogContentProps>(
  ({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "14px 0px",
  })
);
