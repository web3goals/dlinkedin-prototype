import AccountAvatar from "@/components/account/AccountAvatar";
import AccountLink from "@/components/account/AccountLink";
import EntityList from "@/components/entity/EntityList";
import Layout from "@/components/layout";
import { MediumLoadingButton } from "@/components/styled/Button";
import { CardBox } from "@/components/styled/Card";
import { HREF_CHATS } from "@/constants/hrefs";
import { chatContractAbi } from "@/contracts/abi/chat";
import { Chat as ChatContract } from "@/contracts/types/chat";
import useError from "@/hooks/useError";
import useLukso from "@/hooks/useLukso";
import useLuksoProfileLoader from "@/hooks/useLuksoProfileLoader";
import { Conversation } from "@/types";
import { isAddressesEqual } from "@/utils/addresses";
import { Box, SxProps, Typography } from "@mui/material";
import { ethers } from "ethers";
import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Page with chats.
 */
export default function ChatsPage() {
  const { signer } = useLukso();
  const { handleError } = useError();
  const [conversations, setConversations] = useState<
    Conversation[] | undefined
  >();

  async function loadConversations() {
    try {
      setConversations(undefined);
      if (!signer) {
        console.log("Signer is undefined");
        return;
      }
      const conversations: Conversation[] = [];
      const chatContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_LUKSO_CHAT_CONTRACT as string,
        chatContractAbi,
        signer
      ) as ethers.BaseContract as ChatContract;
      const conversationIds = await chatContract.getConversationIds();
      for (const conversationId of conversationIds) {
        const conversation = await chatContract.getConversation(conversationId);
        conversations.push({
          accountOne: conversation.accountOne,
          accountTwo: conversation.accountTwo,
          time: Number(conversation.time),
        });
      }
      setConversations(conversations);
    } catch (error: any) {
      handleError(error, true);
    }
  }

  useEffect(() => {
    loadConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signer]);

  return (
    <Layout maxWidth="sm">
      <Typography variant="h4" fontWeight={700} textAlign="center">
        💬 Chats
      </Typography>
      <EntityList
        entities={conversations}
        renderEntityCard={(conversation, index) => (
          <ChatCard conversation={conversation} key={index} />
        )}
        noEntitiesText="😐 no chats"
        sx={{ mt: 2 }}
      />
    </Layout>
  );
}

function ChatCard(props: { conversation: Conversation; sx?: SxProps }) {
  const { signerAddress } = useLukso();
  const recepient = isAddressesEqual(
    signerAddress,
    props.conversation.accountOne
  )
    ? props.conversation.accountTwo
    : props.conversation.accountOne;
  const { profile: recepientProfile } = useLuksoProfileLoader(recepient);

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
          account={recepient}
          accountProfile={recepientProfile}
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
          account={recepient}
          accountProfile={recepientProfile}
        />
        {recepientProfile?.description && (
          <Typography mt={1}>{recepientProfile.description}</Typography>
        )}
        <Link href={`${HREF_CHATS}/${recepient}`}>
          <MediumLoadingButton variant="outlined" sx={{ mt: 1 }}>
            Open Chat
          </MediumLoadingButton>
        </Link>
      </Box>
    </CardBox>
  );
}
