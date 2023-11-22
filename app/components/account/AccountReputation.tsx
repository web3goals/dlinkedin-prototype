import { reputationContractAbi } from "@/contracts/abi/reputation";
import { SxProps, Stack, Typography } from "@mui/material";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import useLukso from "../../hooks/useLukso";
import useError from "../../hooks/useError";
import { Reputation as ReputationContract } from "@/contracts/types/reputation";
import { Reputation } from "@/types";
import { ReputationBox } from "../styled/Card";
import { statementEvaluationToText, statementSkillToText } from "@/utils/text";

/**
 * Component with an account reputation.
 */

export default function AccountReputation(props: {
  account: string;
  sx?: SxProps;
}) {
  const { provider } = useLukso();
  const { handleError } = useError();
  const [reputations, setReputations] = useState<Reputation[] | undefined>();

  async function loadData() {
    try {
      if (!provider) {
        console.log("Provider is undefined");
        return;
      }
      // Load statement
      const reputationContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_LUKSO_REPUTATION_CONTRACT as string,
        reputationContractAbi,
        provider
      ) as ethers.BaseContract as ReputationContract;
      const statements = await reputationContract.getStatements(props.account);
      // Define reputations
      const reputations = new Map<number, Reputation>();
      for (const statement of statements) {
        const reputation =
          reputations.get(Number(statement.skill)) ||
          ({
            skill: Number(statement.skill),
            evaluation: 0,
            statements: 0,
          } as Reputation);
        reputations.set(Number(statement.skill), {
          ...reputation,
          evaluation: reputation.evaluation + Number(statement.evaluation),
          statements: reputation.statements + 1,
        });
      }
      setReputations(Array.from(reputations.values()));
    } catch (error: any) {
      handleError(error, true);
    }
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, props.account]);

  if (reputations) {
    return (
      <Stack direction="row" spacing={1} sx={{ ...props.sx }}>
        {reputations.map((reputation, index) => (
          <ReputationBox key={index}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography fontWeight={700}>
                {statementEvaluationToText(reputation.evaluation)}
              </Typography>
              <Typography color="text.secondary">
                / {reputation.statements} 🗣️
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              fontWeight={700}
              color="text.secondary"
              textAlign="center"
              mt={0.5}
            >
              {statementSkillToText(reputation.skill)}
            </Typography>
          </ReputationBox>
        ))}
      </Stack>
    );
  }

  return <></>;
}
