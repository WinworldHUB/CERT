import { BrowserRouter, Routes, Route } from "react-router-dom";
import { APP_ROUTES } from "./lib/constants";
import HomePage from "./pages/home";
import { useContext } from "react";
import { AppContext } from "./lib/context/app.context";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import UserHomePage from "./pages/user.home";
import AgreementDetailsPage from "./pages/agreement";
const App = () => {
  const { appState } = useContext(AppContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={APP_ROUTES.SIGN_IN} element={<LoginPage />} />
        <Route path={APP_ROUTES.SIGN_UP} element={<RegisterPage />} />
        <Route
          path={APP_ROUTES.USER_HOME}
          element={appState.isUserLoggedIn ? <UserHomePage /> : <LoginPage />}
        />
        <Route
          path={APP_ROUTES.HOME}
          element={appState.isUserLoggedIn ? <HomePage /> : <LoginPage />}
        />
        <Route
          path={APP_ROUTES.AGREEMENT_DETAILS}
          element={
            !appState.isUserLoggedIn ? <AgreementDetailsPage /> : <LoginPage />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
