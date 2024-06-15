import { Container, Fieldset, Space, TextInput } from "@mantine/core";
import FormRow from "./form.row";
import { FC } from "react";

interface ContainerWithTitleProps {
  title?: string;
  children: React.ReactElement;
}

const ContainerWithTitle: FC<ContainerWithTitleProps> = ({
  title,
  children,
}) => {
  return (
    <Container py={20}>
      <Fieldset legend={title}>{children}</Fieldset>
    </Container>
  );
};

export default ContainerWithTitle;
