import { AppShell, Modal, Notification } from "@mantine/core";
import { FC, useContext } from "react";
import PageMenu from "./page.menu";
import { AppContext } from "../context/app.context";
import { APP_ROUTES, DEFAULT_APP_STATE } from "../constants";
import { useNavigate } from "react-router-dom";
import { IconX } from "@tabler/icons-react";

interface PageLayoutProps {
  children: JSX.Element;
  isLoggedIn?: boolean;
  error?: GeneralAPIResponse;
  onErrorClose?: VoidFunction;
}

const PageLayout: FC<PageLayoutProps> = ({
  children,
  isLoggedIn,
  error,
  onErrorClose,
}) => {
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
      <Modal
        opened={!(error?.success ?? true)}
        onClose={onErrorClose}
        title="Error"
      >
        <Notification
          icon={<IconX size={16} />}
          color="red"
          title="Your last operation was not successful!"
          withCloseButton={false}
        >
          {error?.message}
        </Notification>
      </Modal>
    </AppShell>
  );
};

export default PageLayout;
