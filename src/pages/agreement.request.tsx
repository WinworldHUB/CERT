import { Container, SimpleGrid, Space, TextInput } from "@mantine/core";
import { useContext } from "react";
import { AppContext } from "../lib/context/app.context";
import PageLayout from "../lib/components/page.layout";
import CardSimple from "../lib/components/card.simple";
import FormRow from "../lib/components/form.row";
import ContainerWithTitle from "../lib/components/containerWithTitle";
import AttachmentTile from "../lib/components/tile.attachment";
import { Form, useForm } from "@mantine/form";

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
      orgName: (value) =>
        /^([A-ZÁÉÍÓÚÑa-z\s&.'-]{2,})(( Inc| Ltd| LLC| plc| Pty| Corp| plc)?(\.|, )?)*$/.test(
          value
        )
          ? null
          : "Invalid organization name",
      orgAddress: (value) => (value ? null : "Invalid organization address"),
      contactName: (value) =>
        /^[A-Za-z\p{L} .'-]+$/.test(value) ? null : "Invalid name",
      contactEmail: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
      contactPhone: (value) =>
        /^(\+260|0)?(?:9[567]|7[567])\d{7}$/.test(value)
          ? null
          : "Invalid phone number",
    },
  });

  const handleSubmission = () => {
    agreementForm.validate();
  };

  return (
    <PageLayout isLoggedIn={appState.isUserLoggedIn}>
      <Container fluid>
        <CardSimple
          title={`Agreement #:${appState.agreementNumber}`}
          buttonTitle="Save"
          onButtonClick={handleSubmission}
        >
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
                    key={agreementForm.key("orgAddress")}
                    {...agreementForm.getInputProps("orgAddress")}
                  />
                </FormRow>
                <Space h={30} />
              </>
            </ContainerWithTitle>
            <ContainerWithTitle title="Primary contact details">
              <>
                <FormRow title="Name" isRequired>
                  <TextInput
                    placeholder="Full name"
                    key={agreementForm.key("contactName")}
                    {...agreementForm.getInputProps("contactName")}
                  />
                </FormRow>
                <Space h={30} />
                <FormRow title="Email" isRequired>
                  <TextInput
                    placeholder="Email address"
                    key={agreementForm.key("contactEmail")}
                    {...agreementForm.getInputProps("contactEmail")}
                  />
                </FormRow>
                <Space h={30} />
                <FormRow title="Phone" isRequired>
                  <TextInput
                    placeholder="Phone number"
                    key={agreementForm.key("contactPhone")}
                    {...agreementForm.getInputProps("contactPhone")}
                  />
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
