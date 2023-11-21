import { HREF_ACCOUNTS } from "@/constants/hrefs";
import { Profile } from "@/types";
import { Link as MuiLink, SxProps, TypographyProps } from "@mui/material";
import Link from "next/link";
import { addressToShortAddress } from "utils/converters";

/**
 * Component with account link.
 */
export default function AccountLink(props: {
  account: string;
  accountProfile?: Profile;
  variant?: TypographyProps["variant"];
  textAlign?: TypographyProps["textAlign"];
  sx?: SxProps;
}) {
  let name = addressToShortAddress(props.account);
  if (props.accountProfile?.name) {
    name = props.accountProfile.name + ` (${name})`;
  }

  return (
    <Link href={`${HREF_ACCOUNTS}/${props.account}`} passHref legacyBehavior>
      <MuiLink
        fontWeight={700}
        variant={props.variant || "body2"}
        textAlign={props.textAlign || "start"}
        sx={{ ...props.sx }}
      >
        {name}
      </MuiLink>
    </Link>
  );
}
