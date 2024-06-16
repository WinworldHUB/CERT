import { FileButton, Flex, Space, Text } from "@mantine/core";
import { IconSquareRoundedPlus } from "@tabler/icons-react";
import { FC } from "react";

interface AddAttachmentTileProps {
  title: string;
  onChange: (payload: File) => void;
}

const AddAttachmentTile: FC<AddAttachmentTileProps> = ({ title, onChange }) => {
  return (
    <FileButton onChange={onChange} accept=".pdf">
      {(props) => (
        <Flex align="center" direction={"column"} {...props}>
          <IconSquareRoundedPlus color="blue" size={64} stroke={1} />
          <Space h={20} />
          <Text truncate fz={"xs"}>
            {title}
          </Text>
        </Flex>
      )}
    </FileButton>
  );
};

export default AddAttachmentTile;
