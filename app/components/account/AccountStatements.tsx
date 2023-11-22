import { DialogContext } from "@/context/dialog";
import { reputationContractAbi } from "@/contracts/abi/reputation";
import { Reputation } from "@/contracts/types/reputation";
import { Statement } from "@/types";
import { isAddressesEqual } from "@/utils/addresses";
import { Box, SxProps, Typography } from "@mui/material";
import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import EntityList from "../entity/EntityList";
import useError from "../hooks/useError";
import useLukso from "../hooks/useLukso";
import useToasts from "../hooks/useToast";
import { LargeLoadingButton } from "../styled/Button";
import { CardBox } from "../styled/Card";
import { FullWidthSkeleton } from "../styled/Skeleton";
import AccountPostStatementDialog from "./AccountPostStatementDialog";

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
      if (!signer) {
        throw new Error(
          "Signer is uncorrect, check if the Universal Profiles Extension is connected"
        );
      }
      const reputationContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_LUKSO_REPUTATION_CONTRACT as string,
        reputationContractAbi,
        signer
      ) as ethers.BaseContract as Reputation;
      await reputationContract.create();
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
        {isAddressesEqual(props.account, signerAddress) && (
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
  const { showDialog, closeDialog } = useContext(DialogContext);
  const { provider } = useLukso();
  const [statements, setStatements] = useState<Statement[] | undefined>();

  useEffect(() => {
    if (provider) {
      const reputationContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_LUKSO_REPUTATION_CONTRACT as string,
        reputationContractAbi,
        provider
      ) as ethers.BaseContract as Reputation;
      reputationContract.getStatements(props.account).then((statements) => {
        const processedStatements = statements.map(
          (statement) =>
            ({
              author: statement.author,
              time: Number(statement.time),
              skill: Number(statement.skill),
              evaluation: Number(statement.evaluation),
              extraData: statement.extraData,
            } as Statement)
        );
        processedStatements.reverse();
        setStatements(processedStatements);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, props.account]);

  return (
    <>
      <Typography textAlign="center" mt={1}>
        about the person&apos;s skill that form their reputation
      </Typography>
      <LargeLoadingButton
        variant="outlined"
        sx={{ mt: 2 }}
        onClick={() =>
          showDialog?.(
            <AccountPostStatementDialog
              account={props.account}
              onClose={closeDialog}
            />
          )
        }
      >
        Post
      </LargeLoadingButton>
      <EntityList
        entities={statements}
        renderEntityCard={(statement, index) => (
          <AccountStatementCard statement={statement} key={index} />
        )}
        noEntitiesText="😐 no statements"
        sx={{ mt: 2 }}
      />
    </>
  );
}

function AccountStatementCard(props: { statement: Statement; sx?: SxProps }) {
  return (
    <CardBox sx={{ display: "flex", flexDirection: "row", ...props.sx }}>
      <Typography>...</Typography>
    </CardBox>
  );
}
