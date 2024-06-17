import { Box, Title } from "@mantine/core";
import PageLayout from "../lib/components/page.layout";
import { useContext } from "react";
import { AppContext } from "../lib/context/app.context";

const HelpPage = () => {
  const { appState } = useContext(AppContext);
  return (
    <PageLayout isLoggedIn={appState?.isUserLoggedIn}>
      <Box bg={"palePurple"} py={60} px={20}>
        <Title c={"orange"}>Help Center</Title>
      </Box>
    </PageLayout>
  );
};

export default HelpPage;
