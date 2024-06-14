import { Container, useMantineTheme } from "@mantine/core";
import { useContext } from "react";
import { AppContext } from "../lib/context/app.context";
import PageLayout from "../lib/components/page.layout";

const AgreementDetailsPage = () => {
  const { colors } = useMantineTheme();
  const { appState } = useContext(AppContext);

  return (
    <PageLayout isLoggedIn={appState.isUserLoggedIn}>
      <Container fluid>
        <h1>{appState.agreementNumber}</h1>
      </Container>
    </PageLayout>
  );
};

export default AgreementDetailsPage;
