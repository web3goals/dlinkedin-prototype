import {
  Box,
  Link as MuiLink,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import useLuksoProfileLoader from "../hooks/useLuksoProfileLoader";
import AccountAvatar from "./AccountAvatar";
import AccountLink from "./AccountLink";

/**
 * Component with an account profile.
 */
export default function AccountProfile(props: {
  account: string;
  sx?: SxProps;
}) {
  const { profile: accountProfile } = useLuksoProfileLoader(props.account);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ...props.sx,
      }}
    >
      <AccountAvatar
        account={props.account}
        accountProfile={accountProfile}
        size={128}
        emojiSize={48}
      />
      <AccountLink
        account={props.account}
        accountProfile={accountProfile}
        variant="h4"
        textAlign="center"
        sx={{ mt: 2 }}
      />
      {accountProfile?.description && (
        <Typography textAlign="center" mt={1}>
          {accountProfile.description}
        </Typography>
      )}
      {accountProfile?.links && (
        <Stack direction="row" spacing={1} mt={2}>
          {accountProfile.links.map((link, index) => (
            <MuiLink
              key={index}
              href={link.url}
              target="_blank"
              fontWeight={700}
            >
              🔗 {link.title}
            </MuiLink>
          ))}
        </Stack>
      )}
    </Box>
  );
}
