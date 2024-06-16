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
export const DEFAULT_FILE_UPLOAD_API_HEADER = (accessToken: string) => {
  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "multipart/form-data",
  };
};
export const API_BASE_URL = "https://certbe.onrender.com";
//export const API_BASE_URL = "https://certbe-fd1o.onrender.com";
// export const API_BASE_URL = "http://localhost:3000";

export enum API_ROUTES {
  LOGIN = "/auth/login",
  REGISTER = "/auth/register",
  APPROVE_USER = "/users/approve", // do a /{user_id} to approve a specific user
  APPROVE_PFI = "/pfis/approve", // do a /{pfi_id} to approve a specific pfi
  APPROVE_AGREEMENT = "/agreements/approve", // do a /{agreement_id} to approve a specific agreement
  REJECT_AGREEMENT = "/agreements/reject", // do a /{agreement_id} to reject a specific agreement
  GET_USER_BY_EMAIL = "/users/user", // do a /{email} to get a specific user
  GET_USER_BY_PFI = "/users/pfi", // do a /{parent_id} to get all users for a specific pfi
  GET_ALL_PFI = "/pfis",
  GET_AGREEMENTS_BY_PFI = "/agreements/pfi", // do a /{pfi_id} to get all agreements for a specific pfi
  CREATE_AGREEMENT = "/agreements/create",
  GET_PENDING_REQUESTS = "/users/pending",
  GET_DOC_BY_AGREEMENT = "/documents/get-docs", // do a /{agreement_id} to get all docs for an agreement
  UPLOAD_DOC = "/documents/upload-file", // do a /{agreement_id} to upload a docs for an agreement
  GET_PENDING_AGREEMENTS = "/agreements",
  GET_AGREEMENT_DETAILS = "/agreements/details",
}
