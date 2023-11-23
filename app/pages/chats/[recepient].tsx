import AccountAvatar from "@/components/account/AccountAvatar";
import AccountLink from "@/components/account/AccountLink";
import EntityList from "@/components/entity/EntityList";
import FormikHelper from "@/components/helper/FormikHelper";
import Layout from "@/components/layout";
import { LargeLoadingButton } from "@/components/styled/Button";
import { CardBox } from "@/components/styled/Card";
import { FullWidthSkeleton } from "@/components/styled/Skeleton";
import { chatContractAbi } from "@/contracts/abi/chat";
import { Chat as ChatContract } from "@/contracts/types/chat";
import useError from "@/hooks/useError";
import useIpfs from "@/hooks/useIpfs";
import useLukso from "@/hooks/useLukso";
import useLuksoProfileLoader from "@/hooks/useLuksoProfileLoader";
import useToasts from "@/hooks/useToast";
import { Message, MessageExtraData } from "@/types";
import { isAddressesEqual } from "@/utils/addresses";
import { Stack, SxProps, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ethers } from "ethers";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as yup from "yup";

/**
 * Page with a chat.
 */
export default function ChatPage() {
  const router = useRouter();
  const { recepient } = router.query;

  return (
    <Layout maxWidth="sm">
      {recepient ? (
        <Chat recepient={recepient as string} />
      ) : (
        <FullWidthSkeleton />
      )}
    </Layout>
  );
}

function Chat(props: { recepient: string; sx?: SxProps }) {
  const { profile: recepientProfile } = useLuksoProfileLoader(props.recepient);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ...props.sx,
      }}
    >
      <Typography variant="h6" fontWeight={700} textAlign="center">
        💬 Chat w/
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center" mt={1}>
        <AccountAvatar
          account={props.recepient}
          accountProfile={recepientProfile}
        />
        <AccountLink
          account={props.recepient}
          accountProfile={recepientProfile}
          variant="h4"
        />
      </Stack>
      <ChatSendMessageForm recepient={props.recepient} sx={{ mt: 1 }} />
      <ChatMessages recepient={props.recepient} sx={{ mt: 2 }} />
    </Box>
  );
}

function ChatSendMessageForm(props: { recepient: string; sx?: SxProps }) {
  const { handleError } = useError();
  const { showToastSuccess } = useToasts();
  const { uploadJsonToIpfs } = useIpfs();
  const { signer } = useLukso();

  /**
   * Form states
   */
  const [formValues, setFormValues] = useState({
    message: "",
  });
  const formValidationSchema = yup.object({
    message: yup.string().required(),
  });
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  /**
   * Function to handle submit
   */
  async function submit(values: any, actions: any) {
    try {
      setIsFormSubmitting(true);
      if (!signer) {
        throw new Error(
          "Signer is uncorrect, check if the Universal Profiles Extension is connected"
        );
      }
      const extraData: MessageExtraData = {
        message: values.message,
      };
      const { uri: extraDataUri } = await uploadJsonToIpfs(extraData);
      const chatContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_LUKSO_CHAT_CONTRACT as string,
        chatContractAbi,
        signer
      ) as ethers.BaseContract as ChatContract;
      await chatContract.postMessage(props.recepient, extraDataUri);
      showToastSuccess("Message is posted, reload the page to update the data");
      actions?.resetForm();
    } catch (error: any) {
      handleError(error, true);
    } finally {
      setIsFormSubmitting(false);
    }
  }

  return (
    <Box sx={{ width: 1, ...props.sx }}>
      <Formik
        initialValues={formValues}
        validationSchema={formValidationSchema}
        onSubmit={submit}
      >
        {({ values, errors, touched, handleChange, setValues }) => (
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <FormikHelper onChange={(values: any) => setFormValues(values)} />
            <TextField
              fullWidth
              id="message"
              name="message"
              label="Message"
              placeholder="Hey..."
              value={values.message}
              onChange={handleChange}
              error={touched.message && Boolean(errors.message)}
              helperText={touched.message && errors.message}
              disabled={isFormSubmitting}
              multiline
              minRows={1}
              sx={{ mt: 2 }}
            />
            <LargeLoadingButton
              type="submit"
              variant="outlined"
              loading={isFormSubmitting}
              disabled={isFormSubmitting}
              sx={{ mt: 2 }}
            >
              Send
            </LargeLoadingButton>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

function ChatMessages(props: { recepient: string; sx?: SxProps }) {
  const { signer, signerAddress } = useLukso();
  const { handleError } = useError();
  const [messages, setMessages] = useState<Message[] | undefined>();

  async function loadData() {
    try {
      setMessages(undefined);
      let messages: Message[] = [];
      if (signer && signerAddress) {
        const chatContract = new ethers.Contract(
          process.env.NEXT_PUBLIC_LUKSO_CHAT_CONTRACT as string,
          chatContractAbi,
          signer
        ) as ethers.BaseContract as ChatContract;
        const conversationIds = await chatContract.getConversationIds();
        for (const conversationId of conversationIds) {
          const conversation = await chatContract.getConversation(
            conversationId
          );
          if (
            (isAddressesEqual(conversation.accountOne, signerAddress) &&
              isAddressesEqual(conversation.accountTwo, props.recepient)) ||
            (isAddressesEqual(conversation.accountOne, props.recepient) &&
              isAddressesEqual(conversation.accountTwo, signerAddress))
          ) {
            const contractMessages = await chatContract.getMessages(
              conversationId
            );
            messages = contractMessages.map(
              (message) =>
                ({
                  author: message.author,
                  time: Number(message.time),
                  extraData: message.extraData,
                } as Message)
            );
            messages.reverse();
          }
        }
      }
      setMessages(messages);
    } catch (error: any) {
      handleError(error, true);
    }
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signer, signerAddress, props.recepient]);

  return (
    <EntityList
      entities={messages}
      renderEntityCard={(message, index) => (
        <ChatMessageCard message={message} key={index} />
      )}
      noEntitiesText="😐 no messages"
      sx={{ ...props.sx }}
    />
  );
}

function ChatMessageCard(props: { message: Message; sx?: SxProps }) {
  const { loadJsonFromIpfs } = useIpfs();
  const { handleError } = useError();
  const { profile: authorProfile } = useLuksoProfileLoader(
    props.message.author
  );
  const [messageExtraData, setMessageExtraData] = useState<
    MessageExtraData | undefined
  >();

  useEffect(() => {
    loadJsonFromIpfs(props.message.extraData)
      .then((data) => {
        setMessageExtraData(data);
      })
      .catch((error) => handleError(error, true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.message]);

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
          account={props.message.author}
          accountProfile={authorProfile}
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
          variant="body2"
          account={props.message.author}
          accountProfile={authorProfile}
        />
        <Typography variant="body2" color="text.secondary">
          {new Date(props.message.time * 1000).toLocaleString()}
        </Typography>
        {messageExtraData ? (
          <Typography mt={1}>{messageExtraData.message}</Typography>
        ) : (
          <FullWidthSkeleton />
        )}
      </Box>
    </CardBox>
  );
}
