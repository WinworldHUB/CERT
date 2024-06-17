interface AppState {
  appState: AppVars;

  updateAppState: (appState: AppVars) => void;
}

interface ContextProviderProps {
  children: React.ReactNode;
}

type MenuItem = {
  title: string;
  icon: React.ReactElement;
  to?: string;
};

type GeneralAPIResponse = {
  success: boolean;
  message: string;
};

type LoginResponse = GeneralAPIResponse & {
  pfiId: number;
  fullName: string;
  session_duration: string;
  session_token: string;
  session_jwt: string;
  error: unknown;
  userRole: string;
  orgAddress: string;
  orgName: string;
};

type LoginRequest = {
  email: string;
  password: string;
};

type RegisterRequest = {
  orgName: string;
  userFullName: string;
  parent_id?: number;
  role?: string;
  isPrimary?: boolean;
  email: string;
  phone: string;
  address: string;
  password: string;
};

type RegisterResponse = GeneralAPIResponse & {
  fullName: string;
  pfiId: number;
  session_duration: string;
  session_token: string;
  session_jwt: string;
  error: unknown;
};

type User = {
  id: number;
  fullName: string;
  email: string;
  pfiId: number;
  orgAddress: string;
  orgName: string;
};

type PendingRegistrationListResponse = {
  success: boolean;
  user: User[];
};

interface ApproveRegistrationRequest {
  userId: number;
  pfiId: number;
}

type Attachment = {
  documentId: number;
  documentName: string;
  documentUrl: string;
};

type Agreement = {
  agreementId: number;
  agreementNumber: string;
  pfiId: number;
  orgName: string;
  orgAddress: string;
  agreementAmount: string;
  commencementDate: string;
  expiryDate: string;
  period: string;
  status: string;
};

interface CreateAgreementRequest {
  pfiId: number;
  agreementAmount: number;
  commencementDate: string;
  expiryDate: string;
  agreementPeriod: string;
}

type PendingAgreementResponse = GeneralAPIResponse & {
  agreements: Agreement[];
};

type ActiveAgreementResponse = GeneralAPIResponse & {
  agreement: Agreement;
  documents: Attachment[];
};

type AllAgreementResponse = GeneralAPIResponse & {
  agreements: Agreement[];
};

type PFI = {
  pfiId: pfi.id;
  pfiName: pfi.name;
  pfiAddress: pfi.address;
  isActive: pfi.isActive;
};

type AllPFIResponse = GeneralAPIResponse & {
  pfis: PFI[];
};

type Message = {
  message: string;
  from: string;
  to: number;
};

type AppVars = {
  accessToken?: string;
  agreement: Agreement;
  fullName: string;
  isUserLoggedIn?: boolean;
  orgAddress: string;
  orgName: string;
  refreshToken?: string;
  role: string;
  selectedMenuIndex: number;
  username: string;
  pfiId: number;
};
