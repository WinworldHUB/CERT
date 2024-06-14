import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { APP_THEME } from "./lib/constants";
import { AppContextProvider } from "./lib/context/app.context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <MantineProvider defaultColorScheme="light" theme={APP_THEME}>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </MantineProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
