/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";
import PageLayout from "../lib/components/page.layout";
import { AppContext } from "../lib/context/app.context";
import { Button, Container, Table } from "@mantine/core";
import { APP_ROUTES, DEFAULT_DATE_FORMAT } from "../lib/constants";
import { useNavigate } from "react-router-dom";
import CardSimple from "../lib/components/card.simple";
import EmptyTableRow from "../lib/components/empty.table.row";
import useApi from "../lib/hooks/useApi";
import { API_ROUTES } from "../lib/constants/api.constants";
import { getAgreementByNumber } from "../lib/utils/common.utils";
import { DateTime } from "luxon";

const UserHomePage = () => {
  const { appState, updateAppState } = useContext(AppContext);
  const navigate = useNavigate();
  const { getData: getActiveAgreement } = useApi<ActiveAgreementResponse>();
  const [agreements, setAgreements] = useState<Agreement[]>([]);
  const timerHandle = useRef(null);
  const [error, setError] = useState<GeneralAPIResponse>(null);

  const handleAgreementClick = (agreementNumber: string) => {
    const foundAgreement = getAgreementByNumber(agreements, agreementNumber);

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

  const getAgreements = () => {
    getActiveAgreement(`${API_ROUTES.GET_AGREEMENTS_BY_PFI}/${appState?.pfiId}`)
      .then((response) => {
        if (response.success) {
          console.log(response);
          setAgreements([response.agreement]);
        }
        timerHandle.current = null;
      })
      .catch(setError);
  };

  useEffect(() => {
    getAgreements();
    // if (!timerHandle.current) {
    //   timerHandle.current = setInterval(() => {
    //     getAgreements();
    //   }, 5000);
    // }
  }, []);

  const agreementRows = (agreements ?? []).map((element, index) => (
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
      <Table.Td>{element.period}</Table.Td>
    </Table.Tr>
  ));

  return (
    <PageLayout
      isLoggedIn={appState.isUserLoggedIn}
      error={error}
      onErrorClose={() => setError(null)}
    >
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
              {(agreements ?? []).length > 0 ? (
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
