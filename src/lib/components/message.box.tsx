import { Alert, Flex, ScrollArea } from "@mantine/core";
import { FC } from "react";

interface MessageBoxProps {
  messages: Message[];
}

const MessageBox: FC<MessageBoxProps> = ({ messages }) => {
  return (
    <ScrollArea h={"75vh"} p={10}>
      {(messages ?? []).map((item) =>
        item.from === "Amit" ? (
          <Flex justify={"start"} py={5}>
            <Alert variant="light" color="gray" title={item.from} w={"70%"}>
              {item.message}
            </Alert>
          </Flex>
        ) : (
          <Flex justify={"end"} py={5}>
            <Alert variant="light" color="blue" title={item.from} w={"70%"}>
              {item.message}
            </Alert>
          </Flex>
        )
      )}
    </ScrollArea>
  );
};

export default MessageBox;
