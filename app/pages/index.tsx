import Layout from "@/components/layout";
import { ExtraLargeLoadingButton } from "@/components/styled/Button";
import { HREF_ACCOUNT } from "@/constants/hrefs";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

/**
 * Landing page.
 */
export default function LandingPage() {
  return (
    <Layout maxWidth="lg" hideToolbar sx={{ py: 0 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        {/* Image */}
        <Box flex={2} mt={{ xs: 12, md: 0 }} mr={{ md: 8 }}>
          <Image
            src="/images/handshake.png"
            alt="Handshake"
            width="100"
            height="100"
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </Box>
        {/* Text */}
        <Box
          flex={2}
          display="flex"
          flexDirection="column"
          alignItems={{ xs: "center", md: "start" }}
          textAlign={{ xs: "center", md: "start" }}
        >
          <Typography variant="h2" fontWeight={700}>
            Earn reputation
          </Typography>
          <Typography variant="h4" mt={2}>
            in a decentralized social network for professionals
          </Typography>
          <Link href={HREF_ACCOUNT}>
            <ExtraLargeLoadingButton variant="contained" sx={{ mt: 4 }}>
              Let’s go!
            </ExtraLargeLoadingButton>
          </Link>
        </Box>
      </Box>
    </Layout>
  );
}
