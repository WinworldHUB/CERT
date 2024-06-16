export const DEFAULT_GET_API_HEADER = (accessToken: string) => {
  return {
    Authorization: `Bearer ${accessToken}`,
  };
};
export const DEFAULT_POST_API_HEADER = (accessToken: string) => {
  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
};
export const API_BASE_URL = "https://certbe.onrender.com";
// export const API_BASE_URL = "http://localhost:3000";

export enum API_ROUTES {
  LOGIN = "/auth/login",
  REGISTER = "/auth/register",
  APPROVE_USER = "/users/approve",
  APPROVE_PFI = "/pfis/approve",
  APPROVE_AGREEMENT = "/agreements/approve",
  REJECT_AGREEMENT = "/agreements/reject",
  GET_USER_BY_EMAIL = "/users/email",
  GET_USER_BY_PFI = "/users/pfi",
  GET_ALL_PFI = "/pfis",
  GET_AGREEMENTS_BY_PFI = "/agreements/pfi",
  CREATE_AGREEMENT = "/agreements/create",
  GET_DOC_BY_AGREEMENT = "/documents/get-docs",
  UPLOAD_DOC = "/documents/upload-file",
}
