import { Profile } from "@/types";
import ERC725, { ERC725JSONSchema } from "@erc725/erc725.js";
import lsp3ProfileSchema from "@erc725/erc725.js/schemas/LSP3ProfileMetadata.json" assert { type: "json" };
import { useEffect, useState } from "react";
import useError from "./useError";

export default function useLuksoProfileLoader(account: string | undefined): {
  profile: Profile | undefined;
} {
  const { handleError } = useError();
  const [profile, setProfile] = useState<Profile | undefined>();

  useEffect(() => {
    setProfile(undefined);
    if (account) {
      const erc725js = new ERC725(
        lsp3ProfileSchema as ERC725JSONSchema[],
        account,
        process.env.NEXT_PUBLIC_LUKSO_RPC_PROVIDER,
        {
          ipfsGateway: process.env.NEXT_PUBLIC_LUKSO_IPFS_PROVIDER,
        }
      );
      erc725js
        .fetchData("LSP3Profile")
        .then((data) => {
          const lsp3Profile = data.value as {
            LSP3Profile: Record<string, any>;
          };
          setProfile({
            name: lsp3Profile.LSP3Profile.name,
            description: lsp3Profile.LSP3Profile.description,
            avatar: lsp3Profile.LSP3Profile.profileImage?.[0]?.url,
            links: lsp3Profile.LSP3Profile.links,
          });
        })
        .catch((error) => handleError(error, true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return { profile };
}
