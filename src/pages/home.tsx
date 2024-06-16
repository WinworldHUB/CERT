/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";
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
import { DateTime } from "luxon";
import { APP_ROUTES, DEFAULT_DATE_FORMAT } from "../lib/constants";
import { useNavigate } from "react-router-dom";
import EmptyTableRow from "../lib/components/empty.table.row";
import useApi from "../lib/hooks/useApi";
import { API_ROUTES } from "../lib/constants/api.constants";
import { getAgreementByNumber } from "../lib/utils/common.utils";

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

const HomePage = () => {
  const { colors } = useMantineTheme();
  const { appState, updateAppState } = useContext(AppContext);
  const [registrationData, setRegistrationData] = useState<User[]>([]);
  const [agreementsData, setAgreementsData] = useState<Agreement[]>([]);
  const navigate = useNavigate();
  const { getData: getPFIsWithPrendingRequest } =
    useApi<PendingRegistrationListResponse>();
  const { getData: getAllPendingAgreements } =
    useApi<PendingAgreementResponse>();
  const [error, setError] = useState<GeneralAPIResponse>(null);

  const { putData: approveRegistrationRequest } = useApi<GeneralAPIResponse>();
  const timerHandle = useRef(null);

  const getPendingRequests = () => {
    getPFIsWithPrendingRequest(API_ROUTES.GET_PENDING_REQUESTS)
      .then((response) => {
        if (response.success) {
          console.log(response);
          setRegistrationData(response.user);
        }
        timerHandle.current = null;
      })
      .catch(setError);
  };

  const getPendingAgreements = () => {
    getAllPendingAgreements(API_ROUTES.GET_PENDING_AGREEMENTS)
      .then((response) => {
        if (response.success) {
          console.log(response);
          setAgreementsData(response.agreements);
        }
        timerHandle.current = null;
      })
      .catch(setError);
  };

  useEffect(() => {
    getPendingRequests();
    getPendingAgreements();
    // if (!timerHandle.current) {
    //   timerHandle.current = setInterval(() => {
    //     getPendingRequests();
    //     getPendingAgreements();
    //   }, 5000);
    // }
  }, []);

  const handleRowClick = (rowIndex: number, isAccept: boolean) => {
    console.log(rowIndex, isAccept);
    if (isAccept) {
      const request = {
        userId: registrationData[rowIndex].id,
        pfiId: registrationData[rowIndex].pfiId,
      } as ApproveRegistrationRequest;
      approveRegistrationRequest(API_ROUTES.APPROVE_USER, request).then(
        (response) => {
          getPendingRequests();
        }
      );
    }
  };

  const handleAgreementClick = (agreementNumber: string) => {
    const foundAgreement = getAgreementByNumber(
      agreementsData,
      agreementNumber
    );

    if (foundAgreement) {
      updateAppState({ ...appState, agreement: foundAgreement });
      navigate(APP_ROUTES.AGREEMENT_DETAILS);
    } else {
      setError({
        message: "Please refresh the page and reselect the agreement.",
        success: false,
      });
    }
  };

  const registrationRows = (registrationData ?? []).map((element, index) => (
    <Table.Tr key={element.id}>
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

  const agreementRows = (agreementsData ?? []).map((element, index) => (
    <Table.Tr key={element.orgName}>
      <Table.Td>{element.orgName}</Table.Td>
      <Table.Td>
        <Button
          variant="transparent"
          p={0}
          onClick={() => handleAgreementClick(element.agreementNumber)}
        >
          {element.agreementNumber}
        </Button>
      </Table.Td>
      <Table.Td>{element.agreementAmount}</Table.Td>
      <Table.Td>
        {DateTime.fromISO(element.commencementDate).toFormat(
          DEFAULT_DATE_FORMAT
        )}
      </Table.Td>
      <Table.Td>
        {DateTime.fromISO(element.expiryDate).toFormat(DEFAULT_DATE_FORMAT)}
      </Table.Td>
      <Table.Td>1 year</Table.Td>
    </Table.Tr>
  ));

  return (
    <PageLayout
      isLoggedIn={appState.isUserLoggedIn}
      error={error}
      onErrorClose={() => setError(null)}
    >
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
              <Table.Tbody>
                {registrationData?.length > 0 ? (
                  registrationRows
                ) : (
                  <EmptyTableRow colSpan={4} />
                )}
              </Table.Tbody>
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
              <Table.Tbody>
                {agreementsData?.length > 0 ? (
                  agreementRows
                ) : (
                  <EmptyTableRow colSpan={6} />
                )}
              </Table.Tbody>
            </Table>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </PageLayout>
  );
};

export default HomePage;
