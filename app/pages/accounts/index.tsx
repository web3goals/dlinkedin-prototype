import useError from "@/components/hooks/useError";
import useLukso from "@/components/hooks/useLukso";
import Layout from "@/components/layout";
import { reputationContractAbi } from "@/contracts/abi/reputation";
import { Reputation } from "@/contracts/types/reputation";
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

  return <Layout maxWidth="sm">...</Layout>;
}
