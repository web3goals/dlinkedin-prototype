import { Profile } from "@/types";
import { ipfsUriToHttpUri } from "@/utils/converters";
import { Avatar, SxProps, Typography } from "@mui/material";
import { emojiAvatarForAddress } from "utils/avatars";

/**
 * Component with account avatar.
 */
export default function AccountAvatar(props: {
  account: string;
  accountProfile?: Profile;
  size?: number;
  emojiSize?: number;
  sx?: SxProps;
}) {
  let avatar = undefined;
  if (props.accountProfile?.avatar) {
    avatar = ipfsUriToHttpUri(
      props.accountProfile?.avatar,
      "UNIVERSAL_PROFILE"
    );
  }

  return (
    <Avatar
      sx={{
        width: props.size || 48,
        height: props.size || 48,
        borderRadius: props.size || 48,
        background: emojiAvatarForAddress(props.account).color,
        ...props.sx,
      }}
      src={avatar}
    >
      <Typography fontSize={props.emojiSize || 22}>
        {emojiAvatarForAddress(props.account).emoji}
      </Typography>
    </Avatar>
  );
}
