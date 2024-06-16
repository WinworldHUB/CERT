import { createTheme, rem } from "@mantine/core";

export const APP_THEME = createTheme({
  fontFamily: "Verdana, sans-serif",
  fontFamilyMonospace: "Monaco, Courier, monospace",
  headings: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: "",
    textWrap: "wrap",
    sizes: {
      h1: {
        fontWeight: "100",
        fontSize: rem(36),
        lineHeight: "1.4",
      },
      h2: {
        fontWeight: "100",
        fontSize: rem(34),
        lineHeight: "1.4",
      },
      h3: {
        fontWeight: "100",
        fontSize: rem(32),
        lineHeight: "1.4",
      },
      h4: {
        fontWeight: "100",
        fontSize: rem(30),
        lineHeight: "1.4",
      },
      h5: {
        fontWeight: "100",
        fontSize: rem(28),
        lineHeight: "1.4",
      },
      h6: {
        fontWeight: "100",
        fontSize: rem(26),
        lineHeight: "1.4",
      },
    },
  },
  colors: {
    light: [
      "#f3f3fe",
      "#e4e6ed",
      "#c8cad3",
      "#a9adb9",
      "#9093a4",
      "#808496",
      "#767c91",
      "#656a7e",
      "#585e72",
      "#4a5167",
    ],
    brightBlue: [
      "#e5f4ff",
      "#cde2ff",
      "#9bc2ff",
      "#64a0ff",
      "#3984fe",
      "#1d72fe",
      "#0969ff",
      "#0058e4",
      "#004ecc",
      "#0043b5",
    ],
    palePurple: [
      "#f2f0ff",
      "#e0dff2",
      "#bfbdde",
      "#9b98ca",
      "#7d79ba",
      "#6a65b0",
      "#605bac",
      "#504c97",
      "#464388",
      "#3b3979",
    ],
  },
});

export enum APP_ROUTES {
  HOME = "/",
  SIGN_IN = "/signin",
  SIGN_UP = "/signup",
  ADMIN_HOME = "/adminHome",
  USER_HOME = "/userHome",
  AGREEMENT_DETAILS = "/agreement",
}

export const DEFAULT_APP_STATE: AppVars = {
  isUserLoggedIn: false,
  accessToken: "",
  refreshToken: "",
  username: "",
  fullName: "",
  selectedMenuIndex: 0,
  agreementNumber: "",
  role: "",
};
export const DEFAULT_LOCAL_STORAGE_KEY_FOR_APP_STATE = "ZCGS_LS_APP_STATE";

export const DEFAULT_DATE_FORMAT = "cccc dd, LLL y";

export enum USER_ROLES {
  ADMIN = "ADMIN",
  USER = "USER",
}
