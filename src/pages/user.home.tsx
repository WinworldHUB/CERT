import { useContext } from "react";
import PageLayout from "../lib/components/page.layout";
import { AppContext } from "../lib/context/app.context";

const UserHomePage = () => {
  const { appState } = useContext(AppContext);

  return (
    <PageLayout isLoggedIn={appState.isUserLoggedIn}>
      <h1>Demo</h1>
    </PageLayout>
  );
};

export default UserHomePage;
