import { useContext } from "react";
import PageLayout from "../lib/components/page.layout";
import { AppContext } from "../lib/context/app.context";
import { Button, Container, Table } from "@mantine/core";
import { APP_ROUTES } from "../lib/constants";
import { useNavigate } from "react-router-dom";
import CardSimple from "../lib/components/card.simple";
import EmptyTableRow from "../lib/components/empty.table.row";

const UserHomePage = () => {
  const { appState, updateAppState } = useContext(AppContext);
  const navigate = useNavigate();

  const handleAgreementClick = (agreementNumber: string) => {
    updateAppState({ ...appState, agreementNumber });
    navigate(APP_ROUTES.AGREEMENT_DETAILS);
  };

  const agreementElements = [
    // {
    //   orgName: "ABC Corp",
    //   number: "ZCGS-2024-06-22-19",
    //   amount: 10000,
    //   commencementDate: DateTime.fromISO("2024-06-14T14:28:02.283Z").toFormat(
    //     DEFAULT_DATE_FORMAT
    //   ),
    //   expiryDate: DateTime.fromISO("2025-06-13T14:28:02.283Z").toFormat(
    //     DEFAULT_DATE_FORMAT
    //   ),
    //   agreementPeriod: "12 months",
    // },
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
      <CardSimple
        title="Agreement Requests"
        buttonTitle="Create Agreement"
        onButtonClick={() => navigate(APP_ROUTES.CREATE_AGREEMENT)}
      >
        <Container py={20} fluid>
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
            <Table.Tbody>
              {agreementElements.length > 0 ? (
                agreementRows
              ) : (
                <EmptyTableRow colSpan={6} />
              )}
            </Table.Tbody>
          </Table>
        </Container>
      </CardSimple>
    </PageLayout>
  );
};

export default UserHomePage;
