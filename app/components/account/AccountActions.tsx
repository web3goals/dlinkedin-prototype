import { SxProps, Box } from "@mui/material";
import { LargeLoadingButton } from "../styled/Button";
import useToasts from "../hooks/useToast";

/**
 * Component with account actions.
 */
export default function AccountActions(props: {
  account: string;
  sx?: SxProps;
}) {
  const { showToastSuccess } = useToasts();
  const link = `${global.window.location.origin}/accounts/${props.account}`;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ...props.sx,
      }}
    >
      <LargeLoadingButton
        variant="outlined"
        onClick={() => {
          navigator.clipboard.writeText(link);
          showToastSuccess("Link copied!");
        }}
      >
        Share
      </LargeLoadingButton>
    </Box>
  );
}
