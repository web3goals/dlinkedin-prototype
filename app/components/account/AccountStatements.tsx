import { reputationContractAbi } from "@/contracts/abi/reputation";
import { Reputation } from "@/contracts/types/reputation";
import { isAddressesEqual } from "@/utils/addresses";
import { Box, SxProps, Typography } from "@mui/material";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import useError from "../hooks/useError";
import useLukso from "../hooks/useLukso";
import useToasts from "../hooks/useToast";
import { LargeLoadingButton } from "../styled/Button";
import { CardBox } from "../styled/Card";
import { FullWidthSkeleton } from "../styled/Skeleton";

/**
 * Component with account statements.
 */
export default function AccountStatements(props: {
  account: string;
  sx?: SxProps;
}) {
  const { provider } = useLukso();
  const [isTurnedOn, setIsTurnedOn] = useState<boolean | undefined>();

  useEffect(() => {
    if (provider) {
      const reputationContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_LUKSO_REPUTATION_CONTRACT as string,
        reputationContractAbi,
        provider
      ) as ethers.BaseContract as Reputation;
      reputationContract
        .balanceOf(props.account)
        .then((balance) => setIsTurnedOn(balance > 0));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, props.account]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ...props.sx,
      }}
    >
      <Typography variant="h5" fontWeight={700} textAlign="center">
        🗣️ Statements
      </Typography>
      {isTurnedOn === undefined && <FullWidthSkeleton />}
      {isTurnedOn === false && (
        <AccountStatementsTurnedOff account={props.account} />
      )}
      {isTurnedOn === true && (
        <AccountStatementsTurnedOn account={props.account} />
      )}
    </Box>
  );
}

function AccountStatementsTurnedOff(props: { account: string }) {
  const { signer, signerAddress } = useLukso();
  const { handleError } = useError();
  const { showToastSuccess } = useToasts();
  const [state, setState] = useState<"IDLE" | "TURNING_ON" | "TURNED_ON">(
    "IDLE"
  );

  async function turnOn() {
    try {
      setState("TURNING_ON");
      const reputationContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_LUKSO_REPUTATION_CONTRACT as string,
        reputationContractAbi,
        signer
      ) as ethers.BaseContract as Reputation;
      const tx = await reputationContract.create();
      await tx.wait();
      showToastSuccess(
        "Statements are turned on, reload the page to update the data"
      );
      setState("TURNED_ON");
    } catch (error: any) {
      handleError(error, true);
      setState("IDLE");
    }
  }

  return (
    <>
      <Typography textAlign="center" mt={1}>
        about the person&apos;s skill that form their reputation
      </Typography>
      <CardBox
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Typography textAlign="center">
          😟 Statements are not turned on
        </Typography>
        {signer && isAddressesEqual(props.account, signerAddress) && (
          <LargeLoadingButton
            variant="outlined"
            sx={{ mt: 2 }}
            loading={state === "TURNING_ON"}
            disabled={state === "TURNING_ON" || state === "TURNED_ON"}
            onClick={() => turnOn()}
          >
            Turn On
          </LargeLoadingButton>
        )}
      </CardBox>
    </>
  );
}

function AccountStatementsTurnedOn(props: { account: string }) {
  return (
    <>
      <Typography textAlign="center" mt={1}>
        about the person&apos;s skill that form their reputation
      </Typography>
    </>
  );
}

function AccountStatementCard(props: {}) {
  return <CardBox>...</CardBox>;
}
