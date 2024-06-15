import { Box, Container, Grid, Group, Text } from "@mantine/core";
import { useContext } from "react";
import { AppContext } from "../lib/context/app.context";
import PageLayout from "../lib/components/page.layout";
import CardSimple from "../lib/components/card.simple";

const AgreementDetailsPage = () => {
  //const { colors } = useMantineTheme();
  const { appState } = useContext(AppContext);

  return (
    <PageLayout isLoggedIn={appState.isUserLoggedIn}>
      <Container fluid>
        <Grid align="start" columns={10}>
          <Grid.Col span={7}>
            <CardSimple title={`Agreement #:${appState.agreementNumber}`}>
              <h1>{appState.agreementNumber}</h1>
            </CardSimple>
          </Grid.Col>
          <Grid.Col span="auto">
            <CardSimple title="Messages">
              <Text>{appState.agreementNumber}</Text>
            </CardSimple>
          </Grid.Col>
        </Grid>
      </Container>
    </PageLayout>
  );
};

export default AgreementDetailsPage;
