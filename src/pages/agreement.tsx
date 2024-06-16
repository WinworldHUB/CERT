/* eslint-disable react-hooks/exhaustive-deps */
import {
  Alert,
  Box,
  Container,
  Grid,
  Modal,
  SimpleGrid,
  Space,
  TextInput,
} from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../lib/context/app.context";
import PageLayout from "../lib/components/page.layout";
import CardSimple from "../lib/components/card.simple";
import FormRow from "../lib/components/form.row";
import ContainerWithTitle from "../lib/components/containerWithTitle";
import AttachmentTile from "../lib/components/tile.attachment";
import { AGREEMENT_STATUS, MESSAGES } from "../lib/constants";
import { DateInput } from "@mantine/dates";
import { DateTime } from "luxon";
import useApi from "../lib/hooks/useApi";
import { API_ROUTES } from "../lib/constants/api.constants";
import { IconInfoSquareRounded, IconSend2 } from "@tabler/icons-react";
import MessageBox from "../lib/components/message.box";
import { Link } from "react-router-dom";

const AgreementDetailsPage = () => {
  const { appState } = useContext(AppContext);
  const status = appState?.agreement?.status;
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const { getData: getAgreementDetails } = useApi<ActiveAgreementResponse>();
  const [agreement, setAgreement] = useState<Agreement>(null);
  const [selectedAttachment, setSelectedAttachment] = useState<string>(null);

  useEffect(() => {
    getAgreementDetails(
      `${API_ROUTES.GET_AGREEMENT_DETAILS}/${appState?.agreement?.agreementId}`
    ).then((response) => {
      if (response?.success) {
        setAgreement(response?.agreement);
        setAttachments(response?.documents);
      }
    });
  }, [appState?.agreement]);

  return (
    <PageLayout isLoggedIn={appState.isUserLoggedIn}>
      <Container fluid>
        <Grid align="start" columns={10}>
          <Grid.Col span={7}>
            <CardSimple
              title={`Agreement #:${
                appState?.agreement?.agreementNumber ?? ""
              }`}
              buttonTitle={
                status === AGREEMENT_STATUS.PAYMENT_REQUESTED.toString() &&
                "Pay now"
              }
            >
              <>
                <ContainerWithTitle title="Organization details">
                  <>
                    <FormRow title="Name">
                      <TextInput
                        placeholder="Organization name"
                        value={appState?.orgName}
                        readOnly
                      />
                    </FormRow>
                    <Space h={30} />
                    <FormRow title="Address">
                      <TextInput
                        placeholder="Organization address"
                        value={appState?.orgAddress}
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
                        value={agreement?.agreementAmount}
                        readOnly
                      />
                    </FormRow>
                    <Space h={30} />
                    <FormRow title="Commencement Date" isRequired>
                      <DateInput
                        placeholder="Commencement date"
                        value={DateTime.fromISO(
                          agreement?.commencementDate ?? DateTime.now().toISO()
                        ).toJSDate()}
                        readOnly
                      />
                    </FormRow>
                    <Space h={30} />
                    <FormRow title="Expiry Date" isRequired>
                      <DateInput
                        placeholder="Expiry date"
                        value={DateTime.fromISO(
                          agreement?.expiryDate ?? DateTime.now().toISO()
                        ).toJSDate()}
                        readOnly
                      />
                    </FormRow>
                    <Space h={30} />
                  </>
                </ContainerWithTitle>
                <ContainerWithTitle title="Attachments">
                  <SimpleGrid cols={5}>
                    {(attachments ?? []).map((attachment, index) => (
                      <AttachmentTile
                        title={attachment.documentName}
                        onRemove={() =>
                          setAttachments(
                            attachments.filter(
                              (file, fIndex) => fIndex !== index
                            )
                          )
                        }
                        onClick={() =>
                          setSelectedAttachment(attachment.documentUrl)
                        }
                      />
                    ))}
                  </SimpleGrid>
                </ContainerWithTitle>
              </>
            </CardSimple>
          </Grid.Col>
          <Grid.Col span="auto">
            <Container pos="fixed" w="30%">
              <CardSimple title="Messages">
                <>
                  <MessageBox messages={MESSAGES} />
                  <Box p={5}>
                    <TextInput
                      placeholder="Type your message here ..."
                      rightSection={
                        <Link to={""}>
                          <IconSend2 stroke={1} color="blue" />
                        </Link>
                      }
                    />
                  </Box>
                </>
              </CardSimple>
            </Container>
          </Grid.Col>
        </Grid>
        <Modal
          opened={!!selectedAttachment}
          onClose={() => setSelectedAttachment(null)}
          title="Preview"
          centered
        >
          <Alert
            variant="light"
            color="blue"
            title="Alert title"
            icon={<IconInfoSquareRounded stroke={1} size={16} />}
          >
            Downloading the attachment
            <iframe
              title="Preview"
              width={0}
              height={0}
              hidden
              src={selectedAttachment}
            ></iframe>
          </Alert>
        </Modal>
      </Container>
    </PageLayout>
  );
};

export default AgreementDetailsPage;
