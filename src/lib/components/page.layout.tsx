import { AppShell } from "@mantine/core";
import { FC, useContext } from "react";
import PageMenu from "./page.menu";
import { AppContext } from "../context/app.context";
import { APP_ROUTES, DEFAULT_APP_STATE } from "../constants";
import { useNavigate } from "react-router-dom";

interface PageLayoutProps {
  children: JSX.Element;
  isLoggedIn?: boolean;
}

const PageLayout: FC<PageLayoutProps> = ({ children, isLoggedIn }) => {
  const { appState, updateAppState } = useContext(AppContext);
  const navigate = useNavigate();

  const handleMenuClick = (menuIndex: number) => {
    if (menuIndex === 1) {
      updateAppState(DEFAULT_APP_STATE);
      navigate(APP_ROUTES.HOME);
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
