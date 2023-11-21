import useLukso from "@/components/hooks/useLukso";
import Layout from "@/components/layout";
import { LargeLoadingButton } from "@/components/styled/Button";
import { FullWidthSkeleton } from "@/components/styled/Skeleton";
import { Box, Typography } from "@mui/material";
import { ethers } from "ethers";

/**
 * Page with an account.
 */
export default function AccountPage() {
  const { isReady, signer, signerAddress } = useLukso();

  return (
    <Layout maxWidth="sm">
      {isReady && signer && signerAddress && (
        <Account signer={signer} signerAddress={signerAddress} />
      )}
      {isReady && !signer && <AccountConnectForm />}
      {!isReady && <FullWidthSkeleton />}
    </Layout>
  );
}

function AccountConnectForm() {
  const { connect } = useLukso();

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4" fontWeight={700} textAlign="center">
        🔗️ Connect a universal profile
      </Typography>
      <Typography textAlign="center" mt={1}>
        to start earning reputation in a decentralized social network for
        professionals
      </Typography>
      <LargeLoadingButton
        variant="outlined"
        sx={{ mt: 2 }}
        onClick={() => connect()}
      >
        Connect profile
      </LargeLoadingButton>
    </Box>
  );
}

function Account(props: { signer: ethers.Signer; signerAddress: string }) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography textAlign="center">✅ Profile is connected!</Typography>
    </Box>
  );
}
