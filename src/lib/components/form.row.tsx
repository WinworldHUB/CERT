import { Grid, Text } from "@mantine/core";
import { FC } from "react";

interface FormRowProps {
  title: string;
  children: React.ReactElement;
  isRequired?: boolean;
}

const FormRow: FC<FormRowProps> = ({ title, children, isRequired = false }) => {
  return (
    <Grid columns={10} align="center">
      <Grid.Col span={"auto"}>
        <Text fw={600}>
          {title}
          {isRequired && <sup className="text-danger">&nbsp;*</sup>}
        </Text>
      </Grid.Col>
      <Grid.Col span={8}>{children}</Grid.Col>
    </Grid>
  );
};

export default FormRow;
