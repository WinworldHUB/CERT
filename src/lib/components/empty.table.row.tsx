import { Table, Text } from "@mantine/core";
import { FC } from "react";

interface EmptyTableRowProps {
  colSpan: number;
}

const EmptyTableRow: FC<EmptyTableRowProps> = ({ colSpan }) => {
  return (
    <Table.Tr>
      <Table.Td colSpan={colSpan} ta={"center"}>
        <Text>No rows to display</Text>
      </Table.Td>
    </Table.Tr>
  );
};

export default EmptyTableRow;
