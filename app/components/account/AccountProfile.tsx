import { Profile } from "@/types";
import { ERC725, ERC725JSONSchema } from "@erc725/erc725.js";
import lsp3ProfileSchema from "@erc725/erc725.js/schemas/LSP3ProfileMetadata.json" assert { type: "json" };
import {
  Box,
  Stack,
  SxProps,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { useEffect, useState } from "react";
import useError from "../hooks/useError";
import AccountLink from "./AccountLink";
import AccountAvatar from "./AccountAvatar";

/**
 * Component with an account profile.
 */
export default function AccountProfile(props: {
  account: string;
  sx?: SxProps;
}) {
  const { handleError } = useError();
  const [accountProfile, setProfile] = useState<Profile | undefined>();

  useEffect(() => {
    const erc725js = new ERC725(
      lsp3ProfileSchema as ERC725JSONSchema[],
      props.account,
      process.env.NEXT_PUBLIC_LUKSO_RPC_PROVIDER,
      {
        ipfsGateway: process.env.NEXT_PUBLIC_LUKSO_IPFS_PROVIDER,
      }
    );
    erc725js
      .fetchData("LSP3Profile")
      .then((data) => {
        const lsp3Profile = data.value as { LSP3Profile: Record<string, any> };
        setProfile({
          name: lsp3Profile.LSP3Profile.name,
          description: lsp3Profile.LSP3Profile.description,
          avatar: lsp3Profile.LSP3Profile.profileImage?.[0]?.url,
          links: lsp3Profile.LSP3Profile.links,
        });
      })
      .catch((error) => handleError(error, true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.account]);

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
