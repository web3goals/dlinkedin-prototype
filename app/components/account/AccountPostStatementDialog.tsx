import {
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import * as yup from "yup";
import useError from "../hooks/useError";
import useToasts from "../hooks/useToast";
import { DialogCenterContent } from "../styled/Dialog";
import { STATEMENT_EVALUATIONS, STATEMENT_SKILLS } from "@/constants/statement";
import { Formik, Form } from "formik";
import FormikHelper from "../helper/FormikHelper";
import { ExtraLargeLoadingButton } from "../styled/Button";
import { statementEvaluationToText, statementSkillToText } from "@/utils/text";
import { StatementExtraData } from "@/types";
import useIpfs from "../hooks/useIpfs";
import useLukso from "../hooks/useLukso";
import { reputationContractAbi } from "@/contracts/abi/reputation";
import { Reputation } from "@/contracts/types/reputation";
import { ethers } from "ethers";

export default function AccountPostStatementDialog(props: {
  account: string;
  isClose?: boolean;
  onClose?: Function;
}) {
  const { handleError } = useError();
  const { showToastSuccess } = useToasts();
  const { uploadJsonToIpfs } = useIpfs();
  const { signer } = useLukso();

  /**
   * Dialog states
   */
  const [isOpen, setIsOpen] = useState(!props.isClose);

  /**
   * Form states
   */
  const [formValues, setFormValues] = useState({
    skill: STATEMENT_SKILLS[0],
    evaluation: STATEMENT_EVALUATIONS[2],
    comment: "",
  });
  const formValidationSchema = yup.object({
    skill: yup.number().required(),
    evaluation: yup.number().required(),
    comment: yup.string().required(),
  });
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  /**
   * Function to close dialog
   */
  async function close() {
    setIsOpen(false);
    props.onClose?.();
  }

  /**
   * Function to handle submit
   */
  async function submit(values: any) {
    try {
      setIsFormSubmitting(true);
      if (!signer) {
        throw new Error(
          "Signer is uncorrect, check if the Universal Profiles Extension is connected"
        );
      }
      const extraData: StatementExtraData = {
        comment: values.comment,
      };
      const { uri: extraDataUri } = await uploadJsonToIpfs(extraData);
      const reputationContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_LUKSO_REPUTATION_CONTRACT as string,
        reputationContractAbi,
        signer
      ) as ethers.BaseContract as Reputation;
      await reputationContract.postStatement(
        props.account,
        values.skill,
        values.evaluation,
        extraDataUri
      );
      showToastSuccess(
        "Statement is posted, reload the page to update the data"
      );
      close();
    } catch (error: any) {
      handleError(error, true);
      setIsFormSubmitting(false);
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={!isFormSubmitting ? close : undefined}
      maxWidth="sm"
      fullWidth
    >
      <DialogCenterContent>
        <Typography variant="h4" fontWeight={700} textAlign="center">
          🗣️ Post statement
        </Typography>
        <Typography textAlign="center" mt={1}>
          about the person&apos;s skill
        </Typography>
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
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="label-skill">Skill</InputLabel>
                <Select
                  labelId="label-skill"
                  id="skill"
                  name="skill"
                  label="Skill"
                  value={values.skill}
                  onChange={handleChange}
                  disabled={isFormSubmitting}
                >
                  {STATEMENT_SKILLS.map((skill, index) => (
                    <MenuItem key={index} value={skill}>
                      {statementSkillToText(skill)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="label-evaluation">Evaluation</InputLabel>
                <Select
                  labelId="label-evaluation"
                  id="evaluation"
                  name="evaluation"
                  label="Evaluation"
                  value={values.evaluation}
                  onChange={handleChange}
                  disabled={isFormSubmitting}
                >
                  {STATEMENT_EVALUATIONS.map((evaluation, index) => (
                    <MenuItem key={index} value={evaluation}>
                      {statementEvaluationToText(evaluation)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                id="comment"
                name="comment"
                label="Comment"
                placeholder="Amazing developer..."
                value={values.comment}
                onChange={handleChange}
                error={touched.comment && Boolean(errors.comment)}
                helperText={touched.comment && errors.comment}
                disabled={isFormSubmitting}
                multiline
                minRows={3}
                sx={{ mt: 2 }}
              />
              <ExtraLargeLoadingButton
                type="submit"
                variant="outlined"
                loading={isFormSubmitting}
                disabled={isFormSubmitting}
                sx={{ mt: 2 }}
              >
                Submit
              </ExtraLargeLoadingButton>
            </Form>
          )}
        </Formik>
      </DialogCenterContent>
    </Dialog>
  );
}
