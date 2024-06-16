import { Container, SimpleGrid, Space, TextInput } from "@mantine/core";
import { useContext } from "react";
import { AppContext } from "../lib/context/app.context";
import PageLayout from "../lib/components/page.layout";
import CardSimple from "../lib/components/card.simple";
import FormRow from "../lib/components/form.row";
import ContainerWithTitle from "../lib/components/containerWithTitle";
import AttachmentTile from "../lib/components/tile.attachment";
import { useForm } from "@mantine/form";

const AgreementRequestPage = () => {
  const { appState } = useContext(AppContext);

  const agreementForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      orgName: "",
      orgAddress: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
    },

    validate: {
      contactEmail: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
    },
  });

  return (
    <PageLayout isLoggedIn={appState.isUserLoggedIn}>
      <Container fluid>
        <CardSimple title={`Agreement #:${appState.agreementNumber}`}>
          <>
            <ContainerWithTitle title="Organization details">
              <>
                <FormRow title="Name" isRequired>
                  <TextInput
                    placeholder="Organization name"
                    key={agreementForm.key("orgName")}
                    {...agreementForm.getInputProps("orgName")}
                  />
                </FormRow>
                <Space h={30} />
                <FormRow title="Address" isRequired>
                  <TextInput
                    placeholder="Organization address"
                    value={"ABC Corp"}
                  />
                </FormRow>
                <Space h={30} />
              </>
            </ContainerWithTitle>
            <ContainerWithTitle title="Primary contact details">
              <>
                <FormRow title="Name" isRequired>
                  <TextInput placeholder="Full name" value={"ABC Corp"} />
                </FormRow>
                <Space h={30} />
                <FormRow title="Email" isRequired>
                  <TextInput placeholder="Email address" value={"ABC Corp"} />
                </FormRow>
                <Space h={30} />
                <FormRow title="Phone" isRequired>
                  <TextInput placeholder="Phone number" value={"ABC Corp"} />
                </FormRow>
                <Space h={30} />
              </>
            </ContainerWithTitle>
            <ContainerWithTitle title="Attachments">
              <SimpleGrid cols={5}>
                <AttachmentTile title="Agreement_2024-12-05.pdf" />
              </SimpleGrid>
            </ContainerWithTitle>
          </>
        </CardSimple>
      </Container>
    </PageLayout>
  );
};

export default AgreementRequestPage;
