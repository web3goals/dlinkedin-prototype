import AccountAvatar from "@/components/account/AccountAvatar";
import AccountLink from "@/components/account/AccountLink";
import AccountReputation from "@/components/account/AccountReputation";
import EntityList from "@/components/entity/EntityList";
import useError from "@/hooks/useError";
import useLukso from "@/hooks/useLukso";
import useLuksoProfileLoader from "@/hooks/useLuksoProfileLoader";
import Layout from "@/components/layout";
import { CardBox } from "@/components/styled/Card";
import { reputationContractAbi } from "@/contracts/abi/reputation";
import { Reputation } from "@/contracts/types/reputation";
import { Box, SxProps, Typography } from "@mui/material";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

/**
 * Page with accounts.
 */
export default function AccountsPage() {
  const { provider } = useLukso();
  const { handleError } = useError();
  const [accounts, setAccounts] = useState<string[] | undefined>();

  async function loadAccounts() {
    try {
      setAccounts(undefined);
      if (!provider) {
        console.log("Provider is undefined");
        return;
      }
      const latestBlock = await provider.getBlock("latest");
      if (!latestBlock) {
        console.log("Latest block is undefined");
        return;
      }
      const reputationContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_LUKSO_REPUTATION_CONTRACT as string,
        reputationContractAbi,
        provider
      ) as ethers.BaseContract as Reputation;
      const filter = reputationContract.filters.Transfer();
      const transfers = await reputationContract.queryFilter(
        filter,
        Number(process.env.NEXT_PUBLIC_LUKSO_REPUTATION_CONTRACT_CREATE_BLOCK),
        latestBlock.number
      );
      setAccounts(transfers.map((transfer) => transfer.args.to));
    } catch (error: any) {
      handleError(error, true);
    }
  }

  useEffect(() => {
    loadAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  return (
    <Layout maxWidth="sm">
      <Typography variant="h4" fontWeight={700} textAlign="center">
        👥 People
      </Typography>
      <Typography textAlign="center" mt={1}>
        Who could potentially become your partners, colleague or friend
      </Typography>
      <EntityList
        entities={accounts}
        renderEntityCard={(account, index) => (
          <AccountCard account={account} key={index} />
        )}
        noEntitiesText="😐 no accounts"
        sx={{ mt: 2 }}
      />
    </Layout>
  );
}

function AccountCard(props: { account: string; sx?: SxProps }) {
  const { profile: accountProfile } = useLuksoProfileLoader(props.account);

  return (
    <CardBox
      sx={{
        display: "flex",
        flexDirection: "row",
        ...props.sx,
      }}
    >
      {/* Left part */}
      <Box>
        <AccountAvatar
          account={props.account}
          accountProfile={accountProfile}
          size={64}
          emojiSize={24}
        />
      </Box>
      {/* Right part */}
      <Box
        width={1}
        ml={3}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
      >
        <AccountLink
          variant="h6"
          account={props.account}
          accountProfile={accountProfile}
        />
        {accountProfile?.description && (
          <Typography mt={1}>{accountProfile.description}</Typography>
        )}
        <AccountReputation account={props.account} sx={{ mt: 2 }} />
      </Box>
    </CardBox>
  );
}
