import { Container, SimpleGrid, Space, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useContext, useState } from "react";
import { AppContext } from "../lib/context/app.context";
import PageLayout from "../lib/components/page.layout";
import CardSimple from "../lib/components/card.simple";
import FormRow from "../lib/components/form.row";
import ContainerWithTitle from "../lib/components/containerWithTitle";
import AttachmentTile from "../lib/components/tile.attachment";
import { useForm } from "@mantine/form";
import { DateTime } from "luxon";
import AddAttachmentTile from "../lib/components/tile.add.attachment";
import { APP_ROUTES, MAX_ALLOWED_ATTACHMENTS } from "../lib/constants";
import useApi from "../lib/hooks/useApi";
import { API_ROUTES } from "../lib/constants/api.constants";
import { useNavigate } from "react-router-dom";

const AgreementRequestPage = () => {
  const { appState } = useContext(AppContext);
  const [attachments, setAttachments] = useState<File[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const { postData: createAgreement } = useApi<ActiveAgreementResponse>();
  const { uploadFile } = useApi<GeneralAPIResponse>();
  const navigate = useNavigate();
  const [error, setError] = useState<GeneralAPIResponse>();

  const agreementForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      orgName: appState.orgName,
      orgAddress: appState.orgAddress,
      amount: 0,
      startDate: DateTime.now().toJSDate(),
      endDate: DateTime.now().plus({ year: 1 }).toJSDate(),
    },

    validate: {
      orgName: (value) =>
        /^([A-ZÁÉÍÓÚÑa-z\s&.'-]{2,})(( Inc| Ltd| LLC| plc| Pty| Corp| plc)?(\.|, )?)*$/.test(
          value
        )
          ? null
          : "Invalid organization name",
      orgAddress: (value) => (value ? null : "Invalid organization address"),
      amount: (value) =>
        /^([1-9][0-9]+|[1-9])$/.test(value.toString())
          ? null
          : "Invalid amount",
    },
  });

  const handleSubmission = () => {
    const validationResponse = agreementForm.validate();

    if (!validationResponse.hasErrors) {
      setLoading(true);
      const formValues = agreementForm.getValues();
      const request: CreateAgreementRequest = {
        pfiId: appState?.pfiId,
        agreementAmount: formValues.amount,
        commencementDate: formValues.startDate.toISOString(),
        expiryDate: formValues.endDate.toISOString(),
        agreementPeriod: "1 year",
      };
      createAgreement(API_ROUTES.CREATE_AGREEMENT, request)
        .then((response) => {
          if (response.success) {
            uploadFile(
              `${API_ROUTES.UPLOAD_DOC}/${response.agreement.agreementId}`,
              attachments
            )
              .then((response) => {
                navigate(APP_ROUTES.HOME);
              })
              .catch(setError);

            setLoading(false);
          } else {
            setError(response);
          }
        })
        .catch(setError);
    }
  };

  return (
    <PageLayout
      isLoggedIn={appState.isUserLoggedIn}
      error={error}
      onErrorClose={() => setError(null)}
    >
      <Container fluid>
        <CardSimple
          title={`Agreement #:${appState?.agreement?.agreementNumber ?? ""}`}
          buttonTitle="Save"
          onButtonClick={handleSubmission}
          isLoading={loading}
        >
          <>
            <ContainerWithTitle title="Organization details">
              <>
                <FormRow title="Name" isRequired>
                  <TextInput
                    placeholder="Organization name"
                    key={agreementForm.key("orgName")}
                    {...agreementForm.getInputProps("orgName")}
                    readOnly
                  />
                </FormRow>
                <Space h={30} />
                <FormRow title="Address" isRequired>
                  <TextInput
                    placeholder="Organization address"
                    key={agreementForm.key("orgAddress")}
                    {...agreementForm.getInputProps("orgAddress")}
                    readOnly
                  />
                </FormRow>
                <Space h={30} />
              </>
            </ContainerWithTitle>
            <ContainerWithTitle title="Agreement details">
              <>
                <FormRow title="Amount" isRequired>
                  <TextInput
                    type="number"
                    placeholder="amount"
                    key={agreementForm.key("amount")}
                    {...agreementForm.getInputProps("amount")}
                  />
                </FormRow>
                <Space h={30} />
                <FormRow title="Commencement Date" isRequired>
                  <DateInput
                    placeholder="Commencement date"
                    minDate={DateTime.now().toJSDate()}
                    key={agreementForm.key("startDate")}
                    {...agreementForm.getInputProps("startDate")}
                    onChange={(value) => {
                      agreementForm.setFieldValue("startDate", value);
                      agreementForm.setFieldValue(
                        "endDate",
                        DateTime.fromJSDate(value).plus({ year: 1 }).toJSDate()
                      );
                    }}
                  />
                </FormRow>
                <Space h={30} />
                <FormRow title="Expiry Date" isRequired>
                  <DateInput
                    placeholder="Expiry date"
                    key={agreementForm.key("endDate")}
                    {...agreementForm.getInputProps("endDate")}
                    readOnly
                  />
                </FormRow>
                <Space h={30} />
              </>
            </ContainerWithTitle>
            <ContainerWithTitle title="Attachments">
              <SimpleGrid cols={5}>
                {attachments.map((attachment, index) => (
                  <AttachmentTile
                    title={attachment.name}
                    onRemove={() =>
                      setAttachments(
                        attachments.filter((file, fIndex) => fIndex !== index)
                      )
                    }
                  />
                ))}
                {attachments.length < MAX_ALLOWED_ATTACHMENTS && (
                  <AddAttachmentTile
                    title="Add attachment"
                    onChange={(file) => setAttachments([...attachments, file])}
                  />
                )}
              </SimpleGrid>
            </ContainerWithTitle>
          </>
        </CardSimple>
      </Container>
    </PageLayout>
  );
};

export default AgreementRequestPage;
