import { UserApplicant } from "../model/table/UserApplicant";

export interface T_adminGetUserApplicantsList_headers {
  authorization: string;
}

export type T_adminGetUserApplicantsList = (
  request: {
    headers: T_adminGetUserApplicantsList_headers;
  },
  base_url?: string,
) => Promise<UserApplicant[]>;

export const method = "get";
export const url_path = "/admin/applicants";
export const alias = "adminGetUserApplicantsList";
