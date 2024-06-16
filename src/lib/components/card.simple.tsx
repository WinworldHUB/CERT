import { Button, Card, Group, Text, useMantineTheme } from "@mantine/core";
import { FC } from "react";

interface CardSimpleProps {
  title: string;
  buttonTitle?: string;
  children: JSX.Element;
}

const CardSimple: FC<CardSimpleProps> = ({ title, children, buttonTitle }) => {
  const { colors } = useMantineTheme();
  return (
    <Card withBorder shadow="sm" radius="md">
      <Card.Section withBorder inheritPadding py="xs" bg={colors.gray[1]}>
        <Group justify="space-between">
          <Text fw={600}>{title}</Text>
          {buttonTitle && <Button bg={"palePurple"}>{buttonTitle}</Button>}
        </Group>
      </Card.Section>

      <Card.Section inheritPadding>{children}</Card.Section>
    </Card>
  );
};

export default CardSimple;
