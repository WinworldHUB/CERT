import { useContext } from "react";
import PageLayout from "../lib/components/page.layout";
import { AppContext } from "../lib/context/app.context";
import {
  Button,
  Container,
  Group,
  Table,
  Tabs,
  useMantineTheme,
} from "@mantine/core";
import { IconChecks, IconLicense } from "@tabler/icons-react";

const TabItems: MenuItem[] = [
  {
    title: "Registration requests",
    icon: <IconChecks />,
  },
  {
    title: "Agreements",
    icon: <IconLicense />,
  },
];

const elements = [
  { orgName: "ABC Corp", orgAddress: "Address 1", fullName: "Clove Clover" },
];

const HomePage = () => {
  const { colors } = useMantineTheme();
  const { appState } = useContext(AppContext);

  const handleRowClick = (rowIndex: number, isAccept: boolean) => {
    console.log(rowIndex, isAccept);
  };

  const rows = elements.map((element, index) => (
    <Table.Tr key={element.orgName}>
      <Table.Td>{element.orgName}</Table.Td>
      <Table.Td>{element.orgAddress}</Table.Td>
      <Table.Td>{element.fullName}</Table.Td>
      <Table.Td width={300}>
        <Group justify="center">
          <Button
            color={colors.green[7]}
            onClick={() => handleRowClick(index, true)}
          >
            Accept
          </Button>
          <Button
            color={colors.red[4]}
            variant="outline"
            onClick={() => handleRowClick(index, false)}
          >
            Reject
          </Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <PageLayout isLoggedIn={appState.isUserLoggedIn}>
      <Container fluid>
        <Tabs defaultValue={TabItems[0].title}>
          <Tabs.List>
            {TabItems.map((tab, index) => (
              <Tabs.Tab
                key={tab.title}
                value={tab.title}
                leftSection={tab.icon}
              >
                {tab.title}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          <Tabs.Panel value={TabItems[0].title}>
            <Table striped highlightOnHover withTableBorder>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>PFI Name</Table.Th>
                  <Table.Th>PFI Address</Table.Th>
                  <Table.Th>Primary Contact</Table.Th>
                  <Table.Th ta="center">Approve Request</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Tabs.Panel>
          <Tabs.Panel value={TabItems[1].title}>
            Agreements tab content
          </Tabs.Panel>
        </Tabs>
      </Container>
    </PageLayout>
  );
};

export default HomePage;
