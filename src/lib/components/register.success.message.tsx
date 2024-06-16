import { Button, Center, Flex, Space, Text, Title } from "@mantine/core";
import { IconInfoSquareRounded } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const RegisterSuccessMessage = () => {
  const navigate = useNavigate();
  return (
    <Flex p={20} direction={"column"} align={"center"}>
      <Center>
        <IconInfoSquareRounded size={64} color="green" />
      </Center>
      <Title>Successfully Registered</Title>
      <Space h={40} />
      <Text>
        Thank you, for registering with us. Please follow the instructions
        provided in your email for further actions.
      </Text>
      <Space h={20} />
      <Text>
        In case of any queries or concerns please reach out to us on our
        official handle <a href="mailto:info@zcgs.co.zm">info@zcgs.co.zm</a>
      </Text>
      <Space h={40} />
      <Button onClick={() => navigate("/")}>Login</Button>
    </Flex>
  );
};

export default RegisterSuccessMessage;
