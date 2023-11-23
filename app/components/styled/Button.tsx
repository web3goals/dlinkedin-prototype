import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

const StyledLoadingButton = styled(LoadingButton)<LoadingButtonProps>(
  ({ variant, color }) => ({
    ...(variant === "contained" && {
      color: "white",
      background: "black",
      "&:hover": {
        background: grey[800],
      },
    }),
    ...(variant === "outlined" && {
      color: "black",
      borderColor: "black",
      boxShadow: "inset 0px 0px 0px 5px",
      "&:hover": {
        borderColor: "black",
        boxShadow: "inset 0px 0px 0px 5px",
      },
    }),
    ...(variant === "contained" &&
      color === "secondary" && {
        color: "black",
        background: "white",
        "&:hover": {
          background: grey[200],
        },
      }),
  })
) as typeof LoadingButton;

export const ExtraLargeLoadingButton = styled(
  StyledLoadingButton
)<LoadingButtonProps>(({}) => ({
  fontSize: "24px",
  fontWeight: 700,
  borderRadius: "48px",
  padding: "18px 48px",
})) as typeof LoadingButton;

export const LargeLoadingButton = styled(
  StyledLoadingButton
)<LoadingButtonProps>(({}) => ({
  fontSize: "18px",
  fontWeight: 700,
  borderRadius: "32px",
  padding: "14px 28px",
})) as typeof LoadingButton;

export const MediumLoadingButton = styled(
  StyledLoadingButton
)<LoadingButtonProps>(({ variant }) => ({
  fontSize: "14px",
  fontWeight: 700,
  borderRadius: "24px",
  padding: "8px 18px",
  ...(variant === "outlined" && {
    boxShadow: "inset 0px 0px 0px 4px",
    "&:hover": {
      boxShadow: "inset 0px 0px 0px 4px",
    },
  }),
})) as typeof LoadingButton;
