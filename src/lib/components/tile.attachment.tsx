import { Group, Text } from "@mantine/core";
import { IconFileText } from "@tabler/icons-react";
import { FC } from "react";

interface AttachmentTileProps {
  title: string;
}

const AttachmentTile: FC<AttachmentTileProps> = ({ title }) => {
  return (
    <Group justify="center">
      <IconFileText color="blue" size={64} />
      <Text truncate fz={"xs"}>
        {title}
      </Text>
    </Group>
  );
};

export default AttachmentTile;
