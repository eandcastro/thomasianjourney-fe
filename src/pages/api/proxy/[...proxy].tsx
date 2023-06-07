import { apiHandler } from "@/util/api";
import { NextApiRequest, NextApiResponse } from "next";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const [, path] = (req.url || "").split("proxy");
  // const fullPath = `${process.env.LIFF_API_BASE_URL}${path || ''}`;

  let accessToken: string = "";

  try {
    // TODO: update this to use auth from access_token response of login-confirm endpoint
    const tokenResult = "abccccc";
    accessToken = tokenResult || "";
  } catch (e) {
    console.log("No access token detected");
  }

  // Remove first instance of '/' character as Ky only accepts path that has no / as the first character
  let apiResponse = await apiHandler(
    accessToken,
    path.replace("/", ""),
    req.method,
    res,
    req
  );

  return res.status(apiResponse.statusCode).json(apiResponse.responsePayload);
}

export default handler;
