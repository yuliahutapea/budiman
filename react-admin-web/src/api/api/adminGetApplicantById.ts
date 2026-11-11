import { UserApplicant } from "../model/table/UserApplicant";

export interface T_adminGetApplicantById_headers {
  authorization: string;
}
export interface T_adminGetApplicantById_path {
  id: number;
}

export type T_adminGetApplicantById = (
  request: {
    headers: T_adminGetApplicantById_headers;
    path: T_adminGetApplicantById_path;
  },
  base_url?: string,
) => Promise<UserApplicant>;

export const method = "get";
export const url_path = "/admin/applicant/:id";
export const alias = "adminGetApplicantById";
