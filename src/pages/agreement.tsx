import {
  Container,
  Grid,
  Group,
  Image,
  SimpleGrid,
  Space,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useContext } from "react";
import { AppContext } from "../lib/context/app.context";
import PageLayout from "../lib/components/page.layout";
import CardSimple from "../lib/components/card.simple";
import FormRow from "../lib/components/form.row";
import ContainerWithTitle from "../lib/components/containerWithTitle";
import AttachmentTile from "../lib/components/tile.attachment";

const AgreementDetailsPage = () => {
  //const { colors } = useMantineTheme();
  const { appState } = useContext(AppContext);

  return (
    <PageLayout isLoggedIn={appState.isUserLoggedIn}>
      <Container fluid>
        <Grid align="start" columns={10}>
          <Grid.Col span={7}>
            <CardSimple title={`Agreement #:${appState.agreementNumber}`}>
              <>
                <ContainerWithTitle title="Organization details">
                  <>
                    <FormRow title="Name">
                      <TextInput
                        placeholder="Organization name"
                        value={"ABC Corp"}
                        readOnly
                      />
                    </FormRow>
                    <Space h={30} />
                    <FormRow title="Address">
                      <TextInput
                        placeholder="Organization address"
                        value={"ABC Corp"}
                        readOnly
                      />
                    </FormRow>
                    <Space h={30} />
                  </>
                </ContainerWithTitle>
                <ContainerWithTitle title="Primary contact details">
                  <>
                    <FormRow title="Name">
                      <TextInput
                        placeholder="Full name"
                        value={"ABC Corp"}
                        readOnly
                      />
                    </FormRow>
                    <Space h={30} />
                    <FormRow title="Email">
                      <TextInput
                        placeholder="Email address"
                        value={"ABC Corp"}
                        readOnly
                      />
                    </FormRow>
                    <Space h={30} />
                    <FormRow title="Phone">
                      <TextInput
                        placeholder="Phone number"
                        value={"ABC Corp"}
                        readOnly
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
          </Grid.Col>
          <Grid.Col span="auto">
            <Container pos="fixed" w="30%">
              <CardSimple title="Messages">
                <Text>{appState.agreementNumber}</Text>
              </CardSimple>
            </Container>
          </Grid.Col>
        </Grid>
      </Container>
    </PageLayout>
  );
};

export default AgreementDetailsPage;
