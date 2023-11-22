import AccountActions from "@/components/account/AccountActions";
import AccountProfile from "@/components/account/AccountProfile";
import AccountStatements from "@/components/account/AccountStatements";
import Layout from "@/components/layout";
import { ThickDivider } from "@/components/layout/Divider";
import { FullWidthSkeleton } from "@/components/styled/Skeleton";
import { useRouter } from "next/router";

/**
 * Page with an account.
 */
export default function AccountPage() {
  const router = useRouter();
  const { address } = router.query;

  return (
    <Layout maxWidth="sm">
      {address ? (
        <>
          <AccountProfile account={address as string} />
          <AccountActions account={address as string} sx={{ mt: 2 }} />
          <AccountStatements account={address as string} sx={{ mt: 6 }} />
        </>
      ) : (
        <FullWidthSkeleton />
      )}
    </Layout>
  );
}
