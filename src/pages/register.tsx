import {
  Button,
  Container,
  Flex,
  Group,
  PasswordInput,
  Space,
  Text,
  TextInput,
  Fieldset,
  useMantineTheme,
} from "@mantine/core";
import PageLayout from "../lib/components/page.layout";
import CardSimple from "../lib/components/card.simple";
import { useForm } from "@mantine/form";
import useApi from "../lib/hooks/useApi";
import { useContext, useState } from "react";
import { API_ROUTES } from "../lib/constants/api.constants";
import { AppContext } from "../lib/context/app.context";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "../lib/constants";

const RegisterPage = () => {
  const { data: loginResponse, postData } = useApi<LoginResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { appState, updateAppState } = useContext(AppContext);
  const { colors } = useMantineTheme();

  const signUpForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      orgName: "",
      orgAddress: "",
      phone: "",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      orgName: (value) =>
        /^([A-ZÁÉÍÓÚÑa-z\s&.'-]{2,})(( Inc| Ltd| LLC| plc| Pty| Corp| plc)?(\.|, )?)*$/.test(
          value
        )
          ? null
          : "Invalid organization name",
      orgAddress: (value) => (value ? null : "Invalid organization address"),
      fullName: (value) =>
        /^[A-Za-z\p{L} .'-]+$/.test(value) ? null : "Invalid name",
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phone: (value) =>
        /^(\+260|0)?(?:9[567]|7[567])\d{7}$/.test(value)
          ? null
          : "Invalid email",
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])[^\s].{10,}$/.test(
          value
        )
          ? null
          : "Weak password",
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  const handleLogin = (request: LoginRequest) => {
    setIsLoading(true);
    postData(API_ROUTES.LOGIN, request).then((response) => {
      console.log(response);
      if (response.success) {
        updateAppState({
          ...appState,
          accessToken: response.session_jwt,
          isUserLoggedIn: true,
          username: request.email,
        });
      }
      setIsLoading(false);
    });
  };

  return (
    <PageLayout isLoggedIn={appState.isUserLoggedIn}>
      <Container size={"xs"}>
        <CardSimple title="Sign up">
          <Container py={30}>
            <form onSubmit={signUpForm.onSubmit(handleLogin)}>
              <TextInput
                label="Organization name"
                placeholder="organization name"
                key={signUpForm.key("orgName")}
                withAsterisk
                {...signUpForm.getInputProps("orgName")}
              />
              <Space h={30} />
              <TextInput
                label="Organization address"
                placeholder="organization address"
                key={signUpForm.key("orgAddress")}
                withAsterisk
                {...signUpForm.getInputProps("orgAddress")}
              />
              <Space h={30} />
              <Fieldset legend="User details" bg={colors.light[0]}>
                <TextInput
                  label="Full Name"
                  placeholder="full name"
                  key={signUpForm.key("fullName")}
                  withAsterisk
                  {...signUpForm.getInputProps("fullName")}
                />
                <Space h={30} />
                <TextInput
                  label="Email"
                  placeholder="Email"
                  key={signUpForm.key("email")}
                  withAsterisk
                  {...signUpForm.getInputProps("email")}
                />
                <Space h={30} />
                <TextInput
                  label="Phone number"
                  placeholder="Phone number"
                  key={signUpForm.key("phone")}
                  withAsterisk
                  {...signUpForm.getInputProps("phone")}
                />
                <Space h={30} />
                <PasswordInput
                  label="Password"
                  placeholder="password"
                  key={signUpForm.key("password")}
                  withAsterisk
                  {...signUpForm.getInputProps("password")}
                />
                <Space h={30} />
                <PasswordInput
                  label="Confirm password"
                  placeholder="confirm password"
                  key={signUpForm.key("confirmPassword")}
                  withAsterisk
                  {...signUpForm.getInputProps("confirmPassword")}
                />
              </Fieldset>
              <Space h={30} />
              <Flex justify="space-between" align="center">
                <Text>
                  Already registered?{" "}
                  <Link to={APP_ROUTES.SIGN_IN}>Login now</Link>
                </Text>

                <Button type="submit" loading={isLoading}>
                  Register
                </Button>
              </Flex>
              {loginResponse?.error && (
                <Group>
                  <Space h={30} />
                  <Text c={"red"}>
                    {loginResponse?.error?.["error_message"]}
                  </Text>
                </Group>
              )}
            </form>
          </Container>
        </CardSimple>
      </Container>
    </PageLayout>
  );
};

export default RegisterPage;
