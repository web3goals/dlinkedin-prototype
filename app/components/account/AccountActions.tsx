import { HREF_CHATS } from "@/constants/hrefs";
import useLukso from "@/hooks/useLukso";
import { isAddressesEqual } from "@/utils/addresses";
import { Stack, SxProps } from "@mui/material";
import Link from "next/link";
import useToasts from "../../hooks/useToast";
import { LargeLoadingButton } from "../styled/Button";

/**
 * Component with account actions.
 */
export default function AccountActions(props: {
  account: string;
  sx?: SxProps;
}) {
  const { signerAddress } = useLukso();
  const { showToastSuccess } = useToasts();
  const link = `${global.window.location.origin}/accounts/${props.account}`;

  return (
    <Stack
      direction="column"
      spacing={1}
      alignItems="center"
      sx={{ ...props.sx }}
    >
      {signerAddress && isAddressesEqual(signerAddress, props.account) ? (
        <Link href={HREF_CHATS}>
          <LargeLoadingButton variant="contained">
            Open Chats
          </LargeLoadingButton>
        </Link>
      ) : (
        <Link href={`${HREF_CHATS}/${props.account}`}>
          <LargeLoadingButton variant="contained">
            Send Message
          </LargeLoadingButton>
        </Link>
      )}
      <LargeLoadingButton
        variant="outlined"
        onClick={() => {
          navigator.clipboard.writeText(link);
          showToastSuccess("Link copied!");
        }}
      >
        Share
      </LargeLoadingButton>
    </Stack>
  );
}
