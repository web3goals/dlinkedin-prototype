import AccountProfile from "@/components/account/AccountProfile";
import Layout from "@/components/layout";
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
        </>
      ) : (
        <FullWidthSkeleton />
      )}
    </Layout>
  );
}
