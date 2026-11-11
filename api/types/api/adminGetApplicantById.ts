import { Response } from "express";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { UserApplicant } from "../model/table/UserApplicant";

export class T_adminGetApplicantById_headers {
  @IsNotEmpty({ message: "authorization cannot be empty" })
  @IsString({ message: "authorization must be a string" })
  authorization!: string;
}
export class T_adminGetApplicantById_path {
  @IsNotEmpty({ message: "id cannot be empty" })
  @Transform((param?: any): number | null =>
    param?.value === null || param?.value === undefined || param?.value === ""
      ? null
      : parseFloat(param.value),
  )
  @IsNumber({}, { message: "id must be a number (decimal)" })
  id!: number;
}

export type T_adminGetApplicantById = (
  request: {
    headers: T_adminGetApplicantById_headers;
    path: T_adminGetApplicantById_path;
  },
  response: Response,
) => Promise<UserApplicant>;

export const method = "get";
export const url_path = "/admin/applicant/:id";
export const alias = "adminGetApplicantById";
