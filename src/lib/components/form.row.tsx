import { Grid, Text } from "@mantine/core";
import { FC } from "react";

interface FormRowProps {
  title: string;
  children: React.ReactElement;
}

const FormRow: FC<FormRowProps> = ({ title, children }) => {
  return (
    <Grid columns={10} align="center">
      <Grid.Col span={"auto"}>
        <Text fw={600}>{title}</Text>
      </Grid.Col>
      <Grid.Col span={8}>{children}</Grid.Col>
    </Grid>
  );
};

export default FormRow;
