import {
  Box,
  Button,
  Card,
  Group,
  LoadingOverlay,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { FC } from "react";

interface CardSimpleProps {
  title: string;
  buttonTitle?: string;
  children: JSX.Element;
  onButtonClick?: VoidFunction;
  isLoading?: boolean;
}

const CardSimple: FC<CardSimpleProps> = ({
  title,
  children,
  buttonTitle,
  onButtonClick,
  isLoading = false,
}) => {
  const { colors } = useMantineTheme();
  return (
    <Card withBorder shadow="sm" radius="md">
      <Box pos="relative">
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Card.Section withBorder inheritPadding py="xs" bg={colors.gray[1]}>
          <Group justify="space-between">
            <Text fw={600}>{title}</Text>
            {buttonTitle && (
              <Button bg={"palePurple"} onClick={onButtonClick}>
                {buttonTitle}
              </Button>
            )}
          </Group>
        </Card.Section>

        <Card.Section p={0}>{children}</Card.Section>
      </Box>
    </Card>
  );
};

export default CardSimple;
