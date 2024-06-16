export const getAgreementByNumber = (
  agreements: Agreement[],
  agreementNumber: string
): Agreement | null =>
  agreements.filter(
    (agreement) => agreement.agreementNumber === agreementNumber
  )?.[0];
