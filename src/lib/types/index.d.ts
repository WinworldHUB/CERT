type AppVars = {
  isUserLoggedIn?: boolean;
  accessToken?: string;
  refreshToken?: string;
  username: string;
  fullName: string;
  selectedMenuIndex: number;
  agreementNumber: string;
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
};

type LoginResponse = {
  success: boolean;
  message: string;
  fullName: string;
  session_duration: string;
  session_token: string;
  session_jwt: string;
  error: unknown;
};

type LoginRequest = {
  email: string;
  password: string;
};

type SignUpRequest = {
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
