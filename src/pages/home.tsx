import { useContext } from "react";
import PageLayout from "../lib/components/page.layout";
import { AppContext } from "../lib/context/app.context";
import {
  Button,
  Container,
  Group,
  NavLink,
  Table,
  Tabs,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconChecks, IconLicense, IconPaperclip } from "@tabler/icons-react";
import { DateTime } from "luxon";
import { APP_ROUTES, DEFAULT_DATE_FORMAT } from "../lib/constants";
import { Link, useNavigate } from "react-router-dom";

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

const registrationElements = [
  { orgName: "ABC Corp", orgAddress: "Address 1", fullName: "Clove Clover" },
];

const HomePage = () => {
  const { colors } = useMantineTheme();
  const { appState, updateAppState } = useContext(AppContext);
  const navigate = useNavigate();

  const handleRowClick = (rowIndex: number, isAccept: boolean) => {
    console.log(rowIndex, isAccept);
  };

  const handleAgreementClick = (agreementNumber: string) => {
    updateAppState({ ...appState, agreementNumber });
    navigate(APP_ROUTES.AGREEMENT_DETAILS);
  };

  const registrationRows = registrationElements.map((element, index) => (
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

  const agreementElements = [
    {
      orgName: "ABC Corp",
      number: "ZCGS-2024-06-22-19",
      amount: 10000,
      commencementDate: DateTime.fromISO("2024-06-14T14:28:02.283Z").toFormat(
        DEFAULT_DATE_FORMAT
      ),
      expiryDate: DateTime.fromISO("2025-06-13T14:28:02.283Z").toFormat(
        DEFAULT_DATE_FORMAT
      ),
      agreementPeriod: "12 months",
    },
  ];

  const agreementRows = agreementElements.map((element, index) => (
    <Table.Tr key={element.orgName}>
      <Table.Td>{element.orgName}</Table.Td>
      <Table.Td>
        <Button
          variant="transparent"
          p={0}
          onClick={() => handleAgreementClick(element.number)}
        >
          {element.number}
        </Button>
      </Table.Td>
      <Table.Td>{element.amount}</Table.Td>
      <Table.Td>{element.commencementDate}</Table.Td>
      <Table.Td>{element.expiryDate}</Table.Td>
      <Table.Td>{element.agreementPeriod}</Table.Td>
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
              <Table.Tbody>{registrationRows}</Table.Tbody>
            </Table>
          </Tabs.Panel>
          <Tabs.Panel value={TabItems[1].title}>
            <Table striped highlightOnHover withTableBorder>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>PFI name</Table.Th>
                  <Table.Th>Agreement number</Table.Th>
                  <Table.Th>Agreement amount</Table.Th>
                  <Table.Th>Commencement date</Table.Th>
                  <Table.Th>Expiry date</Table.Th>
                  <Table.Th>Agreement period</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{agreementRows}</Table.Tbody>
            </Table>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </PageLayout>
  );
};

export default HomePage;
