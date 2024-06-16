import { Flex, Indicator, Space, Text } from "@mantine/core";
import { IconFileText, IconX } from "@tabler/icons-react";
import { FC } from "react";

interface AttachmentTileProps {
  title: string;
  onRemove?: VoidFunction;
  onClick?: VoidFunction;
}

const AttachmentTile: FC<AttachmentTileProps> = ({
  title,
  onRemove,
  onClick,
}) => {
  return (
    <Flex justify={"center"} align={"center"} direction={"column"}>
      <Indicator
        label={
          onRemove && (
            <IconX
              size={12}
              stroke={5}
              color="red"
              onClick={onRemove}
              cursor={"pointer"}
            />
          )
        }
        color="transparent"
      >
        <IconFileText size={64} stroke={1} onClick={onClick} />
      </Indicator>
      <Space h={10} onClick={onClick} />
      <Text truncate fz={"xs"} w={120} onClick={onClick}>
        {title}
      </Text>
    </Flex>
  );
};

export default AttachmentTile;
