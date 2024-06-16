type AppVars = {
  isUserLoggedIn?: boolean;
  accessToken?: string;
  refreshToken?: string;
  username: string;
  fullName: string;
  selectedMenuIndex: number;
  agreementNumber: string;
  role: string;
};

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

type LoginResponse = {
  success: boolean;
  message: string;
  pfiId?: string | number;
  fullName: string;
  session_duration: string;
  session_token: string;
  session_jwt: string;
  error: unknown;
  userRole: string;
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

type RegisterResponse = {
  success: boolean;
  message: string;
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

interface GeneralAPIResponse {
  success: boolean;
  message: string;
}
