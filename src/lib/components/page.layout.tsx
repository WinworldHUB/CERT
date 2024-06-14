import { AppShell } from "@mantine/core";
import { FC, useContext } from "react";
import PageMenu from "./page.menu";
import { AppContext } from "../context/app.context";
import { DEFAULT_APP_STATE } from "../constants";

interface PageLayoutProps {
  children: JSX.Element;
  isLoggedIn?: boolean;
}

const PageLayout: FC<PageLayoutProps> = ({ children, isLoggedIn }) => {
  const { appState, updateAppState } = useContext(AppContext);

  const handleMenuClick = (menuIndex: number) => {
    if (menuIndex === 1) {
      updateAppState(DEFAULT_APP_STATE);
    } else {
      updateAppState({ ...appState, selectedMenuIndex: menuIndex });
    }
  };

  return (
    <AppShell padding={"md"}>
      <PageMenu
        isLoggedIn={isLoggedIn ?? false}
        onMenuClicked={handleMenuClick}
        selectedMenuIndex={appState.selectedMenuIndex}
      />
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default PageLayout;
