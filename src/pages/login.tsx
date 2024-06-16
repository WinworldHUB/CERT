import {
  Button,
  Container,
  Flex,
  PasswordInput,
  Space,
  Text,
  TextInput,
} from "@mantine/core";
import PageLayout from "../lib/components/page.layout";
import CardSimple from "../lib/components/card.simple";
import { useForm } from "@mantine/form";
import useApi from "../lib/hooks/useApi";
import { useContext, useEffect, useState } from "react";
import { API_ROUTES } from "../lib/constants/api.constants";
import { AppContext } from "../lib/context/app.context";
import { Link, useNavigate } from "react-router-dom";
import { APP_ROUTES, USER_ROLES } from "../lib/constants";

const LoginPage = () => {
  const { data: loginResponse, postData } = useApi<LoginResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { appState, updateAppState } = useContext(AppContext);
  const [loginError, setLoginError] = useState<string>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (appState.isUserLoggedIn) {
      if (appState.role === USER_ROLES.ADMIN.toString()) {
        navigate(APP_ROUTES.ADMIN_HOME);
      } else {
        navigate(APP_ROUTES.USER_HOME);
      }
    }
  }, [appState, navigate]);

  const loginForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleLogin = (request: LoginRequest) => {
    setIsLoading(true);
    postData(API_ROUTES.LOGIN, request)
      .then((response) => {
        console.log(response);
        if (response.success) {
          updateAppState({
            ...appState,
            accessToken: response.session_jwt,
            isUserLoggedIn: true,
            username: request.email,
            fullName: response.fullName,
            role: response.userRole,
          });
          setLoginError(null);

          if (response.userRole === USER_ROLES.ADMIN.toString()) {
            navigate(APP_ROUTES.ADMIN_HOME);
          } else {
            navigate(APP_ROUTES.USER_HOME);
          }
        } else {
          setLoginError(
            `${response.message} - ${
              loginResponse?.error?.["error_message"] ?? ""
            }`
          );
        }
        setIsLoading(false);
      })
      .catch((error) => setLoginError(error));
  };

  return (
    <PageLayout isLoggedIn={appState.isUserLoggedIn}>
      <Container size={"xs"}>
        <CardSimple title="Sign in">
          <Container py={30}>
            <form onSubmit={loginForm.onSubmit(handleLogin)}>
              <TextInput
                label="Email / Username"
                placeholder="Email / Username"
                key={loginForm.key("email")}
                withAsterisk
                {...loginForm.getInputProps("email")}
              />
              <Space h={30} />
              <PasswordInput
                label="Password"
                placeholder="password"
                key={loginForm.key("password")}
                withAsterisk
                {...loginForm.getInputProps("password")}
              />
              <Space h={30} />
              <Flex justify="space-between" align="center">
                <Text>
                  Not yet registered?{" "}
                  <Link to={APP_ROUTES.SIGN_UP}>Register now</Link>
                </Text>

                <Button type="submit" loading={isLoading}>
                  Login
                </Button>
              </Flex>
              {loginError && (
                <Flex direction={"column"}>
                  <Space h={30} />
                  <Text c={"red"}>{loginError}</Text>
                </Flex>
              )}
            </form>
          </Container>
        </CardSimple>
      </Container>
    </PageLayout>
  );
};

export default LoginPage;
