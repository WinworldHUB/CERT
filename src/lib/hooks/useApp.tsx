import { useState } from "react";
import {
  DEFAULT_APP_STATE,
  DEFAULT_LOCAL_STORAGE_KEY_FOR_APP_STATE,
} from "../constants";
import useLocalStorage from "./useLocalStorage";

const useApp = (): AppState => {
  const { getValue, setValue } = useLocalStorage<AppVars>();
  const [appState, setAppState] = useState<AppVars>(
    getValue(DEFAULT_LOCAL_STORAGE_KEY_FOR_APP_STATE) ?? DEFAULT_APP_STATE
  );

  const updateAppState = (appState: AppVars) => {
    setAppState(appState);
    setValue(DEFAULT_LOCAL_STORAGE_KEY_FOR_APP_STATE, appState);
  };

  return { appState, updateAppState };
};

export default useApp;
