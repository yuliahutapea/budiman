import { getAdminFromAuthHeader, getUserFromAuthHeader } from "../jwt";
import { T_adminGetApplicantById } from "../types/api/adminGetApplicantById";
import { UserApplicant } from "../types/model/table/UserApplicant";

export const adminGetApplicantById: T_adminGetApplicantById = async (req) => {
  const admin = await getAdminFromAuthHeader(req.headers.authorization);

  const application = await UserApplicant.findOneBy({
    id: req.path.id,
  });

  if (!application) {
    throw new Error(
      `Application dengan ID: ${req.path.id} tidak dapat ditemukan.`,
    );
  }

  return application;
};
