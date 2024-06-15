import { Group, Image, Text } from "@mantine/core";
import { FC } from "react";

interface AttachmentTileProps {
  title: string;
}

const AttachmentTile: FC<AttachmentTileProps> = ({ title }) => {
  return (
    <Group justify="center">
      <Image
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
        height={160}
        //w={160}
        alt={title}
        title={title}
      />
      <Text truncate>{title}</Text>
    </Group>
  );
};

export default AttachmentTile;
