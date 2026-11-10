import { Response } from "express";
import { IsNotEmpty, IsString } from "class-validator";
import { UserApplicant } from "../model/table/UserApplicant";

export class T_adminGetUserApplicantsList_headers {
  @IsNotEmpty({ message: "authorization cannot be empty" })
  @IsString({ message: "authorization must be a string" })
  authorization!: string;
}

export type T_adminGetUserApplicantsList = (
  request: {
    headers: T_adminGetUserApplicantsList_headers;
  },
  response: Response,
) => Promise<UserApplicant[]>;

export const method = "get";
export const url_path = "/admin/applicants";
export const alias = "adminGetUserApplicantsList";
