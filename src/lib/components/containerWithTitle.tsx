import { Container, Fieldset } from "@mantine/core";
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
    <Container py={20} fluid>
      <Fieldset legend={title}>{children}</Fieldset>
    </Container>
  );
};

export default ContainerWithTitle;
